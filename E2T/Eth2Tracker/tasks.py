from API import API
from DatabaseConnection import DatabaseConnection

dbc = DatabaseConnection()

def dbSetPot(wallet, units, currentDateTime) :
    dashboard = API("https://api.ethermine.org/miner/" + wallet + "/dashboard")
    dashboard.Connect()

    currentPot = dashboard.Result()['data']['currentStatistics']['unpaid']

    index = dbc.GenerateIndex("Pool")
    
    results = GetLatestPool()
    apiResults = apiGetLatestMiningStats(wallet)
    
    currentStats = apiResults['data']['currentStatistics']

    unpaid = float(currentStats['unpaid'] / units[0]);
    
    totalUP = (float(results[0]) + unpaid) - float(results[2]); totalUP = format(totalUP, '.8f')
    totalTP = float(results[1]); totalTP = format(totalTP, '.8f')
  
    avgHashrate = (currentStats['reportedHashrate'] + currentStats['currentHashrate']) / 2
    avgHashrate /= units[1]; avgHashrate = format(avgHashrate, '.2f')

    ethMonthly = format(GetCurrentThreshold(wallet), '.8f')
    unpaid = format(unpaid, '.8f')

    validShares = currentStats['validShares']

    qry = "INSERT INTO Pool(ID, totalMined, totalPayout, unpaid, averageHashrate, validShares, monthPrediction, timestamp) VALUES(" + str(index) + ", " + str(totalUP) + ", " + str(totalTP) + ", " + str(unpaid) + ", " + str(avgHashrate) + ", " + str(validShares) + ", " + str(ethMonthly) + ", '" + str(currentDateTime) + "')"

    dbc.QuerySelectDatabase(qry)
    status = dbc.CommitDatabase()
    dbc.CloseDatabase()
    return status

def dbSetAccount(wallet, units, currentDateTime) :
    latestPool = GetLatestPool()
    apiLatestPool = apiGetLatestMiningStats(wallet)['data']['currentStatistics']
    workerDetails = apiGetWorkerStats(wallet)
    
    validShares = latestPool[3];
    validShares = float(validShares)
    validShares = format(validShares, '.0f')

    workerName = []
    workerPayout = []
    workerPercentage = []
    for worker in workerDetails :
        workerName.append(worker['worker'])
        workerID = dbc.GetIndex("Account", "ID", worker['worker'], "workerName") 
        if not workerID :
            break

        workerPercentage.append(float(worker['validShares']) / float(validShares))
        workerPayout.append(float(GetWorkerLatestStats(workerID)[0]))

        

        if dbSetWorkers(workerID, float(worker['validShares']), float(validShares), currentDateTime) is False :
            return False

    for i, worker in enumerate(workerPercentage) :
        print(workerName[i])
        print(str(format(worker * 100, '.2f')) + "%")
        print((float(latestPool[2]) * worker) / units[0])
        print(workerPayout[i])

    for i, worker in enumerate(workerName) :
        pass

    return True

def dbSetWorkers(id, wValidShares, pValidShares, currentDateTime) :
    index = dbc.GenerateIndex("Workers")
    qry = "INSERT INTO Workers(ID, userID, wValidShares, pValidShares, timestamp) "
    qry += "VALUES(" + str(index) + ", " + str(id) + ", " + str(wValidShares) + ", " + str(pValidShares) + ", '" + currentDateTime + "')"

    dbc.QuerySelectDatabase(qry)
    status = dbc.CommitDatabase()
    dbc.CloseDatabase()

    if dbUpdateAccount(id, wValidShares, pValidShares, index) is False :
        return False

    return status

def dbUpdateAccount(id, wValidShares, pValidShares, currentID) :
    qry = "SELECT wValidShares, pValidShares, timestamp FROM Workers WHERE userID = " + str(id) + " ORDER BY ID DESC LIMIT 1,1"

    dbc.ConnectToDatabase()
    cursor = dbc.QuerySelectDatabase(qry)
    
    results = []
    for row in cursor :
        for field in row :
            results.append(str(field))

    if results :
        average = [(wValidShares + float(results[0])) / 2, (pValidShares + float(results[1])) / 2]

    else :
        average = [wValidShares, pValidShares]

    iAverage = average[0] / average[1]

    qry = "UPDATE Workers SET profit = " + str(iAverage) + " WHERE id = '" + str(currentID) + "'"

    dbc.QuerySelectDatabase(qry)
    status = dbc.CommitDatabase()
    dbc.CloseDatabase()

    qry = "SELECT unpaid FROM Pool ORDER BY ID DESC LIMIT 1,1"

    dbc.ConnectToDatabase()
    cursor = dbc.QuerySelectDatabase(qry)

    results = []

    for row in cursor :
        results = []
        for field in row :
            results.append(str(field))

    previousRecordUnpaid = float(results[0])
    latestRecordUnpaid = float(GetLatestPool()[2])
    uncalculatedUnpaid = latestRecordUnpaid - previousRecordUnpaid

    payment = uncalculatedUnpaid * iAverage

    earntEth = float(dbc.GetIndex("Account", "ethEarned", id, "ID"))
    payment += earntEth # add payment to existing earntEth

    qry = "UPDATE Account SET ethEarned = " + str(payment) + " WHERE ID = " + str(id)

    dbc.QuerySelectDatabase(qry)
    status = dbc.CommitDatabase()
    dbc.CloseDatabase()

    return status


def GetCurrentThreshold (wallet, bPerMonth = True) :
    currentStats = API("https://api.ethermine.org/miner/" + wallet + "/currentStats")

    currentStats.Connect()
    eth = currentStats.Result()['data']['coinsPerMin']

    if bPerMonth :
        eth *= 60
        eth *= 24
        eth *= 7
        eth *= 4.34524

    return float(eth)

def GetLatestPool() :
    qry = "SELECT totalMined, totalPayout, unpaid, validShares FROM Pool ORDER BY ID ASC"

    dbc.ConnectToDatabase()
    cursor = dbc.QuerySelectDatabase(qry)

    results = []

    for row in cursor :
        results = []
        for field in row :
            results.append(str(field))

    return results

def GetWorkerLatestStats(id) :
    qry = "SELECT ethEarned FROM Account WHERE ID = " + str(id) + " LIMIT 1"

    dbc.ConnectToDatabase()
    cursor = dbc.QuerySelectDatabase(qry)
  
    results = []
    for row in cursor :
        for field in row :
            results.append(str(field))

    return results

def apiGetLatestMiningStats(wallet) :
    api = API("https://api.ethermine.org/miner/" + wallet + "/dashboard")
    api.Connect()
    return api.Result()

def apiGetWorkerStats(wallet) :
    api = API("https://api.ethermine.org/miner/" + wallet + "/workers")
    api.Connect()

    data = []
    for result in api.Result()['data'] :
        data.append(result)
    
    return data