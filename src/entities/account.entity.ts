import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { AccountContact } from './account_contacts.entity';
import { Contact } from './contact.entity';
import { Phone } from './phone.entity';


@Entity('account')
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined

    @Column({ type: 'varchar', length: 50 })
    fullName: string | undefined

    @Column({ type: 'varchar', length: 50 })
    email: string | undefined

    @Column({ type: 'varchar',  length: 90 })
    password: string | undefined

    @OneToMany(() => AccountContact, accountContact => accountContact.account)
    contacts: AccountContact[] | undefined
}
