import { Account } from "../entities/account.entity"

export interface IPhonesToRegister {
    ddd: string
    number: string
    account?: Account
}