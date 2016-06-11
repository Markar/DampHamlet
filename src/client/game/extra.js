var initApp = function () {            

    //var input = new playerinput(); 

    //Initial connection to the server. 
    socket.on('handshakeToClient', function (Id) {
      //player.id = Id;
    });       
    
    socket.on('AddPlayerToClient', function(playerJSON){      
      var newPlayer = JSON.parse(playerJSON);
      newPlayer.sprite = game.add.sprite(gameWidth/2, gameHeight/2, 'knight');       
      newPlayer.sprite.anchor.setTo(.5, 1);
      game.physics.arcade.enable(newPlayer.sprite);

      players[player.id] = newPlayer;            
      console.log('Add player to client: ' + JSON.stringify(newPlayer));
      
      //_.each(players, alert);
      
    });
    
    socket.on('AddPlayerToUI', function(playerlist) {      

      $('.ulPlayerList').empty();
      
      var i; 
      for(i = 0; i < playerlist.length; i++)
      {
        $('.ulPlayerList').append(
          '<li>' + playerlist[i].name + '</li>'
          );  
      }
      
    });

    //Connected to the socket, and also playing. 
    socket.on('UpdateUsers', function (users) {
      $(".playerCount").text(users);      
    });
    //Connected to the socket, but not necessarily playing.
    socket.on('UpdateConnections', function (connectionsFromServer) {
      connections = connectionsFromServer; 
      $(".connectedCount").text(connections);            
    });    
    
    socket.on('UpdatePlayers', function(playerJSON) {
      //updates from other players to the local client      
      var player = JSON.parse(playerJSON);      
      var currentPlayer = players[player.id];
      //var i; 
      // for(i = 0;i < players.length;i++)
      // {
      //   console.log('players: ' + players[i]); 
      // }      
      
      currentPlayer.sprite.body.x = player.x;
      currentPlayer.sprite.body.y = player.y;      
    });        
    
    socket.on('SendUser', function(user) {                  
      var strUser = '<ul>' + user.PlayerId + ' ' + user.name + '</ul>';
      $(".ulUser").append(strUser);
    });


    $('.play').click(function () {

      connectPlayerToServer(function () {
        game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameWindow', { preload: preload, create: create, update: update });
        player.name = $('.inputName').val();
        $(".playerid").text(player.id);
      });

    });
    
    $('.update').click(function () {
      updatePlayer();
    });
    
    $('.pushdb').click(function () {
      PushDB();
    });

    debugConnect();
  };
  
  function PushDB()
  {
    socket.emit('PushDB');
  }

  function UpdatePosition(player, x, y)
  {
    player.x = x; 
    player.y = y; 
  }

  function debugConnect()
  {
    connectPlayerToServer(function () {
      game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameWindow', { preload: preload, create: create, update: update });        
      $(".playerid").text(0);
    });
  }

  function updatePlayer() {           
    // if(updateInterval > 99) {
    //   console.log(player);
    //   socket.emit('UpdatePlayer', JSON.stringify(player));
    //   updateInterval = 0;        
    // } 
    // updateInterval++;
  }
  function connectPlayerToServer(callback) {    

    socket.emit('connectPlayerToServer', JSON.stringify(player));
    callback();
  }

  function preload() {
    this.game.load.image('knight', 'assets/knight_l.png');
    this.game.load.image('slime', 'assets/slime.png');
    this.game.load.image('wood_mace', 'assets/wood_mace.png');
  }

function create() {
  
  game.physics.startSystem(Phaser.Physics.P2JS);  
  game.physics.p2.setImpactEvents(true);
  game.physics.p2.restitution = 0.8;
  game.world.setBounds(0, 0, 1920, 1920); 
  

  cursors = game.input.keyboard.createCursorKeys();

  wasd = {
    up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
    down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
    left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
    right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
  };  

  playerCollisionGroup = game.physics.p2.createCollisionGroup();  
  enemyCollisionGroup = game.physics.p2.createCollisionGroup();  
  weaponCollisionGroup = game.physics.p2.createCollisionGroup();

  createPlayer();
  player = players[0];

  slimes = game.add.group();
  slimes.enableBody = true;
  slimes.physicsBodyType = Phaser.Physics.P2JS;

  weapons = game.add.group();
  weapons.enableBody = true;
  weapons.physicsBodyType = Phaser.Physics.P2JS;
  

  createSlimes();
}

function createPlayer() {  
  var player = game.add.sprite(game.world.randomX, game.world.randomY, 'knight');             
  game.physics.p2.enable(player, false);
  player.body.setCircle(10);
  player.body.setCollisionGroup(playerCollisionGroup);      
  player.body.fixedRotation = true; 
  player.speed = 200;   
  game.camera.follow(player);  

  player.body.collides([enemyCollisionGroup, weaponCollisionGroup]);
  players.push(player);  
}

var enemyCount = 0; 

function createSlimes() {     
  var slimesCount = 400; 
  enemyCount += slimesCount; 

  for(var i = 0; i < slimesCount; i++) {
    var slime = slimes.create(game.world.randomX, game.world.randomY, 'slime');
    slime.body.setCircle(10);
    slime.body.setCollisionGroup(enemyCollisionGroup);    
    slime.body.fixedRotation = true; 
    slime.speed = Math.random() * 50;
    game.physics.p2.enable(slime)    
    slime.hp = 1; 

    slime.body.collides(weaponCollisionGroup, enemyHitByWeapon, slime);
    slime.body.collides([enemyCollisionGroup, playerCollisionGroup]);    
    enemies.push(slime);     
  }

  function enemyHitByWeapon(body1, body2) {
  this.hp -= 1; 

  if(this.hp < 1) {    
    enemyCount--; 
    $(".enemyCount").text(enemyCount);
    this.kill();
  }
}
  // var slime = new Object(); 
  //     slime.sprite = game.add.sprite(gameWidth/2, gameHeight/2, 'slime');
  //     slime.sprite.enableBody;
  //     slime.sprite.physicsBodyType = Phaser.Physics.P2JS;      
  //     slime.sprite.body.setCollisionGroup(enemyCollisionGroup);
  //     slime.sprite.collides(enemyCollisionGroup);      
  //     slime.sprite.body.setCircle(20);
  //     slime.speed = Math.random() * 10;
  //     slime.hp = 10;       
}

function updateEnemies() {  
  for(var i = 0; i < enemies.length; i++)
  {          
    moveEnemy(enemies[i]);
  }
}

function moveEnemy(enemy) {  
  game.physics.arcade.moveToObject(enemy, player, enemy.speed);

}

var weaponsFired = 0; 
function attack() {
  if (game.time.now > nextAttack) {  
      weaponsFired++; 
      $(".weaponCount").text(weaponsFired); 
      nextAttack = game.time.now + attackRate;       

      var weapon = weapons.create(player.body.x, player.body.y, 'wood_mace');      
      game.physics.p2.enable(weapon);           
      weapon.physicsBodyType = Phaser.Physics.p2; 
      weapon.enableBody = true;
      weapon.speed = 500;      
      weapon.damage = 1;       

      if(direction == 0)
        weapon.body.moveLeft(weapon.speed); 
      if(direction == 1) 
        weapon.body.moveRight(weapon.speed);
      if(direction == 2) 
        weapon.body.moveUp(weapon.speed); 
      if(direction == 3)
        weapon.body.moveDown(weapon.speed); 

      weapon.body.setCircle(5);
      weapon.body.setCollisionGroup(weaponCollisionGroup);
      weapon.body.collides(enemyCollisionGroup, weaponHit, weapon);
      
    }
}
//called when a weapon hits something. Destroy the weapon
function weaponHit(body1, body2) {        
    this.kill(); 
}
function update() {             
    
  updatePlayerInput();
  updatePlayer();    
  updateEnemies();     

}






function updatePlayerInput(player) {

  player.body.setZeroVelocity();

  if(cursors.left.isDown || wasd.left.isDown) {            
    player.body.moveLeft(player.speed);
    player.scale.x = 1;             
    player.direction = 0;
  }
  if(cursors.right.isDown || wasd.right.isDown) {
    player.body.moveRight(player.speed);
    player.scale.x = -1;       
    player.direction = 1; 
  }
  if(cursors.up.isDown || wasd.up.isDown) {
    player.body.moveUp(player.speed);
    player.direction = 2; 
  }
  if(cursors.down.isDown || wasd.down.isDown) {
    player.body.moveDown(player.speed);
    player.direction = 3; 
  }
  if (game.input.activePointer.isDown) {          
    attack();          
  }

  // player.x = sprite.body.x;
  // player.y = sprite.body.y;
}

initApp();