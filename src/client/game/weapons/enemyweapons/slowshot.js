import {EnemyWeapon} from './enemyweapon'

export class SlowShot extends EnemyWeapon {
	
	constructor(game) {
		//ref game, key, count
		super(game, 'item-100', 10);
		this.setup(); 			
	}	
	setup() {
		this.fireRate = 5000;
		this.nextFire = 1000 + (1000 * (Math.random() * 5));
		
		this.weapons.setAll('speed', 250); 
		this.weapons.setAll('mass', 1);
		this.weapons.setAll('size', 2); 
		this.weapons.setAll('damage', 1); 
	}
	fire (x, y, direction) {					
		return super.fire(x, y, direction);
	}
	multifire (x, y) {
		super.multifire(x, y);
	}

	setDamage(damage) {
		this.weapons.setAll('damage', damage);
	}
	setInt(attribute, x) {
		this.weapons.setAll(attribute, x);
	}
}