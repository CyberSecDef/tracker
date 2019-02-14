var Sequelize = require('sequelize');
const Lorem = global.sequelize.define('lorem', {
    TEXT: {
        type: Sequelize.STRING
    },
})
module.exports = Lorem;