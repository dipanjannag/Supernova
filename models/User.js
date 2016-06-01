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
var User = sequelize.define('User', {
	name : Sequelize.STRING,
	email : { type: Sequelize.STRING, primaryKey: true},
	mobile : Sequelize.STRING,
	hash : Sequelize.STRING,
	verified_email : Sequelize.BOOLEAN,
	verified_mobile : Sequelize.BOOLEAN,
	session_key : Sequelize.STRING,
	email_code : Sequelize.INTEGER,
	sms_code : Sequelize.INTEGER
});
module.exports = User;
