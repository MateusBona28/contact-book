import { Router } from 'express';
import { getSelfContactsController, postContactController } from '../controllers/contacts.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware';

const contactsRoutes = Router();

contactsRoutes.post('', isAuthenticated, postContactController)
contactsRoutes.get('', isAuthenticated, getSelfContactsController)

export default contactsRoutes
