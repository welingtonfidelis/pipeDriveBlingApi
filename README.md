# PipedriveBlingApi

API construida em Node.js, express e MongDB com finalizada de receber dados (via webhook) da plataforma [Pidrive], que a grosso modo, é um sistema CRM. Os dados recebidos na API são tratados, salvos no banco [mongoDB] e enviados para uma segunda API, a fim de gerar dados de pedidos/vendas na plataforma [Bling]. É importante ressaltar que apenas os pedidos dados como ganhos (won) vindo da plataforma [Pipedrive] são processados na API intermediária, apresentanda nesse repositório.

---

## Requisitos
* [Node.js] - versão  ou superior;
* [mongoDB] - uma conexão com banco mongoDB é necessária, podendo ser um banco executando em seu computador ou nuvem (ex.: [mongoDB Atlas]);
* [Pipedrive_webhook] - uma conta cadastrada na plataforma [Pipedrive] e um webhook configurado na mesma plataforma, apontando para uma API externa onde as requisições com alterações de pedidos/vendas serão enviadas;
* [Conta Bling] - criar uma conta na plataforma [Bling] e criar um usuário para acesso à API deles ([API Bling]). O token de acesso deste usuário será utilizado na API deste repositório. **Obs.:** É importante que o usuário criado na plataforma [Bling] possua ao menos permissões de inclusão e edição de pedido de vendas na plataforma.

---

## Instalação
Após clonar este projeto, execute o comando `npm install` para que sejam instaladas as dependências necessárias. 
Crie um segundo arquivo a partir do *.env.example* no (localizado no diretório raiz do projeto) contendo as informações necessárias para envio de dados à API do [Bling] e salvamento de dados no seu banco [mongoDB].
Por fim, execute o comando `npm start` para que a API possa entrar em execução.

---

## Testes
Para testar a API, juntamente com conexão com banco de dados, existem duas rotas para testes, que podem ser utilizadas com um client HTTP, como por exemplo [Postman].

### Criar dados de teste

**URL:** http://localhost:3001/test

**Tipo:** POST

**Parâmetros:**
```
Sem parâmetros
```

**Body:** 
```
Sem body
```

**Retorno:** 
``` 
{
    "ok": true,
    "data": {
        "_id": "5fd1541ddc1021b0729a6a22",
        "name": "Test 1607554077157",
        "createdAt": "2020-12-09T22:47:57.174Z",
        "updatedAt": "2020-12-09T22:47:57.174Z",
        "__v": 0
    }
} 
```

### Listar dados de teste

**URL:** http://localhost:3001/test

**Tipo:** GET

**Parâmetros:**
```
Sem parâmetros
```
**Body:** 
```
Sem body
```

**Retorno:** 
``` 
{
    "ok": true,
    "data": [
        {
            "_id": "5fcffe3a93734dfcfba2ff87",
            "name": "testinho 1607466554239",
            "__v": 0
        },
        {
            "_id": "5fcffef150b733fe2083047f",
            "name": "Olá mundo",
            "__v": 0
        },
    ]
}
```

---

## Utilizando a API
O objetivo desta API é servir de webhook para o recebimento de dados da plataforma [Pipedrive], contudo, para fins de testes, é possível simular a requisição ao webhook com um client HTTP (ex.: [Postman]).
Para ver o restultado da integração desta duas plataformas através da API deste repositório, através da plataforma [Pipedrive] é possível cadastrar vendas/pedidos em negociação e após serem dados como ganho, os dados serão enviados à esta API e em seguida, enviados à plataforma [Bling], onde será possível ver o registro de vendas vindos do [Pipedrive].

### Cadastrar dados de um pedido

**URL:** http://localhost:3001/pipedrive

**Tipo:** POST

**Parâmetros:**
```
Sem parâmetros
```
**Body:** 
```
{
  "v": 1,
  "matches_filters": { "current": [] },
  "meta": {
    "v": 1,
    "action": "updated",
    "object": "deal",
    "id": 2,
    "company_id": 7776550,
    "user_id": 11877328,
    "host": "welingtonfidelis.pipedrive.com",
    "timestamp": 1607990406,
    "timestamp_micro": 1607377518540249,
    "permitted_user_ids": [ 11877328 ],
    "trans_pending": false,
    "is_bulk_update": false,
    "pipedrive_service_name": false,
    "change_source": "app",
    "matches_filters": { "current": [] },
    "webhook_id": "308495"
  },
  "current": {
    "id": 2,
    "creator_user_id": 11877328,
    "user_id": 11877328,
    "person_id": 2,
    "org_id": null,
    "stage_id": 1,
    "title": "Negócio Loja Juju",
    "value": 2500.5,
    "currency": "BRL",
    "add_time": "2020-12-07 21:39:47",
    "update_time": "2020-12-12 00:00:00",
    "stage_change_time": null,
    "active": false,
    "deleted": false,
    "status": "won",
    "probability": null,
    "next_activity_date": null,
    "next_activity_time": null,
    "next_activity_id": null,
    "last_activity_id": null,
    "last_activity_date": null,
    "lost_reason": null,
    "visible_to": "3",
    "close_time": "2020-12-07 21:45:18",
    "pipeline_id": 1,
    "won_time": "2020-12-07 21:45:18",
    "first_won_time": "2020-12-07 21:40:30",
    "lost_time": null,
    "products_count": 0,
    "files_count": 0,
    "notes_count": 0,
    "followers_count": 1,
    "email_messages_count": 0,
    "activities_count": 0,
    "done_activities_count": 0,
    "undone_activities_count": 0,
    "participants_count": 1,
    "expected_close_date": null,
    "last_incoming_mail_time": null,
    "last_outgoing_mail_time": null,
    "label": null,
    "stage_order_nr": 0,
    "person_name": "Loja teste A",
    "org_name": null,
    "next_activity_subject": null,
    "next_activity_type": null,
    "next_activity_duration": null,
    "next_activity_note": null,
    "formatted_value": "R$ 2.500",
    "weighted_value": 2500.5,
    "formatted_weighted_value": "R$ 2.500",
    "weighted_value_currency": "BRL",
    "rotten_time": null,
    "owner_name": "João Doideira",
    "cc_email": "welingtonfidelis+deal2@pipedrivemail.com",
    "org_hidden": false,
    "person_hidden": false
  },
  "previous": {
    "id": 2,
    "creator_user_id": 11877328,
    "user_id": 11877328,
    "person_id": 2,
    "org_id": null,
    "stage_id": 1,
    "title": "Negócio Loja Juju",
    "value": 2500.5,
    "currency": "BRL",
    "add_time": "2020-12-07 21:39:47",
    "update_time": "2020-12-07 21:44:51",
    "stage_change_time": null,
    "active": true,
    "deleted": false,
    "status": "open",
    "probability": null,
    "next_activity_date": null,
    "next_activity_time": null,
    "next_activity_id": null,
    "last_activity_id": null,
    "last_activity_date": null,
    "lost_reason": null,
    "visible_to": "3",
    "close_time": null,
    "pipeline_id": 1,
    "won_time": null,
    "first_won_time": "2020-12-07 21:40:30",
    "lost_time": null,
    "products_count": 0,
    "files_count": 0,
    "notes_count": 0,
    "followers_count": 1,
    "email_messages_count": 0,
    "activities_count": 0,
    "done_activities_count": 0,
    "undone_activities_count": 0,
    "participants_count": 1,
    "expected_close_date": null,
    "last_incoming_mail_time": null,
    "last_outgoing_mail_time": null,
    "label": null,
    "stage_order_nr": 0,
    "person_name": "Loja teste A",
    "org_name": null,
    "next_activity_subject": null,
    "next_activity_type": null,
    "next_activity_duration": null,
    "next_activity_note": null,
    "formatted_value": "R$ 2.500",
    "weighted_value": 2500,
    "formatted_weighted_value": "R$ 2.500",
    "weighted_value_currency": "BRL",
    "rotten_time": null,
    "owner_name": "Welington Fidelis",
    "cc_email": "welingtonfidelis+deal2@pipedrivemail.com",
    "org_hidden": false,
    "person_hidden": false
  },
  "event": "updated.deal",
  "retry": 0
}
```

**Retorno:** 
``` 
{
    "ok": true,
    "data": {
        "created_deal_id": "5fd15582dc1021b0729a6a23",
        "bling_response": {
            "retorno": {
                "pedidoscompra": [
                    {
                        "pedidocompra": {
                            "id": 10505771867,
                            "numeropedido": 23,
                            "mensagens": [
                                {
                                    "mensagem": "O número do seu pedido foi modificado para: 23"
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }
}
```
Obs.: Embora grande parte dos dados não são utilizados na versão atual da API deste repositório, os mesmos são baseados na requisição feita pela API do [Pipedrive].

### Listar pedidos salvos no banco de dados

**URL:** http://localhost:3001/pipedrive/database

**Tipo:** GET

**Parâmetros:**
```
page: Inteiro de mínimo 1
limit: Inteiro de 1 à 100
```
**Body:** 
```
Sem body
```

**Retorno:** 
``` 
{
    "ok": true,
    "total": 23,
    "data": [
        {
            "fornecedor": {
                "id": 10470108791,
                "nome": "Fornecedor teste 1",
                "tipopessoa": "F",
                "cpfcnpj": "01234567890",
                "ie": "607/3714215",
                "rg": "1234567",
                "contribuinte": 9,
                "endereco": "Rua Marques de Souza 1024",
                "endereconro": "",
                "complemento": "",
                "bairro": "São Francisco",
                "cep": "95.703-012",
                "cidade": "Bento Gonçalves",
                "uf": "RS",
                "fone": "(54) 2222-2222",
                "celular": "(54) 92222-2222",
                "email": "emailteste2019@gmail.com"
            },
            "itens": {
                "item": {
                    "codigo": 2,
                    "descricao": "Negócio com Loja teste A ganho",
                    "un": "",
                    "qtde": 1,
                    "valor": 2500.5
                }
            },
            "parcelas": {
                "parcela": {
                    "nrodias": 30,
                    "valor": 2500.5,
                    "obs": "",
                    "idformapagamento": 1326142
                }
            },
            "transporte": {
                "transportador": "Meu transportador 1",
                "freteporconta": "R",
                "qtdvolumes": 1,
                "frete": 0
            },
            "_id": "5fd0072ad6c170076c3bef67",
            "datacompra": "2020-07-12T03:00:00.000Z",
            "dataprevista": "2020-07-12T03:00:00.000Z",
            "observacoes": "Negócio Loja teste A ganho por Welington Fidelis.",
            "createdAt": "2020-12-08T23:07:22.599Z",
            "updatedAt": "2020-12-08T23:07:22.599Z",
            "__v": 0
        },
    ]
}
```

### Listar informações de um pedido específico (por id)

**URL:** http://localhost:3001/pipedrive/database/{id_do_pedido}

**Tipo:** GET

**Parâmetros:**
```
Sem parâmetros
```
**Body:** 
```
Sem body
```

**Retorno:** 
``` 
{
    "ok": true,
    "data": {
        "fornecedor": {
            "id": 10470108791,
            "nome": "Fornecedor teste 1",
            "tipopessoa": "F",
            "cpfcnpj": "01234567890",
            "ie": "607/3714215",
            "rg": "1234567",
            "contribuinte": 9,
            "endereco": "Rua Marques de Souza 1024",
            "endereconro": "",
            "complemento": "",
            "bairro": "São Francisco",
            "cep": "95.703-012",
            "cidade": "Bento Gonçalves",
            "uf": "RS",
            "fone": "(54) 2222-2222",
            "celular": "(54) 92222-2222",
            "email": "emailteste2019@gmail.com"
        },
        "itens": {
            "item": {
                "codigo": 2,
                "descricao": "Negócio com Loja teste A ganho",
                "un": "",
                "qtde": 1,
                "valor": 2500.5
            }
        },
        "parcelas": {
            "parcela": {
                "nrodias": 30,
                "valor": 2500.5,
                "obs": "",
                "idformapagamento": 1326142
            }
        },
        "transporte": {
            "transportador": "Meu transportador 1",
            "freteporconta": "R",
            "qtdvolumes": 1,
            "frete": 0
        },
        "_id": "5fd01a4a086b7e25d0c32643",
        "datacompra": "2020-10-12T03:00:00.000Z",
        "dataprevista": "2020-10-12T03:00:00.000Z",
        "observacoes": "Negócio Loja Juju ganho por João Doideira.",
        "status": "won",
        "createdAt": "2020-12-09T00:28:58.953Z",
        "updatedAt": "2020-12-09T00:28:58.953Z",
        "__v": 0
    }
}
```

### Cadastrar total (valor) de vendas de uma data

**URL:** http://localhost:3001/deal/total

**Tipo:** POST

**Parâmetros:**
```
page: Inteiro de mínimo 1
limit: Inteiro de 1 à 100
```
**Body:** 
```
Sem body
```

**Retorno:** 
```
{
    "ok": true,
    "data": [
        {
            "_id": "5fd02ba8cc1eaf41436a95c8",
            "value": 10000,
            "date": "2020-12-09T02:00:00.000Z",
            "createdAt": "2020-12-09T01:43:04.751Z",
            "updatedAt": "2020-12-09T01:56:08.409Z",
            "__v": 0
        },
        {
            "_id": "5fd02bba30406541826f1ee3",
            "value": 2500,
            "date": "2020-12-09T02:00:00.000Z",
            "createdAt": "2020-12-09T01:43:22.247Z",
            "updatedAt": "2020-12-09T01:43:22.247Z",
            "__v": 0
        }
    ]
}
```

### Listar informações sobre total de vendas

**URL:** http://localhost:3001/deal/total

**Tipo:** POST

**Parâmetros:**
```
Sem parâmetros
```
**Body:** 
```
{
    "value": 1200.5,
    "date": "2020/12/25 00:00:00"
}
```

**Retorno:** 
```
{
    "ok": true,
    "data": {
        "total_deal_id": "5fd0b01c30fdf5a60ac80dc3"
    }
} 
```

### Listar informações sobre total de vendas (por id)

**URL:** http://localhost:3001/deal/total/{id_do_pedido}

**Tipo:** GET

**Parâmetros:**
```
Sem parâmetros
```
**Body:** 
```
Sem body
```

**Retorno:** 
``` 
{
    "ok": true,
    "data": {
        "fornecedor": {
            "id": 10470108791,
            "nome": "Fornecedor teste 1",
            "tipopessoa": "F",
            "cpfcnpj": "01234567890",
            "ie": "607/3714215",
            "rg": "1234567",
            "contribuinte": 9,
            "endereco": "Rua Marques de Souza 1024",
            "endereconro": "",
            "complemento": "",
            "bairro": "São Francisco",
            "cep": "95.703-012",
            "cidade": "Bento Gonçalves",
            "uf": "RS",
            "fone": "(54) 2222-2222",
            "celular": "(54) 92222-2222",
            "email": "emailteste2019@gmail.com"
        },
        "itens": {
            "item": {
                "codigo": 2,
                "descricao": "Negócio com Loja teste A ganho",
                "un": "",
                "qtde": 1,
                "valor": 2500.5
            }
        },
        "parcelas": {
            "parcela": {
                "nrodias": 30,
                "valor": 2500.5,
                "obs": "",
                "idformapagamento": 1326142
            }
        },
        "transporte": {
            "transportador": "Meu transportador 1",
            "freteporconta": "R",
            "qtdvolumes": 1,
            "frete": 0
        },
        "_id": "5fd01a4a086b7e25d0c32643",
        "datacompra": "2020-10-12T03:00:00.000Z",
        "dataprevista": "2020-10-12T03:00:00.000Z",
        "observacoes": "Negócio Loja Juju ganho por João Doideira.",
        "status": "won",
        "createdAt": "2020-12-09T00:28:58.953Z",
        "updatedAt": "2020-12-09T00:28:58.953Z",
        "__v": 0
    }
}
```

### Listar informações sobre total de vendas entre datas

**URL:** http://localhost:3001/deal/total

**Tipo:** GET

**Parâmetros:**
```
date_start: 2020/12/01
date_end: 2020/12/25
```
**Body:** 
```
Sem body
```

**Retorno:** 
``` 
{
    "ok": true,
    "data": [
        {
            "_id": "5fd0b01c30fdf5a60ac80dc3",
            "value": 3145,
            "date": "2020-12-13T17:00:00.000Z",
            "createdAt": "2020-12-09T11:08:12.130Z",
            "updatedAt": "2020-12-09T23:01:10.551Z",
            "__v": 0
        }
    ]
}
```

[Neste link] é possível baixar a collection do [Postman] com as rotas mostradas acima. 

---

## Contato
welingtonfidelis@gmail.com

Sugestões e pull requests são sempre bem vindos. 🤓

[Bling]: <https://www.bling.com.br/>
[Pipedrive]: <https://www.pipedrive.com/>
[mongoDB]: <https://www.mongodb.com/>
[mongoDB Atlas]: <https://www.mongodb.com/cloud/atlas>
[API Bling]: <https://ajuda.bling.com.br/hc/pt-br/articles/360046937853-Introdu%C3%A7%C3%A3o-para-a-API-do-Bling-para-desenvolvedores->
[Node.js]: <https://nodejs.org/en/>
[Pipedrive_webhook]: <https://pipedrive.readme.io/docs/guide-for-webhooks>
[Conta Bling]: <https://www.bling.com.br/inscricao/plano-mercurio>
[Postman]: <https://www.postman.com/downloads/>
[Neste link]: <https://drive.google.com/file/d/17ayxSqGB65yq8Gx5a_JY3uud5hYw1-Cs/view?usp=sharing>