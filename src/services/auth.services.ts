import { compare } from "bcryptjs";
import AppError from "../errors/AppError";
import { AuthRequest } from "../interfaces/AuthRequest.interface";
import { getAccountByEmail } from "./accounts.services";
import { IAccountResponse } from '../interfaces/AccountResponse.interface';
import jwt from 'jsonwebtoken';

export const createAuth = async (request: AuthRequest) => {
    const { email, password } = request.body;

    if (!email || !password) {
        throw new AppError('invalid email or password.');
    }

    const account: IAccountResponse | any = await getAccountByEmail(email);

    if (!account) {
        throw new AppError('account not found.', 404);
    }

    const passwordIsValid = await compare(password, account.password);

    if (!passwordIsValid) {
        throw new AppError('invalid email or password.', 403);
    }

    const token = jwt.sign(
        {
            email: account.email,
        },
        process.env.SECRET_KEY as string, 
        {
            expiresIn: "7d",
            subject: account.id
        }
    )

    return token;
}