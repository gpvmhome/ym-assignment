var MongoClient = require('mongodb').MongoClient
// const monogoUrl = 'mongodb://localhost:27017'
const dbName = 'users';

var db;

module.exports.initializeMongoClient = () => {
    console.log("starting async function...");
    MongoClient.connect(process.env.mongoUrl,{useNewUrlParser: true, useUnifiedTopology: true}).then((mogodbClient) => {
        console.log("befor db object",db);

        db = mogodbClient.db(dbName);
        console.log("database connection",db);
        global.dbObj = db;
    }).catch((err) => {
        console.log("mongo error...",err);
    });
}


module.exports.getDB = db;


