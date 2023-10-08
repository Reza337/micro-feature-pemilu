import { Request, Response } from "express";
import PemiluService from "../services/PemiluService";

export default new (class PemiluController {
	find(req: Request, res: Response) {
		PemiluService.findAll(req, res);
	}

	findOne(req: Request, res: Response) {
		PemiluService.findOne(req, res);
	}

	create(req: Request, res: Response) {
		PemiluService.create(req, res);
	}

	update(req: Request, res: Response) {
		PemiluService.update(req, res);
	}

	delete(req: Request, res: Response) {
		PemiluService.delete(req, res);
	}
})();
