import { Router } from "express";
import { testView } from "../controllers/accounts.controller";

const accountsRoutes = Router()

accountsRoutes.get("", testView)

export default accountsRoutes
