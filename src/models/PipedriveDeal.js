const mongoose = require('mongoose');

const PipedriveDealSchema = new mongoose.Schema(
    {
        datacompra: Date,
        dataprevista: Date,
        observacoes: String,
        status: String,
        fornecedor: {
            id: Number,
            nome: String,
            tipopessoa: String,
            cpfcnpj: String,
            ie: String,
            rg: String,
            contribuinte: Number,
            endereco: String,
            endereconro: String,
            complemento: String,
            bairro: String,
            cep: String,
            cidade: String,
            uf: String,
            fone: String,
            celular: String,
            email: String,
        },
        itens: {
            item: {
                codigo: Number,
                descricao: String,
                un: String,
                qtde: Number,
                valor: Number
            }
        },
        parcelas: {
            parcela: {
                nrodias: Number,
                valor: Number,
                obs: String,
                idformapagamento: Number
            }
        },
        transporte: {
            transportador: String,
            freteporconta: String,
            qtdvolumes: Number,
            frete: Number,
        }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);

module.exports = mongoose.model('PipedriveDeal', PipedriveDealSchema);