import Joi from 'joi';

const itemSchema = Joi.object({
    name: Joi.string().required(),
    length: Joi.number().min(0).required(),
    width: Joi.number().min(0).required(),
    height: Joi.number().min(0).required(),
    quantity: Joi.number().min(1).required(),
    fragility: Joi.string().valid("unbreakable", "semi-fragile", "fragile").required(),
});

const packaging = Joi.object({
    items: Joi.array().items(itemSchema).required(),
    maxSuggestions: Joi.number().min(1).optional(),
});

export = {
    packaging,
}
