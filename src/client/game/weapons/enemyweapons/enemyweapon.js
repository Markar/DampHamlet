export class EnemyWeapon {

  constructor(game, key, count) {
    this.game = game;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    this.basicSetup();

    this.weapons = game.add.group();
    this.weapons.enableBody = true;
    this.weapons.physicsBodyType = Phaser.Physics.P2JS;

    this.addWeapon(0, 0, key, count, this.size);
  }

  basicSetup() {
    this.nextFire = 0;
    this.fireRate = 500;
    this.totalAttacks = 0;
    this.size = 5;
    this.speed = 100;
    this.damage = 1;
    this.mass = 1;
    // let blasterNumber = this.game.rnd.between(1, 2);
		// console.log('blaster number', blasterNumber);
		// this.sfxFire = this.game.add.audio('blaster' + blasterNumber);
    this.sfxFire = this.game.add.audio('blaster1');
  }

  addWeapon(x, y, key, count, size) {
    for(let i = 0; i < count; i++) {
      let weapon = this.weapons.create(x, y, key, 0, false);
      this.game.physics.p2.enable(weapon);

      weapon.scale.setTo(this.game.scalemultiple);
      weapon.anchor.setTo(0.5, 0.5);

      weapon.smoothed = false;
      weapon.physicsBodyType = true;
      weapon.enableBody = true;
      weapon.speed = this.speed;
      weapon.damage = this.damage;

      weapon.body.mass = this.mass;
      weapon.body.setCircle(this.size);

      weapon.body.setCollisionGroup(this.game.enemyWeaponCollisionGroup);
      weapon.body.collides(this.game.blockCollisionGroup, this.block, weapon);
      weapon.body.collides([this.game.enemyCollisionGroup, this.game.tileCollisionGroup, this.game.playerCollisionGroup], this.weaponHit, weapon);
    }
  }

  block(body1, body2) {
    console.log('blocked in enemy weapon');
  }

  //called when a weapon hits something. Destroy the weapon
  weaponHit(body1, body2) {
    console.log('enemy weapon hit something');
    this.kill();
  }

  fire(x, y, direction) {

    if(this.game.time.now > this.nextFire && this.weapons.countDead() > 0) {
      this.nextFire = this.game.time.now + this.game.rnd.between((this.fireRate / 5), this.fireRate);
      this.sfxFire.play();

      if(this.weapons.countDead() < 1) {
        this.weapons.setAll('alive', false);
      }

      let weapon = this.weapons.getFirstDead();
      weapon.reset(x, y);

      switch(direction) {
        case 0:
          weapon.body.rotation = 90;
          weapon.body.moveUp(weapon.speed);
          return true;
        case 1:
          weapon.body.moveRight(weapon.speed);
          return true;
        case 2:
          weapon.body.moveDown(weapon.speed);
          return true;
        case 3:
          weapon.body.moveLeft(weapon.speed);
          return true;
        case 4:
          weapon.body.moveUp(weapon.speed /2);
          weapon.body.moveRight(weapon.speed /2);
          return true;
        case 5:
          weapon.body.moveDown(weapon.speed /2);
          weapon.body.moveRight(weapon.speed /2);
          return true;
        case 6:
          weapon.body.moveDown(weapon.speed /2);
          weapon.body.moveLeft(weapon.speed /2);
          return true;
        case 7:
          weapon.body.moveUp(weapon.speed /2);
          weapon.body.moveLeft(weapon.speed /2);
          return true;
      }
    }
  }

  multifire(x, y) {

    if(this.game.time.now > this.nextFire && this.weapons.countDead() > 0) {

      this.nextFire = this.game.time.now + this.fireRate;

      for(let i = 0; i < 4; i++) {
        if(this.weapons.countDead() < 1) {
          this.weapons.setAll('alive', false);
        }

        let weapon = this.weapons.getFirstDead();
        weapon.reset(x, y);

        if(i == 0) {
          weapon.body.moveUp(weapon.speed);
        }
        else if(i == 1) {
          weapon.body.moveRight(weapon.speed);
        }
        else if(i == 2) {
          weapon.body.moveDown(weapon.speed);
        }
        else if(i == 3) {
          weapon.body.moveLeft(weapon.speed);
        }
      }
    }
  }


}
