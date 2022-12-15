import { Router } from 'express';
import { deletePhone, postPhone } from '../controllers/phones.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware';

const phonesRoutes = Router()

phonesRoutes.post('', isAuthenticated, postPhone)
phonesRoutes.delete('/:id', isAuthenticated, deletePhone)

export default phonesRoutes
