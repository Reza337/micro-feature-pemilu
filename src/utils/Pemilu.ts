import * as Joi from "joi";

export const createPemiluSchema = Joi.object({
	name: Joi.string().required().min(10),
	visi: Joi.string().min(10),
	image: Joi.string(),
});

export const updatePemiluSchema = Joi.object({
	name: Joi.string().min(10),
	visi: Joi.string().min(10),
	image: Joi.string(),
});
