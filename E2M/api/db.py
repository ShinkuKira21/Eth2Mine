import mysql.connector as sql

class DatabaseConnection :
    def __init__(self):
        self.user = "web-267e2m"
        self.password = "y4^5kmP?a(2{"
        self.host = "crypto2mine.org"
        self.port = 3306
        self.db = "EtherMine"
        self.connection = ""

    def ConnectToDatabase(self) :
        self.connection = sql.connect(host = self.host, port = self.port, user = self.user, password = self.password, database = self.db)

        if(self.connection) :
            return "connected"
        else :
            return "not connected"

    def GetCursor(self) :
        return self.connection.cursor()

    def QuerySelectDatabase(self, qry) :
        GetCursor().execute(qry)

    def CloseDatabase(self) :
        self.connection.close()
    
