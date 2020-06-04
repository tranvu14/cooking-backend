import client from '../database/MySQLClient.ts';
import IDish from '../models/IDish.ts';
import IIngredient from '../models/IIngredient.ts';
import IRate from '../models/IRate.ts';

const getDishes = async () => {
  const results = await client.execute(`
    SELECT
      dish.dish_id,
      dish.title,
      dish.thumbnail,
      dish.description,
      COALESCE((SELECT AVG(rating_value) FROM dish_rating WHERE dish_rating.dish_id=dish.dish_id), 0) rating
    FROM dish;
  `);
  return results.rows;
}

const addDish = async (dish: IDish) => {
  const results = await client.execute(`
    INSERT INTO dish (
      title,
      thumbnail,
      description,
      prepare,
      doing,
      eating
      updated_at,
      created_at
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      NOW(),
      NOW()
    );
  `, [dish.title, dish.thumbnail, dish.description, dish.prepare, dish.doing, dish.eating]);
  return results;
}
const addIngredientIntoDish = async (dish_id: number | undefined, ingredient: IIngredient) => {
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

const ratingDish = async (rating: IRate) => {
  const results = await client.execute(`
    INSERT INTO dish_rating (
      dish_id,
      user_id,
      rating_value
    ) VALUES (
      ?,
      ?,
      ?
    );
  `, [rating.dish_id, rating.user_id, rating.rating_value]);
  return results.rows;
}
const DishRepository = {
  getDishes,
  addDish,
  addIngredientIntoDish,
  getDishById,
  getIngredientByDishId,
  ratingDish
}

export default DishRepository;