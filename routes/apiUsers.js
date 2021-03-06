  
'use strict';

const database = require('../database/users');

function addApiRoutes(app, config, callback) {
    database(config, users  => {
        
        app.get('/apiUsers/users', (req, res) => {
            users.find(results => {
                res.json({ data: results });
            });
        });

        app.post('/apiUsers/users', (req, res) => {
            users.add(req.body, id => {
                res.json({ success: Boolean(id) });
            });
        });

        app.all('/apiUsers/*', (req, res) => {
            res.json({ error: 404, message: 'Unknown route' });
        });
        
        if (callback) callback();
    });
}

module.exports = {
    addRoutes: addApiRoutes
};
