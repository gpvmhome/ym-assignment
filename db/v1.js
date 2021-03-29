var MongoClient = require('mongodb').MongoClient
// const monogoUrl = 'mongodb://localhost:27017'
const dbName = 'users';

var db;

module.exports.initializeMongoClient = () => {

    MongoClient.connect(process.env.mongoUrl,{useNewUrlParser: true, useUnifiedTopology: true}).then((mogodbClient) => {


        db = mogodbClient.db(dbName);

        global.dbObj = db;
    }).catch((err) => {
  
    });
}


module.exports.getDB = db;


