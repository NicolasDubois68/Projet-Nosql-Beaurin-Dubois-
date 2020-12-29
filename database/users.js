'use strict';

const chalk = require('chalk');
const crypto = require('crypto');

const MongoClient = require('mongodb').MongoClient;
const COLLECTION_NAME = 'utilisateurs';

function printFailure(err) {
    console.error(chalk.red.bold('Error'), chalk.grey(err));
}

function findUsers(db) {
    return callback => {
        db.collection(COLLECTION_NAME).find({}).toArray((err, results) => {
            if (err) printFailure(err);
            callback(err ? [] : results);
        });
    }
}

function countUsers(db) {
    return callback => {
        db.collection(COLLECTION_NAME).find({}).count((err, count) => {
            if (err) printFailure(err);
            callback(err ? -1: count);
        });
    };
}

function addUsers(db) {
    return (entry, callback) => {
        if (!entry) entry = {};
        var users = {
            name: entry.name || '',
            friends : entry.artist || ''
            mail: entry.mail || ''
            mdp: entry.mdp || ''
        };
        
 function addMsg(db) {
    return (entry, callback) => {
        if (!entry) entry = {};
        var msg = {
            message: entry.message || '',   
        };


        var salt = [String(new Date()), Users.name, Users.friends, Users.mail, Users.mdp].join('|');
        song._id = crypto.createHash('md5').update(salt).digest('hex');
        
        db.collection(COLLECTION_NAME).insertOne(Users, (err, response) => {
            if (err) {
                printFailure(err);
                return callback(null);
            }
            var result = response.ops[0];
            callback(result._id);
        });
    };
}

// Unused
function removeUsers(db) {
    return (id, callback) => {
        callback();
    };
}

function removeAllUsers(db) {
    return callback => {
        db.collection(COLLECTION_NAME).deleteMany({}, (err, count) => {
            if (err) printFailure(err);
            callback(count);
        });
    }
}


module.exports = (config, callback) => {
    if (!config.silent) console.log(chalk.cyan.bold('Connecting'), `to mongo uri="${config.dbUri}", db="${config.dbName}"`);
    const client = new MongoClient(config.dbUri, { useUnifiedTopology: true});
 
    client.connect(err => {
        if (err) {
            console.error(chalk.red.bold('Error'), 'could not open Mongodb:', chalk.grey(err));
            process.exit(1);
        }
        if (!config.silent) console.log(chalk.green.bold('Connected'), 'to mongo');
        
        const db = client.db(config.dbName);
 
        callback({
            find: findUsers(db),
            count: countUsers(db),
            add: addUsers(db),
            remove: removeUsers(db),
            removeAll: removeAllUsers(db)
        });
    });

};
