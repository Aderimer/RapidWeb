const express = require('express');
const userRoutes = require('../routes/auth');
const request = require('supertest');

// db syncing
const db = require('../models');

beforeAll(async () => {
    await db.sequelize.sync({ force: false })
})

afterAll(async () => {
    await db.sequelize.close();
});

const app = express();

app.use(express.json())

app.use('/users', userRoutes);

const testUser = {
    "email": "fakemail@testuser.com",
    "username": "TestUser1337",
    "password": "password123"
}

describe('testing user CRUD operations', () => {
    test('POST /signup - success', async () => {
        const { body } = await request(app).post('/users/signup').send(testUser);
        expect(body.data.statusCode).toBe(200)
        expect(body.data.newUser).toBe("TestUser1337")
    })

    test('POST /signup - duplicate user', async () => {
    const { body } = await request(app).post('/users/signup').send(testUser);
        expect(body.data.message).toBe('A user with that email already exists.')
        expect(body.data.statusCode).toBe(400)
    })

    test('POST /login - wrong password', async () => {
        const { body } = await request(app).post('/users/login').send({
            "email": testUser.email,
            "password": "wrongPassword"
        })
        expect(body.status).toBe('fail')
        expect(body.data.result).toBe('Incorrect email or password.')
    })

    let token;
    let userId;
    test('POST /login - success', async () => {
        const { body } = await request(app).post('/users/login').send(testUser);
        expect(body.data.statusCode).toBe(200)
        token = body.data.token;
        userId = body.data.id;
    })

})