import Router from 'express/lib/router/index.js'
import meals from './meals/index.js'
import ingredients from './ingredients/index.js'
import recipes from './recipes/index.js'
import auth from './auth/index.js'
import missions from './missions/index.js'
import profile from './profile/index.js'
import authenticate from '../services/authenticate.js'

export default new Router()
  .use('/auth', auth)
  .use(authenticate())
  .use('/meals', meals)
  .use('/ingredients', ingredients)
  .use('/recipes', recipes)
  .use('/missions', missions)
  .use('/profile', profile)