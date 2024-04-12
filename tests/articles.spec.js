const request = require('supertest');
const { Server } = require('../server');
const app = require('../server')
const User = require('../api/users/users.model');
const Article = require('../api/articles/articles.schema');

jest.setTimeout(35000);

beforeEach(async () => {
    await User.deleteMany();
    await Article.deleteMany();
});

describe('POST /api/articles/user/:id', () => {
    it('devrait créer un nouvel article', async () => {
        const user = new User({ name: ' Utilisateur test' });
        await user.save();

        const response = await request(app)
            .post(`/api/articles/user/${user._id}`)
            .send({ title: 'Article Test', body: 'Ceci est un article test.' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'Article Test');
        expect(response.body).toHaveProperty('body', 'Ceci est un article test.');
    });
});

describe('PUT /api/articles/:id', () => {
    it('devrait mettre à jour l\'article ', async () => {
        const user = new User({ name: 'Test User' });
        await user.save();

        const article = new Article({ user: user._id, title: 'Article Test ', body: 'Ceci est un article test.' });
        await article.save();

        const response = await request(app)
            .put(`/api/articles/${article._id}`)
            .send({ title: 'Updated Test Article', body: 'Ceci est un article test mis à jour.' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Article Test Mis A Jour');
        expect(response.body).toHaveProperty('body', 'Ceci est un article test mise à jour.');
    });
});

describe('DELETE /api/articles/:id', () => {
    it('devrait supprimer l\'article', async () => {
        const user = new User({ name: 'Test User' });
        await user.save();

        const article = new Article({ user: user._id, title: 'Test Article', body: 'This is a test article.' });
        await article.save();

        const response = await request(app)
            .delete(`/api/articles/${article._id}`);

        expect(response.status).toBe(204);
    });
});

