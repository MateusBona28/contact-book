import { Router } from 'express';
import { deletePhoneController, postPhoneController } from '../controllers/phones.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware';

const phonesRoutes = Router()

phonesRoutes.post('', isAuthenticated, postPhoneController)
phonesRoutes.delete('/:id', isAuthenticated, deletePhoneController)

export default phonesRoutes
