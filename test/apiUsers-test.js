'use strict';

const chai = require('chai');
const expect = chai.expect;
const request = require('request');

const PORT = 3079;

const config = {
    dbUri: 'mongodb://localhost:27017',
    dbName: 'Users',
    silent: true
};

describe('apiUsers', () => {

    before(done => {
        const express = require('express');
        const app = express();
        
        require('../routes/apiUsers').addRoutes(app, config, () => {
            app.listen(PORT, done);
        });
    });
    
    it('should return documents', done => {
        request(`http://localhost:${PORT}/api/songs`, { json: true }, (err, res, body) => {
            expect(err).to.not.exist;
            expect(body).to.have.property('data');
            expect(body.data).to.be.an('array');
            done();
        });
    });
});

