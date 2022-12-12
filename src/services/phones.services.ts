import AppDataSource from "../data-source"
import { Contact } from "../entities/contact.entity"
import { Phone } from "../entities/phone.entity"
import AppError from "../errors/AppError"
import { IAccountResponse } from "../interfaces/AccountResponse.interface"
import { IPhonesToRegister } from "../interfaces/PhonesToRegister.interface"

export const createPhone = async (body: any) => {
    const accountEmail = body.tokenAccount.email
    const phones = body.phones

    const contactsRepository = AppDataSource.getRepository(Contact)
    const phonesRepository = AppDataSource.getRepository(Phone)

    if (!phones) {
        throw new AppError('no phone number to register');
    }

    const phonesToRegister:IPhonesToRegister[] = await verifyIfPhoneNumberAlreadyExists(phones)

    const contact = await contactsRepository.findOneBy({ email: accountEmail })

    if (!contact) {
        throw new AppError('account not found', 404);
    }

    for (let i = 0; i < phonesToRegister.length; i++){

        const phoneNumber = phonesToRegister[i]

        const validatedPhoneData = {
            ...phoneNumber,
            contact,
        }

        phonesRepository.create(validatedPhoneData)
        await phonesRepository.save(validatedPhoneData)

        if (i + 1 === phonesToRegister.length){
            return {
                message: `phone number(s) ${phones} added to account`
            }
        }
    }
}

export const verifyIfPhoneNumberAlreadyExists = async (phones: string[]) => {
    const phonesRepository = AppDataSource.getRepository(Phone)

    const phonesToRegister = []

    for (let i = 0; i < phones.length; i++) {
        const phoneToVerify = phones[i]

        const ddd = (phoneToVerify.slice(0, 2))
        const number = phoneToVerify.slice(2, phoneToVerify.length)

        const phoneNumberAlreadyExists = await phonesRepository.findOne({ where: {
            ddd,
            number,
        }})

        if (phoneNumberAlreadyExists || phoneToVerify.length < 11 || phoneToVerify.length > 11)  {
            throw new AppError(`phone number already exists or was sended without 11 digits`);
        }

        phonesToRegister.push({ ddd, number })
    }

    return phonesToRegister
}