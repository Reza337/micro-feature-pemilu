import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Partais } from "../entities/Partai";
import { createPartaiSchema } from "../utils/Partai";

export default new (class VoteService {
	private readonly PartaiRepository: Repository<Partais> =
		AppDataSource.getRepository(Partais);

	async findAll(req: Request, res: Response): Promise<Response> {
		try {
			const partai = await this.PartaiRepository.find({
				relations: {
					selectedpartai: true,
				},
			});
			return res.status(200).json({ message: "Success", data: { partai } });
		} catch (error) {
			return res.status(400).json({ Error: "errow while inserting data" });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error } = createPartaiSchema.validate(data);
			if (error) return res.status(400).json({ error: error });

			const obj = this.PartaiRepository.create({
				partainame: data.partainame,
				selectedpartai: data.pemiluID,
			});

			this.PartaiRepository.save(obj);
			return res.status(200).json({ message: "Success", data: { obj } });
		} catch (error) {
			return res
				.status(500)
				.json({ Error: `Error while updating data ${error.message}` });
		}
	}
})();
