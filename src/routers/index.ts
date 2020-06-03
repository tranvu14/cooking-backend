import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getDishes } from '../controllers/dishes.controller.ts';
const routers = new Router();

routers.get('/route', function ({ response }: { response: any }) {
    response.status = 200;
    response.body = {
        "message": "Hello World Routing"
    }
});

routers.get('/dishes', getDishes);

export default routers;
