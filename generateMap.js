/**
 * Created by Salami on 15-2-2017.
 */
function generateMap(x_len, y_len) {
    for (var x = 0; x < x_len; x++) {
        map[x] = [];
        for (var y = 0; y < y_len; y++) {

            //Initial hieght seed. Expanding range to ensure better distribution
            var h = Math.floor((Math.random() * 15)) - 5
            if (h < 0) {
                h = Math.floor(h - Math.random() * 10)
            }
            else {
                h = Math.floor(h + Math.random() * 5)
            }
            map[x][y] = {
                x: x * spacing,
                y: y * spacing,
                h: h
            }

        }
    }
    smoothingPass(map);
    smoothingPass(map);
    smoothingPass(map);
    addDetail(map);
}

//Smoothing pass smoothes tiles to be closer to it's neighbours
function smoothingPass(map) {
    for (var x = 0; x < map.length; x++) {
        for (var y = 0; y < map[0].length; y++) {

            var north = (x == 0) ? map[x][y].h : map[x - 1][y].h;
            var south = (x == map.length - 1) ? map[x][y].h : map[x + 1][y].h;
            var east = (y == 0) ? map[x][y].h : map[x][y - 1].h;
            var west = (y == map[0].length - 1) ? map[x][y].h : map[x][y + 1].h;

            map[x][y].h = Math.floor((map[x][y].h + north + south + east + west) / 5)
        }
    }
}

//Fill in detail
function addDetail(map) {
    for (var x = 0; x < map.length; x++) {
        for (var y = 0; y < map[0].length; y++) {

            var tile = map[x][y];
            tile.features = [];

            //Add basetype based on height
            if (tile.h < 0) {
                tile.basetype = randomize([water1, water2, water3]);
            }
            else {
                if (tile.h == 1) {
                    tile.features.hills = randomize([hills1, hills2, hills3]);
                }
                else if (tile.h > 1) {
                    tile.features.mountains = randomize([mountains1, mountains2, mountains3]);
                }
                var position = Math.floor(10 * y / map[x].length);
                switch (position) {
                    case 10:
                    case 9:
                        tile.basetype = arctic;
                        break;
                    case 8:
                        tile.basetype = (Math.random() * 2 > 1) ? arctic : subarctic;
                        break;
                    case 7:
                        tile.basetype = subarctic;
                        break;
                    case 6:
                        tile.basetype = (Math.random() * 2 > 1) ? temperate : subarctic;
                        break;
                    case 5:
                    case 4:
                    case 3:
                        tile.basetype = temperate;
                        break;
                    case 2:
                        tile.basetype = (Math.random() * 2 > 1) ? temperate : arid;
                        break;
                    case 1:
                    case 0:
                        tile.basetype = arid;
                        break;
                }
            }

            //Generate name for area
            tile.name = generateName(tile.basetype.alt);

            //Generate coasts
            var coasts = '';
            coasts += (y == 0) ? '' : (map[x][y - 1].h < 0) ? 'n' : '';
            coasts += (y == map[0].length - 1) ? '' : (map[x][y + 1].h < 0) ? 's' : '';
            coasts += (x == map.length - 1) ? '' : (map[x + 1][y].h < 0) ? 'e' : '';
            coasts += (x == 0) ? '' : (map[x - 1][y].h < 0) ? 'w' : '';

            if (coasts.length > 0 && tile.basetype.alt != "water") {
                var variation = Math.floor(Math.random() * 2) + 1;
                tile.features.coasts = new Image();
                tile.features.coasts.src = "Graphics/Borders_water/" + coasts + variation + ".png";
            }

            //Generate features: forests. If another forest is adjacent, chance for forest rises.
            var fnorth = (x == 0) ? 0 : (map[x - 1][y].features.forest) ? 1.2 : 0;
            var feast = (y == 0) ? 0 : (map[x][y - 1].features.forest) ? 1.2 : 0;
            if (((fnorth) + (feast) + 3 * Math.random()) / 5 > 0.55 && tile.basetype.alt != "water" && tile.basetype.alt != "arid") {
                tile.features.forest = randomize([forest1, forest2,forest3]);
            }

            //Generate resources (based on features and terrain)
            tile.resources = [];

            //If has a forest
            if (tile.features.forest) {
                chanceFor(tile.resources, 'wood', 1);
                chanceFor(tile.resources, 'game_animals', 0.3);
            }

            //If has coast or is a water tile
            if ((!tile.features.coasts || tile.basetype.alt == "water")) {
                chanceFor(tile.resources, 'fish', 0.3);
            }

            //If it has hills
            if (tile.features.hills) {
                chanceFor(tile.resources, 'coal', 0.3);
                chanceFor(tile.resources, 'stone', 0.5);
                chanceFor(tile.resources, 'copper', 0.2);
                chanceFor(tile.resources, 'iron', 0.05);
                chanceFor(tile.resources, 'gold', 0.025);
            }

            //If it has mountains
            if (tile.features.mountains) {
                chanceFor(tile.resources, 'coal', 0.5);
                chanceFor(tile.resources, 'stone', 1);
                chanceFor(tile.resources, 'copper', 0.3);
                chanceFor(tile.resources, 'iron', 0.3);
                chanceFor(tile.resources, 'gold', 0.1);
            }

            //Basetypes
            //If it's arctic
            if (tile.basetype.alt == "Arctic") {
                chanceFor(tile.resources, 'game_animals', 0.1);
            }
            //If it's subarctic
            if (tile.basetype.alt == "Subarctic") {
                chanceFor(tile.resources, 'coal', 0.2);
                chanceFor(tile.resources, 'cattle_wild', 0.2);
                chanceFor(tile.resources, 'grains_wild', 0.2);
                chanceFor(tile.resources, 'crops_wild', 0.2);
                chanceFor(tile.resources, 'game_animals', 0.1);
                chanceFor(tile.resources, 'horses_wild', 0.1);
            }
            //If it's temperate
            if (tile.basetype.alt == "Temperate") {
                chanceFor(tile.resources, 'coal', 0.1);
                chanceFor(tile.resources, 'cattle_wild', 0.2);
                chanceFor(tile.resources, 'fruit_wild', 0.2);
                chanceFor(tile.resources, 'grains_wild', 0.4);
                chanceFor(tile.resources, 'crops_wild', 0.4);
                chanceFor(tile.resources, 'game_animals', 0.1);
                chanceFor(tile.resources, 'horses_wild', 0.1);
            }
            //If it's arid
            if (tile.basetype.alt == "Arid") {
                chanceFor(tile.resources, 'cattle_wild', 0.1);
                chanceFor(tile.resources, 'game_animals', 0.1);
                chanceFor(tile.resources, 'horses_wild', 0.1);
            }

            //Generate peoples
            tile.peoples = [];

            //Fill with native peoples
            if (tile.basetype.alt != "water") {
                tile.peoples.push({
                    name: tile.name + " natives",
                    population: Math.floor(Math.random() * Math.random() * Math.random() * 2000 + 50)
                });
            }

            //Settlements (none at the start)
            tile.settlements = [];

            //Influence form other tiles(none at start)
            tile.influence = [];
            tile.dominant = {x: x, y: y, name: 'Independent'}
            tile.color = (tile.basetype.alt != "water") ? "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")" : 'None';

            //Determine static growth and economic
            tile.growthScore = lib.basetypes[tile.basetype.alt].growth;
            tile.economicScore = lib.basetypes[tile.basetype.alt].economic;

            $.each(tile.features, function (key, feature) {
                tile.growthScore += lib.features[key].growth;
                tile.economicScore += lib.features[key].economic;
            });
        }
    }
}

function chanceFor(tile, type, chance) {
    if (Math.random() < chance) {
        tile.push(type);
    }
}

function randomize(array){
    return array[Math.floor(Math.random()*array.length)];
}