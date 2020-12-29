  
'use strict';

const database = require('../database/msg');

function addApiRoutes(app, config, callback) {
    database(config, msg  => {
        
        app.get('/api/msg', (req, res) => {
            msg.find(results => {
                res.json({ data: results });
            });
        });

        app.post('/api/users', (req, res) => {
            msg.add(req.body, id => {
                res.json({ success: Boolean(id) });
            });
        });

        app.all('/api/*', (req, res) => {
            res.json({ error: 404, message: 'Unknown route' });
        });
        
        if (callback) callback();
    });
}

module.exports = {
    addRoutes: addApiRoutes
};
