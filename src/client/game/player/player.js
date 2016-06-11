"use strict";

import {Laser} from '../weapons/laser';
import {Pistol} from '../weapons/pistol';
import {Rockets} from '../weapons/rockets';
import {AssaultRifle} from '../weapons/assaultrifle';
import {Shotgun} from '../weapons/shotgun';
import {BulletAmmo} from '../items/ammo';
import {Grenade} from '../weapons/abilities/grenade';
import {Items} from './items';
import {Skills} from './skills';
import {Inventory} from './inventory';

import {Shop} from './shop';
import {PlayerInputs} from './inputs';

export class Player extends Phaser.Sprite {

  constructor(game, creationInfo, playerObj) {
    super(game, creationInfo.x, creationInfo.y, creationInfo.sprite);
    this.creationInfo = creationInfo;
    this.damphamlet = window['damphamlet'];

    let profileImg = '';
    let defaultName = '';
    let gender = game.gender;
    this.inventory = new Inventory();

    if(gender == "female") {
      let loc = game.characterpath + '/femalenerd.png';
      //profileImg = '<img class="profileImg" src="./assets/characters/femalenerd.png" />';
      profileImg = `<img class="profileImg" src="${loc}" />`;
      defaultName = 'Laura';
    }
    else {
      let loc = game.characterpath + '/femalenerd.png';
      profileImg = `<img class="profileImg" src="${loc}" />`;
      //profileImg = '<img class="profileImg" src="./assets/characters/Nerd.png" />';
      defaultName = 'Mark';
    }

    $(".imgProfile").html("");
    $(".imgProfile").append(profileImg);
    game.add.existing(this);
    game.physics.p2.enable(this);
    game.camera.follow(this);
    this.isFireDown = false;

    this.playername = $('.inputName').val();
    if (this.playername.length < 1) {
      this.playername = defaultName;
    }

    //Weapon group
    this.weapons = game.add.group();
    this.weapons.enableBody = true;
    this.weapons.physicsBodyType = Phaser.Physics.P2JS;

    //Animations
    this.animations.add('right', [1, 2], 3, true);
    this.animations.add('down', [4, 5], 3, true);
    this.animations.add('left', [7, 8], 3, true);
    this.animations.add('up', [10, 11], 3, true);
    this.animations.add('death', [13], 1, true);
    this.animations.add('profile', [0], 1, true);
    this.game = game;
    //Sounds
    this.sfxHit1 = game.add.audio('hurt4');
    this.sfxHit2 = game.add.audio('hurt5');
    this.sfxHit3 = game.add.audio('hurt6');
    this.sfxPickup1 = game.add.audio('pickup1');
    this.sfxPickup2 = game.add.audio('pickup2');
    this.sfxPickup3 = game.add.audio('pickup3');
    this.sfxDeath = game.add.audio('hurt2');
    this.sfxElevator = game.add.audio('elevatorOpen');
    this.sfxdoorClose = game.add.audio('doorClose');

    this.nextWalk = 500;
    this.walkIndex = 0;
    this.walk = [
      [
        game.add.audio('walkmetal1'),
        game.add.audio('walkmetal2'),
        game.add.audio('walkmetal3'),
        game.add.audio('walkmetal4'),
        game.add.audio('walkmetal5'),
        game.add.audio('walkmetal6'),
        game.add.audio('walkmetal7'),
        game.add.audio('walkmetal8'),
      ],
      []
    ];
    for (let i = 0; i < this.walk[0].length; i++){
      this.walk[0][i].volume = 0.25;
    }

    

    this.pressStack = [];
    //this.playerinputs = new PlayerInputs(this.game, this);
    this.skills = new Skills();
    //player loop
    this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.playerLoop, this);
  }

  playerLoop() {
    this.regenerate();
  }
  regenerate() {
    let atr = this.attributes;
    this.addStamina(10);
  }

  writeconsole(message) {
    if (this.console.length <= this.consoleLimit) {
      this.console.push(message);
    }
    else{
      this.console.shift();
      this.console.push(message);
    }

    this.consoleElement.html('');
    for (let i = 0; i < this.console.length; i++){
      let htmlMsg = "<li>" + this.console[i] + "</li>";
      this.consoleElement.append(htmlMsg);
    }
  }

  addPistol() {
    this.pistol = new Pistol(this.game, this);
    this.hasPistol = 1;
  }

  addLaserPistol() {
    this.laser = new Laser(this.game, this);
    this.hasLaserPistol = 1;
  }

  addRocketLauncher() {
    this.rockets = new Rockets(this.game, this);
    this.hasRocketLauncher = 1;
  }

  addAssaultRifle() {
    this.assaultrifle = new AssaultRifle(this.game, this);
    this.hasAssaultRifle = 1;
  }

  addShotgun() {
    this.shotgun = new Shotgun(this.game, this);
    this.hasShotgun = 1;
  }

  debug() {
    this.attributes.health.current = 100;
    this.attributes.health.max = 100;
    this.attributes.credits = 1000;
    this.attributes.speed = 300;
    this.skills.points.available = 10;

    this.items.medkits.quantity = 2;
    this.items.grenades.quantity = 5;

    this.hasPistol = 1;
    this.hasLaserPistol = 1;
    this.hasRocketLauncher = 1;
    this.hasAssaultRifle = 1;
    this.hasShotgun = 1;
  }

  getPlayerObject() {
    let player = {};
    player.stagelevel = this.stagelevel;
    player.console = this.console;
    player.consoleLimit = this.consoleLimit;

    player.attributes = this.attributes;
    player.classInfo = this.classInfo;
    player.items = this.items;
    console.log('skills in getplayerobj ', this.skills);
    player.skills = this.skills;

    player.playertype = this.playertype;
    player.weaponsFired = this.attributes.weaponsFired;
    player.canmove = this.canmove;
    player.canfire = this.canfire;
    player.alive = this.alive;
    player.nextHit = this.nextHit;
    player.pressStack = this.pressStack;
    player.inventory = this.inventory;

    player.hasPistol = this.hasPistol;
    player.hasLaserPistol = this.hasLaserPistol;
    player.hasRocketLauncher = this.hasRocketLauncher;
    player.hasAssaultRifle = this.hasAssaultRifle;
    player.hasShotgun = this.hasShotgun;

    if (player.hasPistol) {
      player.pistolObj = this.pistol.getObj();
    }
    if (player.hasLaserPistol) {
      player.laserObj = this.laser.getObj();
    }
    if (player.hasRocketLauncher) {
      player.rocketsObj = this.rockets.getObj();
    }
    if (player.hasAssaultRifle) {
      player.assaultrifleObj = this.assaultrifle.getObj();
    }
    if (player.hasShotgun) {
      player.shotgunObj = this.shotgun.getObj();
    }

    player.weapon = this.weapon;

    return player;
  }

  //clean up sprints on level change
  scrubSkills() {
    if (this.skills.sprint.active) {
      this.skills.sprint.active = 0;
      this.attributes.speed -= 75;
    }
  }

  //load anything generic to all classes here
  loadPlayerObject(playerObj) {
    this.consoleElement = $('.console');
    this.pressStack = [];

    this.stagelevel = playerObj.stagelevel;
    this.console = playerObj.console;
    this.consoleLimit = playerObj.consoleLimit;
    this.playertype = playerObj.playertype;
    this.canmove = playerObj.canmove;
    this.canfire = playerObj.canfire;
    this.alive = playerObj.alive;
    this.nextHit = playerObj.nextHit;

    //objects
    this.attributes = playerObj.attributes;
    this.inventory = playerObj.inventory;
    this.skills = playerObj.skills;
    this.classInfo = playerObj.classInfo;
    this.scrubSkills();

    this.items = playerObj.items;

    //weapons
    this.hasPistol = playerObj.hasPistol;
    this.hasLaserPistol = playerObj.hasLaserPistol;
    this.hasRocketLauncher = playerObj.hasRocketLauncher;
    this.hasAssaultRifle = playerObj.hasAssaultRifle;
    this.hasShotgun = playerObj.hasShotgun;

    if (this.hasPistol) {
      this.pistolObj = playerObj.pistolObj;
      this.pistol = new Pistol(this.game, this);
      this.pistol.loadObj(this.pistolObj);
      this.weapon = this.pistol;
      this.weapon.sprite.visible = true;
    }
    if (this.hasLaserPistol) {
      this.laserObj = playerObj.laserObj;
      this.laser = new Laser(this.game, this);
      this.laser.loadObj(this.laserObj);
    }
    if (this.hasRocketLauncher) {
      this.rocketsObj = playerObj.rocketsObj;
      this.rockets = new Rockets(this.game, this);
      this.rockets.loadObj(this.rocketsObj);
    }
    if (this.hasAssaultRifle) {
      this.assaultrifleObj = playerObj.assaultrifleObj;
      this.assaultrifle = new AssaultRifle(this.game, this);
      this.assaultrifle.loadObj(this.assaultrifleObj);
    }
    if (this.hasShotgun) {
      this.shotgunObj = playerObj.shotgunObj;
      this.shotgun = new Shotgun(this.game, this);
      this.shotgun.loadObj(this.shotgunObj);
    }

    this.equipWeapon(playerObj.weapon.name);

    if(this.skills.explosives > 0) {
      this.grenade = new Grenade(this.game, this);
    }

    this.shop = new Shop(this);
    this.playerinputs = new PlayerInputs(this.game, this);
    this.resetSprite(this.game);
  }


  enableGrenades() {
    this.grenade = new Grenade(this.game, this);
  }


  changeSpeed(amount) {
    this.attributes.speed += amount;
  }

  changeMaxHp(amount) {
    this.attributes.health.max += amount;
    this.attributes.health.current += amount;
  }

  equipWeapon(strWeapon) {
    switch(strWeapon) {
      case "Pistol":
        this.switchWeapons(this.pistol);
        break;
      case "Laser":
        this.switchWeapons(this.laser);
        break;
      case "Rockets":
        this.switchWeapons(this.rockets);
        break;
      case "Shotgun":
        this.switchWeapons(this.shotgun);
        break;
      case "Assault Rifle":
        this.switchWeapons(this.assaultrifle);
        break;
    }

    this.setWeaponPosition();
  }

  switchWeapons(toWeapon) {
    if (this.weapon == toWeapon)
      return;
    else{
      //hide the old weapon, switch to new weapon, show new weapon
      this.weapon.sprite.visible = false;
      this.weapon = toWeapon;
      this.weapon.sprite.visible = true;
      this.setWeaponPosition();
      this.weapon.nextFire = this.game.time.now + 1000;
    }
  }

  resetSprite(game) {
    //Sprite
    this.scale.setTo(game.scalemultiple);
    this.smoothed = false;
    this.body.collideWorldBounds = true;
    this.body.setCircle(15);
    this.body.setCollisionGroup(game.playerCollisionGroup);
    this.body.fixedRotation = true;
    this.body.mass = 10;
    this.body.damping = 0.9999999;

    this.body.collides([game.tileCollisionGroup]);
    this.body.collides([game.itemCollisionGroup, game.enemyCollisionGroup]);
    this.body.collides([game.weaponCollisionGroup, game.enemyWeaponCollisionGroup], this.hit, this);
  }

  addAmmo(amount) {
    this.pistol.ammo += amount;
  }

  addHighCaliburAmmo(amount) {
    this.assaultrifle.ammo += amount;
  }

  addShells(amount) {
    this.shotgun.ammo += amount;
  }

  addCredits(amount) {
    this.attributes.credits += amount;
  }

  addGrenades(amount) {
    let grenade = this.inventory.items.grenades;

    if(grenade.quantity < grenade.carryMax || amount < 0) {
      grenade.quantity += amount;
    }
  }

  addMedkits(amount) {
    let kit = this.inventory.items.medkits;
    if(kit.quantity < kit.carryMax || amount < 0) {
      kit.quantity += amount;
    }
  }

  addRockets(amount) {
    this.rockets.ammo += amount;
  }

  addHealth(amount) {
    this.attributes.health.current += amount;

    if (this.attributes.health.current > this.attributes.health.max)
      this.attributes.health.current = this.attributes.health.max;

    if (this.attributes.health.current <= 0) {
      this.die();
    }
  }

  setSkillPoints(amount) {

    if(amount < 0) {
      //if amount is negative, spending points so check if they have enough
      if(this.skills.points.available < -amount) {
        this.writeconsole("not enough talent points.");
        return false;
      }
    }

    //otherwise, go ahead and add the points
    this.skills.points.available += amount;
    return true;
  }

  addArmor(amount) {
    this.armor = amount;
  }

  useMedkit() {
    if (this.items.medkits.quantity > 0 && this.attributes.hp < this.attributes.maxhp) {
      this.addMedkits(-1);
      this.addHealth(this.items.medkits.restore);
      this.writeconsole('Ahh, feels good.');
    }
  }

  recall() {
    let playerObj = this.getPlayerObject();
    this.writeconsole('Teleporting to base.');
    this.canmove = 0;

    this.game.time.events.add(5000, () => {
      this.canmove = 1;
      this.game.state.start('Base', true, false, playerObj);
    });
  }

  interact() {
    let tileArray = this.getCurrentTiles();

    //collision tile
    let cTile = tileArray[2];

    //interaction tile
    let iTile = tileArray[3];
    let point = tileArray[4];

    console.log('interact');

    if (iTile != null) {
      console.log('iTile' + iTile.index);
      if (iTile.index == 655) {
        this.damphamlet.openShop();
      }
      if (iTile.index == 684) {
        this.writeconsole("Teleporting to the space station.");
        this.stagelevel = 1;
        let playerObj = this.getPlayerObject();
        this.game.state.start('Level' + this.stagelevel, true, false, playerObj);
      }
      if (iTile.index == 298 || iTile.index == 299) {
        //down
        console.log('transition level');
        this.stagelevel++;
        let playerObj = this.getPlayerObject();
        this.game.state.start('Level' + this.stagelevel, true, false, playerObj);
      }
      if (iTile.index == 297) {
        //up
        if (this.stagelevel > 0) {
          this.stagelevel--;
          this.game.state.start('Level' + this.stagelevel, true, false, this);
        }
      }
      //open door
      if ((iTile.index == 72 //green-south
        || iTile.index == 92 //red-east
        || iTile.index == 42 //green-west
        || iTile.index == 62) //red-north
        && cTile != null) {
        if (iTile.alpha == 1) {
          this.sfxElevator.play();
          //have to set the layer to dirty for instant refresh, else visual update only when the camera moves
          iTile.alpha = 0;
          iTile.layer.dirty = true;
          this.collisionBody = this.game.physics.p2.hitTest(point);
          let body = this.collisionBody[0].parent;
          this.game.physics.p2.removeBody(body);

          this.game.time.events.add(8000, () => {
            this.sfxdoorClose.play();
            this.game.physics.p2.addBody(body);
            iTile.alpha = 1;
            iTile.layer.dirty = true;
          });
        }

        if (tileArray[0] == 14) {
          this.writeconsole("Teleporter to the space station.");
        }
        if (tileArray[0] == 18) {
          this.writeconsole("Cellular reconstruction.");
        }
      }

      if (iTile.index == 659) {
        this.writeconsole("add cellular reconstruction here");
      }
    }

  }


  reload() {
    console.log('reload');
    this.weapon.reload(this);
  }

  //accepts positive or negative integers, returns success
  addStamina(amount) {
    let current = this.attributes.stamina.current;
    let max = this.attributes.stamina.max;
    //check if consuming stamina
    if(amount < 0) {
      //check if we have enough stamina
      if(current + amount < 0) {
        this.writeconsole('not enough stamina');
        return false;
      }
    }
    //check if healing stamina
    if(amount > 0) {
      //check if healing stamina
      if(current + amount > max) {
        this.attributes.stamina.current = max;
        return true;
      }
    }

    //if we get here, heal the stamina by the amount passed in
    this.attributes.stamina.current += amount;
    return true;
  }

  addEnergy(amount) {
    let current = this.attributes.energy.current;
    let max = this.attributes.energy.max;

    //check if consuming
    if(amount < 0) {
      //check if we have enough stamina
      if(current + amount < 0) {
        this.writeconsole('not enough energy');
        return false;
      }
    }
    //check if healing stamina
    if(amount > 0) {
      //check if healing stamina
      if(current + amount > max) {
        this.attributes.energy.current = max;
        return true;
      }
    }

    //if we get here, heal the stamina by the amount passed in
    this.attributes.energy.current += amount;
    return true;
  }

  sprint() {
    let atr = this.attributes;
    let cost = this.skills.sprint.cost;

    if( this.skills.sprint.active == 0 && atr.stamina.current > cost) {

      if(this.addStamina(cost)) {
        //consume one stamina, +75 speed for 3s
        atr.speed += 75;
        this.skills.sprint.active = 1;
        console.log('sprint active');

        this.game.time.events.add(3000, function() {
          console.log('reduce sprint speed');
          this.attributes.speed -= 75;
          this.skills.sprint.active = 0;
        }, this);
      }
    }
  }

  getCurrentTiles() {
    console.log('x ' + this.body.x + ' y ' + this.body.y);
    let tile = [
      Math.floor(this.body.x / 32),
      Math.floor(this.body.y / 32)
    ];
    //let x = Math.floor(this.body.x / 32);
    //let y = Math.floor(this.body.y / 32);
    let state = this.game.state.getCurrentState();
    console.log('x ' + tile[0] + ' y ' + tile[1]);

    //Try to get the interaction layer of the tile we're on first.
    let tmptile = null;
    let tmptile2 = null;
    let point = null;

    tmptile = state.map.getTile(tile[0], tile[1], 'Tile Layer 2');

    if (tmptile == null) {
      //Now try to get the interaction layer 1 tile ahead of us
      switch (this.direction){
        case 0:
          tile[0] -= 1;
          tmptile = state.map.getTile(tile[0], tile[1], 'Tile Layer 1');
          tmptile2 = state.map.getTile(tile[0], tile[1], 'Tile Layer 2');
          point = new Phaser.Point(this.body.x - 32, this.body.y);
          break;
        case 1:
          tile[0] += 1;
          tmptile = state.map.getTile(tile[0], tile[1], 'Tile Layer 1');
          tmptile2 = state.map.getTile(tile[0], tile[1], 'Tile Layer 2');
          point = new Phaser.Point(this.body.x + 32, this.body.y);
          break;
        case 2:
          tile[1] -= 1;
          tmptile = state.map.getTile(tile[0], tile[1], 'Tile Layer 1');
          tmptile2 = state.map.getTile(tile[0], tile[1], 'Tile Layer 2');
          point = new Phaser.Point(this.body.x, this.body.y - 32);
          break;
        case 3:
          tile[1] += 1;
          tmptile = state.map.getTile(tile[0], tile[1], 'Tile Layer 1');
          tmptile2 = state.map.getTile(tile[0], tile[1], 'Tile Layer 2');
          point = new Phaser.Point(this.body.x, this.body.y + 32);
          break;
      }
    }
    if (tmptile2 == null) {
      //finally, try to get the standard layer of our current tile
      tmptile = state.map.getTile(tile[0], tile[1], 'Tile Layer 1');
      tmptile2 = state.map.getTile(tile[0], tile[1], 'Tile Layer 2');
      point = null;
    }

    tile.push(tmptile);
    tile.push(tmptile2);
    tile.push(point);
    return tile;
  }

  attack() {
    this.weapon.fire();
  }

  die() {
    this.alive = 0;
    this.body.setCircle(0);
    this.sfxDeath.play();
    this.dropCorpse();
  }

  pickupHealth(amount) {
    this.attributes.health.current += amount;

    if (this.attributes.health.current > this.attributes.health.max)
      this.attributes.health.current = this.attributes.health.max;
  }

  pickupCredits(amount) {
    let rnd = this.game.rnd.between(1, 3);
    if (rnd == 1)
      this.sfxPickup1.play();
    if (rnd == 2)
      this.sfxPickup2.play();
    else
      this.sfxPickup3.play();

    this.attributes.credits += amount;
    this.writeconsole("Picked up " + amount + " credits.");
  }

  dropCorpse() {
    this.corpse = this.game.add.sprite(this.body.x, this.body.y, this.playertype);
    this.corpse.smoothed = false;
    this.corpse.animations.add('body', [12]);
    this.corpse.animations.play('body');
    this.corpse.scale.setTo(4);
  }

  hit(body1, body2) {
    if (this.alive == 1 && this.game.time.now > this.nextHit) {

      if (body2 != null) {
        this.takeDamage(body2.sprite.damage);
      }
    }
  }

  takeDamage(amount) {
    let dmg = 0;

    //Play randomized hit sfx
    let rnd = this.game.rnd.between(4, 6);
    if (rnd == 4)
      this.sfxHit1.play();
    if (rnd == 5)
      this.sfxHit2.play();
    else
      this.sfxHit3.play();

    //calculate damage to take
    if (this.attributes.armor > -1) {
      dmg = amount - this.attributes.armor;

      if (dmg < 1) {
        dmg = 1;
      }
    }

    //apply the damage to this player
    this.addHealth(-dmg);
    this.nextHit = this.game.time.now + 50;
  }

  update() {
    this.move();

    if (this.isFireDown) {
      this.attack();
    }
  }

  sfxWalk() {
    if (this.game.time.now > this.nextWalk) {
      this.nextWalk = this.game.time.now + 400;
      this.walk[0][this.walkIndex].play();
      this.walkIndex++;

      if (this.walkIndex > 7) {
        this.walkIndex = 0;
      }
    }

  }

  setWeaponPosition() {
    switch (this.direction){
      case 0:
        this.weapon.sprite.angle = 0;
        this.weapon.sprite.scale.x = -0.5;
        this.weapon.sprite.x = -4;
        this.weapon.sprite.y = 1;
        return;
      case 1:
        this.weapon.sprite.scale.x = 0.7;
        this.weapon.sprite.angle = 0;
        this.weapon.sprite.x = -1.25;
        this.weapon.sprite.y = 0.8;
        return;
      case 2:
        this.weapon.sprite.scale.x = -0.7;
        this.weapon.sprite.angle = 90;
        this.weapon.sprite.x = 3.5;
        this.weapon.sprite.y = 0;
        return;
      case 3:
        this.weapon.sprite.scale.x = -0.5;
        this.weapon.sprite.angle = 270;
        this.weapon.sprite.x = -3.5;
        this.weapon.sprite.y = 2;
        return;
    }
  }

  move() {
    if (this.body != null)
    //this.body.setZeroVelocity();

      if (this.alive == 0) {
        let speed = this.attributes.speed;
        this.weapon.sprite.visible = false;
        switch (this.pressStack[this.pressStack.length - 1]){
          case "left":
            this.body.moveLeft(speed);
            this.animations.play('death');
            this.direction = 0;
            return;
          case "right":
            this.body.moveRight(speed);
            this.animations.play('death');
            this.direction = 1;
            return;
          case "up":
            this.body.moveUp(speed);
            this.animations.play('death');
            this.direction = 2;
            return;
          case "down":
            this.body.moveDown(speed);
            this.animations.play('death');
            this.direction = 3;
            return;
          default:
            this.animations.stop();
        }
      }
      else{
        if (this.canmove == 1) {
          let speed = this.attributes.speed;
          switch (this.pressStack[this.pressStack.length - 1]){
            case "left":
              this.body.moveLeft(speed);
              this.animations.play('left');
              this.direction = 0;
              this.setWeaponPosition();
              this.sfxWalk();
              return;
            case "right":
              this.body.moveRight(speed);
              this.animations.play('right');
              this.direction = 1;
              this.setWeaponPosition();
              this.sfxWalk();
              return;
            case "up":
              this.body.moveUp(speed);
              this.animations.play('up');
              this.direction = 2;
              this.setWeaponPosition();
              this.sfxWalk();
              return;
            case "down":
              this.body.moveDown(speed);
              this.animations.play('down');
              this.direction = 3;
              this.setWeaponPosition();
              this.sfxWalk();
              return;
            default:
              this.animations.stop();
          }
        }
      }


  }
}
