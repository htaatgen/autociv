/**
 * Created by Salami on 19-2-2017.
 */

//Creates a lookup library
var lib = {};

//Resources
lib.resources={};

//Resources - Animals
lib.resources.fish={
    name: "Fish",
    desc: "Various fish",
    growth: 6,
    economic:4
};
lib.resources.cattle_wild={
    name: "Wild cattle",
    desc: "Large herbivores",
    growth: 6,
    economic:2
};
lib.resources.game_animals={
    name: "Game animals",
    desc: "Wild animals that can be hunted for food",
    growth: 5,
    economic:5
};
lib.resources.horses_wild={
    name: "Wild horses",
    desc: "Can sometimes be tamed as riding animals",
    growth: 3,
    economic:2
};

//Resources - Wild crops
lib.resources.grains_wild={
    name: "Wild grains",
    desc: "Nutritious but not efficient",
    growth: 6,
    economic:2
};
lib.resources.crops_wild={
    name: "Wild crops",
    desc: "Nutritious but not efficient",
    growth: 6,
    economic:2
};
lib.resources.fruit_wild={
    name: "Wild fruits",
    desc: "Delicious but not frequent",
    growth:5,
    economic:3
};

//Resources - Mining
lib.resources.coal={
    name: "Coal",
    desc: "Fuel",
    growth: 0,
    economic:4
};
lib.resources.copper={
    name: "Copper",
    desc: "Basic metalworking",
    growth: 0,
    economic:2
};
lib.resources.iron={
    name: "Iron",
    desc: "Strong metal",
    growth: 0,
    economic:1
};
lib.resources.gold={
    name: "Gold",
    desc: "Very valuable",
    growth: 0,
    economic:2
};

//Resources - Building materials

lib.resources.stone={
    name: "Stone",
    desc: "Strong building material",
    growth: 0,
    economic:3
};
lib.resources.wood={
    name: "Wood",
    desc: "Fast building material",
    growth: 0,
    economic:4
};

//Basetypes

lib.basetypes ={};
lib.basetypes.water={
    name: "Water",
    desc: "Wet and fishy",
    growth: 0,
    economic:0
};
lib.basetypes.grasslands={
    name: "Grasslands",
    desc: "Fertile green fields",
    growth: 11,
    economic:11
};
lib.basetypes.hills={
    name: "Hills",
    desc: "Rolling hills",
    growth: 9,
    economic:11
};
lib.basetypes.mountains={
    name: "Mountains",
    desc: "Imposing ridges and peaks",
    growth: 6,
    economic:3
};

