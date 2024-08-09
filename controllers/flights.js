// always import a model to be able to perform CRUD
import { Flight } from "../models/Flight.js"
import { Meal} from "../models/Meal.js"

async function index(req,res){
  try{
  const flights = await Flight.find({})
  console.log(flights[1]['departs'])
  flights.sort((a,b)=>{-a.departs.getFullYear()+b.departs.getFullYear()})
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
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key]
    }
  const flight = await Flight.create(req.body)
  res.redirect(`/flights/${flight._id}`)
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
  const meals = await Meal.find({})
  flight.meals.populate()
  res.render('flights/show', {flight ,meals, title : 'Flight Details'})
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
    console.log("controller?")
    res.redirect(`/flights/${req.params.flightId}`)
  }
  catch(err){
    console.log(err)
    res.redirect(`/flights/${req.params.flightId}`)
  }
}
async function createTicket(req,res){
  try{
    const flight = await Flight.findById(req.params.flightId)
    flight.tickets.push(req.body)
    await flight.save()
    res.redirect(`/flights/${req.params.flightId}`)
  }catch(err){
    console.log(err)
    res.redirect(`/flights/${req.params.flightId}`)
  }
}
async function deleteTicket(req,res){
  try{
    const flight = await Flight.findById(req.params.flightId)
    console.log(flight.tickets.id(req.params.ticketId))
    flight.tickets.id(req.params.ticketId).deleteOne()
    await flight.save();
    res.redirect(`/flights/${req.params.flightId}`)
  }catch(err){
    console.log(err)
    res.redirect(`/flights/${req.params.flightId}`)
  }
}

async function addMeal(req,res){
  try{
    const mealId = req.body.mealId
    const flight = await Flight.findById(req.params.flightId)
    await flight.meals.push(mealId)
    await flight.meals.populate()
    res.redirect(`/flights/${req.params.flightId}`)
  }catch(err){
    console.log(err)
    res.redirect('/')
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
  deleteTicket,
  createTicket,
  addMeal,

}