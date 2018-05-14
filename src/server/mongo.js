const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//TODO
const env = require('./env/environment');

// eslint-disable-next-line max-len
const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl=true&replicaSet=globaldb`;
                 

function connect() {
    return mongoose.connect(mongoUri,{});
}

module.exports = {
    connect
}