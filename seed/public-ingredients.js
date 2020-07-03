import { initMongo, mongo } from '../server/services/mongo.js'
import emitter from '../server/services/emitter.js'
import csv from 'csv-parser'
import fs from 'fs'

initMongo()
emitter.on('mongodbConnected', function() {
  console.log('ok, ready')
  seed()
})

async function seed() {
  let results = []

  fs.createReadStream('public-ingredients.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      results = results.map(l => {
        if(!l.kcal.trim()) return
        return {
          name: l.name,
          grams: 100,
          kcal: +l.kcal,
          public: true,
        }
      }).filter(l => l)
      await mongo('ingredients').insertMany(results)
      console.log('done')
    })
}

