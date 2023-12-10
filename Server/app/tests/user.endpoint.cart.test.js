// const request = require('supertest');
// const express = require("express");
// import app from '../app';
// import User  from '../DAO/userDAO';
// import Password from '../DAO/passwordDAO';
// import Ticket from '../DAO/ticketDAO';
// import Artist from '../DAO/artistDAO';
// import Event from '../DAO/eventDAO';
// beforeEach(async () => {
//     await User.model.deleteMany({});
//     await Password.model.deleteMany({});
//     await Ticket.model.deleteMany({});
//     await Password.model.deleteMany({});
//     await Artist.model.deleteMany({});
//     await Event.model.deleteMany({});
// });
// describe('Users cart - Add ticket(s) to cart', () => {
//     it('should add ticket to user cart and respond with 200 status code', async () => {
//         // Arrange
//         // Create ticket
//         const ticketDetails = {
//             type: 'Auto Moto Fiesta',
//             price: 129,
//             dayOfWeek: 'sobota-niedziela',
//             date: '12-13.08.2023',
//         };
//         const createdTicket = await request(app)
//             .post(`/api/events/ticket`)
//             .send(ticketDetails);
//         const { id: ticketId } = createdTicket.body;
//
//         // Create event
//         const eventDetails = {
//             title: 'Auto Moto Fiesta',
//             image: 'https://www.ebilet.pl/media/cms/media/d0lkjovd/amf_poster_going_552x736-b45e835c-cbc7-00fe-b9cc-d46a8c80f7e8.webp',
//             text: 'Pierwszy Festiwal Muzyczno – Motoryzacyjny...',
//             additionalText: 'Festiwal łączy...',
//             organiser: 'Good Show',
//             tickets: [ticketId],
//             date: '12-13.08.2023',
//             location: 'Kielce',
//             category: ['Muzyka', 'Inne'],
//             subCategory: ['Rock', 'Metal'],
//             views: 0
//         };
//         const createdEvent = await request(app)
//             .post('/api/event')
//             .send(eventDetails);
//         const { id: eventId } = createdEvent.body;
//
//
//         const userData = {
//             name: 'TEST',
//             email: 'email@gmail.com',
//             password: 'zaq123!@K'
//         };
//         const createdUser = await request(app)
//             .post('/api/user/create')
//             .send(userData);
//         const { id: userId } = createdUser.body;
//
//         // Authenticate the user
//         const loginCredentials = {
//             login: 'TEST',
//             password: 'zaq123!@K',
//         };
//         const loginResponse = await request(app)
//             .post('/api/user/auth')
//             .send(loginCredentials);
//         const token = loginResponse.body.token;
//
//
//         // Act
//         const response = await request(app)
//             .post(`/api/user/${userId}/cart/add-ticket/${eventId}/${ticketId}`)
//             .set('Authorization', "Bearer "+token)
//             .send({ quantity: 2 });
//
//         // Assert
//         expect(createdTicket.status).toBe(200);
//         expect(createdEvent.status).toBe(200);
//         expect(response.status).toBe(200);
//         // expect(response.body.user).toHaveProperty('cart');
//         // expect(response.body).toHaveProperty('success', true);
//         // expect(response.body).toHaveProperty('user');
//
//     });
// });