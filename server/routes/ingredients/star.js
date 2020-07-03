import mongodb from 'mongodb'
import { mongo } from '../../services/mongo.js'
import api from '../../middleware/api.js'

const { ObjectID } = mongodb


export default [
  api(async function listStarred(req, res, next) {
    
    const ingredient = await mongo('ingredients')
      .findOne({
        _id: ObjectID(req.body._id),
        $or:[{
          owner: req.payload._id,
        },{
          public: true,
        }]
      })

    if(!ingredient) {
      throw new Error('unauthorized')
    }

    const isStarred = (ingredient.starred || []).includes(req.payload._id)
    const ingredients = await mongo('ingredients')
      .update({
        _id: ObjectID(ingredient._id),
        $or:[{
          owner: req.payload._id,
        },{
          public: true,
        }]
      },{
        ...(!isStarred && {
          $push: {
            starred: req.payload._id,
          }
        }),
        ...(isStarred && {
          $pull: {
            starred: req.payload._id,
          }
        }),
      })

    return { status: 'ok' }
  }),
]
