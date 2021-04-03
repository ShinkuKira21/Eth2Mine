import mysql.connector as sql

class DatabaseConnection :
    def __init__(self):
        self.user = "web-267e2m"
        self.password = "y4^5kmP?a(2{"
        self.host = "92.205.4.171"
        self.db = "Accounts"
        self.connection = ""

    def ConnectToDatabase(self) :
        self.connection = sql.connect(self.user, self.password, self.host, self.db)

    def GetCursor(self) :
        return self.connection.cursor()

    def QuerySelectDatabase(self, qry) :
        GetCursor().execute(qry)

    def CloseDatabase(self) :
        self.connection.close()
    
