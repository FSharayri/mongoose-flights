import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema




const mealSchima = new Schema({
  name: String,
})

const Meal = mongoose.model('Meal', mealSchima)


export {
  Meal
}