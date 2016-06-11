import {Player} from '../client/game/player/player';
import {Creator} from './creator';

class Level2 extends Phaser.State {

	preload() {		

	}
	render() {
		this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
	}

	init(playerObj) {
		this.damphamlet = window['damphamlet'];	
		let game = this.game;

		game.enemyCount = 0;
		game.connections = 0;
		game.updateInterval = 0;
		game.enemies = [];
		game.attackRate = 1000;
		game.nextAttack = 0;
		game.scalemultiple = 4;

		game.slimes = [];
		game.eyes = [];
		game.greenaliens = [];
		game.redaliens = [];
		game.octopi = [];
		game.rats = [];
		game.tealaliens = [];
		game.furryaliens = [];
		game.spiders = [];
		game.enemyCount = 0;

		game.players = [];
		game.playerObj = playerObj;
    game.onBlur.add(function() {
      console.log("BLURRED");
      if(game.players.length > 0) {
        game.players[0].pressStack.pop();
      }
    }, this);
	}
	//addPlayerToStage(player, game) {
	//	"use strict";
	//	player.reset(50, 50);
	//	game.player = player;
	//	game.add.existing(player);
	//	game.physics.p2.enable(player);
	//	player.resetSprite(game);
	//	game.camera.follow(player);
	//	game.players.push(player);
	//	debugger;
  //
	//}

  preload() {
    this.stage.disableVisibilityChange = true;
  }

	create() {		
		let game = this.game;
				
		this.map = game.add.tilemap('level2');
		this.map.addTilesetImage('tiles');				
	
		let layer = this.map.createLayer('Tile Layer 1');
		layer.smoothed = false; 
		layer.setScale(game.scalemultiple);
		layer.resizeWorld();
		
		let layer2 = this.map.createLayer('Tile Layer 2');
		layer2.smoothed = false; 
		layer2.setScale(game.scalemultiple);
		layer2.resizeWorld();		
	
		//  Set the tiles for collision.
		//  Do this BEFORE generating the p2 bodies below.		
		this.map.setCollisionByExclusion([272, 298, 299, 354, 276, 301]);
	
		//  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
		//  This call returns an array of body objects which you can perform addition actions on if
		//  required. There is also a parameter to control optimising the map build.
		var tiles = game.physics.p2.convertTilemap(this.map, layer);
		
		for(var i = 0; i < tiles.length; i++) {
			tiles[i].setCollisionGroup(game.tileCollisionGroup);
			tiles[i].collides([game.playerCollisionGroup, game.weaponCollisionGroup, game.enemyWeaponCollisionGroup, game.enemyCollisionGroup]);			
		}

		let creationInfo = {
			x : 50,
			y : 50,
			sprite: game.playerObj.playertype
		};
		let player = damphamlet.loadPlayer(creationInfo);
		game.players.push(player);
		
		this.game.MusicHandler.playTrack('underwater-active'); 

    let creator = new Creator(game, this.map);
		creator.createGreenAliens(10);
    creator.createRedAliens(10);

    this.game.time.events.loop(Phaser.Timer.SECOND * 3, creator.loopEnemies, this);
		
	}


}
export default Level2;