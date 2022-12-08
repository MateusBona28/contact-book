import { Response } from "express";
import { AccountRequest } from "../interfaces/AccountRequest.interface";
import { createAccount } from "../services/accounts.services";

export const postController = async (request: AccountRequest, response: Response) => {
    const newUser = await createAccount(request)

    return response.status(201).json(newUser)
}
