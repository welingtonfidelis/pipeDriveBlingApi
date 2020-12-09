const express = require('express');
const routes = express.Router();

const TestController = require('./controllers/Test');
const PipedriveController = require('./controllers/Pipedrive');
const TotalDealController = require('./controllers/TotalDeal');

routes.get('/test', TestController.get);
routes.post('/test', TestController.create);

routes.post('/pipedrive', PipedriveController.receiveFromPipe);
routes.get('/pipedrive/database', PipedriveController.index);
routes.get('/pipedrive/database/:id', PipedriveController.show);

routes.get('/deal/total', TotalDealController.index);
routes.get('/deal/total/date', TotalDealController.showByDate);
routes.get('/deal/total/:id', TotalDealController.show);
routes.post('/deal/total', TotalDealController.create);

module.exports = routes;