import * as express from "express";
import PemiluController from "../controllers/PemiluController";
import upload from "../middlewares/multer";
import VoteCotroller from "../controllers/VoteCotroller";
import PartaiController from "../controllers/PartaiController";
import UserController from "../controllers/UserController";
import { authenticate } from "../middlewares/Auth";

const router = express.Router();
router.get("/paslons", authenticate, PemiluController.find);
router.get("/paslon/:id", authenticate, PemiluController.findOne);
router.post(
	"/paslon",
	authenticate,
	upload.single("image"),
	PemiluController.create
);
router.patch(
	"/paslon/:id",
	authenticate,
	upload.single("image"),
	PemiluController.update
);
router.delete("/paslon/:id", authenticate, PemiluController.delete);

router.get("/votes", authenticate, VoteCotroller.find);
router.post("/vote", authenticate, VoteCotroller.create);

router.get("/partais", authenticate, PartaiController.find);
router.post("/partai", authenticate, PartaiController.create);

router.post("/auth/register", UserController.register);
router.post("/auth/login", UserController.login);
router.get("/auth/check", authenticate, UserController.check);

export default router;
