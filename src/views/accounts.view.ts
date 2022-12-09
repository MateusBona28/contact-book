import { Router } from "express";
import { getAccountByIdController, postController } from "../controllers/accounts.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const accountsRoutes = Router()

accountsRoutes.post("", postController)
accountsRoutes.get("/:id", isAuthenticated, getAccountByIdController)

export default accountsRoutes
