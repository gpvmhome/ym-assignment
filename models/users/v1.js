// var dbObj = require('../../db').getDB;
var ObjectID = require('mongodb').ObjectID;

module.exports.getUsers = (req,res) => {
    let dbObj = global.dbObj;
    let usersCollection = dbObj.collection('users');

    usersCollection.findOne({_id: new ObjectID(req.params.id)}).then((userObj) => {
      if(userObj)
         res.send(userObj);
    }).catch((err) => {
        res.status(500).send({msg:"user not found"});
    });
}

module.exports.insertUser = (req,res) => {
    let dbObj = global.dbObj;

    let usersCollection = dbObj.collection('users');
    let user = {
        name: req.body.name,
        age: req.body.age
    }
     usersCollection.insertOne(user).then((success) => {

         if(success.result.ok == 1) 
            res.send(success.ops[0]);
         else 
            res.status(500).send({msg:"something went wrong"});
     }).catch((error) => {

         res.status(500).send({msg:"something went wrong"});
     });
}
