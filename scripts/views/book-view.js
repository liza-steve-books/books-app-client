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
    // Put event handler on delete button
    $('.detail-container').on('click', '#delete-button', module.Book.destroy);
    // Make a pages call to initiate an update
    $('.detail-container').on('click', '#update-button',
      function () {
        page(`/books/${$(this).data('id')}/update`)
      });
  };

  bookView.initAddNewPage = () => {
    $('.container').hide();
    // Show the showSelector if one was provided
    $('.new-book-view').show();

    // Setup the form submit handler
    $('#new-form').on('submit', bookView.submit);
  };

  bookView.initUpdateFormPage = (id) => {
    console.log('initUpdateFormPage');
    $('.container').hide();
    // Populate form with the goods
    let book = app.Book.all[0];
    $('#update-book-title').val(book.title);
    $('#update-book-author').val(book.author);
    $('#update-image_url').val(book.image_url);
    $('#update-isbn').val(book.isbn);
    $('#update-description-body').val(book.description);
    // Show the showSelector if one was provided
    $('.update-book-view').show();

    // Setup the form submit handler
    $('#update-form').on('submit', function (e) {
      e.preventDefault();
      let updatedBook = {
        book_id: id,
        title: $('#update-book-title').val(),
        author: $('#update-book-author').val(),
        image_url: $('#update-image_url').val(),
        isbn: $('#update-isbn').val(),
        description: $('#update-description-body').val()
      };
      // Do it
      app.Book.update(updatedBook);
    });
  };

  bookView.submit = (e) => {
    e.preventDefault();
    let book = new app.Book({
      author: $('#book-author').val(),
      title: $('#book-title').val(),
      isbn: $('#isbn').val(),
      image_url: $('#image_url').val(),
      description: $('#description-body').val()
    });
    book.insertBook();
  };

  module.bookView=bookView;
})(app);