"use strict";

export class MissionLog {

    constructor(player) {
        this.player = player;

        let missions = [];
        let mission = new Mission().ReclaimSpaceStation();
        missions.push(mission);

        let mission2 = new Mission().SaveTheCorinthian();
        missions.push(mission2);

        let mission3 = new Mission().AssassinateBork();
        missions.push(mission3);

        this.missions = missions;

        this.missionUI = window['mission'];
        console.log('create new missionlog');
    }

    get(id) {
        return this.missions[0];
    }

    getByKey(key) {
        for (let i = 0; i < this.missions.length; i++) {
            let cur = this.missions[i];
            if (cur.key === key) {
                return cur;
            }
        }
    }

    setByKey(key, mission) {

        for (let i = 0; i < this.missions.length; i++) {
            let cur = this.missions[i];
            if (cur.key === key) {
                cur.complete = true;
            }
        }

    }

    getDisplayList() {
        // let uilist = this.missionUI.missions;
        let ui = window['mission'];

        if (ui.missions.length > 0) {
            ui.missions = [];
        }

        for (let i = 0; i < this.missions.length; i++) {
            let current = this.missions[i];
            //Add repeatable missions, unless they're complete and not turned in yet
            if(current.repeatable) { 
                if(current.complete) { 
                    //Do not add complete missions
                }
                else { 
                    ui.addMission(current);
                }
            }
            else { 
                if(current.complete) {
                    //Do not add the mission 
                }
                else {
                    //Add incomplete missions 
                    ui.addMission(current);
                }
            }
        }

        
    }

}


class Mission {
    constructor(name) {
        this.id = -1;
        this.key = 'None';
        this.name = name;
        this.complete = false;
        this.rewardCollected = false;
        this.description = '';
        this.repeatable = false;
        this.active = false;

        this.rewardCredits = 0;
        this.rewardXP = 0;

    }

    setActive(truth) {
        this.active = truth;
    }

    collect(player) {
        if (!this.rewardCollected) {
            player.addCredits(this.rewardCredits);
            player.levels.addXP(this.rewardXP);
            player.writeconsole(`Collected ${this.rewardCredits} credits as a reward for finishing ${this.name}.`);
            this.rewardCollected = true;
            this.setActive(false);
        }

        let destinations = window['travel'].destinations;
        for (let i = 0; i < destinations.length; i++) {
            let cur = destinations[i];
            if (cur.id === this.id) {
                destinations.splice(i, 1);
            }
        }
    }

    ReclaimSpaceStation() {
        this.id = 2;
        this.key = 'Level1';
        this.name = 'Reclaim Space Station';
        this.description = 'There is an infestation of slimes on a small station nearby, eliminate every last one.';
        this.complete = false;
        this.rewardCollected = false;
        this.active = false;
        this.repeatable = true;

        this.rewardCredits = 150;
        this.rewardXP = 5;

        return this;
    }

    SaveTheCorinthian() {
        this.id = 3;
        this.key = 'Level2';
        this.name = 'Save the Corinthian';
        this.description = 'Invaders have attacked the Corinthian space station.';
        this.complete = false;
        this.rewardCollected = false;
        this.active = false;
        this.repeatable = false;

        this.rewardCredits = 275;
        this.rewardXP = 15

        return this;
    }

    AssassinateBork() {
        this.id = 4;
        this.key = 'Level3';
        this.name = 'Assassinate Bork';
        this.description = 'Bork has enslaved the Corinthians for too long.';
        this.complete = false;
        this.rewardCollected = false;
        this.active = false;
        this.repeatable = false;

        this.rewardCredits = 500;
        this.rewardXP = 50

        return this;
    }

}