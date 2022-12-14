import { Request, Response } from "express";
import { addNewContact, listAllSelfContacts } from "../services/contacts.services";

export const postContact = async (request: Request, response: Response) => {
    const newContact = await addNewContact(request);

    return response.status(201).json(newContact)
}

export const getSelfContacts = async (request: Request, response: Response) => {
    const contacts = await listAllSelfContacts(request)

    return response.json(contacts)
}