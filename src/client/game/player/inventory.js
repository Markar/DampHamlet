
export class Inventory { 
    
    constructor() {

        this.equipment = []; 

        this.items = {
            medkits: {
                quantity: 1,
                restore: 15,
                carryMax: 2
            },
            grenades: {
                quantity: 0, 
                carryMax: 5
            }
        };
    }
    
    
    
    
}

