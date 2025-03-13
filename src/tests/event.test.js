const request = require('supertest');
const app = require('../app');

describe('Event API', () => {
    it('should create an event', async () => {
        const res = await request(app).post('/api/events').send({
            name: 'Test Event',
            description: 'This is a test event',
            category: 'Meeting',
            date: '2025-12-12T10:00:00Z',
            reminder: true
        });

        expect(res.statusCode).toBe(201);
    });
});
