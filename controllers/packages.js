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
                
                let hostArray = [];
                req.app.locals.models.Hosts.findAll( {where: {packageId : req.params.packageId}} ).then( (hosts) => {
                    hostArray = hosts
                }).then( () => {
                    res.render('pages/packages/show', {
                        app: req.app, 
                        title: 'Express',  
                        menuPackages : 'active',
                        pkg : pkg,
                        hosts : hostArray
                    });    
                })
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
        if(req.params.packageId){
            
            csv2Json.getJson(req.fileContent, function(err,json) {
                json.forEach( (h) => {
                    req.app.locals.models.Hosts.sync({force: false}).then(() => {
                        req.app.locals.models.Hosts.findAll( {where: {hostname: h.Hostname, packageId : req.params.packageId}} ).then( (hosts) => {
                            if(hosts){
                                hosts.forEach( (h) => {
                                    h.destroy();
                                })
                            }
                        })
                    }).then( () => {
                        req.app.locals.models.Hosts.sync({force: false}).then(() => {
                            req.app.locals.models.Hosts.create({
                                hostname : h.Hostname,
                                ip : h.IP,
                                mac : h.MAC,
                                type : h.Type,
                                vendor : h.Vendor,
                                model : h.Model,
                                firmware : h.Firmware,
                                building : h.Building,
                                room : h.Room,
                                packageId : req.params.packageId
                            });
                        });
                    })
                })
            });
            res.redirect('/packages/' + req.params.packageId + '/');
        }else{
            res.sendStatus(500)
        }
    },
    updateHost(req, res, next){
        
        req.app.locals.models.Hosts.sync({force: false}).then(() => {
            req.app.locals.models.Hosts.findAll( {where: {hostname: req.body.hostname, packageId : req.body.packageId}} ).then( (hosts) => {
                if(hosts){
                    hosts.forEach( (h) => {
                        h.destroy();
                    })
                }
            })
        }).then( () => {
            req.app.locals.models.Hosts.sync({force: false}).then(() => {
                req.app.locals.models.Hosts.create({
                    hostname : req.body.hostname,
                    ip : req.body.ip,
                    mac : req.body.mac,
                    type : req.body.type,
                    vendor : req.body.vendor,
                    model : req.body.model,
                    firmware : req.body.firmware,
                    building : req.body.building,
                    room : req.body.room,
                    packageId : req.params.packageId
                });
            });
        })
          
        res.sendStatus(200)    
    }
}


