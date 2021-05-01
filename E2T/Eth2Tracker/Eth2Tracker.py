from config import Config
from timer import timer
from DatabaseConnection import DatabaseConnection
import tasks

conf = Config()
dbc = DatabaseConnection()

class Task :
    def executeTask(self) :
        if tasks.dbSetPot(conf.primaryWallet, conf.units) is False :
           return "Error"

        return "Updated!"

# 10 Minutes
timer = timer(Task())
timer.runTimer()