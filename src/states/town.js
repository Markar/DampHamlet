import {Player} from '../client/game/player/player';
import {Creator} from './creator';
import {Item} from '../client/game/items/item';
import {Health} from '../client/game/items/health';
import {MusicHandler} from './MusicHandler';
import {Mission} from '../client/game/npcs/mission';
import {Ship1} from '../client/game/ships/ship1';

import _ from 'lodash';

class Town extends Phaser.State {

  init(playerObj) {
    this.damphamlet = window['damphamlet'];
    let game = this.game;
    game.players = [];
    game.playerObj = playerObj;
    game.physics.p2.setImpactEvents(true);
    game.MusicHandler = new MusicHandler(game); 
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
  }

  create() {
    console.log('create town');
    let game = this.game;

    this.map = game.add.tilemap('town2');
    let map = this.map;

    map.addTilesetImage('tiles');
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
    //106
    map.setCollisionByExclusion([994, 327, 304]);
    var tiles = game.physics.p2.convertTilemap(map, layer);

    for(var i = 0; i < tiles.length; i++) {
      tiles[i].setCollisionGroup(game.tileCollisionGroup);
      tiles[i].collides([game.playerCollisionGroup, game.weaponCollisionGroup, game.enemyWeaponCollisionGroup, game.enemyCollisionGroup]);
    }

    game.physics.p2.setBoundsToWorld(true, true, true, true, true);
    game.physics.p2.restitution = 0.8;

    let creationInfo = {
      x : 1235,
      y : 940,
      sprite: game.playerObj.playertype
    };

    let player = this.damphamlet.loadPlayer(creationInfo);
    game.players.push(player);

    this.game.MusicHandler.playTrack('forest'); 

    let ship = new Ship1('ship', game, 1265, 915, 'down');
    let mission = new Mission('mission', this.game, 1490, 1295);

    // this.game.time.events.loop(Phaser.Timer.SECOND * 3, creator.loopEnemies, this);
  }
}
export default Town;