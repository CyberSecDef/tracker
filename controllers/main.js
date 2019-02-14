var path = require('path');

exports.index = function(req, res, next) {
    console.log(req.app.locals.models.Lorem);
    
    
    // force: true will drop the table if it already exists
    req.app.locals.models.Lorem.sync({force: false}).then(() => {
        
        for (var i = 0; i < 10; i++) {
            req.app.locals.models.Lorem.create({TEXT: 'Ipsum ' + i});
        }
            
        req.app.locals.models.Lorem.findAll().then(lorem => { 
            lorem.forEach(l => {
                console.log(l.get('TEXT') ) 
            })
        })   
    });

    res.render('index', { title: 'Express' });
};


