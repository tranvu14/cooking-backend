import { Application } from 'https://deno.land/x/oak/mod.ts';
import routers from './src/routers/index.ts';

const app = new Application();

app.use(routers.routes());
app.use(routers.allowedMethods());

console.log('App running on http://127.0.0.1:8000');
await app.listen("127.0.0.1:8000");