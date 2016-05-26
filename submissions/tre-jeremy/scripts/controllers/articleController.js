(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENTs: What does this method do?  What is it's execution path?
  //The execution path starts with routes.js.
  //Once it gets called the findWhere method gets called, which gets sql articles.
  articlesController.loadById = function(ctx, next) {
    //Loads all the articles by the Id.
    var articleData = function(article) {
    //Creates a function that uses an article as a parameter.
    //sets a property on the ctx object setting it equal to the article parameter.
      ctx.articles = article;
      next();
    //goes to the next callback in the chain if there is one.
    };

    Article.findWhere('id', ctx.params.id, articleData);
    //uses our created method on the article object.
    //pushing in the parameters of 'id', ctx.params and articleData as a callback.
    //article data gets passed in as the callback.
  };

  // COMMENTs: What does this method do?  What is it's execution path?
  articlesController.loadByAuthor = function(ctx, next) {
  //loads all articles by the author selected in the filter from the database.
  //the execution path is that the route.js picks up on the selection (line 16)
  //and fires the leadByAuthor method, which then loads all the articles from that on the database.
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();

    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
    //replaces any spaces in the authors name with a plus sign.
    //uses the ctx object to pass the author name from the filter selection to the sql query.
  };

  // COMMENTs: What does this method do?  What is it's execution path?
  //see above, replace author with category.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENTs: What does this method do?  What is it's execution path?
//  Loads all the articles from the DB
  articlesController.loadAll = function(ctx, next) {
// this defines the method to set articles.all from the context object property set below
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      //if article.all has items, add articles property to ctx and set equal to
      ctx.articles = Article.all;
      next();
    } else {
  //  If nothing in Article.all, call fetchall() to use SQL requests from DB to get all the articles
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
