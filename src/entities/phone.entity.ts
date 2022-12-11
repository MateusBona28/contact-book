import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contact } from './contact.entity';


@Entity('phone')
export class Phone {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined

    @Column({ type:'varchar', length: 2 })
    ddd: string | undefined

    @Column({ type:'varchar', length: 9 })
    number: string | undefined

    @ManyToOne(() => Contact)
    contact: Contact | undefined

}