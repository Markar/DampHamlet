import {inject} from 'aurelia-framework';
import {Items} from '../client/game/player/items';

export class ShopMenu {
  constructor() {
    this.items = new Items();
  }
  
  attached() {
    
  }
  
  setPlayer(player) { 
    this.player = player;
  }
  
  buy(player, ammo) {
    if (player.attributes.credits > ammo.cost) {
      player.addCredits(-ammo.cost);
      
      if(ammo == this.items.LowCaliburRounds)
        player.addAmmo(ammo.quantity);
      else if(ammo == this.items.HighCaliburRounds)
        player.addHighCaliburAmmo(ammo.quantity);
      else if(ammo == this.items.Rockets) 
        player.addRockets(ammo.quantity);
      else if(ammo == this.items.Shells) 
        player.addShells(ammo.quantity);
      
      return true;
    }
    else { 
      console.log('Not enough credits.')
      return false;
    }
  }
  
  buyBullets() {
    let player = damphamlet.phasergame.playerone;
    let ammo = this.items.LowCaliburRounds;
    this.buy(player, ammo); 
    console.log("Purchased a clip of low calibur ammo.");
  }
  
  buySlugs() {
    let player = damphamlet.phasergame.playerone;
    let ammo = this.items.HighCaliburRounds;
    this.buy(player, ammo); 
    console.log("Purchased a clip of high calibur ammo.");
  }
  
  buyRockets() {
    let player = damphamlet.phasergame.playerone;
    let ammo = this.items.Rockets;
    this.buy(player, ammo); 
    console.log("Purchased a pack of rockets.");
  }
  
  buyShells() {
    let player = damphamlet.phasergame.playerone;
    let ammo = this.items.Shells;
    this.buy(player, ammo); 
    console.log("Purchased a box of shells.");
  }
  
  buyMedkit() {
    let player = damphamlet.phasergame.playerone;
    let medkit = this.items.Medkit;
     
    if(player.attributes.credits < medkit.cost) {
      player.writeconsole('You do not have enough credits.');
      return false;
    }

    if(player.inventory.items.medkits.quantity >= player.inventory.items.medkits.carryMax) {
      player.writeconsole('You cannot carry another kit.');
      return false;
    }

    player.addCredits(-medkit.cost);
    player.addMedkits(1);
    return true;
  }
  
  buyGrenades() { 
    let player = damphamlet.phasergame.playerone;
    let grenade = this.items.Grenade;
    
    if(player.attributes.credits < grenade.cost) {
      player.writeconsole('You do not have enough credits.');
      return false;
    }
    if(player.inventory.items.grenades.quantity >= player.inventory.items.grenades.carryMax) {
      player.writeconsole('You cannot carry another grenade.');
      return false;
    }

    player.addCredits(-grenade.cost);
    player.addGrenades(1);
    return true;
  }
  
  
  buyLaserPistol() {
    let player = damphamlet.phasergame.playerone;
    let item = this.items.LaserPistol;
    
    if(player.attributes.credits >= item.cost && !player.hasLaserPistol) {
      player.addCredits(-item.cost);
      player.addLaserPistol();
      player.writeconsole("laser pistol equipped on 2.")
      return true;
    }
    else {
      player.writeconsole("invalid purchase");
    }
  }
  
  buyAssaultRifle() {
    let player = damphamlet.phasergame.playerone;
    let item = this.items.AssaultRifle;
    
    if(player.attributes.credits >= item.cost && !player.hasAssaultRifle) {
      player.addCredits(-item.cost);
      player.addAssaultRifle();
      player.writeconsole("assault rifle equipped on 4.")
      return true;
    }
    else {
      player.writeconsole("invalid purchase");
    }
  }
  
  buyShotgun() {
    let player = damphamlet.phasergame.playerone;
    let item = this.items.Shotgun;
    
    if(player.attributes.credits >= item.cost && !player.hasShotgun) {
      player.addCredits(-item.cost);
      player.addShotgun();
      player.writeconsole("shotgun equipped on 5.")
      return true;
    }
    else {
      player.writeconsole("invalid purchase");
    }
  }
    
  buyRocketLauncher() {
    let player = damphamlet.phasergame.playerone;
    let item = this.items.RocketLauncher;
    
    if(player.attributes.credits >= item.cost && !player.hasRocketLauncher) {
      player.addCredits(-item.cost);
      player.addRocketLauncher();
      player.writeconsole("rocket launcher equipped on 3.")
      return true;
    }
    else {
      player.writeconsole("invalid purchase");
    }
  }

  buyKevlar() { 
    let player = damphamlet.phasergame.playerone; 
    let item = this.items.Kevlar;

    if(player.attributes.credits >= item.cost) {
      player.addCredits(-item.cost);
      player.equipKevlar();
      player.writeconsole("purchased Kevlar");
      return true;
    }
    else {
      player.writeconsole("invalid purchase");
    } 
  }  
  
}
