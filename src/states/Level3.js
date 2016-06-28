import {Player} from '../client/game/player/player';
import {BlackHole} from '../client/game/bosses/blackhole';
import {Creator} from './creator';
import {Item} from '../client/game/items/item';
import {Health} from '../client/game/items/health';

class Level3 extends Phaser.State {

  init(playerObj) {
    this.damphamlet = window['damphamlet'];	
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

  }

  create() {
    let game = this.game;

    this.map = game.add.tilemap('level3');
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
    map.setCollisionByExclusion([332, 273]);
    var tiles = game.physics.p2.convertTilemap(map, layer);

    for(var i = 0; i < tiles.length; i++) {
      tiles[i].setCollisionGroup(game.tileCollisionGroup);
      tiles[i].collides([game.playerCollisionGroup, game.weaponCollisionGroup, game.enemyWeaponCollisionGroup, game.enemyCollisionGroup]);
    }

    game.physics.p2.setBoundsToWorld(true, true, true, true, true);
    game.physics.p2.restitution = 0.8;

    let creationInfo = {
      x : 50,
      y : 50,
      sprite: game.playerObj.playertype
    };

    let player = damphamlet.loadPlayer(creationInfo);
    game.players.push(player);
    this.game.MusicHandler.playTrack('lava-deep'); 

    let creator = new Creator(game, this.map);
    let bh = new BlackHole('blackhole', this.game, 600, 600);

    this.game.time.events.loop(Phaser.Timer.SECOND * 3, creator.loopEnemies, this);
    player.currentMission = this;
  }
}
export default Level3;