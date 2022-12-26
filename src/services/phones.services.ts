import AppDataSource from "../data-source"
import { Contact } from "../entities/contact.entity"
import { Phone } from "../entities/phone.entity"
import AppError from "../errors/AppError"
import { TokenAccountPhoneUpdateRequest, TokenAccountRequest } from "../interfaces/AuthRequest.interface"
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

export const deletePhoneNumber = async (request: TokenAccountRequest, phoneId: string) => {
    const accountEmail = request.body.tokenAccount.email

    const contactsRepository = AppDataSource.getRepository(Contact)
    const phonesRepository = AppDataSource.getRepository(Phone)

    const contact: any = await contactsRepository.findOne({ where: { email: accountEmail } })

    for (let i = 0; i < contact.phones.length; i++){
        const phoneNumber = contact.phones[i]

        if (phoneNumber.id === phoneId) {
            await phonesRepository.delete(phoneId)
            return ""
        }
    }

    throw new AppError("phone number not found");
}

export const updatePhone = async (request: TokenAccountPhoneUpdateRequest, phoneId: string) => {
    const accountEmail = request.body.tokenAccount.email

    const contactsRepository = AppDataSource.getRepository(Contact)
    const phonesRepository = AppDataSource.getRepository(Phone)

    const contact: any = await contactsRepository.findOne({ where: { email: accountEmail } })

    for (let i = 0; i < contact.phones.length; i++){
        const phoneNumber = contact.phones[i]

        if (phoneNumber.id === phoneId) {
            const { ddd, number } = request.body

            const updateInfo = {
                ddd,
                number
            }

            const phoneAlreadyExists = await phonesRepository.findOne({ where: {
                ddd,
                number
            } })

            if (phoneAlreadyExists) {
                throw new AppError('invalid phone number', 400);
            }

            const updatedPhone = {
                ...phoneNumber,
                ...updateInfo,
            }

            await phonesRepository.update(phoneId, updatedPhone)

            return "phone number updated with success!"
        }
    }

    throw new AppError("phone number not found");

}
