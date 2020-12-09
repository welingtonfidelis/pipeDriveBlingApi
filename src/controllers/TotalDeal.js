const js2xmlparser = require("js2xmlparser");
const axios = require('axios');
const utils = require('../utils');
const validateSchema = require('../services/validateSchema');
const schemaGet = require('../services/schemas/pipedrive/get');
const schemaShow = require('../services/schemas/pipedrive/show');

const TotalDeal = require('../models/TotalDeal');

module.exports = {
    async index(req, res) {
        try {
            const selectedTotalDeal = await TotalDeal.find();

            res.json({ ok: true, data: selectedTotalDeal });

        } catch (error) {
            utils.errorResponse(res, error);
        }
    },

    async showByDate(req, res) {
        try {
            const { date } = req.query;

            const selectedTotalDeal = await findByDate(date);

            res.json({ ok: true, data: selectedTotalDeal });

        } catch (error) {
            utils.errorResponse(res, error);
        }
    },

    async create(req, res) {
        try {
            const { value, date } = req.body;

            const data = {}
            const totalDealSelected = await findByDate(date);

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

const findByDate = async (date) => {
    const start = new Date(date);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);

    const end = new Date(date);
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);

    const totalDealByDay = await TotalDeal.findOne({date: { $gte: start, $lte: end }});

    return totalDealByDay;
}