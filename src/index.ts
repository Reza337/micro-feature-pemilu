import * as express from "express";
import { AppDataSource } from "./data-source";
import router from "./routes";
import * as cors from "cors";
const dotenv = require("dotenv");

AppDataSource.initialize()
	.then(async () => {
		dotenv.config();
		const app = express();
		const port = process.env.APP_PORT;

		const options: cors.CorsOptions = {
			allowedHeaders: [
				"Origin",
				"X-Requested-With",
				"Content-Type",
				"Accept",
				"X-Access-Token",
			],
			credentials: true,
			methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
			// origin: API_URL,
			preflightContinue: false,
		};

		app.use(cors(options));

		app.use(express.json());
		app.use("/api/v1", router);
		app.options("*", cors(options));

		app.listen(port, () => console.log(`Server started on port ${port}`));
	})
	.catch((error) => console.log(error));
