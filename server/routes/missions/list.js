import mongodb from 'mongodb'
import { mongo } from '../../services/mongo.js'
import api from '../../middleware/api.js'

const { ObjectID } = mongodb

export default [
  api(async function listMissions(req, res, next) {
    
    const user = await mongo('users')
      .findOne({
        _id: ObjectID(req.payload._id),
      })

    
    return {
      missions: user.missions || [],
    }
  }),
]
