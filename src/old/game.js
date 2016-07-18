import '../build/scripts/phaser.js';
import $ from 'jquery';
import _ from 'lodash';

import GameState from './states/GameState';
import Base from './states/base';
import Level1 from './states/Level1';
import Level2 from './states/Level2';
import Level3 from './states/Level3';

import {Marine} from './client/game/player/marine/marine';
import {PsiOps} from './client/game/player/psiops/psiops';
import {Splicer} from './client/game/player/splicer/splicer';

export class Game  {

  constructor() {
    
    console.log('game constructor: ' + this.id);
    this.assetpath = '../static/assets/';
    this.itempath = this.assetpath + 'items/';
    this.characterpath = this.assetpath + 'characters/';
    this.enemypath = this.assetpath + 'enemies/';
    this.bosspath = this.assetpath + 'Sliced/Bosses/';
    this.fxpath = this.assetpath + 'Sliced/fx_32x32/';

    this.soundpath = this.assetpath + 'sounds/';
    this.hurtpath = this.assetpath + 'sounds/hurt/';
    this.ambiencepath = this.assetpath + 'sounds/ambience/';
    this.fabricpath = this.assetpath + 'sounds/fabric/';
    this.footpath = this.assetpath + 'sounds/footsteps/';

    this.gender = 'Male';
    this.playerClass = 'Marine';

    this.gameWidth = 800;
    this.gameHeight = 600;


    //this.state.start('GameState');
    //this.socket = io('http://localhost:8080');

    //this.map;

    this.initialize();
    window['game'] = this;
    this.game = this;
  }

  //aurelia event
  //attached() {
  //  this.initialize();
  //}
  initialize() {
    //this.createDialog = document.getElementById('Create');
    this.profileDialog = document.getElementById('Profile');
    this.instructionsDialog = document.getElementById('Instructions');
    this.talentDialog = document.getElementById('Talents');
    this.weaponsDialog = document.getElementById('Weapons');
    this.explosivesDialog = document.getElementById('Explosives');
    this.shopDialog = document.getElementById('Shop');
    this.createDialog = document.getElementById('Create');
    this.openDialog = this.createDialog;

    this.clickHandler();
  }

  clickHandler() {

    // window.onkeydown = function(event) {
    //   let game = this.window.game;
    //   if (event.keyCode === 27) {
    //     if (game.openDialog != null) {
    //       game.openDialog.close();
    //       game.openDialog = null;
    //     }
    //     else {
    //       game.instructionsDialog.show();
    //       game.openDialog = game.instructionsDialog;
    //     }
    //   }
    // };

    // $('.playbutton').click(function() {
    //   $('.creationwindow').hide();
    //   $('.gamePanel').show();
    //   window['game'].state.start('GameState');
    // });
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

    switch (creationInfo.class) {
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
    switch (this.playerObj.classInfo.name) {
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

  preload() {
    this.game.load.image('logo', '../build/phaser.png');
  }

  create() {
    var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
  }

  clickProfile() {
    console.log('click in game');
    if (this.openDialog !=  null && this.openDialog.hasAttribute('open')) {
      this.openDialog.close();
    }
    this.profileDialog.show();
    this.openDialog = this.profileDialog;
  }

  clickAttributes() {
    if(this.openDialog != null && this.openDialog.hasAttribute('open')) {
      this.openDialog.close();
    }
    this.talentDialog.show();
    this.openDialog = this.talentDialog;
  }

  clickWeapons() {
    if(this.openDialog != null && this.openDialog.hasAttribute('open')) {
      this.openDialog.close();
    }
    this.weaponsDialog.show();
    this.openDialog = this.weaponsDialog;
  }

  clickGrenade() {
    if(this.openDialog != null && this.openDialog.hasAttribute('open')) {
      this.openDialog.close();
    }
    this.explosivesDialog.show();
    this.openDialog = this.explosivesDialog;
  }

  clickInstructions() {
    if(this.openDialog != null && this.openDialog.hasAttribute('open')) {
      this.openDialog.close();
    }
    this.instructionsDialog.show();
    this.openDialog = this.instructionsDialog;
  }

  clickGender(el) {
    this.gender = el.target.getAttribute('gender');
    $(el.target).siblings().css('border', "0.25em aliceblue ridge");
    $(el.target).css('border', "0.25em gold ridge");
  }

  clickClass(el) {
    let type = el.target.getAttribute('type');
    this.playerClass = type;

    $(el.target).siblings().css('border', "0.25em aliceblue ridge");
    $(el.target).css('border', "0.25em gold ridge");

    if (this.playerClass == 'Mutant' || this.playerClass == 'Cyborg') {
        $('.console').append(`<li> ${playerClass} is coming soon.</li>`);
        this.playerClass = 'Marine';
      }
  }

  closeMenu() {
    if(this.openDialog != null && this.openDialog.hasAttribute('open')) {
      this.openDialog.close();
    }
  }

  play() {
    console.log('play');
    //$('.creationwindow').hide();
    debugger;
    this.phasergame = new Phaser.Game(800, 600, Phaser.AUTO, 'gameWindow', null);
    this.phasergame.state.add('GameState', GameState, false);
    this.phasergame.state.add('Base', Base, false);
    this.phasergame.state.add('Level1', Level1, false);
    this.phasergame.state.add('Level2', Level2, false);
    this.phasergame.state.add('Level3', Level3, false);
    this.phasergame.state.start('GameState');
    this.closeMenu();
    $('.gamePanel').show();
    // window['game'].state.start('GameState');
  }

}




