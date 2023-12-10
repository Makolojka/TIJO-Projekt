const request = require('supertest');
const express = require("express");
import app from '../app';
import User  from '../DAO/userDAO';
import Password from '../DAO/passwordDAO';
beforeEach(async () => {
    // await User.model.deleteMany({});
    // await Password.model.deleteMany({});
});
describe('Create user endpoint', () => {
    it('should create user and respond with 200 status code', async () => {
        const response = await request(app)
            .post('/api/user/create')
            .send({ name: 'TEST4',
                email: 'email4@gmail.com',
                password: 'zaq123!@K'});

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined(); // Isn't undefined?
        expect(response.body).toBeTruthy(); // Isn't null?
    });

    it('should not create user if it already exists', async () => {
        const response = await request(app)
            .post('/api/user/create')
            .send({ name: 'TEST5',
                email: 'email5@gmail.com',
                password: 'zaq123!@K'});

        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post('/api/user/create')
            .send({ name: 'TEST5',
                email: 'email5@gmail.com',
                password: 'zaq123!@K'});

        expect(response2.status).toBe(400);
    });

    it('should not create user and respond with 400 status code for weak password', async () => {
        const response = await request(app)
            .post('/api/user/create')
            .send({ name: 'TEST2',
                email: 'email2@gmail.com',
                password: 'zaq'});

        expect(response.status).toBe(400);
    });
});
