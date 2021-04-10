import db
import bcrypt

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
        #dbc.CloseDatabase()

        return cursor

    def GetDBField(self, username, index) :
        if self.GetUserRecord(username).fetchone() :
            return self.GetUserRecord(username).fetchone()[index]

        return False

    def GetDBFields(self, username) :
        return self.GetUserRecord(username).fetchone()

    def CheckPassword(self, username, password) :
        if (bcrypt.checkpw(password.encode('utf-8'), self.GetDBField(username, 3).encode('utf-8'))) :
            return True
            
        return False

    def CheckAdmin(self, username) :
        if(self.GetDBField(username, 6) == "admin") :
            return True
        
        return False


class RegisterScripts :
    def GenerateIndex(self) :
        qry = "SELECT ID FROM Account"

        dbc.ConnectToDatabase()
        cursor = dbc.QuerySelectDatabase(qry)

        # Generates new row
        index = 0

        for row in cursor :
            index = int(row[0])

        if(cursor.rowcount > 0) :
            index += 1

        return index

    def CreateAccount(self, workerName, workerPWD, workerFirstName, workerLastName, workerWallet) :
        encryption = workerPWD.encode('utf-8') # encrypts password
        password = bcrypt.hashpw(encryption, bcrypt.gensalt()).decode('utf-8')

        qry = "INSERT INTO Account(ID, wallet, workerName, workerPass, firstName, lastName, TYPE) VALUES(" + str(self.GenerateIndex()) + ", '" + workerWallet + "', '" + workerName + "', '" + password + "', '" + workerFirstName + "', '" + workerLastName + "', 'worker')"

        dbc.QuerySelectDatabase(qry)
        status = dbc.CommitDatabase()
        dbc.CloseDatabase()

        return status

class PoolScripts :
    def GetLatestRow(self) :
        qry = "SELECT totalMined, totalPayout FROM Pool"

        dbc.ConnectToDatabase()
        cursor = dbc.QuerySelectDatabase(qry)

        results = []

        for row in cursor :
            for i in range(0, 2) :
                results.append(str(row[i]))

        return results