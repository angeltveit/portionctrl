import { mongo } from '../../services/mongo.js'
import api from '../../middleware/api.js'

export default [
  api(async function createMeal(req, res, next) {
    
    req.body.createdAt = new Date()

    const recipe = await mongo('recipes').findOne({
      title: req.body.title,
    })
    
    if(!recipe) {
      await mongo('recipes').insert(req.body)
    }

    const ingredients = req.body.ingredients
    for(let i=0; i < ingredients.length; i++) {
      const ingredient = await mongo('ingredients').findOne({ name: ingredients[i].name.trim() })
      if(!ingredient) {
        ingredients.createdAt = new Date()
        await mongo('ingredients').insert(ingredients[i])
      }
    }

    await mongo('meals').insert(req.body)
    
    return {
      ok: true,
    }
  }),
]
