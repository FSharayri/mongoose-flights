// always import a model to be able to perform CRUD
import { Flight } from "../models/Flight.js"



async function index(req,res){
  try{
  const flights = await Flight.find({})
  res.render('flights', {flights , title : 'Flights List'})
  }catch(err){
    console.log(err)
    res.redirect('/')
  }
}
function newFlight(req,res){

  res.render('flights/new', {title: 'New Flight'})
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



export {
  index,
  newFlight as new,
  create,

}