const request = require('supertest');
const app = require('../server.js');
const mongoose = require('mongoose');
const TestModel = require('../models/Test');

describe('Test', () => {
    afterAll(async () => {
        await TestModel.collection.drop();

        await mongoose.connection.close();
    });

    test("It should response the POST method", () => {
        return request(app)
            .post('/test')
            .expect(200);
    });

    test("It should response the GET method", () => {
        return request(app)
            .get('/test')
            .expect(200);
    });
});
