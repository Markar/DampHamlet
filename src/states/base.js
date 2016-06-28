import {Player} from '../client/game/player/player';
import {Creator} from './creator';

import {Item} from '../client/game/items/item';
import {Health} from '../client/game/items/health';
import {Ship1} from '../client/game/ships/ship1';

import _ from 'lodash';

class Base extends Phaser.State {

  init(playerObj) {
    let game = this.game;
    game.players = [];
    game.playerObj = playerObj;
    game.physics.p2.setImpactEvents(true); 
  }

  preload() {
    this.stage.disableVisibilityChange = true;
  }

  render() {
    let game = this.game;
    let sprite = game.ball;

    //game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
    //if(game.players[0].psiBall.psiballs.countLiving() > 0) {
    //  game.players[0].psiBall.psiballs.forEachAlive(function(ball) {
    //    game.debug.spriteBounds(ball)
    //  });
    //}

  }

 

  create() {
    let game = this.game;
    this.enemies = [];

    this.map = game.add.tilemap('base');
    let map = this.map;

    map.addTilesetImage('tiles');
    map.addTilesetImage('space');
    map.addTilesetImage('lofi_horror_env');

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
    //map.setCollisionByExclusion([274, 295, 296, 297, 298]);
    map.setCollisionByExclusion([1587,302,333]);
    var tiles = game.physics.p2.convertTilemap(map, layer, true, false);

    for(var i = 0; i < tiles.length; i++) {
      tiles[i].setCollisionGroup(game.tileCollisionGroup);
      tiles[i].collides([game.playerCollisionGroup, game.weaponCollisionGroup, game.enemyWeaponCollisionGroup, game.enemyCollisionGroup, game.blockCollisionGroup]);
    }

    game.physics.p2.setBoundsToWorld(true, true, true, true, true);
    game.physics.p2.restitution = 0.8;

    let creationInfo = {
      x : (18.5 * 32),
      y : (12.5 * 32),
      sprite: game.playerObj.playertype
    };

    let player = damphamlet.loadPlayer(creationInfo);

    game.players.push(player);

    let ship = new Ship1('ship', game, 300, 400, 'left');

     
    // let creator = new Creator(game, this.map);
    // let slimes = creator.createSlimes(3);
    // for(let i = 0; i < slimes.length; i++) { 
    //   this.enemies.push(slimes[i]);
    // }

    
    // this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.checkWinCondition, this);
    this.game.MusicHandler.playTrack('hangar1');
  }

  //  checkWinCondition() {
  //   for(let i = 0; i < this.enemies.length; i++) { 
  //     if(this.enemies[i].alive) { 
  //       return;
  //     }
  //   }
  //   console.log('Finished mission');
  // }

}
export default Base;