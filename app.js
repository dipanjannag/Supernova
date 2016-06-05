var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var UserSchema = require('./models/User');
var HotelSchema = require('./models/Hotels');
var HallSchema = require('./models/Halls');
var ConfSchema = require('./models/ConfHall');
var RoomSchema = require('./models/Room');
var AdminSchema = require('./models/AdminUser');
var BookingSchema = require('./models/Bookings');
var routes = require('./routes/index');
var users = require('./routes/users');
var hotels = require('./routes/hotels');
var halls = require('./routes/halls');
var conf_halls = require('./routes/confHalls');
var book = require('./routes/bookings');
var rooms = require('./routes/rooms');
var partner_accept = require('./routes/pertnerAccept');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/hotels', hotels);
app.use('/rooms', rooms);
app.use('/book', book);
app.use('/halls', halls);
app.use('/conf_halls', conf_halls);
app.use('/call_partner', partner_accept);

UserSchema.sync().then(function () {
   HotelSchema.sync().then(function(){
    RoomSchema.sync().then(function(){
				BookingSchema.sync().then(function(){
					AdminSchema.sync().then(function(){
					// hard schema creation complete
					/*UserSchema.create({
						name : "Sample",
						email : "foo@bar.com",
						mobile : "1234567890",
						hash : "abcd",
						verified_email : false,
						verified_mobile : false,
						session_key : "pqrs"
					});*/
					AdminSchema.create({
						email: "ad@min",
						hash : "pqrs",
						session_key : "pqrs"
					});
					HallSchema.sync().then(function(){
						ConfSchema.sync().then(function(){})
					});
					/*HotelSchema.create({name: "502 Fortune Heights", city_code:1}).then(function(htl){
							
						RoomSchema.create({type : 1, HotelId : htl.id, count: 4}).then(function(rm){
							htl.setAvailable_rooms(rm).then(function(rms){
								
							});
							//htl.getAvailable_rooms().then(function(rms){ console.log(rms.name); });
							rm.getHotel().then(function(rms){console.log("check this"); console.log(rms.id);});
							htl.getAvailable_rooms().then(function(rms){
								//console.log(type(rms));
								for (var i = 0; i < rms.length; i++){
									console.log("trying id");
									console.log(rms[i].id);
								}
							});
						});
					});*/
				});
			});
		});
  });
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    /*res.render('error', {
        message: err.message,
        error: {}
    });*/
	res.json({ message: 'Not Found', code : 404 });
});


module.exports = app;
