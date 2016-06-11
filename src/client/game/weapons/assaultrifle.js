import {Weapon} from './weapon'

export class AssaultRifle extends Weapon {

  constructor(game, player) {
    super(game, 'item-50', 30, player);
    this.setup(game, player);
  }

  setup(game, player) {
    this.fireRate = 100;
    this.weaponsFired = 0;
    this.name = "Assault Rifle";
    let sprite  = game.add.sprite(4, 0, 'item-12');
    sprite.smoothed = false;
    sprite.scale.setTo(0.5);
    sprite.anchor.setTo(0.5, 0.5);
    player.addChild(sprite);
    sprite.visible = false;
    this.sprite = sprite;

    this.clipSize = 30;
    this.clip = this.clipSize;
    this.ammo = (this.clipSize * 10);
    this.reloadTime = 2000;
    this.sfxFire = game.add.audio('short-assaultrifle');
    this.sfxReload = game.add.audio('short-reloadshotgun');

    // $(".clip").text(this.clip);
    // $(".ammo").text(this.ammo);


    this.speed = 400;
    this.mass = 1;
    this.size = 5;
    this.damage = 10;

    this.weapons.setAll('speed', this.speed);
    this.weapons.setAll('mass', this.mass);
    this.weapons.setAll('size', this.size);
    this.weapons.setAll('damage', this.damage);
  }

  setDamage(amount) {
    this.damage = amount;
    this.weapons.setAll('damage', amount);
  }

  fire() {
    console.log('next fire ' + this.nextFire + ' time ' + this.game.time.now);

    if(this.game.time.now > this.nextFire && this.player.canfire == 1 && this.weapons.countDead() > 0 && this.clip > 0) {
      this.player.canmove = 0;
      this.player.canfire = 0;
      this.delayedFire();
      //this.game.time.events.add(200, this.delayedFire, this);
      return true;
    }

    return false;

  }

  delayedFire() {

    let player = this.player;
    player.canmove = 1;
    player.canfire = 1;
    this.sfxFire.play();

    let differenceInTime = (this.game.time.now - this.nextFire);
    let spreadMod = 0;
    if(differenceInTime < 200) {
        spreadMod = (differenceInTime);
      console.log('time ' + differenceInTime + ' spr ' + spreadMod);
    }

    this.nextFire = this.game.time.now + (this.fireRate * this.player.attributes.attackRate);
    this.totalAttacks++;

    let spread = 2 + spreadMod;

    if (this.clip != null) {
      this.clip -= 1;
      // $(".clip").text(this.clip);
    }
    // $(".weaponsFired").text(this.totalAttacks);

    var modx = this.game.rnd.between(-5, 5);
    var mody = this.game.rnd.between(-5, 5);
    var weapon = this.weapons.getFirstDead();

    let x = 0;
    let y = 0;
    switch (player.direction){
      case 0:
        x = player.body.x + (player.weapon.sprite.x * 4) + modx;
        y = player.body.y + (player.weapon.sprite.y * 4);
        weapon.reset(x, y);
        weapon.body.velocity.y += this.game.rnd.between(-spread, spread);
        weapon.body.moveLeft(weapon.speed);
        break;
      case 1:
        x = player.body.x + (player.weapon.sprite.x * 4) + modx;
        y = player.body.y + (player.weapon.sprite.y * 4);
        weapon.reset(x, y);
        weapon.body.velocity.y += this.game.rnd.between(-spread, spread);
        weapon.body.moveRight(weapon.speed);
        break;
      case 2:
        x = player.body.x + (player.weapon.sprite.x * 4);
        y = player.body.y + (player.weapon.sprite.y * 4) + mody;
        weapon.reset(x, y);
        weapon.body.velocity.x += this.game.rnd.between(-spread, spread);
        weapon.body.rotation = 90;
        weapon.body.moveUp(weapon.speed);
        break;
      case 3:
        x = player.body.x + (player.weapon.sprite.x * 4);
        y = player.body.y + (player.weapon.sprite.y * 4) + mody;
        weapon.reset(x, y);
        weapon.body.velocity.x += this.game.rnd.between(-spread, spread);
        weapon.body.moveDown(weapon.speed);
        break;
    }
  }


  reload() {
    super.reload();
  }
}