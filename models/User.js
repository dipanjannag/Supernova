var Sequelize = require('sequelize');
//var sequelize = new Sequelize('mysql://us-cdbr-azure-west-c.cloudapp.net:3306/sledgehammer', 'ba53a0dd1dcbb4', '8241b48e');
//var sequelize = new Sequelize('sledgehammer', 'ba53a0dd1dcbb4', '8241b48e', { host: 'mysql://us-cdbr-azure-west-c.cloudapp.net:3306'})
var sequelize = new Sequelize("sledgehammer", 'ba53a0dd1dcbb4', '8241b48e', {
    host: "us-cdbr-azure-west-c.cloudapp.net",
    dialect: "mysql",
    pool: false
});
var User = sequelize.define('User', {
	name : Sequelize.STRING,
	email : Sequelize.STRING,
	mobile : Sequelize.STRING,
	hash : Sequelize.STRING,
	verified_email : Sequelize.BOOLEAN,
	verified_mobile : Sequelize.BOOLEAN
});
module.exports = User;
