var config = require('../config/dbConfig.js')
var Sequelize = require('sequelize');
//var sequelize = new Sequelize('mysql://us-cdbr-azure-west-c.cloudapp.net:3306/sledgehammer', 'ba53a0dd1dcbb4', '8241b48e');
//var sequelize = new Sequelize('sledgehammer', 'ba53a0dd1dcbb4', '8241b48e', { host: 'mysql://us-cdbr-azure-west-c.cloudapp.net:3306'})
var sequelize = new Sequelize(config.connection_str,{
  dialectOptions: {
    timeout: 30
  },
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
});
var ConfHall = sequelize.define('ConfHall', {
  name: Sequelize.STRING,
  address: Sequelize.TEXT,
  star_rating : Sequelize.INTEGER,
  user_rating : Sequelize.INTEGER,
  amenities : Sequelize.STRING,
  location_lat : Sequelize.DOUBLE,
  location_lon : Sequelize.DOUBLE,
  city_code : Sequelize.INTEGER,
	image_uri1 : Sequelize.STRING,
	image_uri2 : Sequelize.STRING,
	image_uri3 : Sequelize.STRING,
	image_uri4 : Sequelize.STRING,
	image_uri5 : Sequelize.STRING,
	image_uri6 : Sequelize.STRING,
	image_uri7 : Sequelize.STRING,
	image_uri8 : Sequelize.STRING,
	min_price : Sequelize.INTEGER,
	call_in_number : Sequelize.STRING,
	veg_min_price : Sequelize.INTEGER,
	non_veg_min_price : Sequelize.INTEGER,
	capacity : Sequelize.INTEGER
});
module.exports = ConfHall;
