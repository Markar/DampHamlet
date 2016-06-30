import {EnemyWeapon} from './enemyweapon'

export class SpreadShot extends EnemyWeapon {

    constructor(game) {
        //ref game, key, count
        super(game, 'item-100', 40);
        this.game = game; 
        this.setup();
    }
    setup() {
        this.fireRate = 5000;
        this.nextFire = 1000 + (1000 * (Math.random() * 5));

        this.weapons.setAll('speed', 350);
        this.weapons.setAll('mass', 100);
        this.weapons.setAll('size', 2);
        this.weapons.setAll('damage', 5);
    }
    fire(x, y, direction) {
        super.fire(x, y, this.direction);
        // super.fire(x, y, this.direction - 1);
        // super.fire(x, y, this.direction + 1);
        return;
    }
    multifire(x, y) {
        super.multifire(x, y);
    }

    setDamage(damage) {
        this.weapons.setAll('damage', damage);
    }
    setInt(attribute, x) {
        this.weapons.setAll(attribute, x);
    }

    fire(x, y, direction) {

        if (this.weapons.countDead() > 0) {
            this.sfxFire.play();

            if (this.weapons.countDead() < 1) {
                this.weapons.setAll('alive', false);
            }

            let weapon = this.weapons.getFirstDead();
            weapon.reset(x, y);

            switch (direction) {
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
                    weapon.body.moveUp(weapon.speed / 2);
                    weapon.body.moveRight(weapon.speed / 2);
                    return true;
                case 5:
                    weapon.body.moveDown(weapon.speed / 2);
                    weapon.body.moveRight(weapon.speed / 2);
                    return true;
                case 6:
                    weapon.body.moveDown(weapon.speed / 2);
                    weapon.body.moveLeft(weapon.speed / 2);
                    return true;
                case 7:
                    weapon.body.moveUp(weapon.speed / 2);
                    weapon.body.moveLeft(weapon.speed / 2);
                    return true;
            }
        }
    }

    moveAngle(body, speed, angle) { 
        var magnitude = this.game.physics.p2.pxmi(-speed);
        var calc_angle = angle + Math.PI / 2;

        body.data.velocity[0] = magnitude * Math.cos(calc_angle);
        body.data.velocity[1] = magnitude * Math.sin(calc_angle);
    }

    fireAtAngle(x, y, direction, angle) {
        this.sfxFire.play();

        if (this.weapons.countDead() < 1) {
            this.weapons.setAll('alive', false);
        }

        let weapon = this.weapons.getFirstDead();
        weapon.reset(x, y);

        this.moveAngle(weapon.body, weapon.speed, angle);
        
    }

    fire_angle(x, y, direction, angle) {

        if (this.weapons.countDead() > 0) {
            this.sfxFire.play();

            if (this.weapons.countDead() < 1) {
                this.weapons.setAll('alive', false);
            }

            let weapon = this.weapons.getFirstDead();
            weapon.reset(x, y);

            switch (direction) {
                case 0:
                    weapon.body.rotation = 90;
                    this.moveAngle(weapon.body, weapon.speed, 20); 
                    // weapon.body.moveUp(weapon.speed);
                    return true;
                case 1:
                    weapon.body.moveRight(weapon.speed);
                    weapon.body.angle += angle;
                    return true;
                case 2:
                    weapon.body.moveDown(weapon.speed);
                    weapon.body.angle += angle;
                    return true;
                case 3:
                    weapon.body.moveLeft(weapon.speed);
                    weapon.body.angle += angle;
                    return true;
                case 4:
                    weapon.body.moveUp(weapon.speed / 2);
                    weapon.body.moveRight(weapon.speed / 2);
                    weapon.body.angle += angle;
                    return true;
                case 8:
                    weapon.body.moveUp(weapon.speed / 2);
                    weapon.body.moveRight(weapon.speed / 2);
                    weapon.body.moveRight(weapon.speed / 2);
                    weapon.body.angle += angle;
                    return true;
                case 5:
                    weapon.body.moveDown(weapon.speed / 2);
                    weapon.body.moveRight(weapon.speed / 2);
                    weapon.body.angle += angle;
                    return true;
                case 6:
                    weapon.body.moveDown(weapon.speed / 2);
                    weapon.body.moveLeft(weapon.speed / 2);
                    weapon.body.angle += angle;
                    return true;
                case 7:
                    weapon.body.moveUp(weapon.speed / 2);
                    weapon.body.moveLeft(weapon.speed / 2);
                    weapon.body.angle += angle;
                    return true;
            }
        }
    }


}