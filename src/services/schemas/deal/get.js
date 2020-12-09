const Joi = require('joi');

module.exports = Joi.object({
    page: Joi.number()
        .integer()
        .min(1),

    limit: Joi.number()
        .integer()
        .min(0)
        .max(100)
});