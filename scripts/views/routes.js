'use strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/:id', ctx => app.Book.fetchOne(ctx.params.id, app.bookView.initDetailPage));
// page('/add', () => app.bookView.initAddNewPage());

// Catch all to take user back to home page
// Doesn't work currently
page('*', () => {
  console.log('Detected unknown path.');
  app.Book.fetchAll(app.bookView.initIndexPage);
});

page();