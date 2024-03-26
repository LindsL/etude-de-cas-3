const ArticleService = require('./articles.service');

async function createArticle(req, res) {
    try {
        const article = await ArticleService.createArticle(req.body, req.user);
        res.status(201).json(article);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function updateArticle(req, res) {
    try {
        const article = await ArticleService.updateArticle(req.params.id, req.body, req.user);
        res.status(200).json(article);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function deleteArticle(req, res) {
    try {
        const article = await ArticleService.deleteArticle(req.params.id, req.user);
        res.status(200).json(article);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
};