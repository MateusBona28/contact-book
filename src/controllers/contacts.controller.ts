import { Request, Response } from "express";
import { addNewContact } from "../services/contacts.services";

export const postContact = async (request: Request, response: Response) => {
    const newContact = await addNewContact(request);

    return response.status(201).json(newContact)
}