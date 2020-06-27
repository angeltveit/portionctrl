import Router from 'express/lib/router/index.js'
import meals from './meals/index.js'
import ingredients from './ingredients/index.js'
import recipes from './recipes/index.js'


export default new Router()
  .use('/meals', meals)
  .use('/ingredients', ingredients)
  .use('/recipes', recipes)