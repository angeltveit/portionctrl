import jwt from 'jsonwebtoken'

export default function(opts) {
  return function(req, res, next) {
    const header = req.get('Authorization')
    const payload = jwt.verify((header || '').split(' ').pop(), process.env.JWT_SECRET)
    if(!payload) {
      throw new Error('unauthorized')
    }

    req.payload = payload
    next()
  }
}