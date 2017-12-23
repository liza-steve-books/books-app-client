'use strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));

// Fetch a book and display the detailed view
page('/books/:id', ctx => {
  console.log(ctx);
  app.Book.fetchOne(ctx.params.id, app.bookView.initDetailPage);
});

// Initiate the add new form page
page('/new', () => app.bookView.initAddNewPage());

// Fetch a book and Initiate the update form view
page('/books/:id/update', ctx => {
  console.log(`Fetching book ${ctx.params.id} and initiating update form`);
  app.Book.fetchOne(ctx.params.id);
  app.bookView.initUpdateFormPage(ctx.params.id);
});

// Catch all to take user back to home page
page('*', () => {
  console.log('Detected unknown path.');
  app.Book.fetchAll(app.bookView.initIndexPage);
});

page();
