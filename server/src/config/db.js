import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

const DB_NAME = 'launchers'

let mongoClient = null
let mongoConn = null

export async function initMongo() {
    try {
        mongoClient = new MongoClient(MONGO_URI)
        await mongoClient.connect()
        console.log('connected to mongo')
        mongoConn = mongoClient.db(DB_NAME)
        console.log('connected to mongo Data Base')
    }catch(err){
        console.log(err.message)
    }
}

export async function getMongoConn() {
    try{
        if(!mongoConn){
            if(!mongoClient){
                mongoClient = new MongoClient(MONGO_URI)
                await mongoClient.connect()
            }
            mongoConn = mongoClient.db(DB_NAME)
        }
        return mongoConn
    }catch(err){
        console.log(err.message)
    }
} 