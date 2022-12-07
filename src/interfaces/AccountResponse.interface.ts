import { Contact } from "../entities/contact.entity"
import { Phone } from "../entities/phone.entity"

export interface IAccountResponse {
    id?: string | undefined
    fullName?: string | undefined
    email?: string | undefined
    password?: string | undefined
    createdAt?: Date | undefined
    Phones?: Phone[] | undefined
    Contacts?: Contact[] | undefined
}