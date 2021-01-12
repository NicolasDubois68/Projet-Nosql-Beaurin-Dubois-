'use strict';

const chai = require('chai');
const expect = chai.expect;

const database = require('../database/Users');

const config = {
    dbUri: 'mongodb://localhost:27017/',
    dbName: 'Users',
    silent: true
};

describe('database', () => {

    var users = null;
    
    before(done => {
        database(config, results => {
            users= results;
            done();
        });
    });
    
    it('should return an array of users', done => {
        Users.find(result => {
            expect(result).to.be.an('array');
            done();
        });
    });
    
    it('should add entries to the list', done => {     
        Users.count(oldCount => {
            var users= {
                name: 'Michel',
                amis : 'Michelle',
                mail : 'michel.michel@gmail.com',
                mdp : 'michel',
            }
            Users.add(users, id => {
                expect(id).to.exist;
                
                Users.count(newCount => {
                    expect(newCount).to.equal(oldCount + 1);
                    done();
                });
            });
            
        });
    });

    it('should not crash when adding empty objects', done => {
        Users.add(null, id => {
            setTimeout(() => {
                Users.add(undefined, id => {
                    done();
                });
            }, 1000);
        });
    });


    it('should clear the entire list', done => {
        Users.removeAll(() => {
            Users.count(count => {
                expect(count).to.equal(0);
                done();
            });
        });
    });
    
});

