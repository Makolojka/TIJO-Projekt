import TokenDAO from "../DAO/tokenDAO";

const request = require('supertest');
const express = require("express");
import app from '../app';
import User  from '../DAO/userDAO';
import Password from '../DAO/passwordDAO';
import Ticket from '../DAO/ticketDAO';
import Artist from '../DAO/artistDAO';
import Event from '../DAO/eventDAO';
beforeEach(async () => {
    await User.model.deleteMany({});
    await Password.model.deleteMany({});
    await Ticket.model.deleteMany({});
    await Password.model.deleteMany({});
    await Artist.model.deleteMany({});
    await Event.model.deleteMany({});
});
describe('Create user endpoint', () => {
    it('should create user and respond with 200 status code', async () => {
        // Arrange
        const userData = {
            name: 'TEST',
            email: 'email@gmail.com',
            password: 'zaq123!@K'
        };

        //Act
        const response = await request(app)
            .post('/api/user/create')
            .send(userData);

        //Assert
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined(); // Isn't undefined?
        expect(response.body).toBeTruthy(); // Isn't null?
    });

    it('should not create user if it already exists', async () => {
        // Arrange
        const userData = {
            name: 'TEST',
            email: 'email@gmail.com',
            password: 'zaq123!@K'
        };

        //Act
        await request(app)
            .post('/api/user/create')
            .send(userData);

        const response2 = await request(app)
            .post('/api/user/create')
            .send(userData);

        //Assert
        expect(response2.status).toBe(400);
    });

    it('should not create user and respond with 400 status code for weak password', async () => {
        // Arrange
        const userData = {
            name: 'TEST',
            email: 'email@gmail.com',
            password: 'weakp'
        };

        // Arrange
        const response = await request(app)
            .post('/api/user/create')
            .send(userData);

        // Assert
        expect(response.status).toBe(400);
    });
});
describe('User Authentication/Login Endpoint', () => {
    it('should authenticate a user with valid credentials', async () => {
        // Arrange
        const userData = {
            name: 'TEST',
            email: 'email@gmail.com',
            password: 'zaq123!@K'
        };

        const validCredentials = {
            login: 'TEST',
            password: 'zaq123!@K'
        };

        // Act
        await request(app)
            .post('/api/user/create')
            .send(userData);

        const response = await request(app)
            .post('/api/user/auth')
            .send(validCredentials);

        // Assert
        expect(response.status).toBe(200); //User logged in
        expect(response.body).toHaveProperty('token');
    });

    it('should return an error for invalid credentials', async () => {
        // Arrange
        const userData = {
            name: 'TEST',
            email: 'email@gmail.com',
            password: 'zaq123!@K'
        };

        const invalidCredentials = {
            login: 'TEST',
            password: 'qwerty'
        };


        // Act
        await request(app)
            .post('/api/user/create')
            .send(userData);

        const response = await request(app)
            .post('/api/user/auth')
            .send(invalidCredentials);

        // Assert
        expect(response.status).toBe(401); //Unauthorized
    });
});

describe('Logout user', () => {
    it('should logout user and respond with 200 status code', async () => {
        // Arrange
        const userData = {
            name: 'TEST',
            email: 'email@gmail.com',
            password: 'zaq123!@K'
        };

        const validCredentials = {
            login: 'TEST',
            password: 'zaq123!@K'
        };

        // Act
        const createdUser = await request(app)
            .post('/api/user/create')
            .send(userData);
        const { id: userId } = createdUser.body;

        const loginSession = await request(app)
            .post('/api/user/auth')
            .send(validCredentials);
        const { token } = loginSession.body;

        const response = await request(app)
            .delete(`/api/user/logout/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        // Assert
        expect(response.status).toBe(200);
    });
});

describe('Users cart - Add ticket(s) to cart', () => {
    it('should add ticket to user cart and respond with 200 status code', async () => {
        // Arrange
        // Create ticket
        const ticketDetails = {
            type: 'Auto Moto Fiesta',
            price: 129,
            dayOfWeek: 'sobota-niedziela',
            date: '12-13.08.2023',
        };
        const createdTicket = await request(app)
            .post(`/api/events/ticket`)
            .send(ticketDetails);
        const { id: ticketId } = createdTicket.body;

        // Create event
        const eventDetails = {
            title: 'Auto Moto Fiesta',
            image: 'https://www.ebilet.pl/media/cms/media/d0lkjovd/amf_poster_going_552x736-b45e835c-cbc7-00fe-b9cc-d46a8c80f7e8.webp',
            text: 'Pierwszy Festiwal Muzyczno – Motoryzacyjny...',
            additionalText: 'Festiwal łączy...',
            organiser: 'Good Show',
            tickets: [ticketId],
            date: '12-13.08.2023',
            location: 'Kielce',
            category: ['Muzyka', 'Inne'],
            subCategory: ['Rock', 'Metal'],
            views: 0
        };
        const createdEvent = await request(app)
            .post('/api/event')
            .send(eventDetails);
        const { id: eventId } = createdEvent.body;


        const userData = {
            name: 'TEST',
            email: 'email@gmail.com',
            password: 'zaq123!@K'
        };
        const createdUser = await request(app)
            .post('/api/user/create')
            .send(userData);
        const { id: userId } = createdUser.body;

        // Authenticate the user
        const loginCredentials = {
            login: 'TEST',
            password: 'zaq123!@K',
        };
        const loginResponse = await request(app)
            .post('/api/user/auth')
            .send(loginCredentials);
        const token = loginResponse.body.token;


        // Act
        const response = await request(app)
            .post(`/api/user/${userId}/cart/add-ticket/${eventId}/${ticketId}`)
            .set('Authorization', "Bearer "+token)
            .send({ quantity: 2 });

        // Assert
        expect(createdTicket.status).toBe(200);
        expect(createdEvent.status).toBe(200);
        expect(response.status).toBe(200);
        // expect(response.body.user).toHaveProperty('cart');
        // expect(response.body).toHaveProperty('success', true);
        // expect(response.body).toHaveProperty('user');

    });
});