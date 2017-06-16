/**
 * Created by Salami on 5-6-2017.
 */


//Governmental technology tree
lib.tech_gov = {
    tribal: {
        descr: 'Tribal affiliations, for smaller communities',
        leader: 'Chieftain',
        cost: 0,
        effects: {},
        up: {
            autocracy: {
                title: 'Autocracy',
                descr: 'One leader ruling by decree',
                leader: 'Dictator',
                cost: 10,
                effects: {}
            },
            aristocracy: {
                title: 'Aristocracy',
                descr: 'A system of landed gentry ruling by right of birth',
                leader: 'King',
                cost: 10,
                effects: {}
            },
            republic: {
                title: 'Republic',
                descr: 'Citizens have a say in governance',
                leader: 'Consul',
                cost: 10,
                effects: {}
            }
        }
    }
};

//Military tech tree
lib.tech_mil = {
    tribal: {
        title: 'Tribesmen',
        descr: 'Tribesmen or peasants, armed with whatever they can find',
        units: ['tribesmen', 'horsemen', 'archers'],
        cost: 0,
        effects: {},
        up: {
            legion: {
                title: 'Legions',
                descr: 'Professional soldiers',
                units: ['legionaries', 'legionary_cav'],
                cost: 10,
                effects: {}
            },
            nobles: {
                title: 'Noble warrior caste',
                descr: 'Landed warriors, trained from birth to fight',
                units: ['noble_warriors', 'noble_cav', 'knights', 'knights_errant'],
                cost: 10,
                effects: {}
            },
            militia: {
                title: 'Citizen Militias',
                descr: 'Citizens providing equipment and training for themselves',
                units: ['citizen_militia','citizen_militia_armoured'],
                leader: 'Consul',
                cost: 10,
                effects: {}
            }
        }
    }
}
