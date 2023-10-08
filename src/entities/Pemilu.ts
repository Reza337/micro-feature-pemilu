import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	JoinColumn,
} from "typeorm";
import { Votes } from "./Vote";
import { Partais } from "./Partai";

@Entity({ name: "pemilus" })
export class Pemilus {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	name: string;
	@Column()
	visi: string;
	@Column()
	image: string;
	@OneToMany(() => Votes, (votes) => votes.selected, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	vote: Votes[];
	@OneToMany(() => Partais, (partais) => partais.selectedpartai, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	partai: Partais[];
}
