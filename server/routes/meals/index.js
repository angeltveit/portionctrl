import Router from 'express/lib/router/index.js'
import create from './create.js'
import list from './list.js'
import remove from './remove.js'

export default new Router()
  .get('/', list)
  .post('/', create)
  .delete('/', remove)