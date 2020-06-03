import { Client } from "https://deno.land/x/mysql/mod.ts";
const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "root",
  db: "denocookingapp",
  password: "1q2w3e4r#",
});

export default client;