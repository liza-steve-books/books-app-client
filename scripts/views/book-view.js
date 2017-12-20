'use strict';

var app = app || {};

(function(module){

  var bookView = {};

  bookView.initIndexPage = () => {

    var template = Handlebars.compile($('#book-template').text());

    $('.container').hide();
    $('.task-view').show();

    // Set total books
    $('.book-count').text(app.Book.all.length);

    // Append all books to index.html
    app.Book.all.forEach(book => $('#books').append(book.toHtml()));
  };

  module.bookView=bookView;
})(app);