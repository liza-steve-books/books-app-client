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
    console.log('initIndexPage');
    // Hide the hideSelector if one was provided
    $('.container').hide();
    // Empty out the emptySelector if one was provided
    $('#book-list').empty();
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
    $('#detail-book').empty();
    // Show the showSelector if one was provided
    $('.detail-view').show();

    // Append the book to the detail section inside the book list section
    module.Book.all.map(book => $('#detail-book').append(book.toHtml('#book-detail-template')));
  };

  bookView.initAddNewPage = () => {
    $('.container').hide();
    // Show the showSelector if one was provided
    $('.new-book-view').show();

    // Setup the form submit handler
    $('#new-form').on('submit', bookView.submit);
  };

  bookView.submit = (e) => {
    e.preventDefault();
    let book = new app.Book({
      author: $('#book-author').val(),
      title: $('#book-title').val(),
      isbn: $('#isbn').val(),
      image_url: $('#image-url').val(),
      description: $('#description-body').val()
    });
    book.insertBook(bookView.initIndexPage);
  };

  module.bookView=bookView;
})(app);