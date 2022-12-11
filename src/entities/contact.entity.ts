import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Account } from './account.entity';
import { AccountContact } from './account_contacts.entity';
import { Phone } from './phone.entity';


@Entity('contact')
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined

    @Column({ type: 'varchar', length: 50 })
    fullName: string | undefined

    @Column({ type: 'varchar', length: 50 })
    email: string | undefined

    @OneToMany(() => AccountContact, accountContact => accountContact.contact)
    accounts: AccountContact[] | undefined

    @OneToMany(() => Phone, phone => phone.contact, { eager: true })
    phones: Phone[] | undefined
}