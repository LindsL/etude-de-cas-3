const Article = require('./article.schema');

async function createArticle(data, user) {
    const article = new Article({
        ...data,
        author: user._id,
        created_at: new Date(),
        last_modified: new Date(),
        status: 'draft',
        updated_at: new Date(),
        user: user,
    });

    await article.save();
    socket.send(article);

    return article;
}

async function updateArticle(id, data, user) {
    if (user.role !== 'admin') throw new Error('Unauthorized');

    const article = await Article.findById(id);

    if (!article) throw new Error('Article not found');

    article.title = data.title;
    article.author = user._id;
    article.description = data.description;
    article.body = data.body;
    article.last_modified = new Date();
    article.status = data.status;
    article.updated_at = new Date();
    article.user = user;

    await article.save();
    socket.send(article);

    return article;
}

async function deleteArticle(id, user) {
    if (user.role !== 'admin') throw new Error('Unauthorized');

    const article = await Article.findById(id);

    if (!article) throw new Error('Article not found');

    await article.remove();
    socket.send({ _id: id, action: 'delete' });

    return article;
}

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
};