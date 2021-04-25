from API import API
from datetime import datetime, timezone
from DatabaseConnection import DatabaseConnection

dbc = DatabaseConnection()

def GetCurrentThreshold (wallet) :
    currentStats = API("https://api.ethermine.org/miner/" + wallet + "/currentStats")

    currentStats.Connect()
    eth = currentStats.Result()['data']['coinsPerMin']

    eth *= 60
    eth *= 24
    eth *= 7
    eth *= 4.34524

    return float(format(eth, '.5f'))
    
def SetPot(wallet, units) :
    dashboard = API("https://api.ethermine.org/miner/" + wallet + "/dashboard")
    dashboard.Connect()

    currentPot = dashboard.Result()['data']['currentStatistics']['unpaid']

    currentDateTime = format(datetime.utcnow().timestamp(), '.0f')

    index = dbc.GenerateIndex("Pool")
    
    results = GetLatestPool()
    apiResults = apiGetLatestMiningStats(wallet)
    
    unpaid = apiResults['data']['currentStatistics']['unpaid'] / units

    totalUP = (float(results[0]) + unpaid) - float(results[2]); totalUP = format(totalUP, '.8f')
    totalTP = float(results[1]); totalTP = format(totalTP, '.8f')
  
    qry = "INSERT INTO Pool(ID, totalMined, totalPayout, unpaid, timestamp) VALUES(" + str(index) + ", " + str(totalUP) + ", " + str(totalTP) + ", " + str(unpaid) + ", '" + str(currentDateTime) + "')"

    dbc.QuerySelectDatabase(qry)
    status = dbc.CommitDatabase()
    dbc.CloseDatabase()

    return status

def GetLatestPool() :
    qry = "SELECT totalMined, totalPayout, unpaid FROM Pool"

    dbc.ConnectToDatabase()
    cursor = dbc.QuerySelectDatabase(qry)

    results = []

    for row in cursor :
        results = []
        for i in range(0, 3) :
            results.append(str(row[i]))

    return results

def apiGetLatestMiningStats(wallet) :
    api = API("https://api.ethermine.org/miner/" + wallet + "/dashboard")
    api.Connect()
    return api.Result()