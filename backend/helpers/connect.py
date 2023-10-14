from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://lmx5912004:ssdVXpH7P1VGoiUF@cluster0.d3sdlsl.mongodb.net/?retryWrites=true&w=majority"
from pymongo import MongoClient

def get_mongo_client():
    client = MongoClient(uri)
    return client
