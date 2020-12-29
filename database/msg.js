'use strict';

const chalk = require('chalk');
const crypto = require('crypto');

const MongoClient = require('mongodb').MongoClient;
const COLLECTION_NAME = 'msg';

function printFailure(err) {
    console.error(chalk.red.bold('Error'), chalk.grey(err));
}

function findmsg(db) {
    return callback => {
        db.collection(COLLECTION_NAME).find({}).toArray((err, results) => {
            if (err) printFailure(err);
            callback(err ? [] : results);
        });
    }
}

function countmsg(db) {
    return callback => {
        db.collection(COLLECTION_NAME).find({}).count((err, count) => {
            if (err) printFailure(err);
            callback(err ? -1: count);
        });
    };
}

function addmsg(db) {
    return (entry, callback) => {
        if (!entry) entry = {};
        var msg = {
            message: entry.message || ''
        };
       

        var salt = [String(new Date()), msg.message].join('|');
        song._id = crypto.createHash('md5').update(salt).digest('hex');
        
        db.collection(COLLECTION_NAME).insertOne(msg, (err, response) => {
            if (err) {
                printFailure(err);
                return callback(null);
            }
            var result = response.ops[0];
            callback(result._id);
        });
    };
}

function removemsg(db) {
    return (id, callback) => {
        callback();
    };
}

function removeAllmsg(db) {
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
            find: findmsg(db),
            count: countmsg(db),
            add: addmsg(db),
            remove: removemsg(db),
            removeAll: removeAllmsg(db)
        });
    });

};
