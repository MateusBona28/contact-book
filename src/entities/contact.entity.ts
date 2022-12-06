import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from './account.entity';


@Entity('contact')
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined

    @Column({ type: 'varchar', length: 50 })
    fullName: string | undefined

    @Column({ type: 'varchar', length: 50 })
    email: string | undefined

    @ManyToOne(() => Account)
    account: Account | undefined

}