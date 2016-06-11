import {Weapon} from './weapon'

export class Shotgun extends Weapon {

  constructor(game, player) {
    super(game, 'item-50', 30, player);
    this.setup(game, player);
  }

  setup(game, player) {
    this.fireRate = 500;
    this.weaponsFired = 0;
    this.name = "Shotgun";
    let sprite  = game.add.sprite(4, 0, 'item-13');
    sprite.smoothed = false;
    sprite.scale.setTo(0.5);
    sprite.anchor.setTo(0.5, 0.5);
    player.addChild(sprite);
    sprite.visible = false;
    this.sprite = sprite;

    this.clipSize = 2;
    this.clip = this.clipSize;
    this.ammo = (this.clipSize * 10);
    this.reloadTime = 2500;
    this.sfxFire = game.add.audio('short-shotgun');
    this.sfxFire1 = game.add.audio('shotgun1');
    this.sfxFire2 = game.add.audio('shotgun2');
    this.sfxFire3 = game.add.audio('shotgun3');
    this.sfxReload = game.add.audio('short-reloadshotgun');
    this.sfxReloadFire = game.add.audio('shotgunreload');

    this.speed = 400;
    this.mass = 1;
    this.size = 5;
    this.damage = 5;

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
      this.sfxReloadFire.play();
      this.game.time.events.add(300, this.delayedFire, this);
      return true;
    }

    return false;

  }

  delayedFire() {

    let player = this.player;
    player.canmove = 1;
    player.canfire = 1;
    this.nextFire = this.game.time.now + this.fireRate;
    this.totalAttacks++;

    let spread = 70;

    if (this.clip != null) {
      this.clip -= 1;
      // $(".clip").text(this.clip);
      let rnd = this.game.rnd.between(1, 3);
      console.log('rnd ' + rnd);
      if(rnd == 1)
        this.sfxFire1.play();
      if(rnd == 2)
        this.sfxFire2.play();
      else
        this.sfxFire3.play();
    }
    // $(".weaponsFired").text(this.totalAttacks);

    for (let i = 0; i < 8; i++){
      var modx = this.game.rnd.between(0, 50);
      var mody = this.game.rnd.between(-25, 25);
      console.log('x ' + modx + ' y ' + mody);
      var weapon = this.weapons.getFirstDead();

      let x = 0;
      let y = 0;

      switch (player.direction){
        case 0:
          x = player.body.x + (player.weapon.sprite.x * 4) - modx;
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


  }


  reload() {
    super.reload();
  }
}