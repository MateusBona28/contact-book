import 'express-async-errors';
import express from 'express';
import accountsRoutes from './views/accounts.view';
import { handleErrorMiddleware } from './middlewares/handleError.middleware';
import authRoutes from './views/auth.view';
import contactsRoutes from './views/contacts.views';

const app = express();
app.use(express.json());

app.use('/accounts', accountsRoutes);
app.use('/login', authRoutes);
app.use('/contacts', contactsRoutes);

app.use(handleErrorMiddleware);

export default app;
