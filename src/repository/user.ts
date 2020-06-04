import IUser from "../models/IUser.ts";
import client from "../database/MySQLClient.ts";

const checkIsExistUser = async (user : IUser) => {
  const results = await client.execute(`
    SELECT * FROM users WHERE email=?
  `, [user.email]);
  return results.rows?.length !== 0;
}

const findUserByEmail = async (user: IUser) => {
  const results = await client.execute(`
    SELECT
      user_id,
      username,
      email,
      password
    FROM users 
    WHERE email=? 
  `, [user.email]);
  return results.rows;
}

const userRegister = async (user : IUser) => {
  const results = await client.execute(`
    INSERT INTO users (
      username,
      email,
      password,
      updated_at,
      created_at
    ) VALUES (
      ?,
      ?,
      ?,
      NOW(),
      NOW()
    );
  `, [user.username, user.email, user.password]);
  return results;
}

const UserRepository = {
  checkIsExistUser,
  userRegister,
  findUserByEmail,
  
}

export default UserRepository;