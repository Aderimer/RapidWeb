require('dotenv').config();
const express = require('express');
const userRoutes = require('../routes/auth');
const request = require('supertest');
const cookieParser = require('cookie-parser')

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
app.use(cookieParser());

app.use('/users', userRoutes);

const testUser = {
    "email": "fakemail@testuser.com",
    "username": "TestUser1337",
    "password": "password123"
}

const adminUser = {
    "email": process.env.ADMIN_EMAIL,
    "username": process.env.ADMIN_USERNAME,
    "password": process.env.ADMIN_PASSWORD
}
JSON.stringify(adminUser);

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
        expect(body.data.role).toBe('Rookie')
        expect(body.data).toHaveProperty('token')
        expect(body.data).toHaveProperty('id')
        token = body.data.token;
        userId = body.data.id;
    })

    test('POST /logout - success', async () => {
        const response = await request(app).post('/users/logout').set('Cookie', `jwt=${token}`).send(testUser);
        
        const cookies = response.headers['set-cookie'];

        expect(cookies).toBeDefined();
        const jwtCookie = cookies.find(c => c.startsWith('jwt='));

        expect(jwtCookie).toMatch(/Expires=Thu, 01 Jan 1970 00:00:00 GMT/); // Expire date set when cookie gets deleted
    })

    test('POST /login to admin - success', async () => {
        const response = await request(app).post('/users/login').send(adminUser);
        console.log(response.text)
            expect(response.data.statusCode).toBe(200)
            expect(response.data.role).toBe('Admin')
            expect(response.data).toHaveProperty('token')
            expect(response.data).toHaveProperty('id')
            token = body.data.token;
            userId = body.data.id;
    })
    
    test('PUT /admin/roles/edit', async () => {
        const { body } = await request(app).post('/admin/roles/edit').send({
            id: userId
        })
    })

})