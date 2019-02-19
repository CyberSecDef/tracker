var Sequelize = require('sequelize');
const Packages = global.sequelize.define('packages', {
	id : {
		type : Sequelize.BIGINT,
		primaryKey : true,
        autoIncrement: true,
	},
    name: {
        type: Sequelize.STRING
    },
    acronym: {
        type: Sequelize.STRING
    },
})
module.exports = Packages;