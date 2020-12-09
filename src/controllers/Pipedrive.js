const js2xmlparser = require("js2xmlparser");
const axios = require('axios');
const utils = require('../utils');
const validateSchema = require('../services/validateSchema');
const schemaGet = require('../services/schemas/pipedrive/get');
const schemaShow = require('../services/schemas/pipedrive/show');

const TotalDeal = require('../controllers/TotalDeal');

const PipedriveDeal = require('../models/PipedriveDeal');

const API_URL_BLING = process.env.API_URL_BLING;
const API_KEY_BLING = process.env.API_KEY_BLING;
const statusEnum = module.exports = Object.freeze({
    'won': {
        pt_BR: 'ganho'
    },
    'open': {
        pt_BR: 'aberto'
    }
});

module.exports = {
    async receiveFromPipe(req, res) {
        try {
            console.log('START ====> \n', req.body, '\n <==== END');

            let data = {}
            const { current = {} } = req.body;
            const {
                id, title, value, update_time,
                status, person_name, owner_name
            } = current;

            if (status === 'won') {
                const obj = {
                    datacompra: utils.dateTimeToDate(update_time),
                    dataprevista: utils.dateTimeToDate(update_time),
                    observacoes: `${title} ${statusEnum[status]['pt_BR']} por ${owner_name}.`,
                    status,
                    fornecedor: {
                        id: '10470108791',
                        nome: 'Fornecedor teste 1',
                        tipopessoa: 'F',
                        cpfcnpj: '01234567890',
                        ie: '607/3714215',
                        rg: '1234567',
                        contribuinte: 9,
                        endereco: 'Rua Marques de Souza 1024',
                        endereconro: '',
                        complemento: '',
                        bairro: 'São Francisco',
                        cep: '95.703-012',
                        cidade: 'Bento Gonçalves',
                        uf: 'RS',
                        fone: '(54) 2222-2222',
                        celular: '(54) 92222-2222',
                        email: 'emailteste2019@gmail.com',
                    },
                    itens: {
                        item: {
                            codigo: id,
                            descricao: `Negócio com ${person_name} ${statusEnum[status]['pt_BR']}`,
                            un: '',
                            qtde: 1,
                            valor: (value).toFixed(2)
                        }
                    },
                    parcelas: {
                        parcela: {
                            nrodias: 30,
                            valor: (value).toFixed(2),
                            obs: '',
                            idformapagamento: 1326142
                        }
                    },
                    transporte: {
                        transportador: 'Meu transportador 1',
                        freteporconta: 'R',
                        qtdvolumes: 1,
                        frete: (0.0).toFixed(2),
                    }
                }

                const xml = js2xmlparser.parse("pedidocompra", obj);

                const response = await axios.post(
                    `${API_URL_BLING}/pedidocompra/json`,
                    {},
                    { 
                        params: {
                            apikey: API_KEY_BLING,
                            xml
                        }
                    }
                );

                data = response.data || response
                const { _id: created_deal_id } = await PipedriveDeal.create(obj);
                
                TotalDeal.create({ body: { value, date: update_time } }, null);

                data = { created_deal_id, bling_response: data }
            }

            res.json({ ok: true, data });

        } catch (error) {
            utils.errorResponse(res, error);
        }
    },

    async index(req, res) {
        try {
            const { page = 1, limit = 2 } = req.query;

            validateSchema.validate(schemaGet, req.query);

            const countDeal = await PipedriveDeal.countDocuments();
            const selectedDeal = await PipedriveDeal
                .find()
                .skip((page - 1) * limit)
                .limit(parseInt(limit));

            res.json({ ok: true, total: countDeal, data: selectedDeal });

        } catch (error) {
            utils.errorResponse(res, error);
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;

            validateSchema.validate(schemaShow, req.params);

            const selectedDeal = await PipedriveDeal.findOne({ _id: id });

            res.json({ ok: true, data: selectedDeal });

        } catch (error) {
            utils.errorResponse(res, error);
        }
    }
}