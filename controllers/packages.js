var path = require('path');
var csv2Json = require('simpleCsvToJson');


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
    show(req, res, next) {
		req.app.locals.models.Packages.sync({force: false}).then(() => {
			req.app.locals.models.Packages.findByPk(req.params.packageId).then((pkg) => {
                res.render('pages/packages/show', {
                    app: req.app, 
                    title: 'Express',  
                    menuPackages : 'active',
                    pkg : pkg
                });
            });
        });
	},
    add(req, res, next){
        if(req.body.name && req.body.acronym){
            req.app.locals.models.Packages.create({     
                acronym: req.body.acronym,
                name: req.body.name,
                
            });
            res.sendStatus(200)
        }else{
            res.sendStatus(400)
        }
    },
    delete(req, res, next){
        if(req.params.packageId){
            req.app.locals.models.Packages.findByPk( req.params.packageId ).then( (pkg) => { 
                pkg.destroy() 
            })
            res.sendStatus(200)
        }else{
            res.sendStatus(400)
            
        }
    },
    put(req, res, next){
        if(req.params.packageId && req.body.acro && req.body.name ){
            req.app.locals.models.Packages.update({
                acronym : req.body.acro,
                name : req.body.name
            },
            {
                where : {   id : req.params.packageId}
            }).then(()=>{
                res.sendStatus(200)
            })
        }
    },
    addHosts(req, res, next){
        csv2Json.getJson(req.fileContent, function(err,json) {
            console.log(json);
        });

        
    }
}


