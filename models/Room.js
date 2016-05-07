var Sequelize = require('sequelize');
//var sequelize = new Sequelize('mysql://us-cdbr-azure-west-c.cloudapp.net:3306/sledgehammer', 'ba53a0dd1dcbb4', '8241b48e');
//var sequelize = new Sequelize('sledgehammer', 'ba53a0dd1dcbb4', '8241b48e', { host: 'mysql://us-cdbr-azure-west-c.cloudapp.net:3306'})
var sequelize = new Sequelize("sledgehammer", 'ba53a0dd1dcbb4', '8241b48e', {
    host: "us-cdbr-azure-west-c.cloudapp.net",
    dialect: "mysql",
    pool: false
});
var Hotel = require('./Hotels');
var Room = sequelize.define('Room', {
  hotel_name : Sequelize.STRING,
  type : Sequelize.INTEGER,
  start_date : Sequelize.DATE,
  end_date : Sequelize.DATE,
  count : Sequelize.INTEGER
}) ;

Hotel.hasMany(Room, {as: 'available_rooms'});
Room.belongsTo(Hotel);
module.exports = Room;
