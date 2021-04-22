from timer import timer
from DatabaseConnection import DatabaseConnection
from API import API

dbc = DatabaseConnection()

currentStats = API("https://api.ethermine.org/miner/d2B0B8133b1E30EC7C7936153116F8bC955cb20f/currentStats")

currentStats.Connect()
eth = float(currentStats.Result()['data']['coinsPerMin'])
eth *= 60
eth *= 24
eth *= 7
eth *= 4
print(str(format(eth, '.5f')) + "eth")

class Task :
    def executeTask(self) :
        # the tasks that get execute will be here
        pass

# 10 Minutes
timer = timer(Task())
timer.runTimer()