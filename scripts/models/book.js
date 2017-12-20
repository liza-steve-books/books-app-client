'use strict';

var app = app || {};

(function (module){
  //var __API_URL__ = 'https://ag-sh-booklist.herokuapp.com';
  var __API_URL__ = 'http://localhost:3000';

  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
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
    $.get(`${__API_URL__}/api/v1/books`)
      .then(results => {
        Book.loadAll(results);
        callback();
      })
  };

  module.Book=Book;
})(app);