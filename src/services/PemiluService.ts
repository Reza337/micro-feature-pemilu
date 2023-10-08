import { Repository } from "typeorm";
import { Pemilus } from "../entities/Pemilu";
import { AppDataSource } from "../data-source";
import { createPemiluSchema, updatePemiluSchema } from "../utils/Pemilu";
import { Request, Response } from "express";
import cloudinary from "../utils/Cloudinary";

export default new (class PemiluService {
	private readonly PemiluRepository: Repository<Pemilus> =
		AppDataSource.getRepository(Pemilus);

	async findAll(req: Request, res: Response): Promise<Response> {
		try {
			const pemilus = await this.PemiluRepository.find({
				relations: ["vote", "partai"],
			});
			return res.status(200).json({ message: "Success", data: { pemilus } });
		} catch (error) {
			return res
				.status(400)
				.json({ Error: `errow while inserting data ${error.message}` });
		}
	}

	async findOne(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);
			const findID = await this.PemiluRepository.findOne({
				where: { id },
				relations: ["vote", "partai"],
			});
			if (!findID) return res.status(404).json({ Error: "ID Not Found" });

			return res.status(200).json(findID);
		} catch (error) {
			return res.status(400).json({ Error: "errow while inserting data" });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error } = createPemiluSchema.validate(data);
			if (error) return res.status(400).json({ error: error });

			const result = await cloudinary.uploader.upload(req.file.path, {
				folder: "Pemilu",
			});

			const obj = this.PemiluRepository.create({
				name: data.name,
				visi: data.visi,
				image: result.secure_url,
			});

			this.PemiluRepository.save(obj);
			return res.status(200).json(obj);
		} catch (error) {
			return res
				.status(500)
				.json({ Error: `Error while updating data ${error.message}` });
		}
	}

	async update(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);
			const data = req.body;

			const pemiluToUpdate = await this.PemiluRepository.findOne({
				where: { id },
			});

			if (!pemiluToUpdate) {
				return res.status(404).json({ Error: "ID Not Found" });
			}

			if (req.file) {
				const result = await cloudinary.uploader.upload(req.file.path, {
					folder: "Pemilu",
				});
				data.image = result.secure_url;
			} else if (!data.image) {
				data.image = pemiluToUpdate.image;
			}

			// Validasi data
			const { error } = updatePemiluSchema.validate(data);
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}

			// Update data pemilu
			pemiluToUpdate.name = data.name;
			pemiluToUpdate.visi = data.visi;
			pemiluToUpdate.image = data.image;

			// Simpan perubahan ke dalam database
			const updatedPemilu = await this.PemiluRepository.save(pemiluToUpdate);

			return res.status(200).json(updatedPemilu);
		} catch (error) {
			return res
				.status(500)
				.json({ Error: `Error while updating data ${error.message}` });
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		try {
			const id = parseInt(req.params.id);
			const pemiluToDelete = await this.PemiluRepository.findOne({
				where: { id },
			});
			if (!pemiluToDelete)
				return res.status(404).json({ Error: "ID Not Found" });

			const deletePemilu = await this.PemiluRepository.delete(pemiluToDelete);
			return res.status(200).json(deletePemilu);
		} catch (error) {
			return res.status(500).json({ Error: "Error while updating data" });
		}
	}
})();
