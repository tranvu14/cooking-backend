import IUser from "../models/IUser.ts";
import UserService from "../services/users.service.ts";

export const userRegister = async ({ request, response }: { request: any, response: any }) => {
  const body = await request.body();
  console.log(body);
  // validate body
  const user: IUser = body.value;
  try {
    const result = await UserService.userRegister(user);
    response.status = 201;
    response.body = result;
  } catch (error) {
    response.status = 404;
    response.body = { "message": error.message };
  }
}

export const userLogin = async ({ request, response }: { request: any, response: any }) => {
  const body = await request.body();
  // validate body login
  const user : IUser = body.value;
  try {
    const result = await UserService.userLogin(user);
    response.status = 200;
    response.body = result;
  } catch (error) {
    response.status = 404;
    response.body = { "message": error.message };
  }
}