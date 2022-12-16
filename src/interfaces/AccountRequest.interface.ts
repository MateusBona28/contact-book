import { Request } from "express";

export interface AccountRequest extends Request {
    body: {
        fullName: string
        email: string
        phones: string[]
        password: string
    }
}

export interface AccountUpdateRequest extends Request {
    body: {
        fullName?: string
        email?: string
        phones?: string[]
        password?: string
    }
}