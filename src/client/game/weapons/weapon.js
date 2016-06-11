"use strict";

export class Weapon {

  constructor(game, key, count, player) {
    this.game = game;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.player = player; 

    this.basicSetup();

    this.weapons = game.add.group();
    this.weapons.enableBody = true;
    this.weapons.physicsBodyType = Phaser.Physics.P2JS;

    this.addWeapon(0, 0, key, count, this.size);
  }

  basicSetup() {
    this.name = "none";
    this.nextFire = 0;
    this.fireRate = 500;
    this.totalAttacks = 0;
    this.size = 5;
    this.speed = 100;
    this.damage = 1;
    this.mass = 1;

    this.clip = -1;
    this.clipSize = -1;
    this.ammo = -1;
    this.ammoMax = -1;
    this.reloadTime = -1;
    this.reloading = 0;

    // $(".clip").text(this.clip);
    // $(".ammo").text(this.ammo);
  }

  getObj() {
    let obj = {};
    obj.fireRate = this.fireRate;
    obj.weaponsFired = this.weaponsFired;
    obj.name = this.name;
    obj.clipSize = this.clipSize;
    obj.clip = this.clip;
    obj.ammo = this.ammo;
    obj.reloadTime = this.reloadTime;
    obj.speed = this.speed;
    obj.mass = this.mass;
    obj.size = this.size;
    obj.damage = this.damage;
    console.log('getobj dmg ' + this.damage);
    return obj;
  }

  loadObj(obj) {
    this.fireRate = obj.fireRate;
    this.weaponsFired = obj.weaponsFired;
    this.name = obj.name;
    this.clipSize = obj.clipSize;
    this.clip = obj.clip;
    this.ammo = obj.ammo;
    this.reloadTime = obj.reloadTime;
    this.speed = obj.speed;
    this.mass = obj.mass;
    this.size = obj.size;
    this.damage = obj.damage;
    console.log('set all ' + this.name + ' '  + this.damage + '(' + obj.damage + ')');
    //this.weapons.setAll('damage', this.damage);
    this.setDamage(this.damage);
    $(".clip").text(this.clip);
    $(".ammo").text(this.ammo);
  }

  setDamage(damage) {
    this.damage = damage;
    this.weapons.setAll('damage', damage);
  }


  reload() {
    if(this.clip == -1 ||
      this.clip == this.clipSize ||
      this.ammo < 1) {
      return;
    }

    if(this.reloadTime > 0) {
      let weapon = this;
      weapon.reloading = 1;
      if(weapon.sfxReload)
        weapon.sfxReload.play();
      //prevent firing while reloading
      this.nextFire = this.game.time.now + this.reloadTime;

      let shotsToReload = (this.clipSize - this.clip);
      if(shotsToReload < 1 || shotsToReload > this.clipSize)
        return;

      if(shotsToReload < this.ammo) {
        this.clip += shotsToReload;
        this.ammo -= shotsToReload;
      }
      else {
        //only reload the remaining ammo
        this.clip += this.ammo;
        this.ammo = 0;
      }

      this.game.time.events.add(this.reloadTime, () => {
        weapon.reloading = 0;
        $(".clip").text(this.clip);
        $(".ammo").text(this.ammo);
      });
    }
  }

  addWeapon(x, y, key, count, size) {
    for(let i = 0; i < count; i++) {
      let weapon = this.weapons.create(x, y, key, 0, false);
      this.game.physics.p2.enable(weapon);

      weapon.scale.setTo(this.game.scalemultiple);
      weapon.anchor.setTo(0.5, 0.5);

      weapon.smoothed = false;
      weapon.enableBody = true;
      weapon.speed = this.speed;
      weapon.damage = this.damage;
      weapon.player = this.player;
      weapon.class = this;

      weapon.body.mass = this.mass;
      weapon.body.setCircle(this.size);
      weapon.body.setCollisionGroup(this.game.weaponCollisionGroup);
      weapon.body.collides(this.game.blockCollisionGroup, this.block, weapon);
      weapon.body.collides([this.game.enemyCollisionGroup, this.game.tileCollisionGroup, this.game.blockCollisionGroup], this.weaponHit, weapon);
    }
  }

  block(body1, body2) {
    console.log('blocked in weapon');
  }
  //called when a weapon hits something. Destroy the weapon
  weaponHit(body1, body2) {
    this.kill();
  }

  delayedFire() {
    let player = this.player; 
    player.canmove = 1; 
    player.canfire = 1; 
    this.nextFire = this.game.time.now + this.fireRate;
    this.totalAttacks++;
    if(this.sfxFire)
      this.sfxFire.play();

    if(this.clip != null) {
      this.clip--;
      $(".clip").text(this.clip);
    }
    $(".weaponsFired").text(this.totalAttacks);

    var weapon = this.weapons.getFirstDead();
    weapon.reset(player.body.x + player.weapon.sprite.x * 4 , player.body.y + player.weapon.sprite.y * 4);

    switch(player.direction) {
      case 0:
        weapon.body.moveLeft(weapon.speed);
        return;
      case 1:
        weapon.body.moveRight(weapon.speed);
        return;
      case 2:
        weapon.body.rotation = 90;
        weapon.body.moveUp(weapon.speed);
        return;
      case 3:
        weapon.body.moveDown(weapon.speed);
        return;
    }
  }
  
  fire(delay) {
    let fullDelay = this.player.attributes.attackRate * delay;
    console.log('next fire ' + this.nextFire + ' time ' + this.game.time.now);

    if(this.game.time.now > this.nextFire && this.player.canfire == 1 && this.weapons.countDead() > 0) {
      this.player.canmove = 0; 
      this.player.canfire = 0;
      this.game.time.events.add(fullDelay, this.delayedFire, this);
      return true;
    }

    return false;

  }


}
