from config import Config
from timer import timer
from DatabaseConnection import DatabaseConnection
import tasks

conf = Config()
dbc = DatabaseConnection()

class Task :
    def executeTask(self) :
        print(str(tasks.GetCurrentThreshold(conf.primaryWallet)) + "eth")
        if tasks.SetPot(conf.primaryWallet, conf.units) is False :
           print("Error")

# 10 Minutes
timer = timer(Task())
timer.runTimer()