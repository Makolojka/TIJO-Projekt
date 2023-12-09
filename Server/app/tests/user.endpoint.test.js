const request = require('supertest');
const express = require('express');
const userEndpoints = require('../REST/user.endpoint');
const business = require('../DAO/userDAO');
const app = express();
// Mock dependencies
jest.mock('../DAO/userDAO', () => ({
    getUserManager: jest.fn(() => ({
        authenticate: jest.fn(),
    })),
}));

// Endpoint testing
describe('Authentication Endpoint', () => {
    it('should authenticate user and return token for valid credentials', async () => {
        business.getUserManager().authenticate.mockResolvedValue('mockedToken');

        const response = await request(app)
            .post('/api/user/auth')
            .send({ login: 'validUser', password: 'validPassword' });

        expect(response.status).toBe(200);
        expect(response.body.token).toBe('mockedToken');
    });

    // it('should return error for invalid credentials', async () => {
    //     business.getUserManager().authenticate.mockRejectedValue(new Error('Unauthorized'));
    //
    //     const response = await request(app)
    //         .post('/api/user/auth')
    //         .send({ login: 'invalidUser', password: 'invalidPassword' });
    //
    //     expect(response.status).toBe(401);
    //     expect(response.body.error).toBe('Unauthorized'); // Adjust this based on the error message you send
    //     // Add more assertions for error handling
    // });
});
