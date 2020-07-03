import { mongo } from '../../services/mongo.js'
import api from '../../middleware/api.js'

export default [
  api(async function listIngredients(req, res, next) {

    let query = {}
    if(req.query.search) {
      query.name = new RegExp('.*' + req.query.search + '.*', 'i')
      delete req.query.search
    }

    if(req.query.uid) {
      delete req.query.uid
    }

    const skip = +req.query.skip || 0
    const limit = +req.query.limit || 10
    delete req.query.skip
    delete req.query.limit

    query = {
      ...req.query,
      ...query,
      $or: [{
        owner: req.payload._id,
      },{
        public: true
      }]
    }

    console.log(query)
    
    const ingredients = await mongo('ingredients')
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray()

    return ingredients
  }),
]
