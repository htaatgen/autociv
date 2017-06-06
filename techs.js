/**
 * Created by Salami on 5-6-2017.
 */

var tech_gov = {
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
}

var tech_mil = {
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

var tech_traits = {
    peaceful: {
        title: 'Peaceful',
        descr: 'These people avoid violent means to achieve their goals.',
        effects: {}
    },
    warlike: {
        title: 'Warlike',
        descr: 'Combat is a goal in and of itself for these people.',
        effects: {}
    },
    imperialists: {
        title: 'Imperialists',
        descr: 'These people wish to expand their borders and rule over others.',
        effects: {}
    },
    cooperation: {
        title: 'Cooperation',
        descr: 'Greatness can be achieved through alliances and federations.',
        effects: {}
    },
    religious: {
        title: 'Religious',
        descr: 'Only our religion is the one true religion! Support fellow believers and deny or even crush the unbelievers.',
        effects: {}
    }
}
