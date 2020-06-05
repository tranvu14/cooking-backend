import { validateJwt } from "https://deno.land/x/djwt/validate.ts"

import IDish from "../models/IDish.ts"
import DishService from "../services/dishes.service.ts";
import IRate from "../models/IRate.ts";

export async function getDishes({ response }: { response: any }) {
  // get params and body 
  // 
  try {
    const results = await DishService.getDishes();
    response.status = 200;
    response.body = results;
  } catch (error) {
    response.status = 400;
    response.body = { "message": error.message }
  }
}

export async function addDish({ request, response }: { request: any, response: any }) {
  const body = await request.body();
  const dish: IDish = body.value;
  console.log('dis:', dish);
  try {
    const result = await DishService.addDish(dish);
    response.status = 200;
    response.body = {
      "message": "OK"
    }
  } catch (error) {
    response.status = 500;
    response.body = { "message": error.message }
  }
}

export async function getDishById({ params, request, response }: { params: { id: string }, request: any, response: any }) {

  let dishId: number = Number.parseInt(params.id);
  // validate dish id is number
  try {
    const dish = await DishService.getDishById(dishId);
    response.status = 200;
    response.body = dish;
  } catch (error) {
    response.status = 404;
    response.body = { "message": error.message }
  }
}

export async function ratingDish(context : any) {
  const body = await context.request.body();
  const rating : IRate = body.value;
  // validate dishId
  let dishId: number = Number.parseInt(context.params.id);

  rating.user_id = context.request.userId;
  rating.dish_id = dishId;
  
  try {
    const results = await DishService.ratingDish(rating);
    context.response.status = 201;
    context.response.body = { "message": "Succesfully" };
  } catch (error) {
    context.response.status = 404;
    context.response.body = { "message": error.message };
  }

} 