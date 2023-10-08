import * as Joi from "joi";

export const createVotesSchema = Joi.object({
	name: Joi.string().required(),
	pemiluID: Joi.number().required(),
});
