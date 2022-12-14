import { Router } from 'express';
import { getSelfContacts, postContact } from '../controllers/contacts.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware';

const contactsRoutes = Router();

contactsRoutes.post('', isAuthenticated, postContact)
contactsRoutes.get('', isAuthenticated, getSelfContacts)

export default contactsRoutes
