import {Weapon} from './weapon';

export class Pistol extends Weapon {

  constructor(game, player) {
    super(game, 'item-50', 30, player);
    this.setup(game, player);
  }

  extendedClip() {
    this.clipSize = (this.clipSize * 1.5);
  }

  setup(game, player) {
    this.fireRate = 200;
    this.weaponsFired = 0;
    this.name = 'Pistol';
    this.clipSize = 12;
    this.clip = this.clipSize;
    this.ammo = 99;
    this.reloadTime = 2000;
    this.speed = 250;
    this.mass = 1;
    this.size = 5;
    this.damage = 5;

    let sprite  = game.add.sprite(4, 0, 'item-7');
    sprite.smoothed = false;
    sprite.scale.setTo(0.5);
    sprite.anchor.setTo(0.5, 0.5);
    sprite.visible = false;
    player.addChild(sprite);
    this.sprite = sprite;
    this.sfxFire = game.add.audio('short-pistol');
    this.sfxReload = game.add.audio('short-reloadpistol');

    this.weapons.setAll('speed', this.speed);
    this.weapons.setAll('mass', this.mass);
    this.weapons.setAll('size', this.size);
    this.weapons.setAll('damage', this.damage);
  }

  //addDamage() {
  //  console.log('set dmg from ' + this.damage);
  //  this.damage += (this.damage / 2);
  //  this.weapons.setAll('damage', this.damage);
  //  console.log('to ' + this.damage);
  //}
  //addDamage(amount) {
  //  this.damage += amount;
  //  this.weapons.setAll('damage', amount);
  //}

  fire() {
    if (this.clip > 0) {
      super.fire(this.fireRate);
    }
  }

  reload() {
    if (this.reloadTime > 0) {
      let weapon = this;
      weapon.reloading = 1;

      if (weapon.sfxReload) {
        weapon.sfxReload.play();
      }
      //prevent firing while reloading
      this.nextFire = this.game.time.now + this.reloadTime;
      this.clip = this.clipSize;

      this.game.time.events.add(this.reloadTime, () => {
        weapon.reloading = 0;
      });
    }
  }
}
