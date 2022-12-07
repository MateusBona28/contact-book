import AppDataSource from "../data-source"
import { Account } from "../entities/account.entity"
import { Phone } from "../entities/phone.entity"
import AppError from "../errors/AppError"
import { IPhonesToRegister } from "../interfaces/PhonesToRegister.interface"


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