/**
 * Created by Salami on 18-2-2017.
 */

function updateTiles() {
    for (var x = 0; x < map.length; x++) {
        for (var y = 0; y < map[0].length; y++) {
            var tile = map[x][y];

            tile.growthScore =0;
            tile.economicScore =0;

            // Determine terrain bonus
            tile.growthScore = lib.basetypes[tile.basetype.alt].growth;
            tile.economicScore = lib.basetypes[tile.basetype.alt].economic;

            $.each(tile.features, function (key, feature) {
                tile.growthScore += lib.features[key].growth;
                tile.economicScore += lib.features[key].economic;
            });

            //Determine resources bonus
            $.each(tile.resources, function (key, resource) {
                 tile.growthScore += lib.resources[resource].growth
                 tile.economicScore += lib.resources[resource].economic
            });

            //Determine dominance/independence bonus
            if (tile.settlements.length > 0) {
                if (tile.dominant.name == tile.settlements[0].name) {
                    var dominatingList = findAttr("dominant", tile.dominant);
                    $.each(dominatingList, function (key,sub){
                        tile.growthScore +=Math.floor(map[sub.x][sub.y].growthScore/3)
                        tile.economicScore +=Math.floor(map[sub.x][sub.y].economicScore/3)
                    })
                }
            }

            //Calculate population ceiling
            var populationCeiling =( tile.growthScore* tile.growthScore*7)+20;

            //Recalculate populations and spawn settlements if the conditions are right
            $.each(tile.peoples, function (key, people) {

                //Increase population
                if(people.population > populationCeiling){
                    people.population += Math.floor(people.population * ((Math.random() - 0.6) ) / 100);
                }
                else {
                    people.population += Math.floor(people.population * (( tile.growthScore + (Math.random() * 20 - 12) ) / 1000)) + 10;
                }

                if (people.population > Math.random() * 500 + 600 && tile.settlements.length == 0) {
                    var settlementName = generateName();
                    var peopleNameAdj = (settlementName.charAt(settlementName.length - 1) == 'a') ? "ns" : "ans";
                    people.name = settlementName + peopleNameAdj;

                    tile.settlements.push({
                        name: settlementName,
                        people: key,
                        ruler: generateName() + " " + generateName(),
                        structures: [],
                        img: settlement1
                    });


                }
            })

            //Update settlements
            $.each(tile.settlements, function (key, settlement) {
                if (tile.peoples[settlement.people].population >= 9600) {
                    settlement.img = settlement5
                } else if (tile.peoples[settlement.people].population >= 4800) {
                    settlement.img = settlement4
                } else if (tile.peoples[settlement.people].population >= 2400) {
                    settlement.img = settlement3
                } else if (tile.peoples[settlement.people].population >= 1200) {
                    settlement.img = settlement2
                }
                else {
                    settlement.img = settlement1
                }
            })
        }
    }
}

function updateInfluences() {
    var effectiveness = 1.4;
    for (var x = 0; x < map.length; x++) {
        for (var y = 0; y < map[0].length; y++) {
            var tile = map[x][y];
            if (tile.basetype.alt != 'water') {
                //Update influence
                var topInfluence = tile.peoples[0].population;
                var topInfluencer = {x: x, y: y};
                $.each(tile.influence, function (key, influence) {
                    if (influence.i > topInfluence) {
                        topInfluence = influence.i;
                        topInfluencer = {x: influence.x, y: influence.y}
                    }
                });
                tile.dominant = topInfluencer;
                if (map[tile.dominant.x][tile.dominant.y].settlements.length > 0) {
                    tile.dominant.name = map[tile.dominant.x][tile.dominant.y].settlements[0].name;
                }
                else tile.dominant.name = 'Independent';

                //nsew
                if (y != 0) {
                    map[x][y - 1].influence.push({
                        x: topInfluencer.x,
                        y: topInfluencer.y,
                        i: topInfluence / effectiveness
                    })
                }
                if (y != map[0].length - 1) {
                    map[x][y + 1].influence.push({
                        x: topInfluencer.x,
                        y: topInfluencer.y,
                        i: topInfluence / effectiveness
                    })
                }
                if (x != map.length - 1) {
                    map[x + 1][y].influence.push({
                        x: topInfluencer.x,
                        y: topInfluencer.y,
                        i: topInfluence / effectiveness
                    })
                }
                if (x != 0) {
                    map[x - 1][y].influence.push({
                        x: topInfluencer.x,
                        y: topInfluencer.y,
                        i: topInfluence / effectiveness
                    })
                }

                //Diagonals
                if (y != 0 && x != 0) {
                    map[x - 1][y - 1].influence.push({
                        x: topInfluencer.x,
                        y: topInfluencer.y,
                        i: topInfluence / effectiveness
                    })
                }
                if (y != map[0].length - 1 && x != 0) {
                    map[x - 1][y + 1].influence.push({
                        x: topInfluencer.x,
                        y: topInfluencer.y,
                        i: topInfluence / effectiveness
                    })
                }
                if (x != map.length - 1 && y != 0) {
                    map[x + 1][y - 1].influence.push({
                        x: topInfluencer.x,
                        y: topInfluencer.y,
                        i: topInfluence / effectiveness
                    })
                }
                if (x != map.length - 1 && y != map[0].length - 1) {
                    map[x + 1][y + 1].influence.push({
                        x: topInfluencer.x,
                        y: topInfluencer.y,
                        i: topInfluence / effectiveness
                    })
                }

                tile.influence = []

            }
        }
    }
}

function findAttr(attr, value){
    var returnArr=[];

    for (var x = 0; x < map.length; x++) {
        for (var y = 0; y < map[0].length; y++) {
            var tile = map[x][y];
            if(tile[attr]){
                if(tile[attr] == value) {
                    returnArr.push({x: x, y: y})
                }
            }

        }
    }
    return returnArr;
}