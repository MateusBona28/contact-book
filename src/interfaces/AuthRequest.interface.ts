import { Request } from "express";

export interface AuthRequest extends Request {
    body: {
        email: string
        password: string
    }
}

export interface TokenAccountRequest extends Request {
    body: {
        tokenAccount: {
            id?: string
            email?: string
        }
    }
}