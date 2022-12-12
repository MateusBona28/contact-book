import { Router } from 'express';
import { postPhone } from '../controllers/phones.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware';

const phonesRoutes = Router()

phonesRoutes.post('', isAuthenticated, postPhone)

export default phonesRoutes
