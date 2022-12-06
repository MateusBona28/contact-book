import express from 'express';
import accountsRoutes from './views/accounts.view';

const app = express();
app.use(express.json());

app.use('/accounts', accountsRoutes)
const teste = 'teste'

export default app;
