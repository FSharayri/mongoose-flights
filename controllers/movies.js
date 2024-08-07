// always import a model to be able to perform CRUD
import { Movie } from "../models/movie.js"


function newMovie(req,res){

  res.render('movies/new', {title :'Add Movie'})
}


async function create(req,res){
  try{
    // massage data
    req.body.nowShowing = !! req.body.noShowing
    if (req.body.cast){
      req.body.cast = req.body.cast.split(', ') 
    }
    // remove empty properties
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key]
    }
    const movie = await Movie.create(req.body)
    res.redirect('/movies')
  }
  catch(err){
    console.log(err)
    res.redirect('/movies/new')
  }
}


async function index(req,res){
  try{
  const movies = await Movie.find({})
  res.render('movies/index', {movies,title : 'All Movies'
  })
  } catch(err){
    console.log(err)
    res.redirect('/')
  }
}

async function show(req,res){
  try{
    //find the movie from db
  const movie = await Movie.findById(req.params.movieId)
  // pass the movie and the title of the page for rendering
  res.render('movies/show', {
    movie ,
    title : 'Movie Detail'})
  } catch(err){
    console.log(err)
    res.redirect('/movies')
  }
}

async function deleteMovie(req,res){
  try{
    //find the movie from db
  const movie = await Movie.findByIdAndDelete(req.params.movieId)
  // pass the movie and the title of the page for rendering
  res.redirect(`/movies`)
  } catch(err){
    console.log(err)
    res.redirect('/movies')
  }
}

async function edit(req,res){
  try{
  const movie = await Movie.findById(req.params.movieId)
  res.render('movies/edit', {
    movie,
    title : 'Edit Movie'
  })
  } catch(err){
    console.log(err)
    res.redirect('/')
  }
}
async function update(req,res){
  try{
  req.body.nowShowing = !!req.body.nowShowing
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  if (req.body.cast) {
    req.body.cast = req.body.cast.split(', ')
  }
    //find the movie from db
  const movie = await Movie.findByIdAndUpdate(req.params.movieId,req.body, {new :true})
  // pass the movie and the title of the page for rendering
  res.redirect(`/movies/${movie._id}`)
  } catch(err){
    console.log(err)
    res.redirect('/movies')
  }
}
export{
  newMovie as new,
  create,
  index,
  show,
  deleteMovie as delete,
  update,
  edit
}