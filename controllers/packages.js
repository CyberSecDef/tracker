var path = require('path');

module.exports = {
	index(req, res, next) {
        let pkgs = [];
		req.app.locals.models.Packages.sync({force: false}).then(() => { 
			req.app.locals.models.Packages.findAll().then(pkg => { 
				pkg.forEach(p => {
					pkgs.push(p);
				})
			}).then( () => {
                res.render('pages/packages/index', { 
                    app: req.app, 
                    title: 'Express',  
                    menuPackages : 'active',
                    pkgs : pkgs
                });
            });
        });
	},
    add(req, res, next){
        if(req.body.name){
            req.app.locals.models.Packages.create({     
                name: req.body.name,
            });
            res.sendStatus(200)
        }
        
    },
    delete(req, res, next){
        if(req.body.id){
            req.app.locals.models.Packages.findByPk( req.body.id ).then( pkg => { pkg.destroy() } )
            res.sendStatus(200)
        }
    },
}


