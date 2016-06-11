export class Skills {

  constructor() {

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
    
    this.health = { 
      current: 0, 
      max: 5
    }
    
    this.explosives = { 
      current: 0, 
      max: 1
    }
    
    this.speed = { 
      current: 0, 
      max: 5
    }

    this.concentration = { 
      current: 0, 
      max: 5
    }
   
  }

}