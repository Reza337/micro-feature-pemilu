import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import { loginPemiluSchema, registerPemiluSchema } from "../utils/User";
import * as jwt from "jsonwebtoken";
const dotenv = require("dotenv");

export default new (class AuthService {
	private readonly authRepository: Repository<User> =
		AppDataSource.getRepository(User);

	async register(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error, value } = registerPemiluSchema.validate(data);

			if (error) {
				return res.status(500).json({ error: error.details[0].message });
			}

			const checkEmail = await this.authRepository.count({
				where: { email: value.email },
			});

			if (checkEmail > 0)
				return res.status(404).json({
					error: "Email is already taken",
				});

			const password = await bcrypt.hash(value.password, 10);

			const user = this.authRepository.create({
				full_name: value.full_name,
				email: value.email,
				password: password,
			});

			const createdUser = await this.authRepository.save(user);
			return res.status(200).json({
				message: "User created successfully",
				user: createdUser,
			});
		} catch (error) {
			return res.status(400).json({ Error: "errow while created data" });
		}
	}

	async login(req: Request, res: Response): Promise<Response> {
		try {
			dotenv.config();
			const data = req.body;

			const { error, value } = loginPemiluSchema.validate(data);

			if (error) {
				return res.status(500).json({ error: error.details[0].message });
			}

			const checkEmail = await this.authRepository.findOne({
				where: { email: value.email },
				select: ["id", "full_name", "email", "password"],
			});

			if (!checkEmail) {
				return res.status(404).json({
					error: "Email is not registered",
				});
			}

			const isPasswordValid = await bcrypt.compare(
				value.password,
				checkEmail.password
			);

			if (!isPasswordValid) {
				return res.status(404).json({
					error: "Password is incorrect",
				});
			}

			const user = this.authRepository.create({
				id: checkEmail.id,
				full_name: checkEmail.full_name,
				email: checkEmail.email,
			});

			const token = jwt.sign({ user }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});

			return res.status(200).json({
				user,
				token,
			});
		} catch (error) {
			return res
				.status(500)
				.json({ Error: `Error while inserting data ${error.message}` });
		}
	}

	async check(req: Request, res: Response): Promise<Response> {
		try {
			const loginSession = res.locals.loginSession;

			const user = await this.authRepository.findOne({
				where: { id: loginSession.user.id },
			});

			return res.status(200).json({
				user,
				message: "Token is valid",
			});
		} catch (error) {
			return res.status(500).json({ Error: `Something in wrong in server` });
		}
	}
})();
