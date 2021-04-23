from API import API

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

    # Create a new record with new ammount (problem here, if current pot is like 0.0001 
    # when it next checks 10 mins downline, then it won't make new record. Also if < 0.001ETH,
    # 10 minutes down line might still be 0.001 ETH (not likely but could be possible) so would
    # make another record, when it should just update... would this work?
    #  (currentPot == 0 || currentPot < 0.001) && currentPot != lastPot
    if(currentPot == 0) :
        pass

    # Update current record (as ethermine has not reset)
    else :
        pass