import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
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

    @CreateDateColumn({ type: 'date' })
    createdAt: Date | undefined

    @OneToMany(() => Contact, contact => contact.account)
    Contacts: Contact[] | undefined

    @OneToMany(() => Phone, phone => phone.account)
    Phones: Phone[] | undefined
}
