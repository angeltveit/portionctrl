import Router from 'express/lib/router/index.js'
import create from './create.js'

export default new Router()
  .post('/', create)
