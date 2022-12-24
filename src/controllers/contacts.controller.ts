import { Request, Response } from "express";
import { addNewContact, listAllSelfContacts } from "../services/contacts.services";

export const postContactController = async (request: Request, response: Response) => {
    const newContact = await addNewContact(request);

    return response.status(201).json(newContact)
}

export const getSelfContactsController = async (request: Request, response: Response) => {
    const contacts = await listAllSelfContacts(request)

    return response.json(contacts)
}