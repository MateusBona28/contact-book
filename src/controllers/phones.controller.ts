import { Request, Response } from "express";
import { createPhone } from "../services/phones.services";

export const postPhone = async (request: Request, response: Response) => {
    const newPhone = await createPhone(request.body)

    return response.status(201).json(newPhone)
}