#!/usr/bin/nodejs
var debug = require('debug')('Supernova');
var app = require('./app');

app.set('port', process.env.PORT || 3030);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
