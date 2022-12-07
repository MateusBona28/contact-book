import { Router } from "express";
import { postController } from "../controllers/accounts.controller";

const accountsRoutes = Router()

accountsRoutes.post("", postController)

export default accountsRoutes
