const express = require('express');
const eventRouter = require('../routes/events');
const request = require('supertest');

const app = express();

app.use('/events', eventRouter);



describe('testing user CRUD operations', () => {
    test('GET / - success', async () => {
        const { body } = await request(app).get('/');
    })
})