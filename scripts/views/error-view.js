'use strict';

var app = app || {};

(function (module) {
  const errorView = {};

  errorView.initErrorPage = function(err) {
    // Hide everything
    $('.container').hide();
    // Show the error view
    $('.error-view').show();
    $('#error-message').empty();
    let template = Handlebars.compile($('#error-template').text());
    $('#error-message').append(template(err));
  };

  module.errorView = errorView;
})(app);