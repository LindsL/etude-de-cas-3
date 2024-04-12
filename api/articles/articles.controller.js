const io = require('socket.io');
const ArticlesService = require('./articles.service');

class ArticlesController {
    constructor(articlesService, io) {
        this.articlesService = articlesService;
        this.io = io;
    }

    async createArticle(req, res) {
        try {
            const article = await this.articlesService.createArticle(req.body, req.user);
            this.io.emit("article_created", article);
            res.status(201).json(article);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }


    async updateArticle(req, res) {
        try {
            const article = await this.articlesService.updateArticle(req.params.id, req.body, req.user);
            this.io.emit("article_updated", article);
            res.status(200).json(article);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async deleteArticle(req, res) {
        try {
            const article = await this.articlesService.deleteArticle(req.params.id, req.user);
            this.io.emit("article_deleted", article);
            res.status(200).json(article);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}
const articlesController = new ArticlesController(ArticlesService, io);

module.exports = {
    ArticlesController,
};

