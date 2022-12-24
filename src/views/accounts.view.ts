import { Router } from "express";
import { getAccountByIdController, getAllAccountsController, patchAccountController, postAccountController } from "../controllers/accounts.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const accountsRoutes = Router()

accountsRoutes.post("", postAccountController)
accountsRoutes.get("", getAllAccountsController)
accountsRoutes.get("/:id", isAuthenticated, getAccountByIdController)
accountsRoutes.patch("/:id", isAuthenticated, patchAccountController)

export default accountsRoutes
