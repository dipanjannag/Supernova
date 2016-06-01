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
var AdminUser = sequelize.define('AdminUser',{
	email: Sequelize.STRING,
	hash : Sequelize.STRING,
	session_key : Sequelize.STRING
});
module.exports = AdminUser;
