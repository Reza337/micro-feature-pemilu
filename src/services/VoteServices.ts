import { Repository } from "typeorm";
import { Votes } from "../entities/Vote";
import { AppDataSource } from "../data-source";
import { createVotesSchema } from "../utils/Vote";
import { Request, Response } from "express";

export default new (class VoteService {
	private readonly VoteRepository: Repository<Votes> =
		AppDataSource.getRepository(Votes);

	async findAll(req: Request, res: Response): Promise<Response> {
		try {
			const vote = await this.VoteRepository.find({
				relations: {
					selected: true,
				},
			});
			return res.status(200).json({ message: "Success", data: { vote } });
		} catch (error) {
			return res.status(400).json({ Error: "errow while inserting data" });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error } = createVotesSchema.validate(data);
			if (error) return res.status(400).json({ error: error });

			const obj = this.VoteRepository.create({
				name: data.name,
				selected: data.pemiluID,
			});

			this.VoteRepository.save(obj);
			return res.status(200).json({ message: "Success", data: { obj } });
		} catch (error) {
			return res
				.status(500)
				.json({ Error: `Error while updating data ${error.message}` });
		}
	}
})();
