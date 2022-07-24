/* This may be a old version of the database but the latest version available. */
CREATE TABLE Account (
    ID int NOT NULL,
    wallet varchar(255) NOT NULL,
    workerName varchar(35) NOT NULL,
    workerPassword varchar(255) NOT NULL,
    firstName varchar(35) NOT NULL,
    lastName varchar(35) NOT NULL
);

CREATE TABLE Pool (
    ID int NOT NULL,
    totalMined varchar(5) NOT NULL,
    totalPayout varchar(5) NOT NULL
);