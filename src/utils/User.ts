import * as Joi from "joi";

export const registerPemiluSchema = Joi.object().keys({
	full_name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required().min(8).max(15),
});

export const loginPemiluSchema = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});
