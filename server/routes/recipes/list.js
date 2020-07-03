import { mongo } from '../../services/mongo.js'
import api from '../../middleware/api.js'

export default [
  api(async function listRecipes(req, res, next) {

    const query = {}
    if(req.query.search) {
      query.title = new RegExp('.*' + req.query.search + '.*', 'i')
    }
    
    const recipes = await mongo('recipes')
      .find({
        ...query,
        $or: [{
          owner: req.payload._id,
        },{
          public: true,
        }]
      })
      .limit( +req.query.limit || 10 )
      .skip(+req.query.skip || 0)
      .toArray()
    
    return recipes
  }),
]
