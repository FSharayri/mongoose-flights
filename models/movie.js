import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

	
const movieSchema = new Schema({
  title: { 
    type : String, 
    required: true
  },
  releaseYear: {
    type: Number,
    default: function(){
      return new Date().getFullYear()
    },
    min : 1927
  },
  mpaaRating: {
    type: String,
    enum: ['G','PG','PG-13','R']
  },
  cast: [String],
  nowShowing: Boolean,
}, {
  timestamps: true
})


// Compile the schema into a model and export it
const Movie = mongoose.model('Movie', movieSchema)


export {
  Movie
}