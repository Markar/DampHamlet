import {Weapon} from './weapon'

export class Laser extends Weapon {

  constructor(game, player) {
    //ref game, key, count
    super(game, 'item-101', 50, player);

    this.weaponsFired = 0;
    this.speed = 600;
    this.mass = 0;
    this.size = 1;
    this.damage = 10;
    this.setup(game, player);
  }

  setup(game, player) {
    this.fireRate = 100;
    this.weaponsFired = 0;
    this.name = "Laser";
    let sprite  = game.add.sprite(4, 0, 'item-37');
    sprite.smoothed = false;
    sprite.scale.setTo(0.5);
    sprite.anchor.setTo(0.5, 0.5);
    player.addChild(sprite);
    sprite.visible = false;
    this.sprite = sprite;
    this.sfxFire = game.add.audio('blaster1');
    this.sfxFire2 = game.add.audio('blaster2');
    this.sfxReload = game.add.audio('short-reloadshotgun');

    this.clipSize = 100;
    this.clip = this.clipSize;
    this.ammo = 1000;
    this.reloadTime = 1000;

    this.weapons.setAll('speed', this.speed);
    this.weapons.setAll('mass', this.mass);
    this.weapons.setAll('size', this.size);
    this.weapons.setAll('damage', this.damage);
  }

  fire() {
    if(this.clip > 0 && this.game.time.now > this.nextFire) {
      let player = this.player;
      player.canmove = 1;
      player.canfire = 1;
      this.nextFire = this.game.time.now + this.fireRate;
      this.totalAttacks++;

      if (this.clip != null) {
        this.clip--;
        if(this.clip % 3 == 0) {
          this.sfxFire.play();
        }
        else
          this.sfxFire2.play();
      }

      var weapon = this.weapons.getFirstDead();
      weapon.reset(player.body.x, player.body.y);

      switch (player.direction){
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
  }


  //fire (x, y, direction) {
  //	console.log('next laser fire ' + this.nextFire + ' time ' + this.game.time.now + ' count ' + this.weapons.countDead());
  //	if (this.game.time.now > this.nextFire && this.weapons.countDead() > 0)
  //	{
  //		this.nextFire = this.game.time.now + this.fireRate;
  //
  //
  //		var weapon = this.weapons.getFirstDead();
  //		weapon.reset(x, y);
  //
  //		switch(direction) {
  //			case 0:
  //				weapon.body.moveLeft(weapon.speed);
  //				return;
  //			case 1:
  //				weapon.body.moveRight(weapon.speed);
  //				return;
  //			case 2:
  //				weapon.body.rotation = 90;
  //				weapon.body.moveUp(weapon.speed);
  //				return;
  //			case 3:
  //				weapon.body.moveDown(weapon.speed);
  //				return;
  //		}
  //	}
  //}
}