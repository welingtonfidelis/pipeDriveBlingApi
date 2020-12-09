const utils = require('../utils');
const validateSchema = require('../services/validateSchema');
const schemaGetByDate = require('../services/schemas/deal/getByDate');
const schemaCreate = require('../services/schemas/deal/create');
const schemaGet = require('../services/schemas/deal/get');
const schemaShow = require('../services/schemas/deal/show');

const TotalDeal = require('../models/TotalDeal');

module.exports = {
    async index(req, res) {
        try {
            const { page = 1, limit = 2 } = req.query;

            validateSchema.validate(schemaGet, req.query);

            const selectedTotalDeal = await TotalDeal
                .find()
                .skip((page - 1) * limit)
                .limit(parseInt(limit));

            res.json({ ok: true, data: selectedTotalDeal });

        } catch (error) {
            utils.errorResponse(res, error);
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;

            validateSchema.validate(schemaShow, req.params);

            const selectedTotalDeal = await TotalDeal.findOne({ _id: id });

            res.json({ ok: true, data: selectedTotalDeal });

        } catch (error) {
            utils.errorResponse(res, error);
        }
    },

    async showByDate(req, res) {
        try {
            const { date_start, date_end } = req.query;

            validateSchema.validate(schemaGetByDate, req.query);

            const selectedTotalDeal = await findByDate(date_start, date_end || date_start);

            res.json({ ok: true, data: selectedTotalDeal });

        } catch (error) {
            utils.errorResponse(res, error);
        }
    },

    async create(req, res) {
        try {
            const { value, date } = req.body;

            validateSchema.validate(schemaCreate, req.body);

            const data = {}
            const [totalDealSelected] = await findByDate(date, date);

            if(totalDealSelected) {
                data.total_deal_id = totalDealSelected._id;

                await TotalDeal.updateOne(
                    { _id: totalDealSelected._id }, 
                    { value: value + totalDealSelected.value }
                );
            }
            else {
                const { _id } = await TotalDeal.create({
                    value,
                    date
                });

                data.total_deal_id = _id;
            }

            if(res) res.json({ ok: true, data });

        } catch (error) {
            utils.errorResponse(res, error);
        }
    },
}

const findByDate = async (dateStart, dateEnd) => {
    const start = new Date(dateStart);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);

    const end = new Date(dateEnd);
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);

    const totalDealByDay = await TotalDeal.find({date: { $gte: start, $lte: end }});

    return totalDealByDay;
}