from timer import timer
from DatabaseConnection import DatabaseConnection
import tasks

dbc = DatabaseConnection()

class Task :
    def executeTask(self) :
        print(str(tasks.GetCurrentThreshold()) + "eth")

# 10 Minutes
timer = timer(Task())
timer.runTimer()