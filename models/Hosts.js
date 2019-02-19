var Sequelize = require('sequelize');
const Hosts = global.sequelize.define('hosts', {
	id : {
		type : Sequelize.BIGINT,
		primaryKey : true,
        autoIncrement: true,
	},
    packageId : {
        type : Sequelize.BIGINT,
        allowNull : false,
    },
    hostname: {
        type: Sequelize.STRING
    },
    ip: {
        type: Sequelize.STRING,
        allowNull: true
    },
    mac: {
        type: Sequelize.STRING,
        allowNull: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: true
    },
    vendor: {
        type: Sequelize.STRING,
        allowNull: true
    },
    model: {
        type: Sequelize.STRING,
        allowNull: true
    },
    firmware: {
        type: Sequelize.STRING,
        allowNull: true
    },
    building: {
        type: Sequelize.STRING,
        allowNull: true
    },
    room: {
        type: Sequelize.STRING,
        allowNull: true
    },
    
})
module.exports = Hosts;