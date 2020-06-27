import mongodb from 'mongodb'
import { mongo } from '../../services/mongo.js'
import api from '../../middleware/api.js'

const { ObjectID } = mongodb

export default [
  api(async function remove(req, res, next) {
  
    await mongo('meals').remove({
      _id: ObjectID(req.body._id)
    })
    
    return {
      ok: true,
    }
  }),
]
