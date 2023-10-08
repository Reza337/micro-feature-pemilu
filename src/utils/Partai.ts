import * as Joi from "joi";

export const createPartaiSchema = Joi.object({
	partainame: Joi.string().required(),
	pemiluID: Joi.number().required(),
});
