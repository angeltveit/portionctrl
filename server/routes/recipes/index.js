import Router from 'express/lib/router/index.js'
import list from './list.js'

export default new Router()
  .get('/', list)