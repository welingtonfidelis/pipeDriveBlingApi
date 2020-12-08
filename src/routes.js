const express = require('express');
const routes = express.Router();

const PipedriveController = require('./controllers/Pipedrive');
const TestController = require('./controllers/Test');

routes.get('/test', TestController.get);

routes.post('/pipedrive', PipedriveController.receiveFromPipe);

module.exports = routes;