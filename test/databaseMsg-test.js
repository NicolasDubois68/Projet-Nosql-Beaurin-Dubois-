'use strict';

const chai = require('chai');
const expect = chai.expect;

const database = require('../database/Msg');

const config = {
    dbUri: 'mongodb://localhost:27017/',
    dbName: 'Msg',
    silent: true
};

describe('database', () => {

    var msg = null;
    
    before(done => {
        database(config, results => {
            msg= results;
            done();
        });
    });
    
    it('should return an array of msg', done => {
        Msg.find(result => {
            expect(result).to.be.an('array');
            done();
        });
    });
    
    it('should add entries to the list', done => {     
        Msg.count(oldCount => {
            var msg= {
               message: 'Bonjour je m'appelle Michel',
            }
            Msg.add(msg, id => {
                expect(id).to.exist;
                
                Msg.count(newCount => {
                    expect(newCount).to.equal(oldCount + 1);
                    done();
                });
            });
            
        });
    });

    it('should not crash when adding empty objects', done => {
        Msg.add(null, id => {
            setTimeout(() => {
                Msg.add(undefined, id => {
                    done();
                });
            }, 1000);
        });
    });


    it('should clear the entire list', done => {
        Msg.removeAll(() => {
            Msg.count(count => {
                expect(count).to.equal(0);
                done();
            });
        });
    });
    
});

