import { mongo } from '../../services/mongo.js'
import api from '../../middleware/api.js'

export default [
  api(async function listMeals(req, res, next) {

    const query = {}
    if(req.query.search) {
      query.title = new RegExp('.*' + req.query.search + '.*', 'i')
    }
    console.log(query)
    const meals = await mongo('meals')
      .find(query)
      .skip(+req.query.skip || 0)
      .limit( +req.query.limit || 0 )
      .toArray()
    
    return meals
  }),
]
