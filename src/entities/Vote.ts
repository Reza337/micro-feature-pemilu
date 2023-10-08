import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Pemilus } from "./Pemilu";

@Entity({ name: "votes" })
export class Votes {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => Pemilus, (pemilus) => pemilus.vote, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "pemiluID" })
	selected: Pemilus;
}
