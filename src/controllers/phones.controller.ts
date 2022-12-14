import { Request, Response } from "express";
import { createPhone, deletePhoneNumber, updatePhone } from "../services/phones.services";

export const postPhoneController = async (request: Request, response: Response) => {
    const newPhone = await createPhone(request.body)

    return response.status(201).json(newPhone)
}

export const deletePhoneController = async (request: Request, response: Response) => {
    const phoneId = request.params.id

    await deletePhoneNumber(request, phoneId)

    return response.status(204).json({})
}

export const patchPhoneController = async (request: Request, response: Response) => {
    const phoneId = request.params.id

    const updatedPhone = await updatePhone(request, phoneId)

    return response.json(updatedPhone)
}
