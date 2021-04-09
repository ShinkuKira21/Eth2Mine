import db

dbc = db.DatabaseConnection()

class LoginScripts :
    def CheckLogin(self, username, password) :
        if (self.GetDBField(username, 2)) :
            return {"auth": self.CheckPassword(username, password), "execAuth": self.CheckAdmin(username)}

        return False
    
    def GetUserRecord(self, username) :
        qry = "SELECT * FROM Account WHERE workerName = '" + username + "' LIMIT 1"

        dbc.ConnectToDatabase()
        cursor = dbc.QuerySelectDatabase(qry)
        
        return cursor

    def GetDBField(self, username, index) :
        if self.GetUserRecord(username).fetchone() :
            return self.GetUserRecord(username).fetchone()[index]

        return False

    def GetDBFields(self, username) :
        return self.GetUserRecord(username).fetchone()

    def CheckPassword(self, username, password) :
        if (password == self.GetDBField(username, 3)) :
            return True
            
        return False

    def CheckAdmin(self, username) :
        if(self.GetDBField(username, 6) == "admin") :
            return True
        
        return False

        