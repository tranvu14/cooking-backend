import { Application } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import routers from './src/routers/index.ts';

const app = new Application();

app.use(oakCors());
app.use(routers.routes());
app.use(routers.allowedMethods());

console.log('App running on http://127.0.0.1:1234');
await app.listen({ port : 1234 });