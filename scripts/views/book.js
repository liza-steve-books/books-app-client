'use strict';

var app = app || {};

(function (module){
  //__API_URL__ = 'https://ag-sh-booklist.herokuapp.com';
  __API_URL__ = 'http://localhost:3000';

  function Book(rawDataObj) {
      Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }
  
  Book.all = [];
  
  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-template').text());

    return template(this);
  };

  Book.loadAll = rawData => {
    Book.all = rawData.map(ele => new Book(ele));
  };

  Book.fetchAll = callback => {
    $.get('/api/v1/books')
      .then(results => {
        Book.loadAll(results);
        callback();
      })
  };

  Book.prototype.insertRecord = function(callback) {
      $.post('/api/v1/books', {author: this.author, title: this.title, isbn: this.isbn, image_url: this.image_url, description: this.description})
        .then(console.log)
        .then(callback);
    };

  //Maybe later?
  // Book.truncateTable = callback => {
  //   $.ajax({
  //     url: '/api/v1/books',
  //     method: 'DELETE',
  //   })
  //     .then(console.log)
  //     .then(callback);
  // };

  // Maybe later?  
  // Book.prototype.updateRecord = function(callback) {
  //   $.ajax({
  //     url: `/api/v1/books/${this.article_id}`,
  //     method: 'PUT',
  //     data: {
  //       author: this.author,
  //       authorUrl: this.authorUrl,
  //       body: this.body,
  //       category: this.category,
  //       publishedOn: this.publishedOn,
  //       title: this.title,
  //       author_id: this.author_id
  //     }
  //   })
  //     .then(console.log)
  //     .then(callback);
  // };

  // Maybe later?
  // Book.prototype.deleteRecord = function(callback) {
  //   $.ajax({
  //     url: `/api/v1/books/${this.book_id}`,
  //     method: 'DELETE'
  //   })
  //     .then(console.log)
  //     .then(callback);
  // };


  module.Book=Book;
})(app);