'use strict';

var app = app || {};

(function(module){

  var bookView = {};

  // bookView.hideEmptyShow = (hideSelector, emptySelector, showSelector) => {
  //   // Hide the hideSelector if one was provided
  //   $(hideSelector).hide();
  //   // Empty out the emptySelector if one was provided
  //   $(emptySelector).empty();
  //   // Show the showSelector if one was provided
  //   $(showSelector).show();
  // };

  bookView.initIndexPage = () => {
    // Hide the hideSelector if one was provided
    $('.container').hide();
    // Empty out the emptySelector if one was provided
    $('.book-vew').empty();
    // Show the showSelector if one was provided
    $('.book-view').show();

    // Set total books
    $('.book-count').text(app.Book.all.length);

    // Append all books to index.html
    module.Book.all.forEach(book => $('#book-list').append(book.toHtml('#book-list-template')));
  };

  bookView.initDetailPage = () => {
    // Hide the hideSelector if one was provided
    $('.container').hide();
    // Empty out the emptySelector if one was provided
    $('.detail-vew').empty();
    // Show the showSelector if one was provided
    $('.detail-view').show();

    // Append the book to the detail section inside the book list section
    module.Book.all.map(book => $('#detailed-book').append(book.toHtml("#book-detail-template")));
  };

  // bookView.initAddNewPage = () => {
  //   module.bookView.hideEmptyShow('.container', null, '.new-book-view');

  //   // Setup the form submit handler
  //   module.bookView.prepareFormHandler();
  // };

  module.bookView=bookView;
})(app);