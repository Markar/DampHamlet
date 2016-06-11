var express = require('express'),
    app = express(),
    path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,    
    staticpath =  path.join(__dirname, '../../build'),
    //scriptpath = path.join(__dirname, '../../build/scripts'),
    //assetpath = path.join(__dirname, '../../build/assets'), 
    server, 
    io; 
    //mongo = require("./mongo");
    
var playerNames = ['Mark', 'Peter', 'Jan', 'George', 'Andrew', 'Laura', 'Jordan', 'Andrew'],
    playerList = [], 
    connections = [], 
    playerId = 0, 
    numUsers = 0;

function InitApp() {
    app.set('port', (process.env.PORT || 9000));        
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(staticpath));  
    //app.use(express.static(scriptpath));                 
    //app.use(express.static(assetpath));                 
    
    app.get('/', function(req, res) {        
        res.sendFile('index.html', {root: path.join(__dirname, '../../build/') });                         
    });
    
    server = app.listen(app.get('port'), function() {
        console.log('App running on port', app.get('port'));
        //console.log('scripts: ' + scriptpath);
        console.log('static: ' + staticpath);
        //console.log('assets: ' + assetpath);    
    });
    
    io = require('socket.io').listen(server);    
}

InitApp();

function main() {    
    //mongo.Connect();
    InitIO();        
}

function InitPassportLocal() {
    passport.use(new LocalStrategy(
        
        function(username, password, done) {
          User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
          });
        }
        
        
    ));
}

function InitIO() {
    io.on('connection', function(socket){
        console.log('server side handshake');            
        connections.push(socket);
            
        socket.emit('handshakeToClient', playerId);
        
        socket.on('disconnect', function() {  
            console.log('socket on disconnect: ' + socket);          
            RemoveConnection(socket);            
        });
                   
        socket.on('connectPlayerToServer', function(playerdata) {                         
            AddPlayerToWorld(playerdata, socket);                                              
        });                
        
        socket.on('UpdatePlayer', function(playerdata) {
            UpdatePlayer(playerdata);
        });
        
        socket.on('PushDB', function() {
            PushDB(socket);
        });         
    });
}

function PushDB(socket) {
    var user = new Object(); 
        user.name = 'Mark'; 
        user.PlayerId = '1';
        
    var mod = {name : 'Xifeng'};
    var remove = {name : 'Mark'};
    var id = {name : 'Mark'};
    
    var doc = GetUser(socket);
    //mongo.GetUser();  
    //mongo.RemoveUser(remove);      
    //mongo.UpdateUser(user, mod);        
    //mongo.InsertUser(user);
}

function GetUser(socket) {
    var obj = new Object(); 
    obj.PlayerId = 1; 
    
    mongo.GetUser(obj, socket);        
}          

function RemoveConnection(socket)
{                       
     var conn = connections.indexOf(socket);     
     connections.splice(conn, conn);     
     io.emit('UpdateConnections', connections.length);          
}

function RemovePlayer()
{
    var user = playerList.indexOf(socket); 
    playerList.splice(user, user);     
    io.emit('UpdatePlayers', playerList.length);     
    io.emit('AddPlayerToUI', playerList);
}

function UpdatePlayer(playerdata) {
    var player = JSON.parse(playerdata);                
    console.log(player);        
    io.emit('UpdatePlayers', playerdata);
}

function AddPlayerToWorld(playerJSON, socket)
{           
    //recycle for names
    if(playerId > 7)
        playerId = 0;
     
    var player = JSON.parse(playerJSON);
    player.id = playerId;        
    player.name = playerNames[playerId];
    player.socket = socket.id;
    
    playerList[player.id] = player;
    io.emit('AddPlayerToClient', JSON.stringify(player));  
    io.emit('AddPlayerToUI', playerList);                   
        
    //pass the number of total users back to the connected clients
    io.emit('UpdateUsers', playerList.length);
    io.emit('UpdateConnections', connections.length);
}

main();

              


