var fs = require('fs');
var mongoose = require('mongoose');
var db = mongoose.connection;
var crypto = require('crypto');
var http = require('http');
var url = require('url');

var checkAccountData = function (username, password, confirmation) {
    if (!username && !password) {
        return {
            result: false,
            reason: 'missing.username.password'
        };
    }
    if (!username) {
        return {
            result: false,
            reason: 'missing.username'
        };
    }
    if (!password) {
        return {
            result: false,
            reason: 'missing.password'
        };
    }
    if (confirmation && confirmation !== password) {
        return {
            result: false,
            reason: 'wrong.confirmation'
        };
    }
    return {
        result: true,
        data: {
            username: username,
            password: password
        }
    };
};

// API -------------------------------------------------------------
module.exports = function (app) {
    app.post('/api/login', function (req, res) {
        var body = req.body;
        var user = body.user;
        var password = crypto.createHash('sha256').update(body.password).digest('hex');
        var validation = checkAccountData(user, password);
        if (!validation.result) {
            return res.status(200).send({
                result: false,
                reason: validation.reason
            });
        }
        // Check is username is a valid username/email address
        db.collection('users').find({
            $or: [{login: user}, {email: user}]
        }).limit(1).toArray(function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }
            // Account not found
            if (result.length <= 0) {
                return res.status(200).send({
                    result: false,
                    reason: 'account.not.found'
                });
            }
            // Incorrect password
            if (result[0].password !== password) {
                return res.status(200).send({
                    result: false,
                    reason: 'wrong.password'
                });
            }
            // OK
            res.status(200).send({
                result: true,
                email: result[0].email,
                password: result[0].password
            });
        });

    });

    app.post('/api/new_account', function (req, res) {
        var body = req.body;
        var validation = checkAccountData(body.email, body.password, body.confirmation);
        var email = body.email;
        var password = crypto.createHash('sha256').update(body.password).digest('hex');
        if (!validation.result) {
            return res.status(200).send({
                result: false,
                reason: validation.reason
            });
        }
        // Check if email is already used
        db.collection('users').find({
            email: email
        }).limit(1).toArray(function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                return res.status(200).send({
                    result: false,
                    reason: 'email.already.used'
                });
            }
            // No account found, new account can be saved
            db.collection('users').insert({
                email: email,
                password: password
            }, function (err, result) {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.status(200).send({
                    result: true
                });
            });
        });
    });

    app.get('/api/users', function (req, res) {
        db.collection('users').find().toArray(function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }
        });
    });

    //  :user can be the login or id of the search user
    app.get('/api/user/:user', function (req, res) {
        var user = req.params.user;
        if(parseInt(user)){
          //search by id
          user = parseInt(user);
          db.collection('users').find({
              _id: user
          }).toArray(function (err, result) {
              if (err) {
                  res.status(500).send(err);
              } else {
                  res.status(200).send(result[0]);
              }
          });
        } else {
          //search by login
          db.collection('users').find({
              login: user
          }).toArray(function (err, result) {
              if (err) {
                  res.status(500).send(err);
              } else {
                  res.status(200).send(result[0]);
              }
          });
        }

    });

    //get all conversations for a user
    app.get('/api/:login/conversations', function(req,res){
      var login = req.params.login;
      db.collection('users').find({
        login: login
      }).toArray(function (err, result){
        if(err){
          res.status(500).send(err);
        } else {
          if(result.length == 0){
            res.status(200).send({
              result: false,
              reason: 'user.not.found'
            })
          } else {
            res.status(200).send(result[0].conversations);
          }
        }
      });
    });

    //get all threads from a conversation
    app.get('/api/conversation/:conversationid', function(req,res){
      var convId = parseInt(req.params.conversationid);
      db.collection('conversations').find({
        _id: convId
      }).toArray(function(err, result){
        if(err){
          res.status(500).send(err);
        } else {
          res.status(200).send(result[0]);
        }
      })
    })

// application -------------------------------------------------------------
    app.get('/index/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });
    app.get('/home/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });
    app.get('/login', function (req, res) {
        res.sendFile(__dirname + '/pages/login.html');
    });

//errors -------------------------------------------------------------
    app.get('/404', function (req, res) {
        res.sendFile(__dirname + '/pages/errors/404.html');
    });
//fallback -------------------------------------------------------------
    app.get('/', function (req, res) {
        res.redirect('/login');
    });

    app.get('*', function (req, res) {
        res.redirect('/404');
    });
};
