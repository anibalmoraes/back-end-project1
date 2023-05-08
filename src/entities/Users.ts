import { hashSync } from "bcryptjs";
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm"
import { Contact } from "./Contacts"

@Entity("users")
class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: "" })
    telephone: string;

    @Column({ select: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }

    @CreateDateColumn()
    created_at: Date

    @OneToMany(() => Contact, (contact) => contact.user, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    contacts: Contact[];
}

export { User }
