import Twilio from 'twilio'
import { mongo } from '../../services/mongo.js'
import api from '../../middleware/api.js'
import randomInt from 'random-int'
import jwt from 'jsonwebtoken'

const TWILIO_SID = process.env.TWILIO_SID
const TWILIO_SECRET = process.env.TWILIO_SECRET

const twilio = Twilio(TWILIO_SID, TWILIO_SECRET)

async function clearOtp(phone) {
  await mongo('users').update({
    phone,
  },{
    $set: {
      otp: null
    },
  })
}

async function authorize(phone, code) {

  const ok = await mongo('users').findOne({
    phone,
    otp: code,
  })
  
  await clearOtp(phone)
  
  if(!ok) {
    throw new Error('unauthorized')
  }
  return ok
}

export default [
  api(async function createAuth(req, res, next) {

    const { phone, code } = req.body

    if(!phone) {
      throw new Error('phone missing')
    }

    const otp = randomInt(10000, 99999)

    const exists = await mongo('users').findOne({
      phone,
    })

    if(!exists) {
      await mongo('users').insert({
        phone,
      })
    }

    if(code) {
      const user = await authorize(phone, code)
      delete user.otp
      return {
        ...user,
        token: jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '365d' })
      }
    }
    
    await mongo('users').updateOne({
      phone,
    },{
      $set: {
        otp,
      }
    })

    const { sid } = twilio.messages.create({
      body: `One time code: ${otp}`,
      from: 'PortionCtrl',
      to: `+47${phone}`
    })
    
    return { state: 'otp' }
  }),
]