import { hash } from "bcryptjs";
import AppDataSource from "../data-source";
import { Account } from "../entities/account.entity";
import { Phone } from "../entities/phone.entity";
import AppError from "../errors/AppError";
import { IAccountResponse } from "../interfaces/AccountResponse.interface";
import { AccountRequest, AccountUpdateRequest } from "../interfaces/AccountRequest.interface";
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

    const newContact = {
        fullName,
        email,
    }

    if (phones.length > 1) {
        const phonesToRegister:IPhonesToRegister[] = await verifyIfPhoneNumberAlreadyExists(phones)

        accountsRepository.create(validatedAccountData)
        const newAccount = await accountsRepository.save(validatedAccountData)

        contactsRepository.create(newContact)
        const newSelfContact = await contactsRepository.save(newContact)

        for (let i = 0; i < phonesToRegister.length; i++){

            const phoneNumber = phonesToRegister[i]

            const validatedPhoneData = {
                ...phoneNumber,
                contact: newSelfContact,
            }
    
            phonesRepository.create(validatedPhoneData)
            await phonesRepository.save(validatedPhoneData)

            if (i + 1 === phonesToRegister.length){
                const accountResponse: Account[] = await accountsRepository.find({ where: { id: newAccount.id } })
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

    contactsRepository.create(newContact)
    const newSelfContact = await contactsRepository.save(newContact)

    const validatedPhoneData = {
        ddd,
        number,
        contact: newSelfContact,
    }

    phonesRepository.create(validatedPhoneData)
    await phonesRepository.save(validatedPhoneData)

    const newAccountContact = {
        account: newAccount,
        contact: newSelfContact,
    }

    accountContactsRepository.create(newAccountContact)
    await accountContactsRepository.save(newAccountContact)

    const accountResponse: Account[] = await accountsRepository.find(
        { 
            where: { id: newAccount.id },
            relations: { contacts: { contact: true } },
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

    const account: Account[] = await accountsRepository.find(
        { 
            where: { id: accountId },
            relations: { contacts: { contact: true } }
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

export const updateAccount = async (request: AccountUpdateRequest, accountId: string) => {
    const { email, fullName, password } = request.body

    const accountsRepository = AppDataSource.getRepository(Account)
    const accountToUpdate = await accountsRepository.findOneBy({ id: accountId })

    if (!accountToUpdate) {
        throw new AppError('account not found', 404);
    }

    let updateInfo = {
        email,
        fullName,
        password,
    }

    if (password) {
        const hashedPassword = await hash(password, 10)
        updateInfo.password = hashedPassword
    }

    await accountsRepository.update(accountId, {
        ...accountToUpdate,
        ...updateInfo,
    })

    const updatedAccount = await accountsRepository.findOneBy({ id: accountId })

    return {
        ...updatedAccount,
        password: undefined,
    }
}

export const listAllAccounts = async () => {
    const accountsRepository = AppDataSource.getRepository(Account)

    const accounts = await accountsRepository.find()

    return accounts.map((account) => {
        return {
            ...account,
            password: undefined
        }
    })
}
