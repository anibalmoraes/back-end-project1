import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"
import { User } from "./Users"


@Entity("contacts")
class Contact {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, (user) => user.contacts, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user: User;

    @Column()
    userId: string;
}

export { Contact }