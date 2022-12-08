import { Router } from "express";
import { postAuth } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post('', postAuth);

export default authRoutes;
