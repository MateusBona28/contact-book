import { hash } from "bcryptjs";
import AppDataSource from "../data-source";
import { Account } from "../entities/account.entity";
import { Phone } from "../entities/phone.entity";
import AppError from "../errors/AppError";
import { IAccountResponse } from "../interfaces/AccountResponse.interface";
import { AccountRequest } from "../interfaces/AccountRequest.interface";
import { IPhonesToRegister } from "../interfaces/PhonesToRegister.interface";
import { verifyIfPhoneNumberAlreadyExists } from "./phones.services";

export const createAccount = async (request: AccountRequest) => {
    const { fullName, email,  phones, password } = request.body

    if (!fullName || !email || !phones || !password) {
        throw new AppError("data info missing, keys expected: fullName, email, password, phones[]");
    }

    const accountsRepository = AppDataSource.getRepository(Account)
    const phonesRepository = AppDataSource.getRepository(Phone)

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

    const accountResponse: IAccountResponse[] = await accountsRepository.find({ where: {id: newAccount.id} })

    delete accountResponse[0].password

    return accountResponse[0]
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
