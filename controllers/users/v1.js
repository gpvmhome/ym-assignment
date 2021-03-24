const userModel = require('../../models/users');


module.exports.get   = (req, res) => { userModel.getUsers(req,res) };

module.exports.post = (req,res) => { userModel.insertUser(req,res) };