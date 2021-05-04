from datetime import datetime, timezone
from config import Config
from timer import timer
from DatabaseConnection import DatabaseConnection
import tasks

conf = Config()
dbc = DatabaseConnection()

class Task :
    def executeTask(self) :
        currentDateTime = format(datetime.utcnow().timestamp(), '.0f')

        if tasks.dbSetPot(conf.primaryWallet, conf.units, currentDateTime) is False :
           return "Error"
        
        if tasks.dbSetAccount(conf.primaryWallet, conf.units, currentDateTime) is False :
            return "Error"

        return "Updated!"

# 10 Minutes
timer = timer(Task())
timer.runTimer()