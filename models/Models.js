var Hotel = sequelize.define('Hotel', {
  name: Sequelize.STRING,
  address: Sequelize.TEXT,
  star_rating : Sequelize.INTEGER,
  user_rating : Sequelize.INTEGER,
  amenities : Sequelize.STRING,
  location_lat : Sequelize.DOUBLE,
  location_lon : Sequelize.DOUBLE,
  city_code : Sequelize.INTEGER,
  image_url1 : Sequelize.String,
  image_url2 : Sequelize.String,
  image_url3 : Sequelize.String,
  image_url4 : Sequelize.String,
  image_url5 : Sequelize.String,
  image_url6 : Sequelize.String,
  image_url7 : Sequelize.String,
  image_url8 : Sequelize.String
});


var Room = sequelize.define('Room', {
  hotel_name : Sequelize.STRING,
  type : Sequelize.INTEGER
  start_date : Sequelize.DATE,
  end_date : Sequelize.DATE,
  count : Sequelize.INTEGER,
  tariff : Sequelize.INTEGER
});

var User = sequelize.define('User', {
	name : Sequelize.STRING,
	email : Sequelize.STRING,
	mobile : Sequelize.STRING,
	hash : Sequelize.STRING,
	salt : Sequelize.STRING,
	verified_email : Sequelize.BOOLEAN,
	verified_mobile : Sequelize.BOOLEAN
});


var AdminUser = sequelize.define('AdminUser',{
	email: Sequelize.STRING,
	hash : Sequelize.STRING
})

Hotel.hasMany(Room, {as: 'available_rooms'});
Room.belongsTo(Hotel);
