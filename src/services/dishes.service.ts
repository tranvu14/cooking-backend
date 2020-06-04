import DishRepository from "../repository/dish.ts";
import IDish from "../models/IDish.ts";
import IIngredient from "../models/IIngredient.ts";

const getDishes = async () => {
  const dishes = await DishRepository.getDishes();
  return dishes;
}

const addDish = async (dish: IDish) => {
  let ingredients : Array<IIngredient> = dish.ingredients;
  const results = await DishRepository.addDish(dish);
  await Promise.all(ingredients.map(ingredient => DishRepository.addIngredientIntoDish(results.lastInsertId, ingredient)));
  return results;
}

const getDishById = async (dishId : number) => {
  const dishes = await DishRepository.getDishById(dishId);
  if(dishes?.length === 0 || dishes === undefined) {
    throw Error('No data to display');
  }
  let dish : IDish = dishes[0];
  const ingredients  = await DishRepository.getIngredientByDishId(dishId);
  if(ingredients !== undefined) {
    dish.ingredients = Array<IIngredient> (...ingredients);
  } 
  return dish;
}
const DishService = {
  getDishes,
  addDish,
  getDishById
}

export default DishService;