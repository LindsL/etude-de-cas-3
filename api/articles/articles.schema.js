const { Schema, model } = require("mongoose");
const articleSchema = Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 120
  },
  content: {
    type: String,
    required: true,
    minlength: 100,
    maxlength: 50000
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft' // on peut définir une valeur par défaut si nécessaire
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

let Article;

module.exports = Article = model("Article", articleSchema);

/*async function test() {
  const articles = await Article.find().populate({
    path: "user",
    select: "-password",
    match: { name: /ben/i },
  });
  console.log(articles.filter((article) => article.user));
}

test();*/