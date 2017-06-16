/**
 * Created by Salami on 15-2-2017.
 */

//Init
var map = [];
var spacing = 20;
var turn = 1;
var selectedTileLoc = {x: -1, y: -1};

$(window).on("load", function () {
    //Get canvas
    var c = document.getElementById("canvas");
    var canvas = c.getContext("2d");

    canvas.font = "8px Arial";
    canvas.canvas.width = $(window).width();
    canvas.canvas.height = $(window).height() - 2 * spacing;

    var tileAmountX = Math.floor($(window).width() / spacing);
    var tileAmountY = Math.floor($(window).height() / spacing) - 2;

    generateMap(tileAmountX, tileAmountY);

    drawTerrain(canvas);
    setInterval(function () {
        drawTerrain(canvas);
    }, 500);

    //Make infofield daggable
    $(".infopanel").draggable();

    //Remove loading screen
    $('.loading').css('display', 'none');

    //Click on tile
    $('#canvas').click(function (event) {
        var x = Math.floor((event.pageX) / 20);
        var y = Math.floor((event.pageY) / 20);
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

    //Close current tile
    $('.tileClose').click(function () {
        $(this).parents('.infopanel').css('display', 'none');
    })

    //Open tile
    $('.toggleTile').click(function () {
        var panel = $($(this).data('nav'));
        if (panel.css('display') == 'none') {
            panel.css('display', 'block');
        }
        else {
            panel.css('display', 'none');
        }
    })
})



function selectTile(x, y) {
    if (x != -1 && y != -1) {
        selectedTileLoc = {x: x, y: y};
        var tile = map[x][y];

//Resources
        var resources = '';
        $.each(tile.resources, function (key, resource) {
            resources += lib.resources[resource].name + ", "
        });

        var title = (tile.settlements.length > 0) ? tile.settlements[0].name + ' - ' + tile.name : tile.name;
        $("#tileTitle").text(title);

        var tileStats = $(".tileStats").html('');
        tileStats.append(iconPop);
        tileStats.append((tile.peoples.length > 0) ? tile.peoples[0].population : '');
        tileStats.append(iconEcon);
        tileStats.append(tile.economicScore);
        tileStats.append(iconGrowth);
        tileStats.append(tile.growthScore);
        tileStats.append(iconMil);
        tileStats.append(0);


        $("#tileScreenX").text(x);
        $("#tileScreenY").text(y);
        $("#tileScreenName").text(tile.name);
        $("#tileScreenTerrain").text(tile.basetype.alt);
        //$("#tileScreenClimate").text(tile.conditions.temp);
        $("#tileScreenGrowth").text(tile.growthScore);
        $("#tileScreenEconomic").text(tile.economicScore);
        $("#tileScreenFeatures").text(tile.features.join());
        $("#tileScreenResources").text(resources);
        $("#tileScreenPeople").text((tile.peoples.length > 0) ? tile.peoples[0].name + " (" + tile.peoples[0].population + ")" : '');
        $("#tileScreenSettlements").text((tile.settlements.length > 0) ? tile.settlements[0].name + " (" + tile.settlements[0].ruler + ")" : '');
        $("#tileScreenDominant").text(tile.dominant.name)
    }
}

