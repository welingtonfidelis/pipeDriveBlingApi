const Joi = require('joi');

module.exports = Joi.object({
    date_start: Joi.date()
        .required(),

    date_end: Joi.date()
});