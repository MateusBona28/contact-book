import { hash } from "bcryptjs";
import AppDataSource from "../data-source";
import { Account } from "../entities/account.entity";
import { Phone } from "../entities/phone.entity";
import AppError from "../errors/AppError";
import { IAccountResponse } from "../interfaces/AccountResponse.interface";
import { AccountRequest } from "../interfaces/AccountRequest.interface";
import { IPhonesToRegister } from "../interfaces/PhonesToRegister.interface";
import { verifyIfPhoneNumberAlreadyExists } from "./phones.services";
import { TokenAccountRequest } from "../interfaces/AuthRequest.interface";
import { Contact } from "../entities/contact.entity";
import { AccountContact } from "../entities/account_contacts.entity";

export const createAccount = async (request: AccountRequest) => {
    const { fullName, email,  phones, password } = request.body

    if (!fullName || !email || !phones || !password) {
        throw new AppError("data info missing, keys expected: fullName, email, password, phones[]");
    }

    const accountsRepository = AppDataSource.getRepository(Account)
    const phonesRepository = AppDataSource.getRepository(Phone)
    const contactsRepository = AppDataSource.getRepository(Contact)
    const accountContactsRepository = AppDataSource.getRepository(AccountContact)

    const accountAlreadyExists = await getAccountByEmail(email)

    if (accountAlreadyExists) {
        throw new AppError("email already registered");
    }

    const hashedPassword = await hash(password, 10)

    const validatedAccountData = {
        fullName,
        email,
        password: hashedPassword
    }

    if (phones.length > 1) {
        const phonesToRegister:IPhonesToRegister[] = await verifyIfPhoneNumberAlreadyExists(phones)

        accountsRepository.create(validatedAccountData)

        const newAccount = await accountsRepository.save(validatedAccountData)

        for (let i = 0; i < phonesToRegister.length; i++){

            const phoneNumber = phonesToRegister[i]

            const validatedPhoneData = {
                ...phoneNumber,
                account: newAccount
            }
    
            phonesRepository.create(validatedPhoneData)
    
            await phonesRepository.save(validatedPhoneData)

            if (i + 1 === phonesToRegister.length){
                const accountResponse: IAccountResponse[] = await accountsRepository.find({ where: { id: newAccount.id } })
                delete accountResponse[0].password
    
                return accountResponse[0]
            }
        }
    }

    const ddd = phones[0].slice(0, 2)
    const number = phones[0].slice(2, phones[0].length)

    const phoneNumberAlreadyExists = await phonesRepository.findOne({ where: {
        ddd,
        number,
    }})

    if (phoneNumberAlreadyExists || phones[0].length < 11 || phones[0].length > 11)  {
        throw new AppError(`phone number already exists or was sended without 11 digits`);
    }

    accountsRepository.create(validatedAccountData)

    const newAccount = await accountsRepository.save(validatedAccountData)

    const validatedPhoneData = {
        ddd,
        number,
        account: newAccount
    }

    phonesRepository.create(validatedPhoneData)
    await phonesRepository.save(validatedPhoneData)

    const newContact = {
        fullName,
        email,
    }

    contactsRepository.create(newContact)
    const newSelfContact = await contactsRepository.save(newContact)

    const newAccountContact = {
        account: newAccount,
        contact: newSelfContact,
    }

    accountContactsRepository.create(newAccountContact)
    await accountContactsRepository.save(newAccountContact)

    const accountResponse: IAccountResponse[] = await accountsRepository.find(
        { 
            where: { id: newAccount.id },
            relations: { contacts: {
                contact: true,
            } },
        }
    )

    delete accountResponse[0].password

    return accountResponse[0]
}

export const listAccountById = async (request: TokenAccountRequest, accountId: string) => {
    if (request.body.tokenAccount.id !== accountId) {
        throw new AppError("you dont have permission to perform this action", 403);
    }

    const accountsRepository = AppDataSource.getRepository(Account)

    const account: IAccountResponse[] = await accountsRepository.find(
        { 
            where: { id: accountId },
            relations: { contacts: {
                account: true,
            } },
        }
    )

    return {
        ...account[0],
        password: undefined
    }
}

export const getAccountByEmail = async (email: string) => {
    const accountsRepository = AppDataSource.getRepository(Account)

    const account = await accountsRepository.findOneBy({ email: email })

    if (account) {
        return {
            ...account
        }
    }

    return false
}
