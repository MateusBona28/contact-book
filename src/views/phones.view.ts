import { Router } from 'express';
import { deletePhoneController, patchPhoneController, postPhoneController } from '../controllers/phones.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware';

const phonesRoutes = Router()

phonesRoutes.post('', isAuthenticated, postPhoneController)
phonesRoutes.delete('/:id', isAuthenticated, deletePhoneController)
phonesRoutes.patch('/:id', isAuthenticated, patchPhoneController)

export default phonesRoutes
