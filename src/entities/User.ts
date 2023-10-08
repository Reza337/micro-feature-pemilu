import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	full_name: string;

	@Column()
	email: string;

	@Column({ select: false })
	password: string;

	@Column({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
	})
	created_at: Date;
}
