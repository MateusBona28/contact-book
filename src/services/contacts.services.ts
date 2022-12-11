import AppDataSource from "../data-source"
import { Account } from "../entities/account.entity"
import { AccountContact } from "../entities/account_contacts.entity"
import { Contact } from "../entities/contact.entity"
import AppError from "../errors/AppError"

export const addNewContact = async (request: any) => {
    const email = request.body.email

    const accountsRepository = AppDataSource.getRepository(Account)
    const accountContactsRepository = AppDataSource.getRepository(AccountContact)
    const contactsRepository = AppDataSource.getRepository(Contact)

    const accountToAddExists = await accountsRepository.findOneBy({ email })
    const account = await accountsRepository.findOneBy({ email: request.body.tokenAccount.email })
    const contact = await contactsRepository.findOneBy({ email })

    if (!accountToAddExists) {
        throw new AppError('account not found');
    }

    const newContact: any = {
        account,
        contact: contact,
    }

    accountContactsRepository.create(newContact)
    await accountContactsRepository.save(newContact)

    return {
        ...accountToAddExists,
        password: undefined,
        id: undefined,
    }
}