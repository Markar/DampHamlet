import {Player} from '../client/game/player/player';
import {Item} from '../client/game/items/item';
import {Health} from '../client/game/items/health';
import {LoadAssets} from './loadassets';
import {MusicHandler} from './MusicHandler';

class GameState extends Phaser.State {

  preload() {
    let game = this.game;
    let assets = new LoadAssets(game);

    game.onBlur.add(function() {
      console.log("BLURRED");
      if(game.players.length > 0) {
        game.players[0].pressStack.pop();
        game.players[0].isFireDown = false;
      }
    }, this);

    console.log('finish preload');
    //$('.playbutton').click(function() {
    //  this.playername = $('.inputName').val();
    //  if(playername  == "") {
    //    this.playername = "Mark";
    //  }
    //});
  }

  init() {
    let game = this.game;
    game.time.advancedTiming = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setBoundsToWorld(true, true, true, true, true);
    game.physics.p2.restitution = 0.8;

    game.playerCollisionGroup = game.physics.p2.createCollisionGroup();
    game.enemyCollisionGroup = game.physics.p2.createCollisionGroup();
    game.weaponCollisionGroup = game.physics.p2.createCollisionGroup();
    game.tileCollisionGroup = game.physics.p2.createCollisionGroup();
    game.enemyWeaponCollisionGroup = game.physics.p2.createCollisionGroup();
    game.itemCollisionGroup = game.physics.p2.createCollisionGroup();
    game.blockCollisionGroup = game.physics.p2.createCollisionGroup();

    game.enemyCount = 0;
    game.connections = 0;
    game.updateInterval = 0;
    game.attackRate = 1000;
    game.nextAttack = 0;
    game.scalemultiple = 4;
    
    game.enemies = [];
    game.slimes = [];
    game.eyes = [];
    game.greenaliens = [];
    game.redaliens = [];
    game.octopi = [];
    game.rats = [];
    game.tealaliens = [];
    game.furryaliens = [];
    game.spiders = [];
    game.players = [];
    console.log('finish init');
  }

  create() {
    this.enterWorld();
    console.log('finish create');
  }

  enterWorld() {
    let sprite = '';

    if(damphamlet.gender.toLowerCase() == "female") {
      sprite = 'char18';
    }
    else {
      sprite = 'char8';
    }

    let creationInfo = {
      x : 296,
      y : 320,
      sprite : sprite,
      class : damphamlet.playerClass
    };

    let player = damphamlet.createNewPlayer(creationInfo);
    let playerObj = player.getPlayerObject();
    this.state.start('Base', true, false, playerObj);
    
    //debugging
    // this.game.state.start('Town', true, false, playerObj);
  }
}

export default GameState;