const express = require('express');
const articlesService = require('../articles/articles.service');
const { ArticlesController } = require('./articles.controller');
const router = express.Router();

const articlesController = new ArticlesController(articlesService);

router.post('/', articlesController.createArticle);
router.put('/:id', articlesController.updateArticle);
router.delete('/:id', articlesController.deleteArticle);

module.exports = router;

