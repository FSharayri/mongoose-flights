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
  let date = new Date()
  date.setFullYear(date.getFullYear()+1)
  res.render('flights/new', {date , title: 'Add Flight'})
}

async function create(req,res){
  try{
  // for ( let key in req.body){
  //   if (req.body[key])
  // }
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
  let date = flight.departs
  res.render('flights/edit', {flight ,date, title : 'Edit Flight'})
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