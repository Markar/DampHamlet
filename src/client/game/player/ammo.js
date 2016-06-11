export class Ammo { 
  
  constructor() { 
    this.addAmmoTypes();
  }
  
  
  
}



// import {Item} from './item';

// export class Ammo extends Item {
//   constructor(name, ammotype, quantity, cost) {
//     super(name, -1, -1, cost, 'ammo');
//     this.quantity = quantity;
//     this.ammotype = ammotype;
//   }
// }
// export class LowCaliburRounds extends Ammo {
//   constructor(name) {
//     super(name, 'standard', 6, 5);
//   }

//   buy(player) {
//     if (player.credits > this.cost) {
//       player.addCredits(-this.cost);
//       player.addAmmo(this.quantity);
//       return true;
//     }

//     return false;
//   }
// }
// export class HighCaliburRounds extends Ammo {
//   constructor(name) {
//     super(name, 'standard', 30, 15);
//   }

//   buy(player) {
//     if (player.credits > this.cost) {
//       player.addCredits(-this.cost);
//       player.addHighCaliburAmmo(this.quantity);
//       return true;
//     }

//     return false;
//   }
// }
// export class Rockets extends Ammo {
//   constructor(name) {
//     super(name, 'rockets', 3, 12);
//   }

//   buy(player) {
//     if (player.credits > this.cost) {
//       player.addCredits(-this.cost);
//       player.addRockets(this.quantity);
//       return true;
//     }

//     return false;
//   }
// }

// export class Shells extends Ammo {
//   constructor(name) {
//     super(name, 'shells', 7, 20);
//   }

//   buy(player) {
//     if (player.credits > this.cost) {
//       player.addCredits(-this.cost);
//       player.addShells(this.quantity);
//       return true;
//     }

//     return false;
//   }
// }