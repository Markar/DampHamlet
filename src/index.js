import GameState from './states/GameState';
import Base from './states/base';
import Level1 from './states/Level1';
import Level2 from './states/Level2';
import Level3 from './states/Level3';

import {Marine} from './client/game/player/marine/marine';
import {PsiOps} from './client/game/player/psiops/psiops';
import {Splicer} from './client/game/player/splicer/splicer';

import $ from 'jquery';
import _ from 'lodash';
import Phaser from 'phaser';


class Game extends Phaser.Game {

	constructor() {

		super(800, 600, Phaser.AUTO, 'gameWindow', null);

		this.itempath = '/assets/items/';
		this.characterpath = '/assets/characters/';
		this.enemypath = '/assets/enemies/';
		this.assetpath = '/assets/';

		this.gameWidth = 800;
		this.gameHeight = 600;

		this.state.add('GameState', GameState, false);
		this.state.add('Base', Base, false);
		this.state.add('Level1', Level1, false);
		this.state.add('Level2', Level2, false);
		this.state.add('Level3', Level3, false);

		//this.state.start('GameState');
		//this.socket = io('http://localhost:8080');

		this.map;

		window['game'] = this;
    this.game = this;

		console.log('before play button');
	}

	startGame() {
		this.state.start('GameState');
	}

	getRandomPosition(map) {
		return [Math.random() * (map.width * this.scalemultiple * 8), 
			    Math.random() * (map.height * this.scalemultiple * 8)]
	}

	createNewPlayer(creationInfo) {
		let player = '';

		switch(creationInfo.class) {
			case 'Marine':
				player = new Marine(this, creationInfo);
				break;
			case 'Psi Ops':
				player = new PsiOps(this, creationInfo);
				break;
			case 'Splicer':
				player = new Splicer(this, creationInfo);
		}
    return player;
	}

	loadPlayer(creationInfo) {
		let player = '';
		switch(this.playerObj.classInfo.name) {
			case 'Marine':
				player = new Marine(this, creationInfo, this.playerObj);
				break;
			case 'Psi Ops':
				player = new PsiOps(this, creationInfo, this.playerObj);
				break;
			case 'Splicer':
				player = new Splicer(this, creationInfo, this.playerObj);
		}
		return player;
	}
         
//  start() {    
//     $('.play').attr('disabled', true);
//      = new Phaser.Game(this.gameWidth, this.gameHeight, Phaser.AUTO, 'gameWindow', 
//       { preload: this.preload, create: this.create, update: this.update });   
//   }
  
}

new Game();
