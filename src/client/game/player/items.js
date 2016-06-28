
export class Items { 
  
  constructor() {
    this.addAmmoTypes();
    this.addConsumables();
    this.addWeapons();
    this.addArmor();
  }
  
  addAmmoTypes() { 
    this.LowCaliburRounds = { 
      name: 'standard', 
      quantity: 6, 
      cost: 5
    }
    
    this.HighCaliburRounds = { 
      name: 'standard', 
      quantity: 30, 
      cost: 15 
    }
    
    this.Rockets = { 
      name: 'rockets', 
      quantity: 3, 
      cost: 12
    }
    
    this.Shells = { 
      name: 'shells', 
      quantity: 7, 
      cost: 20
    }
    
  }
  
  addConsumables() { 
    this.Medkit = { 
      name: 'medkit', 
      durability: 100, 
      quality: 1, 
      cost: 50
    } 
    
    this.Grenade = { 
      name: 'grenade', 
      durability: 100, 
      quality: 1, 
      cost: 10
    }
  }
  
  addWeapons() { 
    this.Pistol = { 
      name: 'Pistol', 
      durability: 100, 
      quality: 1,
      cost: 100,
      type: 'pistol'
    }
    
    this.LaserPistol = { 
      name: 'Laser Pistol', 
      durability: 100, 
      quality: 1, 
      cost: 1000, 
      type: 'laserpistol'
    }
    
    this.AssaultRifle = { 
      name: 'Assault Rifle', 
      durability: 100, 
      quality: 1,
      cost: 500, 
      type: 'assaultrifle'
    }
    
    this.Shotgun = { 
      name: 'Shotgun', 
      durability: 50, 
      quality: 1, 
      cost: 300, 
      type: 'shotgun'
    }
    
    this.RocketLauncher = { 
      name: 'Rocket Launcher', 
      durability: 100, 
      quality: 1, 
      cost: 1500, 
      type: 'rocketlauncher'
    }
  }

  addArmor() { 
    this.Clothes = { 
      name: 'Clothes', 
      durability: 100, 
      quality: 0, 
      cost: 0, 
      type: 'body'
    }

    this.Kevlar = { 
      name: 'Kevlar', 
      durability: 100, 
      quality: 1, 
      cost: 500, 
      type: 'body'
    }
  }
}