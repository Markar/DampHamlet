import {EnemyWeapon} from './enemyweapon'

export class FastShot extends EnemyWeapon {
	
	constructor(game) {
		//ref game, key, count
		super(game, 'item-99', 50);						
		this.setup(); 			
	}	
	setup() {
		this.fireRate = 100;
		
		this.weapons.setAll('speed', 250); 
		this.weapons.setAll('mass', 1);
		this.weapons.setAll('size', 2); 
		this.weapons.setAll('damage', 1); 
	}
	fire (x, y, direction) {					
		return super.fire(x, y, direction);
	}
}