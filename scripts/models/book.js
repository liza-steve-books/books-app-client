'use strict';

var app = app || {};

(function (module){
  var __API_URL__ = 'https://lo-sc-booklist.herokuapp.com';
  // var __API_URL__ = 'http://localhost:3000';
  Book.all = [];

  function Book(rawDataObj) {
    Object.keys(rawDataObj).map(key => this[key] = rawDataObj[key]);
  }

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  Book.prototype.toHtml = function(templateSelector) {
    var template = Handlebars.compile($(templateSelector).text());
    return template(this);
  };

  Book.prototype.insertBook = function() {
    $.post(`${__API_URL__}/api/v1/books`, this)
      .then(console.log)
      .then(() => page('/'))
      .catch(errorCallback);
  };

  // Function to create/sort all books from returned database rows objects
  Book.loadAll = dbRows => {
    // Sort database rows by title case-insensitive and create Books
    Book.all = dbRows.sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
      .map(ele => new Book(ele));
  };

  Book.fetchAll = callback => {
    // Make the api call, then cascade return values into all the
    // .then calls as arguments. The .catch function will only be
    // called in the event of an error.
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
  };

  Book.fetchOne = (book_id, callback) => {
    // Fetch one book from the database and load it into Book.all
    $.get(`${__API_URL__}/api/v1/books/${book_id}`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
  };

  Book.destroy = function (e) {
    e.preventDefault();
    // Delete a book from the db given the primary id
    let book_id = $(this).attr('data-id');
    console.log(book_id);
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${book_id}`,
      method: 'DELETE'
    })
      .then(() => console.log(`Deleting book with id:${book_id}`))
      .then(() => page('/'))
      .catch(console.error);
  };

  Book.update = function (updatedBook) {
    console.log('Updating book to:');
    console.log(updatedBook);
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${updatedBook.book_id}`,
      method: 'PUT',
      data: updatedBook
    }).then(page('/'));
  };

  module.Book=Book;
})(app);
