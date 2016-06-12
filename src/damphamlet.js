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

import {inject} from 'aurelia-framework';
import {SharedState} from './sharedstate';

@inject(SharedState)
export class DampHamlet  {

  constructor(sharedstate) {
    this.sharedstate = sharedstate;

    console.log('game constructor: ' + this.id);

    this.gender = 'Male';
    this.playerClass = 'Marine';

    this.gameWidth = 800;
    this.gameHeight = 600;



    //this.state.start('GameState');
    //this.socket = io('http://localhost:8080');

    //this.map;

    this.initialize();
    window['damphamlet'] = this;
    // this.game = this;
  }

  //aurelia event
  attached() {
   this.initialize();
   this.sharedstate.health += 1; 
  }

  canDeactivate() {    
      return confirm('This will terminate your current game. Are you sure you want to leave?');
  }
  
  initialize() {
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

    window.onkeydown = function(event) {

      if (event.keyCode === 27) {
        if (damphamlet.openDialog != null) {
          damphamlet.openDialog.close();
          damphamlet.openDialog = null;
        }
        else {
          damphamlet.instructionsDialog.show();
          damphamlet.openDialog = damphamlet.instructionsDialog;
        }
      }
    };

    // $('.playbutton').click(function() {
    //   $('.creationwindow').hide();
    //   $('.gamePanel').show();
    //   window['game'].state.start('GameState');
    // });
  }

  startGame() {
    this.phasergame.state.start('GameState');
  }

  getRandomPosition(map) {
    return [Math.random() * (map.width * this.scalemultiple * 8),
      Math.random() * (map.height * this.scalemultiple * 8)]
  }

  createNewPlayer(creationInfo) {
    let player = '';
    let game = this.phasergame;

    switch (creationInfo.class) {
      case 'Marine':
        player = new Marine(game, creationInfo);
        break;
      case 'Psi Ops':
        player = new PsiOps(game, creationInfo);
        break;
      case 'Splicer':
        player = new Splicer(game, creationInfo);
    }
    game.playerone = player;
    return player;
  }

  loadPlayer(creationInfo) {
    let player = '';
    let game = this.phasergame;
    switch (game.playerObj.classInfo.name) {
      case 'Marine':
        player = new Marine(game, creationInfo, game.playerObj);
        break;
      case 'Psi Ops':
        player = new PsiOps(game, creationInfo, game.playerObj);
        break;
      case 'Splicer':
        player = new Splicer(game, creationInfo, game.playerObj);
    }
    game.playerone = player; 
    return player;
  }

  preload() {
    this.phasergame.load.image('logo', '../build/phaser.png');
  }

  create() {
    let game = this.phasergame;
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
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
  
  openShop(player) {
    if(this.openDialog != null && this.openDialog.hasAttribute('open')) {
      this.openDialog.close();
    }
    this.shopDialog.show();
    this.openDialog = this.shopDialog;
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
    console.log('close menu in damphamlet');
    if(this.openDialog != null && this.openDialog.hasAttribute('open')) {
      this.openDialog.close();
    }
  }

  play() {
    console.log('play');
    this.phasergame = new Phaser.Game(800, 600, Phaser.AUTO, 'gameWindow', null);
    //$('.creationwindow').hide();
    
    let assetpath = '../static/assets/';
    this.phasergame.assetpath = '../static/assets/';
    this.phasergame.itempath = assetpath + 'items/';
    this.phasergame.characterpath = assetpath + 'characters/';
    this.phasergame.enemypath = assetpath + 'enemies/';
    this.phasergame.bosspath = assetpath + 'Sliced/Bosses/';
    this.phasergame.fxpath = assetpath + 'Sliced/fx_32x32/';

    this.phasergame.soundpath = assetpath + 'sounds/';
    this.phasergame.hurtpath = assetpath + 'sounds/hurt/';
    this.phasergame.ambiencepath = assetpath + 'sounds/ambience/';
    this.phasergame.fabricpath = assetpath + 'sounds/fabric/';
    this.phasergame.footpath = assetpath + 'sounds/footsteps/';
    
    this.phasergame.state.add('GameState', GameState, false);
    this.phasergame.state.add('Base', Base, false);
    this.phasergame.state.add('Level1', Level1, false);
    this.phasergame.state.add('Level2', Level2, false);
    this.phasergame.state.add('Level3', Level3, false);
    this.phasergame.state.start('GameState');
    
    this.phasergame.target = { 
      name: '', 
      health: 0
    }
    
    this.closeMenu();
    $('.gamePanel').show();
    // window['game'].state.start('GameState');
  }

}



