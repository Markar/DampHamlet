//powers
import {Stimulants} from './powers/stimulants';
import {Heal} from './powers/heal';
import {Teleport} from './powers/teleport';
import {PsiOrb} from './powers/psiorb';

export class Skills {

  constructor(player, game) {

    this.player = player; 
    this.game = game; 

    this.stimulants = ''; 
    this.heal = ''; 
    this.teleport = ''; 
    this.psiorb = ''; 

    this.pistols = [];
    this.pistols.push()
    
    this.points = { 
      available: 0, 
      allocated: 0
    }
    
    this.sprint =  {
      name: 'sprint',
      cost: -25, 
      active: 0
     }
    
    this.pistols = { 
      current: 0, 
      max: 5
    }
    
    this.assault = { 
      current: 0, 
      max: 5
    }
    
    this.explosives = { 
      current: 0, 
      max: 1
    }
    

    this.health = { 
      current: 0, 
      max: 5
    }

    this.stamina = { 
      current: 0, 
      max: 5
    }

    this.concentration = { 
      current: 0, 
      max: 10
    }

   
  }

  enableStimulants() { 
    this.stimulants = new Stimulants(this.player, this.game); 
  }
  enableHeal() { 
    this.heal = new Heal(this.player, this.game); 
  }
  enableTeleport() { 
    this.teleport = new Teleport(); 
  }
  enablePsiOrb(player, game) { 
    this.psiorb = new PsiOrb(player, game); 
  }

}