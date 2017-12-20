'use strict';

var app = app || {};

(function(module){

  var bookView = {};

  bookView.initIndexPage = () => {
    // Hide all content since everything has the container class
    $('.container').hide();
    // Show the book view content
    $('.book-view').show();

    // Set total books
    $('.book-count').text(app.Book.all.length);

    // Append all books to index.html
    app.Book.all.forEach(book => $('#book-list').append(book.toHtml()));

    bookView.setDetails();
  };

  bookView.setDetails = () => {
    $('.book-item').on('click','button.detail' , function(e){
      e.preventDefault();
    }
  )
  };

  module.bookView=bookView;
})(app);

$(() => app.Book.fetchAll(app.bookView.initIndexPage));