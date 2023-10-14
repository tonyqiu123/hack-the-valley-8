from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://lmx5912004:ssdVXpH7P1VGoiUF@cluster0.d3sdlsl.mongodb.net/?retryWrites=true&w=majority"

def mongod_connect():
    client = MongoClient(uri, server_api=ServerApi('1'))
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        return client
    except Exception as e:
        print(e)
        raise e

# test
# connect()        