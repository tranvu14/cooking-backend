import { Router } from 'https://deno.land/x/oak/mod.ts'
const routers = new Router();

routers.get('/route', function({response}: {response: any}) {
    response.status = 200;
    response.body = {
        "message" : "Hello World Routing"
    }
});

export default routers;
