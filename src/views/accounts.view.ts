import { Router } from "express";
import { getAccountByIdController, getAllAccountsController, patchAccountController, postController } from "../controllers/accounts.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const accountsRoutes = Router()

accountsRoutes.post("", postController)
accountsRoutes.get("", getAllAccountsController)
accountsRoutes.get("/:id", isAuthenticated, getAccountByIdController)
accountsRoutes.patch("/:id", isAuthenticated, patchAccountController)

export default accountsRoutes
