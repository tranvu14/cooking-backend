import IDish from "../models/IDish.ts"
import DishService from "../services/dishes.service.ts";

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
    response.status = 500;
    response.body = { "message": "Internal Server Error" }
  }
}