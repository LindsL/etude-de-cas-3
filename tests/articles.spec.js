const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');
const User = require('../api/users/users.model');
const Article = require('../api/articles/articles.schema');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/my-database');
    await User.deleteMany();
    await Article.deleteMany();
});

mongoose.connect('mongodb://localhost:27017/my-database').then(() => {
    mongoose.set('bufferCommands', false);
});

jest.setTimeout(35000);

describe('POST /api/articles/user/:id', () => {
    
    it('devrait créer un nouvel article', async () => {
        const user = new User({
            name: ' Utilisateur test',
            email: 'test#@example.com',
            password: 'password123'
        });

        const response = await request(app)
            .post(`/api/articles/user/${user._id}`)
            .send({
                title: 'Article Test',
                content:  `Ceci est un article test. Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua.`
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'Article Test');
        expect(response.body).toHaveProperty('content',  `Ceci est un article test. Lorem ipsum 
        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  ut labore
        et dolore magna aliqua.`);
    });
});

describe('PUT /api/articles/:id', () => {
    it('devrait mettre à jour l\'article ', async () => {
        const user = new User({
            name: ' Utilisateur test2',
            email: 'test2@example.com',
            password: 'password123'
        });
        await user.save();

        const article = new Article({
            user: user._id,
            title: 'Article Test ',
            content:  `Ceci est un article test.Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua.`
        });
        await article.save();

        const response = await request(app)
            .put(`/api/articles/${article._id}`)
            .send({
                title: 'Updated Test Article',
                content:  `Ceci est un article test mise à jour.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua.`
            })

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Article Test Mis A Jour');
        expect(response.body).toHaveProperty('content', `Ceci est un article test mise à jour.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
        ut labore et dolore magna aliqua.`);
    });
});

describe('DELETE /api/articles/:id', () => {
    it('devrait supprimer l\'article', async () => {
        const user = new User({
            name: ' Utilisateur test3',
            email: 'test3@example.com',
            password: 'password123'
        });
        await user.save();
        const article = new Article({
            user: user._id,
            title: 'Article Test',
            content: `Ceci est un article test.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua.`
        });
        await article.save();
        const response = await request(app)
            .delete(`/api/articles/${article._id}`);
        expect(response.status).toBe(204);
    });
});

