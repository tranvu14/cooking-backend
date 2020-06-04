import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts"
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts"
import IUser from "../models/IUser.ts";
import UserRepository from "../repository/user.ts";
const SALT_NUMBER = 10;

const key = "denocookingapp";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
}



const userRegister = async (user: IUser) => {
  const isExistUser = await UserRepository.checkIsExistUser(user);
  if (isExistUser) {
    throw new Error("Email was existed");
  }
  // hash password
  const salt = await bcrypt.genSalt(SALT_NUMBER);
  user.password = await bcrypt.hash(user.password, salt);

  // write to database
  const results = await UserRepository.userRegister(user);
  
  const payload: Payload = {
    iss: user.email,
    exp: setExpiration(new Date().getTime() + 86400),
  }
  //token include user.id
  const token = await makeJwt({ header, payload, key });

  return {
    user: user,
    token: token
  }
}

const userLogin = async (user: IUser) => {
  // check exist user in db
  const users = await UserRepository.findUserByEmail(user.email);
  if (users?.length === 0 || users === undefined) {
    throw new Error("User Invalid");
  }

  // verify password
  let userDB: IUser = users[0];
  const isEqualPassword = await bcrypt.compare(user.password, userDB.password);

  if (!isEqualPassword) {
    throw new Error("User Invalid");

  }

  const payload: Payload = {
    iss: user.email,
    exp: setExpiration(new Date().getTime() + 86400000),
  }

  //token include user.id
  const token = await makeJwt({ header, payload, key });

  return {
    user: user,
    token: token
  }
}

const UserService = {
  userRegister,
  userLogin
};
export default UserService;