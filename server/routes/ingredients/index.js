import Router from 'express/lib/router/index.js'
import create from './create.js'
import list from './list.js'
import starred from './starred.js'
import star from './star.js'

export default new Router()
  .get('/', list)
  .get('/starred', starred)
  .post('/star', star)
  .post('/', create)