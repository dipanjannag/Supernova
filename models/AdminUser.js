var Sequelize = require('sequelize');
//var sequelize = new Sequelize('mysql://us-cdbr-azure-west-c.cloudapp.net:3306/sledgehammer', 'ba53a0dd1dcbb4', '8241b48e');
//var sequelize = new Sequelize('sledgehammer', 'ba53a0dd1dcbb4', '8241b48e', { host: 'mysql://us-cdbr-azure-west-c.cloudapp.net:3306'})
var sequelize = new Sequelize("sledgehammer", 'ba53a0dd1dcbb4', '8241b48e', {
    host: "us-cdbr-azure-west-c.cloudapp.net",
    dialect: "mysql",
    pool: false
});
var AdminUser = sequelize.define('AdminUser',{
	email: Sequelize.STRING,
	hash : Sequelize.STRING
});
module.exports = AdminUser;
