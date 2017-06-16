/**
 * Created by Salami on 18-2-2017.
 */

function generateName(type){
    var syllables = [
        "re",
        "ra",
        "ry",
        "ro",
        "ru",
        "se",
        "sa",
        "sy",
        "so",
        "ste",
        "sta",
        "sty",
        "sto",
        "to",
        "ta",
        "ti",
        "tro",
        "tra",
        "tri",
        "we",
        "wi",
        "de",
        "da",
        "do",
        "ny",
        "na",
        "no",
        "le",
        "li",
        "pa",
        "po",
        "me",
        "ma",
        "mi",
        "mo",
        "che",
        "he",
        "cha",
        "ha",
        "chi",
        "hi",
        "gro",
        "gre",
        "gra",
        "go",
        "ge",
        "ga"
    ];

    var grasslands = [
        " Fields",
        "land",
        "ia",
        "ria",
        "nia",
        "sia",
        "tia",
        " Vale",
        " Grove"
    ];

    var hills = [
        " Hills",
        "land",
        "ia",
        "ria",
        "nia",
        "sia",
        "tia",
        " Valley",
        " Foothills"
    ];

    var mountains = [
        " Mountain",
        " Valley",
        "ia",
        "ria",
        "nia",
        "sia",
        "tia",
        " Peak",
        " Canyon"
    ];


    var name ='';

    for(var x= 0; x <= Math.floor(Math.random()*3)+1; x++) {
     name += syllables[Math.floor(Math.random() * syllables.length)];
    }

    name = name.charAt(0).toUpperCase() + name.slice(1);

    switch (type) {
        case "water": name = 'Water'; break;
        case 'grasslands': name +=  grasslands[Math.floor(Math.random() * (grasslands.length-1))]; break;
        case 'hills': name +=  hills[Math.floor(Math.random() *(hills.length - 1))]; break;
        case 'mountains': name +=  mountains[Math.floor(Math.random() * (mountains.length-1))]; break;
    }

    return name;
}