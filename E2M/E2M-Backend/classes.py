import db
import bcrypt

dbc = db.DatabaseConnection()

class LoginScripts :
    def CheckLogin(self, username, password) :
        if (self.GetDBField(username, 2)) :
            return {"auth": self.CheckPassword(username, password), "execAuth": self.CheckAdmin(username)}

        return {"auth": False, "execAuth": False}
    
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
        if (bcrypt.checkpw(password.encode('utf-8'), self.GetDBField(username, 3).encode('utf-8'))) :
            return True
            
        return False

    def CheckAdmin(self, username) :
        if(self.GetDBField(username, 6) == "admin") :
            return True
        
        return False


class RegisterScripts :
    def CreateAccount(self, workerName, workerPWD, workerFirstName, workerLastName, workerWallet) :
        encryption = workerPWD.encode('utf-8') # encrypts password
        password = bcrypt.hashpw(encryption, bcrypt.gensalt()).decode('utf-8')

        qry = "INSERT INTO Account(ID, wallet, workerName, workerPass, firstName, lastName, TYPE) VALUES(" + str(dbc.GenerateIndex("Account")) + ", '" + workerWallet + "', '" + workerName + "', '" + password + "', '" + workerFirstName + "', '" + workerLastName + "', 'worker')"

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
            results = []
            for i in range(0, 2) :
                results.append(str(row[i]))


        return results

class AccountScripts :
    def GetAccountRewards(self, workerName) :
        index = dbc.GetIndex("Account", "ID", workerName, "workerName")
        record = self.GetRecord(index)

        return {'ethRewards': record}
        
    def GetRecord(self, index) :
        # I'll add more later
        # perhaps add register and login scripts here but not really a problem atm
        qry = "SELECT ethEarned FROM Account WHERE id = " + str(index) + " LIMIT 1"

        dbc.ConnectToDatabase()
        cursor = dbc.QuerySelectDatabase(qry)
        
        results = []
        for row in cursor :
            for field in row :
                results.append(str(field))

        return results