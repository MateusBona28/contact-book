import { Router } from "express";
import { getAccountByIdController, patchAccountController, postController } from "../controllers/accounts.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const accountsRoutes = Router()

accountsRoutes.post("", postController)
accountsRoutes.get("/:id", isAuthenticated, getAccountByIdController)
accountsRoutes.patch("/:id", isAuthenticated, patchAccountController)

export default accountsRoutes
