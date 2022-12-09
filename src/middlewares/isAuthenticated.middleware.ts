import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
    const headerToken = request.headers.authorization

    if (!headerToken) {
        return response.status(401).json({ message: "you don't have the permission to perform this action" })
    }

    const token = headerToken.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY as string, (error: any, decoded: any) => {
        if (error) {
            return response.status(401).json({ message: "you don't have the permission to perform this action" })
        }

        request.body = {
            ...request.body,
            tokenAccount: {
                id: decoded.sub,
                email: decoded.email,
            }
        }
    })

    next()
}
