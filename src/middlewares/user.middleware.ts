// verify token to get user_id and email

import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import UserRepository from "../repository/user.ts";
import IUser from "../models/IUser.ts";

const key = "denocookingapp";

export const isAuthentication = async (context: any, next: Function): Promise<void> => {
  try {
    let token = context.request.headers.get('Authorization').replace('Bearer ', '');
    let decoded = await validateJwt(token, key);
    let email: string = decoded?.payload?.iss || '';
    const users = await UserRepository.findUserByEmail(email);
    if (users?.length === 0 || users === undefined) {
      context.response.status = 403;
      context.response.body = { "message" : "Unauthorized" };
      return;
    }
    let user: IUser = users[0];
    context.request.email = decoded?.payload?.iss;
    context.request.userId = user.user_id;
    context.request.token = token;
    return next(context);
  } catch (error) {
    context.response.status = 401;
    context.response.body = { "message": error.message }
  }
}