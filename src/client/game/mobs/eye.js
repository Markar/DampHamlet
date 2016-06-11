import Phaser from 'phaser';
import {Mob} from './mob';
import {SlowShot} from '../weapons/enemyweapons/slowshot';

export class Eye extends Mob {

  update() {
    //this.checkForPlayers(200, 600);
    this.move();

    if(this.enraged) {
      this.rageAttack();
    }
    else {
      this.attack();
    }
  }

  constructor(name, game, startx, starty) {
    super(name, 'eyeball', game, startx, starty);

    this.enraged = 0; 
    this.speed = 10 + (Math.random() * 5);
    this.maxSpeed = 50;
    this.hp = 50;
    this.maxHp = 50;
    this.weapon = new SlowShot(game);
    this.nextMove = 1000;
    this.firingPause = 1500;
    this.mass = 10;

    //overwrite the default 'blaster1' effect for this mob
    this.weapon.sfxFire = this.game.add.audio('blaster2');

    this.weapon.setInt('speed', 200);
    this.weapon.setDamage(1);
  }

  move() {
    if (this.game.time.now > this.nextMove) {
      super.move();
    }
  }

  attack() {
    super.attack();
  }

  rageAttack() {
    super.multifire();
  }

  weaponHit(body1, body2) {
    super.weaponHit(body1, body2);
  }

  enemyHitByWeapon(body1, body2) {
    super.enemyHitByWeapon(body1, body2);
    this.enrage();
  }

  enrage() {
    if (this.hp > 0 && this.hp < (this.maxHp / 1.5)) {
      this.weapon.nextFire = 0;
      this.speed = this.game.math.clamp(this.speed * 2, 1, this.maxSpeed);
      this.weapon.setDamage(this.weapon.damage * 1.25);
      this.weapon.setInt('speed', 500);
      this.weapon.fireRate = (this.weapon.fireRate * 0.75);
      this.firingPause = (this.firingPause * 0.5);
      this.tint = 0xff0000;
      this.enraged = 1; 
    }
  }
}