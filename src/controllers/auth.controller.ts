import { Request, Response } from "express"
import { createAuth } from "../services/auth.services"

export const postAuthController = async (request: Request, response: Response) => {
    const token = await createAuth(request);

    return response.json({ token });
}
