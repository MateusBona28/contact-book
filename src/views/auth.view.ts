import { Router } from "express";
import { postAuthController } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post('', postAuthController);

export default authRoutes;
