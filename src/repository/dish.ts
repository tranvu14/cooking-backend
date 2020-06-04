import client from '../database/MySQLClient.ts';
import IDish from '../models/IDish.ts';
import IIngredient from '../models/IIngredient.ts';

const getDishes = async () => {
  const results = await client.execute('SELECT * FROM dish;');
  return results.rows;
}

const addDish = async(dish : IDish) => {
  const results = await client.execute(`
    INSERT INTO dish (
      title,
      description,
      updated_at,
      created_at
    ) VALUES (
      ?,
      ?,
      NOW(),
      NOW()
    );
  `, [dish.title, dish.description]);
  return results;
}
const addIngredientIntoDish = async (dish_id : number | undefined, ingredient : IIngredient) => {
  const results = await client.execute(`
    INSERT INTO ingredients (
      dish_id,
      ingredient_name,
      ingredient_weight
    ) VALUES (
      ?,
      ?,
      ?
    );
  `, [dish_id, ingredient.ingredient_name, ingredient.ingredient_weight]);
  return results;
}

const getDishById = async (dishId: number) => {
  const results = await client.execute(`
    SELECT 
      dish_id,
      title,
      thumbnail,
      description
    FROM dish
    WHERE ??=?
  `, ["dish_id", dishId]);
  return results.rows;
}
const getIngredientByDishId = async (dishId: number) => {
  const results = await client.execute(`
    SELECT 
      ingredient_name,
      ingredient_weight
    FROM ingredients
    WHERE ??=?
  `, ["dish_id", dishId]);
  return results.rows;
}
const DishRepository = {
  getDishes,
  addDish,
  addIngredientIntoDish,
  getDishById,
  getIngredientByDishId
}

export default DishRepository;