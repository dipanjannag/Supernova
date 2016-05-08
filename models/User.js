var Sequelize = require('sequelize');
//var sequelize = new Sequelize('mysql://us-cdbr-azure-west-c.cloudapp.net:3306/sledgehammer', 'ba53a0dd1dcbb4', '8241b48e');
//var sequelize = new Sequelize('sledgehammer', 'ba53a0dd1dcbb4', '8241b48e', { host: 'mysql://us-cdbr-azure-west-c.cloudapp.net:3306'})
var sequelize = new Sequelize("mysql://bc4bb1c95fb526:1bb83737@eu-cdbr-west-01.cleardb.com/heroku_77aece663186b1b?reconnect=true",{
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
});
module.exports = User;
