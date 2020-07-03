import { mongo } from '../../services/mongo.js'
import api from '../../middleware/api.js'

export default [
  api(async function listStarred(req, res, next) {

    const limit = +req.query.limit || 100
    delete req.query.limit

    const query = {
      ...req.query,
      starred: req.payload._id,
      $or: [{
        owner: req.payload._id,
      },{
        public: true
      }],
    }
    
    const ingredients = await mongo('ingredients')
      .find(query)
      .limit(limit)
      .toArray()

    return ingredients
  }),
]
