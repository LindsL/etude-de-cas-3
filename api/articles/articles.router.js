const express = require('express');
const router = express.Router();
const ArticlesController = require('./articles.controller');

router.post('/', ArticlesController.createArticle);
router.put('/:id', ArticlesController.updateArticle);
router.delete('/:id', ArticlesController.deleteArticle);

module.exports = router;