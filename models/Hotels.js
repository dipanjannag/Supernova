var Sequelize = require('sequelize');
//var sequelize = new Sequelize('mysql://us-cdbr-azure-west-c.cloudapp.net:3306/sledgehammer', 'ba53a0dd1dcbb4', '8241b48e');
//var sequelize = new Sequelize('sledgehammer', 'ba53a0dd1dcbb4', '8241b48e', { host: 'mysql://us-cdbr-azure-west-c.cloudapp.net:3306'})
var sequelize = new Sequelize("sledgehammer", 'ba53a0dd1dcbb4', '8241b48e', {
    host: "us-cdbr-azure-west-c.cloudapp.net",
    dialect: "mysql",
    pool: false
});
var Hotel = sequelize.define('Hotel', {
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
	image_uri8 : Sequelize.STRING
});
module.exports = Hotel;
