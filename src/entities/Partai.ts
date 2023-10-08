import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Pemilus } from "./Pemilu";

@Entity({ name: "partais" })
export class Partais {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	partainame: string;

	@ManyToOne(() => Pemilus, (pemilus) => pemilus.partai, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "pemiluID" })
	selectedpartai: Pemilus;
}
