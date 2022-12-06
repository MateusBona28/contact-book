import { Request, Response } from "express";


export const testView = (request: Request, response: Response) => {
    const teste = "testando"
    return response.json("teste")
}
