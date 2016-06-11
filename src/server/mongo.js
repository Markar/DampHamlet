
var Mongo = {};
 
module.exports = Mongo;

  var MongoClient = require('mongodb').MongoClient;
  var assert = require('assert');
  var user = 'admin';
  var pass = 'data*base123';        
  
  Mongo.Connect = function()
  {
    console.log("Attemping connection to DB.");
    // Connection URL
    var url = 'mongodb://' + user + ':' + pass + '@ds047812.mongolab.com:47812/heroku_c8hphtwn';
    
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, database) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      db = database;
          
    });
  }
  
  Mongo.InsertUser = function(user) {        
    console.log('Insert user');
    
    var collection = db.collection('users');        
    
    collection.insertOne(user, function(err) {          
        if(err != null) {
          console.log('Error: ' + err); 
        }          
      });        
  }
  
  Mongo.UpdateUser = function(user, mod) {    
    console.log('Update user');
    
    var collection = db.collection('users');
    
    collection.updateOne(user, {$set: mod}, function(err, r) {
      assert.equal(null, err); 
      assert.equal(1, r.matchedCount);
      assert.equal(1, r.modifiedCount);
    });
  }
  
  Mongo.RemoveUser = function(mod) {    
    console.log('Remove user');
    
    var collection = db.collection('users');
    
    collection.deleteOne(mod, function(err, r) {
      assert.equal(null, err); 
      assert.equal(1, r.deletedCount);
    });
  }
  
  Mongo.GetUser = function(id, socket) {    
    console.log('Getting user: ' + JSON.stringify(id)); 
    
    var test = {'PlayerId' : '2'};
    var users = db.collection('users');       
        
    users.find(test).limit(1).next(function (err, doc) {
      assert.equal(null, err);
      assert.ok(doc != null);                 
      socket.emit('SendUser', doc);
    });        
  }
  
  
