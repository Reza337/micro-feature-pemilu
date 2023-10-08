import { Request, Response } from "express";
import VoteService from "../services/VoteServices";

export default new (class VoteController {
	find(req: Request, res: Response) {
		VoteService.findAll(req, res);
	}

	create(req: Request, res: Response) {
		VoteService.create(req, res);
	}
})();
