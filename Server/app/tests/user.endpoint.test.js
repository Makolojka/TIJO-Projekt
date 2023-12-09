const request = require('supertest');
const express = require("express");
import app from '../app';
describe('Create user endpoint', () => {
    it('should create user and respond with 200 status code', async () => {
        const response = await request(app)
            .post('/api/user/create')
            .send({ name: 'TEST3',
                email: 'email3@gmail.com',
                password: 'zaq123!@K'});

        expect(response.status).toBe(200);
    });
    it('should not create user and respond with 400 status code', async () => {
        const response = await request(app)
            .post('/api/user/create')
            .send({ name: 'TEST2',
                email: 'email2@gmail.com',
                password: 'zaq'});

        expect(response.status).toBe(400);
    });
});
