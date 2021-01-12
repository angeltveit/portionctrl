import { initMongo, mongo } from '../services/mongo.js'
import moment from 'moment'

let loaded


function calculateTotalCalories(meals, date) {
  const mealsAtDate = meals.filter(meal => {
    return moment(meal.createdAt).isSame(date, 'day')
  })
  return mealsAtDate.reduce((prev, curr) => {
    prev += +kcalFor(curr)
    return prev
  }, 0)
}

function kcalFor(meal) {
  const sum = meal.ingredients.reduce((prev, curr) => {
    prev += parseInt(curr.kcal || 0) * (parseInt(curr.gram || 0) / 100)
    return prev
  }, 0)
  return sum.toFixed(0)
}

export default async function() {
  if(!loaded) await initMongo()
  
  const users = await mongo('users')
    .find()
    .toArray()

  for(let user of users) {
    
    const meals = await mongo('meals')
      .find({
        owner: ''+user._id,
      })
      .toArray()
    
    let consecutivePoints = 0
    let daysWinning = 0
    let streakStart
    let streakLength = 0
    let lastDate
    
    console.log('TOTAL MEALS', meals.length)
    for(let i = 365; i > 0; i--) {
      //console.log('Checking', moment().subtract(i, 'days').format('lll'))
      
      const checkDate = moment().subtract(i, 'days')

      let kcals = calculateTotalCalories(meals, checkDate)
      const goodJob = kcals > 0 && kcals < 1200
      
      if(goodJob) daysWinning++

      if(!lastDate) {  
        lastDate = {
          date: checkDate,
          goodJob,
          kcals,
        }
        continue
      }
       
      if(lastDate.date.isSame(moment(checkDate).subtract(1, 'day'), 'day') && lastDate.goodJob) {
        if(!streakStart) {
          streakStart = lastDate.date
          streakLength++
        }
        streakLength++
      } else {
        streakLength = 0
        streakStart = null
      }
      
      if(streakLength) {
        consecutivePoints += streakLength * (streakLength >= 5 ? 5 : streakLength) * 2 // Multiplier grows, but max is 5
      }

      lastDate = {
        date: checkDate,
        goodJob,
        kcals,
      }
      
    }
    console.log('Current streak:', streakLength)
    const XP = consecutivePoints + daysWinning*2.5
    console.log(user.phone, '- XP:', XP, 'Level:', Math.floor(XP/100))
    await mongo('users')
      .updateOne({
        _id: user._id,
      },{
        $set: {
          level: Math.floor(XP/100),
          xp: Math.round((XP/100 % 1) * 100),
          streakLength,
          xpCalculatedAt: (new Date()).toISOString(),
        }
      })
  }
}
