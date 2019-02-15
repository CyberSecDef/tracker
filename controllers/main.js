var path = require('path');

module.exports = {
	index(req, res, next) {
		res.render('index', { title: 'Express', menuHome : 'active' });
	}
}


