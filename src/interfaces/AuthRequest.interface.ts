import { Request } from "express";

export interface AuthRequest extends Request {
    body: {
        email: string
        password: string
    }
}

export interface TokenAccountRequest extends Request {
    body: {
        email: string
        tokenAccount: {
            id?: string
            email?: string
        }
    }
}

export interface TokenAccountPhoneUpdateRequest extends Request {
    body: {
        ddd: string
        number: string
        tokenAccount: {
            id?: string
            email?: string
        }
    }
}
