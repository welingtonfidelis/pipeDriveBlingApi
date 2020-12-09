const Joi = require('joi');

module.exports = Joi.object({
    date: Joi.date()
        .required(),

    value: Joi.number()
        .required()
});