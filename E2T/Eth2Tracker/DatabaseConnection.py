import mysql.connector as sql

class DatabaseConnection :
    def __init__(self):
        self.user = "web-267e2m"
        self.password = "y4^5kmP?a(2{"
        self.host = "92.205.4.171"
        self.port = 3306
        self.db = "EtherMine"
        self.connection = None

    def ConnectToDatabase(self) :
        self.connection = sql.connect(host = self.host, port = self.port, user = self.user, password = self.password, database = self.db)

        if(self.connection) :
            return "connected"
        else :
            return "not connected"

    def GetCursor(self) :
        return self.connection.cursor()

    # NOT YET SECURE (BINDINGS WITH EXECUTE REQUIRED)
    def QuerySelectDatabase(self, qry) :
        cursor = self.GetCursor()
        cursor.execute(qry)
        return cursor

    def CommitDatabase(self) :
        self.connection.commit()
        return True

    def GenerateIndex(self, table) :
        qry = "SELECT ID FROM " + table

        self.ConnectToDatabase()
        cursor = self.QuerySelectDatabase(qry)

        # Generates new row
        index = 0

        for row in cursor :
            index = int(row[0])

        if(cursor.rowcount > 0) :
            index += 1

        return index

    def CloseDatabase(self) :
        self.connection.close()