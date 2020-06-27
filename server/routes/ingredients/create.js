import { mongo } from '../../services/mongo.js'
import api from '../../middleware/api.js'

export default [
  api(async function createMeal(req, res, next) {
    
    const ingredient = await mongo('ingredients').findOne({
      title: req.body.name,
    })
    
    if(ingredient) {
      const body = req.body
      delete body.name
      await mongo('ingredients').updateOne({
        title: req.body.name,
      },{
        $set: {
          body,
          updatedAt: new Date(),
        },
      })
      return { ok: true, created: false }
    }

    await mongo('ingredients').insert(req.body)
    
    return {
      ok: true,
    }
  }),
]
