import Router from 'express/lib/router/index.js'
import show from './show.js'

export default new Router()
  .get('/', show)
