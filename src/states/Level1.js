import {Player} from '../client/game/player/player';
import {Creator} from './creator';
import {Item} from '../client/game/items/item';
import {Health} from '../client/game/items/health';


class Level1 extends Phaser.State {

  init(playerObj, difficulty) {
    this.damphamlet = window['damphamlet'];
    this.difficulty = difficulty;
    let game = this.game;
    game.players = [];
    game.playerObj = playerObj;
    game.physics.p2.setImpactEvents(true);
    game.onBlur.add(function() {
      console.log("BLURRED");
      if(game.players.length > 0) {
        game.players[0].pressStack.pop();
      }
    }, this);
  }

  preload() {
    this.stage.disableVisibilityChange = true;
  }

  render() {
    let game = this.game;

    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
    //game.debug.text(game.ball || 'none', 4, 28, "#00ff00");
    //game.debug.body(this.bh);
    //game.debug.spriteBounds(this.bh);
    //game.debug.spriteBounds(game.players[0]);
    //
  }

  create() {
    console.log('create level1');
    let game = this.game;

    this.map = game.add.tilemap('level1');
    let map = this.map;

    map.addTilesetImage('tiles');

    let layer = map.createLayer('Tile Layer 1');
    layer.smoothed = false;
    layer.setScale(game.scalemultiple);
    layer.resizeWorld();

    let layer2 = map.createLayer('Tile Layer 2');
    layer2.smoothed = false;
    layer2.setScale(game.scalemultiple);
    layer2.resizeWorld();

    //  Set the tiles for collision.
    //  Do this BEFORE generating the p2 bodies below.
    //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
    //  This call returns an array of body objects which you can perform addition actions on if
    //  required. There is also a parameter to control optimising the map build.
    map.setCollisionByExclusion([274, 295, 296, 297, 298]);
    var tiles = game.physics.p2.convertTilemap(map, layer);

    for(var i = 0; i < tiles.length; i++) {
      tiles[i].setCollisionGroup(game.tileCollisionGroup);
      tiles[i].collides([game.playerCollisionGroup, game.weaponCollisionGroup, game.enemyWeaponCollisionGroup, game.enemyCollisionGroup]);
    }

    game.physics.p2.setBoundsToWorld(true, true, true, true, true);
    game.physics.p2.restitution = 0.8;
    game.MusicHandler.playTrack('hangar2'); 
    this.setup();
  }

  setup() { 
    let game = this.game; 

    let creationInfo = {
      x : 50,
      y : 50,
      sprite: game.playerObj.playertype
    };

    let player = this.damphamlet.loadPlayer(creationInfo);
    game.players.push(player);
    this.player = player;
    this.player.currentMission = this;
    this.setDifficulty();
  }
  
  setDifficulty() {   
    switch(this.difficulty) { 
      case 'Easy': 
        this.setupEasy();
        break; 
      case 'Normal': 
        this.setupNormal();
        break;
      case 'Hard': 
        this.setupHard(); 
        break; 
      default: 
        this.setupEasy();
        break;
    }
    
  }

  setupEasy() {
    this.enemies = [];
    let creator = new Creator(this.game, this.map);
    
    let eye = creator.createEye(150, 150);
    this.enemies.push(eye);
    eye = creator.createEye(200, 200);
    this.enemies.push(eye);
    eye = creator.createEye(250, 450);
    this.enemies.push(eye);
    eye = creator.createEye(300, 550);
    this.enemies.push(eye);
    eye = creator.createEye(350, 500);
    this.enemies.push(eye);

    let slime = creator.createSlime(500, 500); 
    this.enemies.push(slime);
    slime = creator.createSlime(600, 500); 
    this.enemies.push(slime);
    slime = creator.createSlime(500, 400); 
    this.enemies.push(slime);
    slime = creator.createSlime(100, 300); 
    this.enemies.push(slime);
    slime = creator.createSlime(100, 600); 
    this.enemies.push(slime);
    
    this.game.time.events.loop(Phaser.Timer.SECOND * 3, creator.loopEnemies, this); 
  }

  setupNormal() {
    this.enemies = [];
    let creator = new Creator(this.game, this.map);
    
    let eye = creator.createEye(150, 150);
    this.enemies.push(eye);
    eye = creator.createEye(200, 200);
    this.enemies.push(eye);
    eye = creator.createEye(250, 450);
    this.enemies.push(eye);
    eye = creator.createEye(300, 550);
    this.enemies.push(eye);
    eye = creator.createEye(350, 500);
    this.enemies.push(eye);

    let slime = creator.createSlime(500, 500); 
    this.enemies.push(slime);
    slime = creator.createSlime(600, 500); 
    this.enemies.push(slime);
    slime = creator.createSlime(500, 400); 
    this.enemies.push(slime);
    slime = creator.createSlime(100, 300); 
    this.enemies.push(slime);
    slime = creator.createSlime(100, 600); 
    this.enemies.push(slime);

    let green = creator.createGreenAlien(550, 550);
    this.enemies.push(green);
    green = creator.createGreenAlien(160, 160);
    this.enemies.push(green);
    green = creator.createGreenAlien(220, 550);
    this.enemies.push(green);
    green = creator.createGreenAlien(350, 320);
    this.enemies.push(green);
    green = creator.createGreenAlien(175, 225);
    this.enemies.push(green);
    
    this.game.time.events.loop(Phaser.Timer.SECOND * 3, creator.loopEnemies, this); 
  }

  setupHard() {
    this.enemies = [];
    let creator = new Creator(this.game, this.map);
    
    let eye = creator.createEye(150, 150);
    this.enemies.push(eye);
    eye = creator.createEye(200, 200);
    this.enemies.push(eye);
    eye = creator.createEye(250, 450);
    this.enemies.push(eye);
    eye = creator.createEye(300, 550);
    this.enemies.push(eye);
    eye = creator.createEye(350, 500);
    this.enemies.push(eye);

    let slime = creator.createSlime(500, 500); 
    this.enemies.push(slime);
    slime = creator.createSlime(600, 500); 
    this.enemies.push(slime);
    slime = creator.createSlime(500, 400); 
    this.enemies.push(slime);
    slime = creator.createSlime(100, 300); 
    this.enemies.push(slime);
    slime = creator.createSlime(100, 600); 
    this.enemies.push(slime);

    let green = creator.createGreenAlien(550, 550);
    this.enemies.push(green);
    green = creator.createGreenAlien(160, 160);
    this.enemies.push(green);
    green = creator.createGreenAlien(220, 550);
    this.enemies.push(green);
    green = creator.createGreenAlien(350, 320);
    this.enemies.push(green);
    green = creator.createGreenAlien(175, 225);
    this.enemies.push(green);

    let red = creator.createRedAlien(150, 150)
    this.enemies.push(red);
    red = creator.createRedAlien(200, 200);
    this.enemies.push(red);
    red = creator.createRedAlien(250, 450);
    this.enemies.push(red);
    red = creator.createRedAlien(300, 550);
    this.enemies.push(red);
    red = creator.createRedAlien(350, 500);
    this.enemies.push(red);

    this.game.time.events.loop(Phaser.Timer.SECOND * 3, creator.loopEnemies, this); 
  }


}
export default Level1;