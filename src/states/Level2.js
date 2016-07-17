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
		game.onBlur.add(function () {
			console.log("BLURRED");
			if (game.players.length > 0) {
				game.players[0].pressStack.pop();
			}
		}, this);
	}

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

		for (var i = 0; i < tiles.length; i++) {
			tiles[i].setCollisionGroup(game.tileCollisionGroup);
			tiles[i].collides([game.playerCollisionGroup, game.weaponCollisionGroup, game.enemyWeaponCollisionGroup, game.enemyCollisionGroup]);
		}

		let creationInfo = {
			x: 50,
			y: 50,
			sprite: game.playerObj.playertype
		};

		let player = damphamlet.loadPlayer(creationInfo);
		game.players.push(player);
		this.player = player;
		this.game.physics.p2.setBoundsToWorld(true, true, true, true, true);
		this.game.physics.p2.restitution = 0.8;
		this.game.MusicHandler.playTrack('underwater-active');

		this.enemies = [];
		this.setup();

		this.player.currentMission = this;
	}

	setup() {
		let game = this.game;

		let creationInfo = {
			x: 50,
			y: 50,
			sprite: game.playerObj.playertype
		};

		let player = this.damphamlet.loadPlayer(creationInfo);
		game.players.push(player);
		this.player = player;
		this.player.currentMission = this;
		this.setDifficulty();
	}

	setDifficulty() {
		switch (this.difficulty) {
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
		let creator = new Creator(game, this.map);
		let green = '';
		let red = '';


		green = creator.createGreenAlien(275, 600);
		this.enemies.push(green);
		green = creator.createGreenAlien(430, 630);
		this.enemies.push(green);
		green = creator.createGreenAlien(365, 750);
		this.enemies.push(green);
		green = creator.createGreenAlien(530, 855);
		this.enemies.push(green);

		//Northeast corner
		green = creator.createGreenAlien(1300, 300);
		this.enemies.push(green);
		green = creator.createGreenAlien(1400, 230);
		this.enemies.push(green);
		green = creator.createGreenAlien(1300, 100);
		this.enemies.push(green);

		//Southwest room 
		red = creator.createRedAlien(465, 1125);
		this.enemies.push(red);
		red = creator.createRedAlien(465, 1485);
		this.enemies.push(red);
		red = creator.createRedAlien(90, 1500);
		this.enemies.push(red);
		red = creator.createRedAlien(80, 1140);
		this.enemies.push(red);

		//Southeast room
		red = creator.createRedAlien(1525, 1300);
		this.enemies.push(red);
		red = creator.createRedAlien(1525, 1400);
		this.enemies.push(red);
		red = creator.createRedAlien(1525, 1500);
		this.enemies.push(red);
		red = creator.createRedAlien(1250, 1485);
		this.enemies.push(red);
		red = creator.createRedAlien(1300, 1300);
		this.enemies.push(red);
		red = creator.createRedAlien(1300, 1400);
		this.enemies.push(red);
		green = creator.createGreenAlien(1350, 1500);
		this.enemies.push(green);
		green = creator.createGreenAlien(1300, 1500);
		this.enemies.push(green);
		green = creator.createGreenAlien(1400, 1500);
		this.enemies.push(green);

		this.game.time.events.loop(Phaser.Timer.SECOND * 3, creator.loopEnemies, this);
	}

}
export default Level2;