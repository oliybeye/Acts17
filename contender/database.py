import pymongo

class Database:
    def __init__(self, connection: str, dbName: str):
        self.client = pymongo.MongoClient("mongodb://localhost:27017/")
        self.dbName = dbName
        self.db = self.client[self.dbName]

    def getCollection(self, collection):
        return self.db[collection]
