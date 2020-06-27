  
import MongoDB from 'mongodb'
import emitter from './emitter.js'

var conn = null
export async function initMongo() {
  if(conn) return
  const client = await MongoDB.MongoClient.connect(process.env.MONGODB || 'mongodb://localhost:27017', {
    useNewUrlParser: true,
  })
  conn = client.db(process.env.MONGODB_DATABASE || 'kcal')
  
  console.log('Mongodb connected...')
  emitter.emit('mongodbConnected')
}


// Connect to the db
export function mongo(doc) {
  if(!conn) {
    throw new Error('No mongodb connection')
  }
  return conn.collection(doc)
}