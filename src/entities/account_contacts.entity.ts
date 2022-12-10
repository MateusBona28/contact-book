import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.entity";
import { Contact } from "./contact.entity";

@Entity('account_contacts')
export class AccountContact {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined

    @ManyToOne(() => Account)
    account: Account | undefined

    @ManyToOne(() => Contact)
    contact: Contact | undefined

    @CreateDateColumn({ type: 'date' })
    createdAt: Date | undefined
}
