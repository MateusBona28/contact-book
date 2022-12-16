import { Request, Response } from "express";
import { AccountRequest } from "../interfaces/AccountRequest.interface";
import { createAccount, listAccountById, updateAccount } from "../services/accounts.services";

export const postController = async (request: AccountRequest, response: Response) => {
    const newUser = await createAccount(request)

    return response.status(201).json(newUser)
}

export const getAccountByIdController = async (request: Request, response: Response) => {
    const account = await listAccountById(request, request.params.id)

    return response.json(account)
}

export const patchAccountController = async (request: Request, response: Response) => {
    const updatedAccount = await updateAccount(request, request.params.id)

    return response.json(updatedAccount)
}