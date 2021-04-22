from API import API

def GetCurrentThreshold () :
    currentStats = API("https://api.ethermine.org/miner/d2B0B8133b1E30EC7C7936153116F8bC955cb20f/currentStats")

    currentStats.Connect()
    eth = currentStats.Result()['data']['coinsPerMin']

    eth *= 60
    eth *= 24
    eth *= 7
    eth *= 4.34524

    return float(format(eth, '.5f'))
    