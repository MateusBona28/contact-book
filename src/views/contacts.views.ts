import { Router } from 'express';
import { postContact } from '../controllers/contacts.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware';

const contactsRoutes = Router();

contactsRoutes.post('', isAuthenticated, postContact)

export default contactsRoutes
