// always import a model to be able to perform CRUD
import { Flight } from "../models/Flight.js"



async function index(req,res){
  try{
  const flights = await Flight.find({})
  res.render('flights', {flights , title : 'All Flights'})
  }catch(err){
    console.log(err)
    res.redirect('/')
  }
}

function newFlight(req,res){
  res.render('flights/new', {title: 'Add Flight'})
}

async function create(req,res){
  try{
  const flight = await Flight.create(req.body)
  res.redirect('/flights')
  }catch(err){
    console.log(err)
    res.redirect('/')
  }
}

async function deleteFlight(req,res){
  try{
    const flight =  await Flight.findByIdAndDelete(req.params.flightId)
    res.redirect('/flights')
  }
  catch(err){
    console.log(err)
    res.redirect('/flights')
  }
}

async function show(req,res){
  try{
  const flight = await Flight.findById(req.params.flightId)
  res.render('flights/show', {flight , title : 'Flight Details'})
  }catch(err){
    console.log(err)
    res.redirect('/')
  }
}

async function edit(req,res){
  try{
  const flight = await Flight.findById(req.params.flightId)
  res.render('flights/edit', {flight , title : 'Edit Flight'})
  }catch(err){
    console.log(err)
    res.redirect('/')
  }
}

async function update(req,res){
  try{
    const flight = await Flight.findByIdAndUpdate(req.params.flightId,req.body,{new:true})
    res.redirect(`/flights/${req.params.flightId}`)
  }
  catch(err){
    console.log(err)
    res.redirect(`/flights/${req.params.flightId}`)
  }
}

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update,

}