import sched, time

class timer :
    def __init__(self, subobj, minutes = 10) :
        self.minutes = minutes * 60
        self.subobj = subobj
        self.sched = sched.scheduler(time.time, time.sleep)

    def startTimer(self, sc) :
        self.subobj.executeTask()
        self.sched.enter(self.minutes, 1, self.startTimer, (sc,))

    def runTimer(self):
        self.sched.enter(self.minutes, 1, self.startTimer, (self.sched,))
        self.sched.run()