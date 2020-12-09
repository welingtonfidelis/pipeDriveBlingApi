const TestModel = require('../models/Test');
const utils = require('../utils');

module.exports = {
    async get(_, res) {
        try {
            const selectedTest = await TestModel.find();

            res.json({ ok: true, data: selectedTest });
        } catch (error) {
            utils.errorResponse(res, error);
        }
    },

    async create(req, res) {
        try {
            const createdTest = await TestModel.create({
                name: `Test ${new Date().getTime()}`
            });

            res.json({ ok: true, data: createdTest });

        } catch (error) {
            utils.errorResponse(res, error);
        }
    }
}