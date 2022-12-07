import 'express-async-errors';
import express from 'express';
import accountsRoutes from './views/accounts.view';
import { handleErrorMiddleware } from './middlewares/handleError.middleware';

const app = express();
app.use(express.json());

app.use('/accounts', accountsRoutes);

app.use(handleErrorMiddleware);

export default app;
