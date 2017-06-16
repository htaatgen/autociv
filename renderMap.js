/**
 * Created by Salami on 9-6-2017.
 */


//Draw the map onto the canvas
function drawTerrain(canvas) {
    for (var x = 0; x < map.length; x++) {
        for (var y = 0; y < map[0].length; y++) {
            var tile = map[x][y];
            canvas.drawImage(tile.basetype, tile.x, tile.y);
            if(tile.basetype.alt=='water') {
                tile.basetype = randomize([water1,water2,water3]);
            }

            //Draw forests
            if (tile.features.forest) {
                canvas.drawImage(tile.features.forest, tile.x, tile.y);
            }

            //Draw mountains/hills
            if (tile.features.mountains) {
                canvas.drawImage(tile.features.mountains, tile.x, tile.y);
            }
            if (tile.features.hills) {
                canvas.drawImage(tile.features.hills, tile.x, tile.y);
            }



            //Draw coasts
            if (tile.features.coasts) {
                canvas.drawImage(tile.features.coasts, tile.x, tile.y);
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
            if (tile.settlements.length > 0) {
                if (tile.dominant.name == tile.settlements[0].name) {
                    canvas.strokeStyle = tile.color;
                    canvas.beginPath();
                    canvas.moveTo(x * 20, y * 20 + 22);
                    canvas.lineTo(x * 20 + tile.dominant.name.length * 3, y * 20 + 22);
                    canvas.stroke();
                    canvas.fillText(tile.dominant.name, tile.x, tile.y + 20);
                }
            }
        }
    }
    canvas.drawImage(selectedTile, selectedTileLoc.x * 20 - 2, selectedTileLoc.y * 20 - 2);
}

//Draw the influence borders
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