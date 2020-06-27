import Joi from 'joi'

export default function(schema) {
  return function(req, res, next) {
    let result = Joi.validate({...req.body, ...req.params, ...req.query}, schema, { stripUnknown: true })
    if(result.error){
      res.status(400)
      throw new Error(result.error.details[0].message)
    }
    req.joi = result.value
    next()
  }
}
