import { Meal } from "../models/Meal.js"


async function newMeal(req,res){
  try{
    const meals = await Meal.find({})
    res.render('meals/new', {meals,title : 'Add Meal'})

  }
  catch(err){
    console.log(err)
    res.redirect('/')
  }
}
async function create(req,res){
  try{
   const meal = await Meal.create(req.body) 
   const meals = await Meal.find({})
   res.render('meals/new' ,{meals,title : 'Add Meal'})
  }catch(err){
    console.log(err)
    res.redirect('/')
  }
}
async function deleteMeal(req,res){
  try{
    const meal = await Meal.findByIdAndDelete(req.params.mealId)
    const meals = await Meal.find({})
    res.render('meals/new',{meals,title : 'Add Meal'})
  }catch(err){
    console.log(err)
    res.redirect('/')
  }
}

export{
  newMeal as new,
  create,
  deleteMeal as delete

}