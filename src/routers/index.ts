import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getDishes, addDish, getDishById, ratingDish } from '../controllers/dishes.controller.ts';
import { userRegister, userLogin } from '../controllers/users.controller.ts';
import { isAuthentication } from '../middlewares/user.middleware.ts';

const routers = new Router();

routers.get('/', function ({ response }: { response: any }) {
  response.status = 200;
  response.body = {
    "message": "Hello World Routing"
  }
});

routers.get('/dishes', getDishes);
routers.post('/dishes', addDish);
routers.get('/dishes/:id', getDishById);
routers.post('/signup', userRegister);
routers.post('/signin', userLogin);
routers.post('/dishes/:id/rating', isAuthentication ,ratingDish);


export default routers;
