const express = require('express');
const articlesService = require('../articles/articles.service');
const { ArticlesController } = require('./articles.controller');
const authMiddleware = require("../../middlewares/auth")
const router = express.Router();

const articlesController = new ArticlesController(articlesService);

router.post("/user/:id", authMiddleware, articlesController.createArticle);
router.put("/:id", authMiddleware, articlesController.updateArticle);
router.delete("/:id", authMiddleware, articlesController.deleteArticle);

module.exports = router;

