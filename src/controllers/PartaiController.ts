import { Request, Response } from "express";
import PartaiService from "../services/PartaiService";

export default new (class PartaiController {
	find(req: Request, res: Response) {
		PartaiService.findAll(req, res);
	}

	create(req: Request, res: Response) {
		PartaiService.create(req, res);
	}
})();
