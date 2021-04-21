from timer import timer
from DatabaseConnection import DatabaseConnection

dbc = DatabaseConnection()

class Task :
    def executeTask(self) :
        # the tasks that get execute will be here
        pass

# 10 Minutes
timer = timer(Task())
timer.runTimer()