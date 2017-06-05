/**
 * Created by Salami on 15-2-2017.
 */



//Init
var map = [];
var spacing = 20;
var selectedTileLoc = {x: -1, y: -1};
generateMap(60, 35);

//Map generation
function drawTerrain(canvas) {
    for (var x = 0; x < map.length; x++) {
        for (var y = 0; y < map[0].length; y++) {
            var tile = map[x][y];
            canvas.drawImage(tile.basetype, tile.x, tile.y);

            //Draw forests
            if (tile.features.indexOf('forest') != -1) {
                if (tile.basetype.alt == 'mountains') {
                    canvas.drawImage(forest, tile.x, tile.y);
                }
                else if (tile.basetype.alt == 'hills') {
                    canvas.drawImage(forest2, tile.x, tile.y);
                }
                else {
                    canvas.drawImage(forest3, tile.x, tile.y);
                }
            }

            //Draw coasts
            if (tile.coasts != 'None') {
                //var coasts = new Image();
                //coasts.src = tile.coasts;
                canvas.drawImage(tile.coasts, tile.x, tile.y);
            }

            //Draw settlements
            if (tile.settlements.length > 0) {
                canvas.drawImage(tile.settlements[0].img, tile.x, tile.y);
            }

            //Draw borders
            if (tile.dominant.name != 'Independent') {
                canvas.strokeStyle = map[tile.dominant.x][tile.dominant.y].color;
                canvas.lineWidth = 1;
                if (y != 0 && map[x][y - 1].h >= 0 && map[x][y - 1].dominant.name != tile.dominant.name) {
                    drawBorder(canvas, x, y, 'n')
                }
                if (y != map[0].length - 1 && map[x][y + 1].h >= 0 && map[x][y + 1].dominant.name != tile.dominant.name) {
                    drawBorder(canvas, x, y, 's')
                }
                if (x != 0 && map[x - 1][y].h >= 0 && map[x - 1][y].dominant.name != tile.dominant.name) {
                    drawBorder(canvas, x, y, 'e')
                }
                if (x != map.length - 1 && map[x + 1][y].h >= 0 && map[x + 1][y].dominant.name != tile.dominant.name) {
                    drawBorder(canvas, x, y, 'w')
                }
            }
        }
    }
    for (var x = 0; x < map.length; x++) {
        for (var y = 0; y < map[0].length; y++) {
            var tile = map[x][y];
            //Title
            if (tile.settlements.length>0) {
                if (tile.dominant.name == tile.settlements[0].name) {
                    canvas.strokeStyle = tile.color;
                    canvas.beginPath();
                            canvas.moveTo(x*20, y*20+22);
                            canvas.lineTo(x*20+tile.dominant.name.length*3, y*20+22);
                            canvas.stroke();
                    canvas.fillText(tile.dominant.name, tile.x, tile.y + 20);
                }
            }
        }
    }


    canvas.drawImage(selectedTile, selectedTileLoc.x * 20 - 2, selectedTileLoc.y * 20 - 2);
}

function selectTile(x, y) {
    if (x != -1 && y != -1) {
        selectedTileLoc = {x: x, y: y};
        var tile = map[x][y];

//Resources
        var resources = '';
        $.each(tile.resources, function(key, resource){
            resources += lib.resources[resource].name + ", "
        });

        $("#tileScreenX").text(x);
        $("#tileScreenY").text(y);
        $("#tileScreenName").text(tile.name);
        $("#tileScreenTerrain").text(tile.basetype.alt);
        $("#tileScreenClimate").text(tile.conditions.temp);
        $("#tileScreenGrowth").text(tile.growthScore);
        $("#tileScreenEconomic").text(tile.economicScore);
        $("#tileScreenFeatures").text(tile.features.join());
        $("#tileScreenResources").text(resources);
        $("#tileScreenPeople").text((tile.peoples.length > 0) ? tile.peoples[0].name + " (" + tile.peoples[0].population + ")" : '');
        $("#tileScreenSettlements").text((tile.settlements.length > 0) ? tile.settlements[0].name + " (" + tile.settlements[0].ruler + ")" : '');
        $("#tileScreenDominant").text(tile.dominant.name)
    }
}


$(window).on("load", function () {
    //Get canvas
    var c = document.getElementById("canvas");
    var canvas = c.getContext("2d");
    var turn = 1;
    canvas.font = "8px Arial";

    drawTerrain(canvas);

    //Click on tile
    $('#canvas').click(function (event) {
        var x = Math.floor((event.pageX - 100) / 20);
        var y = Math.floor((event.pageY - 100) / 20);
        selectTile(x, y);
        drawTerrain(canvas);
    })

    //Click on process Turn
    $('#processTurn').click(function () {
        updateTiles();
        updateInfluences();
        turn++;
        $('#turnSpan').text(turn);
        selectTile(selectedTileLoc.x, selectedTileLoc.y);
        drawTerrain(canvas);
    })


})

function drawBorder(canvas, x, y, dir) {
    x = x * 20;
    y = y * 20;
    canvas.beginPath();
    switch (dir) {
        case 'n':
            canvas.moveTo(x, y);
            canvas.lineTo(x + 19, y);
            canvas.stroke();
            break;
        case 's':
            canvas.moveTo(x, y + 19);
            canvas.lineTo(x + 19, y + 19);
            canvas.stroke();
            break;
        case 'e':
            canvas.moveTo(x, y);
            canvas.lineTo(x, y + 19);
            canvas.stroke();
            break;
        case 'w':
            canvas.moveTo(x + 19, y);
            canvas.lineTo(x + 19, y + 19);
            canvas.stroke();
            break;
    }

}