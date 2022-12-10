import { DataSource } from "typeorm"
import "dotenv/config"
import { Account } from "./entities/account.entity"
import { Phone } from "./entities/phone.entity"
import { Contact } from "./entities/contact.entity"
import { AccountContact } from "./entities/account_contacts.entity"

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    logging: false,
    synchronize: true,
    entities: [Account, Phone, Contact, AccountContact]
    }
)

export default AppDataSource
