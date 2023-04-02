(() => {
    const eras = new Map([
        ["Shardic", {
                "start": `~10<sup>9</sup> BR (T=0)`,
                "epoch": `Genesis`,
                "height": 42,
            }],
        ["Divergence", {
                "start": `~10<sup>9</sup> BR (T=10<sup>-16</sup>s)`,
                "epoch": `Genesis`,
                "height": 40,
            }],
        ["Primordial", {
                "start": `~10<sup>9</sup> BR (T=0.1s)`,
                "epoch": `Genesis`,
                "height": 64,
            }],
        ["Inflationary", {
                "start": `~10<sup>9</sup> BR (T=1s)`,
                "epoch": `Genesis`,
                "height": 40,
            }],
        ["Archean", {
                "start": `~4.1 &times; 10<sup>8</sup> BR`,
                "epoch": `Genesis`,
                "height": 40,
            }],
        ["Mythic", {
                "start": `~2.8 &times; 10<sup>7</sup> BR`,
                "epoch": `Legendary`,
                "height": 144,
            }],
        ["Heroic", {
                "start": `~1.6 &times; 10<sup>5</sup> BR`,
                "epoch": `Legendary`,
                "height": 120,
            }],
        ["Silent", {
                "start": `~20,000 BR`,
                "epoch": `Darkness`,
                "height": 72,
            }],
        ["Archaic", {
                "start": `~1,800 BR`,
                "epoch": `Darkness`,
                "height": 64,
            }],
        ["Classical", {
                "start": `0 AR`,
                "epoch": `Recreance`,
                "height": 72,
            }],
        ["Medieval", {
                "start": `1070 AR`,
                "epoch": `Recreance`,
                "height": 100,
            }],
        ["Renaissance", {
                "start": `1600 AR (now)`,
                "epoch": `Recreance`,
                "height": 40,
            }],
    ]);
    const cummHeights = new Map();
    const topMargin = 0;
    let totalHeight = 0;
    for (const [name, { height }] of Array.from(eras).reverse()) {
        cummHeights.set(name, totalHeight + height);
        totalHeight = cummHeights.get(name);
    }
    const events = new Map([
        ["TheoGenesis", {
                text: "Shards Appear - Spacetime & Investiture form.",
                era: "Shardic",
                rel_t: 0,
                lane: 0,
            }],
        ["Genesis", {
                text: "Invariants form - Matter/Energy/Momentum/Charge...",
                era: "Shardic",
                rel_t: 0.50,
                lane: 1,
            }],
        ["Divergence", {
                text: "Planes separate",
                era: "Divergence",
                rel_t: 0.00,
                lane: 0,
            }],
        ["OuterPrimordialsInvade", {
                text: "Outer Primordials Invade",
                era: "Primordial",
                rel_t: 0,
                lane: 0,
            }],
        ["ShardicPrimordialCreation", {
                text: "Shardic Primordials are born",
                era: "Primordial",
                rel_t: 0.25,
                lane: 1,
            }],
        ["OuterPrimordialsDefeated", {
                text: "Outer Primordials are Defeated",
                era: "Primordial",
                rel_t: 0.8,
                lane: 0,
            }],
        ["Expansion", {
                text: "Planes take shape, The Universe expands",
                era: "Inflationary",
                rel_t: 0.1,
                lane: 1,
            }],
        ["AstralFormation", {
                text: "Astral Bodies Form",
                era: "Inflationary",
                rel_t: 0.8,
                lane: 0,
            }],
        ["Life", {
                text: "First Physical Lifeforms emerge",
                era: "Archean",
                rel_t: 0,
                lane: 1,
            }],
        ["SpiritualLife", {
                text: "First Non-Physical Lifeforms emerge",
                era: "Archean",
                rel_t: 0.9,
                lane: 0,
            }],
        ["ComplexLife", {
                text: "Complex/Mortal Lifeforms emerge",
                era: "Mythic",
                rel_t: 0.1,
                lane: 1,
            }],
        ["PrimordialLife", {
                text: "Shardic Primordials Gain Physical Forms",
                era: "Mythic",
                rel_t: 0.2,
                lane: 0,
            }],
        ["SentientLife", {
                text: "Sentient Life Forms",
                era: "Mythic",
                rel_t: 0.45,
                lane: 0,
            }],
        ["MythicLife", {
                text: "Creatures of Myth and Legend Roam the multiverse",
                era: "Mythic",
                rel_t: 0.5,
                lane: 1,
            }],
        ["IntelligentLife", {
                text: "Intelligent Species emerge",
                era: "Mythic",
                rel_t: 0.67,
                lane: 0,
            }],
        ["SocialLife", {
                text: "Societies and Cultures begin to take shape",
                era: "Mythic",
                rel_t: 0.85,
                lane: 1,
            }],
        ["SocialLife", {
                text: "Humans race appears",
                era: "Mythic",
                rel_t: 0.9,
                lane: 0,
            }],
        ["Heroes", {
                text: "Powerful Nations form - Heroes walk the land",
                era: "Heroic",
                rel_t: 0.2,
                lane: 0,
            }],
        ["War", {
                text: "Shardic Wars Ensue",
                era: "Heroic",
                rel_t: 0.33,
                lane: 1,
            }],
        ["Kelsier", {
                text: "The 'Survivor' Dies",
                era: "Heroic",
                rel_t: 0.5,
                lane: 0,
            }],
        ["Re-invasion", {
                text: "Outsiders begin to seep within",
                era: "Heroic",
                rel_t: 0.8,
                lane: 1,
            }],
        ["Silence", {
                text: "History falls silent - No records of this time remain",
                era: "Silent",
                rel_t: 0,
                lane: 0,
            }],
        ["Isolation", {
                text: "Outer Planes self isolate",
                era: "Silent",
                rel_t: 0.4,
                lane: 1,
            }],
        ["Archaic", {
                text: "Civilizations restart from scratch post-desolation",
                era: "Archaic",
                rel_t: 0,
                lane: 0,
            }],
        ["Classical", {
                text: "Some Cities/Civilizations begin to match those of old",
                era: "Classical",
                rel_t: 0,
                lane: 0,
            }],
        ["Rome", {
                text: "Veteres becomes a global empire on Terra Prima",
                era: "Classical",
                rel_t: 0.1,
                lane: 1,
            }],
        ["Annatar", {
                text: "1539 AR: The Primordial Nightmares gain a foothold",
                era: "Medieval",
                rel_t: 0.75,
                lane: 1,
            }],
        ["Leras", {
                text: "1540 AR: The Hour of Darkness",
                era: "Medieval",
                rel_t: 0.8,
                lane: 0,
            }],
    ]);
    $(() => {
        const $historyZones = $("#history_zones");
        const $lane = [
            $("#history_left_tags"),
            $("#history_right_tags"),
        ];
        for (const [name, { height, start, epoch }] of eras.entries()) {
            $(`<div class='history_zone' style='height: ${height}px;'>
                <div class="zone_start">${start}</div>
                <div class="zone_name">${name}<span class="zone_epoch"> | ${epoch}</span></div>
              </div>`).appendTo($historyZones);
        }
        for (const [id, details] of events.entries()) {
            const distFromTop = topMargin +
                cummHeights.get("Shardic")
                - cummHeights.get(details["era"])
                + eras.get(details["era"]).height * details["rel_t"];
            $(`<div class="history_event" style="top: ${distFromTop}px;">${details.text}</div>`).appendTo($lane[details["lane"]]);
        }
    });
})();
// Note: Any ts scripts here can't be modules, i.e.
//  1. They can't use import/export statements.
//  2. Everything declared is in the global scope.
//
// This is mainly because JS module security requirements would cause an attempt
// to load a module via an HTML file opened locally to throw a CORS error.
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_standard_scripts
//
// This also means I can compile all the files into a single outfile via TS and
// don't need a bundler like webpack for this one. (Which works well since no
// node...)
// Ref: https://stackoverflow.com/questions/34474651/typescript-compile-to-single-file
const waitForFinalEvent = (function () {
    const timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();
// Usage:
// $(window).resize(function () {
//     waitForFinalEvent(function(){
//       alert('Resize...');
//       //...
//     }, 500, "some unique string");
// });
(() => {
    $(() => {
        const $pageNav = $("#page_nav");
        $(".page_header").each(function () {
            $(`<div class="page_nav_link" data-nav-to="${$(this).data("navId")}">${$(this).text()}</div>`)
                .appendTo($pageNav);
        });
        $pageNav.on("click", ".page_nav_link", function () {
            const navTo = $(this).data("navTo");
            const $navTo = $(`.page_header[data-nav-id='${navTo}']`);
            $navTo[0].scrollIntoView({ behavior: "smooth" });
        });
    });
})();
let data = {
    "classModifications": {
        "cleric": {
            "passive": ["Religion is WIS based"],
        },
        "druid": {
            "passive": ["Nature is WIS based"],
            "active": ["Can use Nature rolls to recharge spell slots."]
        }
    },
    "damageSpecialization": {
        "psychic": {
            "next": "neural",
            "proc": "",
        }
    },
};
var CityTag;
(function (CityTag) {
    CityTag[CityTag["Ghost Town"] = 0] = "Ghost Town";
    CityTag[CityTag["Ruins"] = 1] = "Ruins";
    CityTag[CityTag["Undefended"] = 2] = "Undefended";
    CityTag[CityTag["Open"] = 3] = "Open";
    CityTag[CityTag["Walled"] = 4] = "Walled";
    CityTag[CityTag["Fortified"] = 5] = "Fortified";
    CityTag[CityTag["Impregnable"] = 6] = "Impregnable";
    CityTag[CityTag["Sprawling"] = 7] = "Sprawling";
    CityTag[CityTag["Organized"] = 8] = "Organized";
    CityTag[CityTag["Space Crunch"] = 9] = "Space Crunch";
    CityTag[CityTag["Cluttered"] = 10] = "Cluttered";
    CityTag[CityTag["Merchant Guilds"] = 11] = "Merchant Guilds";
    CityTag[CityTag["Central Market"] = 12] = "Central Market";
    CityTag[CityTag["Commercial Hub"] = 13] = "Commercial Hub";
    CityTag[CityTag["Trade Hotspot"] = 14] = "Trade Hotspot";
    CityTag[CityTag["Academic Focus"] = 15] = "Academic Focus";
    CityTag[CityTag["Research Centre"] = 16] = "Research Centre";
    CityTag[CityTag["Craftsman's Guilds"] = 17] = "Craftsman's Guilds";
    CityTag[CityTag["Industrial Zone"] = 18] = "Industrial Zone";
    CityTag[CityTag["Mining Ops"] = 19] = "Mining Ops";
    CityTag[CityTag["Mafia Control"] = 20] = "Mafia Control";
    CityTag[CityTag["Lawless"] = 21] = "Lawless";
    CityTag[CityTag["Efficient Police"] = 22] = "Efficient Police";
    CityTag[CityTag["Military Curfew"] = 23] = "Military Curfew";
    CityTag[CityTag["Unhygienic"] = 24] = "Unhygienic";
    CityTag[CityTag["Sewage System"] = 25] = "Sewage System";
    CityTag[CityTag["Fresh Water"] = 26] = "Fresh Water";
    CityTag[CityTag["Performing Artists"] = 27] = "Performing Artists";
    CityTag[CityTag["Cultural Hub"] = 28] = "Cultural Hub";
    CityTag[CityTag["Tourist Hotspot"] = 29] = "Tourist Hotspot";
    CityTag[CityTag["Slums"] = 30] = "Slums";
    CityTag[CityTag["Underground"] = 31] = "Underground";
    CityTag[CityTag["Underworld"] = 32] = "Underworld";
    CityTag[CityTag["Organized Crime"] = 33] = "Organized Crime";
    CityTag[CityTag["Harbor"] = 34] = "Harbor";
    CityTag[CityTag["Seaport"] = 35] = "Seaport";
    CityTag[CityTag["Greens"] = 36] = "Greens";
    CityTag[CityTag["Entertainment Infra"] = 37] = "Entertainment Infra";
    CityTag[CityTag["Medical Infra"] = 38] = "Medical Infra";
    CityTag[CityTag["Charming"] = 39] = "Charming";
    CityTag[CityTag["Breathtaking"] = 40] = "Breathtaking";
    CityTag[CityTag["Mage Presence"] = 41] = "Mage Presence";
    CityTag[CityTag["Holy Sites"] = 42] = "Holy Sites";
})(CityTag || (CityTag = {}));
class Country {
    constructor(args) {
        this.$myName = null;
        this.$myDesc = null;
        if (Country.$countryNames === null) {
            throw new Error("Static elements not loaded");
        }
        this.planet = args.planet;
        this.name = args.name;
        this.fullName = args.fullName;
        this.capital = args.capital;
        this.leader = args.leader;
        this.government = args.government;
        this.population = args.population;
        this.primaryCulture = args.primaryCulture;
        this.area = args.area;
        this.capitalPopulation = args.capitalPopulation;
        this.capitalTemperature = args.capitalTemperature;
        this.capitalElevation = args.capitalElevation;
        this.races = args.races;
        this.exoticRaces = args.exoticRaces;
        this.exclusiveRaces = args.exclusiveRaces;
        this.description = args.description;
        this.tags = args.tags;
        this.capitalTags = args.capitalTags;
        this.capitalSummary = args.capitalSummary;
        this.leaderDescription = args.leaderDescription;
        this.index = `${this.planet}|${this.name}`;
        if (Country.countriesIndex.has(this.index)) {
            throw new Error("Duplicate country");
        }
        Country.countriesIndex.set(this.index, this);
        this.$myName =
            $(`<div class='country_name' data-index-key='${this.index}'>${this.name}</div>`);
        this.$myName.appendTo(Country.$countryNames);
        this.$myDesc = this.generateDOM();
        this.$myDesc.hide().appendTo(Country.$countryDesc);
    }
    static loadStaticElements() {
        this.$countryNames = $(".country_names");
        this.$countryDesc = $(".country_desc");
        this.$countryNames.on("click", ".country_name:not(.active)", function () {
            const indexKey = $(this).data("indexKey");
            Country.countriesIndex.get(indexKey).showCountry();
        });
    }
    showCountry() {
        Country.$countryDesc.children().hide();
        Country.$countryNames.children().removeClass("active");
        this.$myName.addClass("active");
        this.$myDesc.show();
    }
    generateDOM() {
        return $(`
        <div class="country">
            <div class="country_data country_card">
                 <h5>Country</h5>
                 <table>
                    <tbody>
                        <tr><td>Planet</td><td>${this.planet}</td></tr>
                        <tr><td>Name</td><td>${this.fullName}</td></tr>
                        <tr><td>Area</td><td>${this.area}K km<sup>2</sup></td></tr>
                        <tr><td>Population</td><td>${this.population}</td></tr>
                        <tr><td>Government</td><td>${this.government}</td></tr>
                        <tr><td>Culture</td><td>${this.primaryCulture}</td></tr>
                    </tbody>
                </table>
                <div class="tags">${this.tags.map(x => `<span class="tag">${x}</span>`).join("")}</div>
            </div>
            <div class="capital_data country_card">
                <h5>Capital</h5>
                <table>
                    <tbody>
                        <tr><td>Name</td><td>${this.capital}</td></tr>
                        <tr><td>Population</td><td>${this.capitalPopulation}</td></tr>
                        <tr><td>Elevation</td><td>${this.capitalElevation}</td></tr>
                        <tr><td>Temperature</td><td>${this.capitalTemperature}</td></tr>
                    </tbody>
                </table>
                <div class="tags">${Array.from(this.capitalTags, ([tag, val]) => `<span class="tag leveled t${val}">${CityTag[tag]}</span>`).join("")}
                </div>
            </div>
            <div class="leader_data country_card">
                <h5>Leader</h5>
                <table>
                    <tbody>
                        <tr><td>Name</td><td>${this.leader ? this.leader : "None"} 
                    </tbody>
                </table>
                <div class="card_info">${this.leaderDescription}</div>
            </div>
            <div class="desc">
                ${this.description}
                <h5>About the Capital</h5>
                <div class="capital_info">${this.capitalSummary}</div>
                <h5>Racial Spread</h5>
                <div class="racial_info">
                    <div>Mainly inhabited by ${this.races.size > 0 ?
            Array.from(this.races, ([name, percent]) => `${name} (${Math.round(percent * 100) / 100}%)`).join(", ") : "?"}.</div>
                    ${Array.isArray(this.exoticRaces) && this.exoticRaces.length
            ? `<div>${this.exoticRaces.join(", ")} can notably be found here.</div>` : ""}
                    ${Array.isArray(this.exclusiveRaces) && this.exclusiveRaces.length
            ? `<div>${this.exclusiveRaces.join(", ")} only come from here.</div>` : ""}
                </div>
            </div>
        </div>`);
    }
}
Country.countriesIndex = new Map();
Country.$countryNames = null;
Country.$countryDesc = null;
(() => {
    $(() => {
        Country.loadStaticElements();
        new Country({
            planet: "Terra Prima",
            name: "Veteres",
            fullName: "Regnum Veteres",
            capital: "Ortus",
            area: 106,
            population: "2.6M",
            government: "Emperor / Senate",
            primaryCulture: "Roma",
            leader: "Rex Augustus IV",
            tags: [],
            races: new Map([
                ["Humans", 60.8],
                ["Half-Elves", 30.5],
                ["Elves", 8.7],
            ]),
            exoticRaces: ["Aasimars", "Eladrin", "Vampires"],
            exclusiveRaces: [],
            capitalPopulation: "218K",
            capitalElevation: "4.2m",
            capitalTemperature: "8&#8451;",
            capitalTags: new Map([
                [CityTag.Organized, 6],
                [CityTag["Sewage System"], 6],
                [CityTag["Tourist Hotspot"], 5],
                [CityTag["Entertainment Infra"], 5],
                [CityTag["Trade Hotspot"], 4],
                [CityTag["Seaport"], 4],
                [CityTag["Fresh Water"], 4],
                [CityTag.Sprawling, 3],
                [CityTag["Efficient Police"], 3],
                [CityTag["Charming"], 3],
                [CityTag["Academic Focus"], 3],
                [CityTag["Craftsman's Guilds"], 2],
                [CityTag.Walled, 2],
                [CityTag["Greens"], 2],
                [CityTag["Medical Infra"], 1],
                [CityTag["Slums"], 1],
            ]),
            capitalSummary: `
                The city where modern civilization is began following the darkness. A city that has seen all. Earliest remaining 
                written records of all sentient races and cultures can be traced here. For a long time, this was the 
                capital of an empire that sprawled the world, and even now remains the single most important city of all.
                What secrets do its archives hold?`,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Rycerz",
            fullName: "Holy Empire of Rycerz",
            capital: "Kiragg",
            area: 114,
            population: "6.9M",
            government: "Feudal Empire",
            primaryCulture: "Pegaz",
            leader: "Sir Enciodas Silverash",
            tags: [],
            races: new Map([
                ["Humans", 56],
                ["Shifters[Equines]", 25],
                ["Half-Orcs", 10],
                ["DragonBorn", 3],
                ["Dwarves", 3],
                ["Half-Elves", 2],
                ["Elves", 1],
            ]),
            exoticRaces: ["Orcs", "Earth Genasi"],
            exclusiveRaces: ["Centaurs"],
            capitalPopulation: "307K",
            capitalElevation: "5480m",
            capitalTemperature: "-24&#8451;",
            capitalTags: new Map([
                [CityTag.Impregnable, 6],
                [CityTag["Breathtaking"], 6],
                [CityTag["Holy Sites"], 5],
                [CityTag["Mining Ops"], 4],
                [CityTag.Organized, 3],
                [CityTag["Fresh Water"], 3],
                [CityTag["Sewage System"], 3],
                [CityTag["Industrial Zone"], 3],
                [CityTag["Mage Presence"], 3],
                [CityTag["Space Crunch"], 2],
                [CityTag["Tourist Hotspot"], 2],
                [CityTag["Research Centre"], 2],
                [CityTag["Organized Crime"], 2],
                [CityTag["Efficient Police"], 1],
                [CityTag["Medical Infra"], 1],
                [CityTag["Underground"], 1],
            ]),
            capitalSummary: `
                Rumoured to have been made by a Goddess, this city, 'purchased' by Rycerz in the times past, is a vast 
                cave system within one of the worlds topmost peaks. Other than rather low atmospheric pressure, the
                caves, beyond all reason, are perfect for life. Hot springs provide fresh water and maintain temperature
                while certain bluish crystals provide light strangely like that of the sun.`,
            description: "",
            leaderDescription: ``
        });
        new Country({
            planet: "Terra Prima",
            name: "Ursus",
            fullName: "Eternal Tsardom of Ursus",
            capital: "Ivangrad",
            area: 241,
            population: "3.1M",
            government: "Tsardom",
            primaryCulture: "Rus",
            leader: "Tsar Ivanovich Kashchey",
            tags: [],
            races: new Map([
                ["Humans", 60],
                ["Shifters[Ursine]", 36],
                ["Dwarves", 2],
                ["Tieflings", 1],
                ["DragonBorn", 1],
            ]),
            exoticRaces: ["Goliaths", "Demons", "Minotaurs", "Hobgoblins", "Yuan-ti"],
            exclusiveRaces: ["Bugbears"],
            capitalPopulation: "121K",
            capitalElevation: "202m",
            capitalTemperature: "-3&#8451;",
            capitalTags: new Map([
                [CityTag["Military Curfew"], 6],
                [CityTag["Organized Crime"], 4],
                [CityTag["Underworld"], 4],
                [CityTag["Fresh Water"], 3],
                [CityTag["Academic Focus"], 3],
                [CityTag["Mage Presence"], 3],
                [CityTag["Cultural Hub"], 3],
                [CityTag.Fortified, 2],
                [CityTag.Organized, 2],
                [CityTag["Sewage System"], 1],
                [CityTag["Greens"], 1],
                [CityTag["Slums"], 1],
            ]),
            capitalSummary: `
                A dangerous city at the centre of a dangerous country. At its very centre sits a dynasty that predates 
                the very empire, rumoured to be the soul of Ursus itself. Military forces crush dissenters and criminals 
                alike with an iron hand. Right underneath their gazes crime lords operating throughout Terra flourish. 
                And yet, this tyranny is home to many a genius incomparable...`,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Farando",
            fullName: "Farando Shogunate",
            capital: "Setsujoku",
            area: 68,
            population: "2.9M",
            government: "Shogunate",
            primaryCulture: "Minami",
            leader: "Meijin Souya",
            tags: [],
            races: new Map([
                ["Humans", 79],
                ["Halflings", 8],
                ["Half-Elves", 7],
                ["Dwarves", 4],
                ["Elves", 2],
            ]),
            exoticRaces: ["Tritons", "Air genasi", "Githyanki", "Kenku", "Tabaxi", "Sea Elves", "Oni"],
            exclusiveRaces: [],
            capitalPopulation: "284K",
            capitalElevation: "9.7m",
            capitalTemperature: "0&#8451;",
            capitalTags: new Map([
                [CityTag.Fortified, 5],
                [CityTag["Mage Presence"], 4],
                [CityTag["Industrial Zone"], 4],
                [CityTag["Commercial Hub"], 3],
                [CityTag["Cultural Hub"], 3],
                [CityTag["Academic Focus"], 3],
                [CityTag["Efficient Police"], 2],
                [CityTag.Organized, 2],
                [CityTag["Charming"], 2],
                [CityTag["Medical Infra"], 2],
                [CityTag["Holy Sites"], 2],
                [CityTag["Greens"], 2],
                [CityTag["Mafia Control"], 1],
                [CityTag["Sewage System"], 1],
                [CityTag["Fresh Water"], 1],
            ]),
            capitalSummary: `
                A city that would not die, there was a time when this one city was all that the now-mighty empire had. 
                With the land burning, barbarians at the gates, the first Meijin took command. His will became the city's
                will - a will of survival, of vengeance. Countless generations have passed since then and the capital has
                thrived in more ways than one, but even now the people here view the arrival of the mists with reverence...`,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Sadhvastan",
            fullName: "Sadhvarajya",
            capital: "Nagasyaranya",
            area: 62,
            population: "3.2M",
            government: "Raj",
            primaryCulture: "Vedic",
            leader: "Raja Devavrata",
            tags: [],
            races: new Map([
                ["Humans", 55],
                ["Shifters[Serpentine]", 21],
                ["Shifters[Feline]", 15],
                ["Yuan-ti", 6],
                ["Aarakocra", 2],
                ["Elves", 1],
            ]),
            exoticRaces: ["Aasimars", "Goblins", "Harengon", "Githyanki", "Kenku", "Tortles"],
            exclusiveRaces: ["Loxodon", "Githzerai", "Leonin"],
            capitalPopulation: "165K",
            capitalElevation: "56m",
            capitalTemperature: "9&#8451;",
            capitalTags: new Map([
                [CityTag["Breathtaking"], 5],
                [CityTag["Holy Sites"], 5],
                [CityTag["Greens"], 4],
                [CityTag["Mage Presence"], 4],
                [CityTag["Craftsman's Guilds"], 3],
                [CityTag["Central Market"], 2],
                [CityTag["Cultural Hub"], 2],
                [CityTag["Slums"], 2],
                [CityTag.Open, 2],
                [CityTag["Academic Focus"], 2],
                [CityTag["Medical Infra"], 1],
                [CityTag.Cluttered, 1],
                [CityTag["Fresh Water"], 1],
            ]),
            capitalSummary: `
                 A city that embodies the free, untamed spirit of the forest. In a world that rapidly changes, this 
                 remains the only mega-city where not a single piece of concrete or steel has gone into the infrastructure.
                 Buried deep within inaccessible woods, every single building is made from trees, several still alive. 
                 Rumours are that a titanic serpent unseen to man guards and provides shelter to it till this date.`,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Stahlern",
            fullName: "Stahlern Imperium",
            capital: "Julsburg",
            area: 93,
            population: "4.1M",
            government: "Reich",
            primaryCulture: "Hexenfurst",
            leader: "Kaiser Alexander Siegfried Von Lohengramm",
            tags: [],
            races: new Map([
                ["Humans", 85],
                ["Dwarves", 5],
                ["Half-Elves", 7],
                ["Elves", 2],
                ["Gnomes", 1],
            ]),
            exoticRaces: ["Deep Gnomes", "Duergar", "Drow", "Earth Genasi"],
            exclusiveRaces: ["Warforged"],
            capitalPopulation: "120K",
            capitalElevation: "28m",
            capitalTemperature: "3&#8451;",
            capitalTags: new Map([
                [CityTag["Industrial Zone"], 6],
                [CityTag["Mining Ops"], 6],
                [CityTag["Seaport"], 5],
                [CityTag["Trade Hotspot"], 4],
                [CityTag["Efficient Police"], 4],
                [CityTag["Academic Focus"], 4],
                [CityTag.Organized, 3],
                [CityTag["Sewage System"], 3],
                [CityTag["Medical Infra"], 3],
                [CityTag.Walled, 2],
            ]),
            capitalSummary: `
                A heart of steel that pumps a lifeblood of coal and iron throughout the Imperium and outside and the
                one of the only two places where a ton of copper is cheaper than a ton of apples. Massive factories 
                extract resources at an unbelievable rate, with highly organized industries consuming them to produce
                components and machines with supernatural efficiency. An uber-efficient police denies any possibility
                of crime in this steampunk city with their uncanny amount of intel.
            `,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Naiyumi",
            fullName: "Most Serene Republic of Naiyumi",
            capital: "Gugong",
            area: 117,
            population: "6.0M",
            government: "'Republic'",
            primaryCulture: "Yan",
            leader: "Captain Yang Wenli",
            tags: [],
            races: new Map([
                ["Humans", 67],
                ["Halflings", 13],
                ["Gnomes", 12],
                ["HalfElves", 5],
                ["DragonBorn", 2],
                ["Elves", 1],
            ]),
            exoticRaces: ["Satyr", "Owlin", "Lizardfolk", "Tabaxi", "Shifters", "Changelings"],
            exclusiveRaces: [],
            capitalPopulation: "74K",
            capitalElevation: "4.2m",
            capitalTemperature: "22&#8451;",
            capitalTags: new Map([
                [CityTag["Military Curfew"], 5],
                [CityTag["Breathtaking"], 5],
                [CityTag["Tourist Hotspot"], 4],
                [CityTag.Fortified, 3],
                [CityTag["Academic Focus"], 2],
                [CityTag["Holy Sites"], 2],
                [CityTag["Greens"], 2],
                [CityTag["Space Crunch"], 1],
                [CityTag["Cluttered"], 1],
            ]),
            capitalSummary: `
                Rumoured to be the most serene place on Terra and easily the one with the highest per-capita assets, 
                only the most influential or the most loyal of Naiyumi are allowed into this forbidden city. Historically,
                leaders across generations have cocooned themselves in this secure paradise to shut themselves off to the 
                disturbing realities of the world outside. Word is, that under the current regime, this won't remain 
                capital for long.`,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Celatum",
            fullName: "United Provinces of Celatum",
            capital: "Emberston",
            area: 109,
            population: "3.2M",
            government: "Kingdom / Serfdom",
            primaryCulture: "Neo-Anglo",
            leader: "Queen Argela",
            tags: [],
            races: new Map([
                ["Humans", 65],
                ["DragonBorn", 15],
                ["Halflings", 13],
                ["Half-Orcs", 4],
                ["Gnomes", 3],
            ]),
            exoticRaces: ["Changelings", "Firbolgs", "Harengons", "Satyrs", "Orcs", "Vampires"],
            exclusiveRaces: [],
            capitalPopulation: "142K",
            capitalElevation: "40m",
            capitalTemperature: "0&#8451;",
            capitalTags: new Map([
                [CityTag["Medical Infra"], 6],
                [CityTag["Holy Sites"], 4],
                [CityTag["Charming"], 4],
                [CityTag["Academic Focus"], 4],
                [CityTag["Craftsman's Guilds"], 3],
                [CityTag["Central Market"], 3],
                [CityTag["Organized"], 2],
                [CityTag["Cultural Hub"], 2],
                [CityTag["Entertainment Infra"], 2],
                [CityTag.Open, 2],
                [CityTag["Lawless"], 1],
            ]),
            capitalSummary: `
                A newly founded city by Queen Argela herself. This city has grown to mirror her philosophy and become the
                greatest center of medical research on Terra. Healers and doctors from here are valued worldwide, for 
                this atmosphere of freedom and comfort along with the best standards of hygiene and beauty cultivates 
                the very best of them. However, for all its happiness, such unrestrained freedom does attract the 
                unscrupulous...`,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Aegir",
            fullName: "Duchy of Aegir",
            capital: "Eldfjalla (pron. Uld-Fia-Tla)",
            area: 67,
            population: "2.4M",
            government: "Aristocracy / Matriarchy",
            primaryCulture: "Skaldic",
            leader: "Jarl Gladiia",
            tags: [],
            races: new Map([
                ["Humans", 72],
                ["Half-Elves", 14],
                ["Sea-Elves", 8],
                ["Shifters[Aquatic]", 6],
            ]),
            exoticRaces: ["Triton", "Water Genasi", "Yuan-ti"],
            exclusiveRaces: ["Seaborn"],
            capitalPopulation: "17K",
            capitalElevation: "2071m",
            capitalTemperature: "-2&#8451;",
            capitalTags: new Map([
                [CityTag["Breathtaking"], 5],
                [CityTag["Research Centre"], 5],
                [CityTag["Holy Sites"], 3],
                [CityTag["Lawless"], 2],
                [CityTag.Undefended, 1],
            ]),
            capitalSummary: `
                Built upon the warm, fertile and mineral rich lands of an old volcano, this beautiful little city is an 
                oasis in the frigid wastelands around it. Yet life in the middle of nowhere is not for everyone, and so 
                few choose to live here. Fewer still are encouraged to, for those that live here come to be aware of certain
                secrets best left untold - and know that the scholars that propel the research here do not all come from Terra...`,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Calentaur",
            fullName: "Serene Valleys of Calentaur",
            capital: "Annwyn",
            area: 57,
            population: "2.1M",
            government: "Council",
            primaryCulture: "Foehn",
            leader: "Lady Shiadhal",
            tags: [],
            races: new Map([
                ["Elves", 66],
                ["Half-Elves", 14],
                ["Humans", 10],
                ["Halflings", 6],
                ["Gnomes", 4],
            ]),
            exoticRaces: ["Eladrin", "Satyr", "Owlin", "Goblins"],
            exclusiveRaces: ["Fairies"],
            capitalPopulation: "59K",
            capitalElevation: "271m",
            capitalTemperature: "8&#8451;",
            capitalTags: new Map([
                [CityTag.Breathtaking, 6],
                [CityTag.Impregnable, 6],
                [CityTag.Greens, 5],
                [CityTag["Mafia Control"], 5],
                [CityTag["Military Curfew"], 4],
                [CityTag["Mage Presence"], 3],
                [CityTag.Organized, 3],
                [CityTag.Sprawling, 2],
                [CityTag["Craftsman's Guilds"], 2],
                [CityTag["Cultural Hub"], 2],
                [CityTag["Fresh Water"], 2],
            ]),
            capitalSummary: `
                A city that bridges between the material plane and the feywild, and yet belongs to neither. The only way 
                to access it is via a perpendicularity of uncertain location. The few non-elves who have been there have
                been forever enraptured. Depictions describe it as a supernatural city of eternal youth, beauty, health 
                and abundance, of sophisticated marble architecture with lush green vines and vivid flowers. Yet some 
                who've come back do not feel particularly inclined to return there...`,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Vinland",
            fullName: "Free Territory of Vinland",
            capital: "Frihet",
            area: 57,
            population: "2.1M",
            government: "Free Territory",
            primaryCulture: "Rus / Pegaz / Neo-Anglo",
            leader: "",
            tags: [],
            races: new Map([
                ["Humans", 70],
                ["Halflings", 21],
                ["Gnomes", 9],
            ]),
            exoticRaces: ["Firbolgs", "Trolls", "Goblins", "Kobolds"],
            exclusiveRaces: [],
            capitalPopulation: "16K",
            capitalElevation: "56m",
            capitalTemperature: "4&#8451;",
            capitalTags: new Map([
                [CityTag["Central Market"], 3],
                [CityTag["Craftsman's Guilds"], 3],
                [CityTag["Entertainment Infra"], 3],
                [CityTag["Fresh Water"], 2],
                [CityTag["Greens"], 2],
                [CityTag["Charming"], 2],
                [CityTag.Undefended, 1],
            ]),
            capitalSummary: `
                Possibly the most unassuming capital of Terra Prima, the city of liberty is open to all, yet doesn't 
                make any bow underneath its grandeur. The lack of authority means no real power is gathered in the 
                capital, and so economy, and life, here is slow and relaxed. Yet the few who do live here wouldn't leave
                behind the family like atmosphere plus the ease of availability of a capital for anything else in the 
                world.`,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Altava",
            fullName: "Wild Hinterlands of Altava",
            capital: "Sal Venito",
            area: 103,
            population: "0.3M",
            government: "Anarchy",
            primaryCulture: "Liberi / Skaldic / Roma",
            leader: "",
            tags: [],
            races: new Map([
                ["Humans", 90],
                ["DragonBorn", 5],
                ["Tieflings", 4],
                ["Air Genasi", 1],
            ]),
            exoticRaces: ["Goblins", "Hobgoblins", "Tortle"],
            exclusiveRaces: ["Vedalken"],
            capitalPopulation: "4K",
            capitalElevation: "56m",
            capitalTemperature: "4&#8451;",
            capitalTags: new Map([
                [CityTag.Ruins, 6],
                [CityTag.Harbor, 3],
                [CityTag.Organized, 3],
                [CityTag["Mafia Control"], 3],
                [CityTag["Underworld"], 3],
                [CityTag["Lawless"], 2],
                [CityTag["Sewage System"], 2],
                [CityTag["Fresh Water"], 1],
            ]),
            capitalSummary: `
                Not more than a century ago a city to rival Ortus, all that remains of this arrogant capital are ruins and
                shattered dreams. They dared to take on those that must not be spoken of, and all that remained from that
                was mere fodder for scavengers - criminals, pirates and rival states alike. Now that the corpse has been
                picked to the bone, a few refugees and hinterland tribesmen still find shelter and comfort in the ruins,
                still grand and intimating even in decay...
            `,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Nidavellir",
            fullName: "Depths of Nidavellir",
            capital: "Idavoll",
            area: 61,
            population: "2.9M",
            government: "Kingdom",
            primaryCulture: "Durinn",
            leader: "Queen Dagfid",
            tags: [],
            races: new Map([
                ["Dwarves", 64],
                ["Drow", 20],
                ["Tieflings", 8],
                ["Deep Gnomes", 6],
                ["Humans", 2],
            ]),
            exoticRaces: ["Duergar", "Fire Genasi", "Kenku", "Orcs"],
            exclusiveRaces: [],
            capitalPopulation: "90K",
            capitalElevation: "-1222m",
            capitalTemperature: "43&#8451;",
            capitalTags: new Map([
                [CityTag.Underground, 6],
                [CityTag["Mining Ops"], 6],
                [CityTag.Impregnable, 5],
                [CityTag["Space Crunch"], 5],
                [CityTag["Cluttered"], 3],
                [CityTag["Industrial Zone"], 3],
                [CityTag["Organized Crime"], 3],
                [CityTag["Underworld"], 2],
                [CityTag["Lawless"], 2],
                [CityTag["Slums"], 2],
            ]),
            capitalSummary: `
                The entrance to the underdark, visitors to the city of Idavoll are greeted by its hot and acrid air, 
                followed by the angry red glare of eternally burning smelters. With its paranoid inhabitants, toiling 
                endlessly and operating ruthlessly in a city that has never seen sunlight, Idavoll is the least 
                accessible settlement on Terra - but it is accessible. Much more than can be said for anything in the 
                passages that descend beneath it... passages rumoured to be the home of great and terrible demon lords, 
                passages rumoured to be the only way into Terra Incognita.`,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Gaulle",
            fullName: "United Clans of Gaulle",
            capital: "Lutetia",
            area: 52,
            population: "4.0M",
            government: "Free Tribes",
            primaryCulture: "Hexenfurst",
            leader: "Chief Vercingetorix",
            tags: [],
            races: new Map([
                ["Humans", 88],
                ["Shifters", 12],
            ]),
            exoticRaces: ["Aarakocra", "Owlin", "Tabaxi", "Changeling", "Kalashtar", "Fire Genasi"],
            exclusiveRaces: ["Werewolves"],
            capitalPopulation: "217K",
            capitalElevation: "18m",
            capitalTemperature: "12&#8451;",
            capitalTags: new Map([
                [CityTag["Trade Hotspot"], 5],
                [CityTag["Space Crunch"], 5],
                [CityTag["Tourist Hotspot"], 5],
                [CityTag["Entertainment Infra"], 4],
                [CityTag["Academic Focus"], 4],
                [CityTag.Fortified, 4],
                [CityTag["Harbor"], 3],
                [CityTag["Lawless"], 3],
                [CityTag["Fresh Water"], 2],
            ]),
            capitalSummary: `
                A large and bustling city of a large and bustling country, it mirrors the serious congestion and 
                overpopulation evident in the rest of the country. For those from outside, reaching from their tavern to 
                their destination can easily take hours - yet those who know their way about know this to be one of the
                most resourceful places on Terra. There are rumours that a mass renovation is in the works...`,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Reindal",
            fullName: "Snowy realms of Reindal",
            capital: "Witstad",
            area: 39,
            population: "0.7M",
            government: "Federation",
            primaryCulture: "Roma",
            leader: "Sir Lucius Artorius Castus",
            tags: [],
            races: new Map([
                ["Humans", 90],
                ["DragonBorn", 5],
                ["Half-Elves", 2],
                ["Gnomes", 1],
                ["Halflings", 1],
                ["Elves", 1],
            ]),
            exoticRaces: ["Aasimar", "Eladrin", "Goblin", "Kalashtar", "Changelings"],
            exclusiveRaces: [],
            capitalPopulation: "67K",
            capitalElevation: "918m",
            capitalTemperature: "-8&#8451;",
            capitalTags: new Map([
                [CityTag["Breathtaking"], 6],
                [CityTag["Mage Presence"], 5],
                [CityTag["Academic Focus"], 3],
                [CityTag["Greens"], 3],
                [CityTag["Holy Sites"], 2],
                [CityTag["Merchant Guilds"], 1],
                [CityTag.Undefended, 1],
            ]),
            capitalSummary: `
                Much like the lands to which it belongs, this town, enchanting in its beautiful, pure and perennial snow,
                is a safe haven from all the conflicts in terra. Originally inhabited by refugees tired of war or slaves
                escaping to freedom, few people now wish to come here, but those who do come find comfort and peace like
                no where else. Despite being soft spoken and kind to a fault, the people here would work harder than all 
                others to secure the said comfort. And to secure the said peace...            `,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "KingsFall",
            fullName: "Cursed Plains of KingsFall",
            capital: "Necropolis",
            area: 40,
            population: "0.2M",
            government: "Anarchy",
            primaryCulture: "Hexenfurst",
            leader: "",
            tags: [],
            races: new Map([
                ["Humans", 89],
                ["Tieflings", 11],
            ]),
            exoticRaces: ["Shadar-Kai", "Kalashtar", "Vampires", "Hexbloods", "Reborn"],
            exclusiveRaces: [],
            capitalPopulation: "0 ?",
            capitalElevation: "352m",
            capitalTemperature: "7&#8451;",
            capitalTags: new Map([
                [CityTag["Ghost Town"], 1]
            ]),
            capitalSummary: `
                Once long ago, these buildings used to be a flourishing city. However, like the rest of the plains - whosoever
                held it found themselves on the loosing side of a particularly brutal war. These empty streets have
                changed hands dozens of times - each time involving mass brutality, plunder and slaughter. Now, none 
                dare venture here and only terrible ghosts haunt this mass grave of a capital. Some madmen have reported
                seeing the Witch King of ancient lore glide the streets even today, dancing a terrible dance along with 
                several human-puppets who they said comprise his troupe...`,
            description: "",
            leaderDescription: ""
        });
        new Country({
            planet: "Terra Prima",
            name: "Terra Incognita",
            fullName: "Terra Incognita",
            capital: "?",
            area: 75,
            population: "?",
            government: "?",
            primaryCulture: "?",
            leader: "?",
            tags: [],
            races: new Map(),
            exoticRaces: [],
            exclusiveRaces: [],
            capitalPopulation: "?",
            capitalElevation: "?",
            capitalTemperature: "?",
            capitalTags: new Map(),
            capitalSummary: `???`,
            description: "",
            leaderDescription: ""
        });
    });
})();
/**
 * Defines an object that can be indexed. Hovering on it will display a snippet
 * in card style and clicking on it will navigate to some section of the page.
 */
class Card {
    constructor() {
    }
    static loadFromDOM() {
        this.$floatingCard = $("#floating_card");
        this.$cardGraveyard = $("#card_graveyard");
        this.snapWindowDimensions();
        // noinspection JSDeprecatedSymbols
        $(window).resize(() => {
            waitForFinalEvent(() => {
                this.snapWindowDimensions();
            }, 500, "Indexible.loadFromDOM");
        });
    }
    static verbose(s) {
        return `<span class="verbose">${s}</span>`;
    }
    static link(indexKey, displayText) {
        return `<span class="card_link" data-index-key="${indexKey}">${displayText}</span>`;
    }
    static snapWindowDimensions() {
        const $window = $(window);
        this.viewportHeightInPx = $window.height();
        this.viewportWidthInPx = $window.width();
    }
    static revealFloatingCard() {
        this.$floatingCard.show();
        this.floatingCardWidth = this.$floatingCard.width();
        this.floatingCardHeight = this.$floatingCard.height();
    }
    static hideFloatingCard() {
        this.$floatingCard.hide();
    }
    static moveFloatingCard(x, y) {
        const postX = x + this.floatingCardWidth + 24 < this.viewportWidthInPx;
        const preX = x > this.floatingCardWidth + 24;
        const postY = y + this.floatingCardHeight + 24 < this.viewportHeightInPx;
        const preY = y > this.floatingCardHeight + 24;
        if (postX) {
            if (postY) {
                this.$floatingCard.css({
                    top: y + 12,
                    left: x + 12,
                });
            }
            else if (preY) {
                this.$floatingCard.css({
                    top: y - 12 - this.floatingCardHeight,
                    left: x + 12,
                });
            }
            else {
                this.$floatingCard.hide();
            }
        }
        else if (preX) {
            if (postY) {
                this.$floatingCard.css({
                    top: y + 12,
                    left: x - 12 - this.floatingCardWidth,
                });
            }
            else if (preY) {
                this.$floatingCard.css({
                    top: y - 12 - this.floatingCardHeight,
                    left: x - 12 - this.floatingCardWidth,
                });
            }
            else {
                this.$floatingCard.hide();
            }
        }
        else {
            // Risky? I don't expect the code to ever actually reach here, since
            // I'm not planning for mobile devices.
            this.$floatingCard.hide();
        }
    }
    static getIndexible(key) {
        return this.Index.get(key);
    }
    showCardFullSize() {
        this.$centralView.children().hide();
        const cardIndex = this.indexKey;
        const $existingCard = this.$centralView.children(`[data-index-key='${cardIndex}']`);
        if ($existingCard.length > 0) {
            $existingCard.show();
        }
        else {
            const $card = this.generateCard(false);
            this.$centralView.append($card);
            $card.show();
        }
    }
    showCardFloating() {
        Card.$floatingCard.children().hide();
        const cardIndex = this.indexKey;
        const $existingCard = Card.$floatingCard.children(`[data-index-key='${cardIndex}']`);
        if ($existingCard.length > 0) {
            $existingCard.show();
        }
        else {
            const $card = this.generateCard(true);
            $card.addClass("floating");
            Card.$floatingCard.append($card);
            $card.show();
        }
    }
    registerSelf() {
        Card.Index.set(this.indexKey, this);
    }
}
Card.Index = new Map();
$(() => {
    Card.loadFromDOM();
    const $tokens = $("#tokens");
    $tokens.on("mouseenter", ".token", function (e) {
        const indexKey = $(this).data("indexKey");
        const indexible = Card.getIndexible(indexKey);
        Card.revealFloatingCard();
        indexible.showCardFloating();
        Card.moveFloatingCard(e.clientX, e.clientY);
    });
    $tokens.on("mouseleave", ".token", function () {
        Card.hideFloatingCard();
    });
    $tokens.on("mousemove", ".token", function (e) {
        Card.moveFloatingCard(e.clientX, e.clientY);
    });
    $tokens.on("click", ".token", function () {
        Card.hideFloatingCard();
        const indexKey = $(this).data("indexKey");
        const indexible = Card.getIndexible(indexKey);
        indexible.showCardFullSize();
    });
    const $card_links = $(".page");
    $card_links.on("mouseenter", ".card_link", function (e) {
        const indexKey = $(this).data("indexKey");
        const indexible = Card.getIndexible(indexKey);
        console.log(indexKey, indexible);
        indexible.showCardFloating();
        Card.revealFloatingCard();
        Card.moveFloatingCard(e.clientX, e.clientY);
    });
    $card_links.on("mouseleave", ".card_link", function () {
        Card.hideFloatingCard();
    });
    $card_links.on("mousemove", ".card_link", function (e) {
        Card.moveFloatingCard(e.clientX, e.clientY);
    });
    $card_links.on("click", ".card_link", function () {
        Card.hideFloatingCard();
        const indexKey = $(this).data("indexKey");
        const indexible = Card.getIndexible(indexKey);
        indexible.showCardFullSize();
    });
});
///<reference path="card.ts"/>
var NpcPersonalityTag;
(function (NpcPersonalityTag) {
    NpcPersonalityTag[NpcPersonalityTag["Outdoorsman"] = 0] = "Outdoorsman";
    NpcPersonalityTag[NpcPersonalityTag["Homebody"] = 1] = "Homebody";
    NpcPersonalityTag[NpcPersonalityTag["Recluse"] = 2] = "Recluse";
    NpcPersonalityTag[NpcPersonalityTag["Introvert"] = 3] = "Introvert";
    NpcPersonalityTag[NpcPersonalityTag["Social"] = 4] = "Social";
    NpcPersonalityTag[NpcPersonalityTag["Extrovert"] = 5] = "Extrovert";
    NpcPersonalityTag[NpcPersonalityTag["Early Bird"] = 6] = "Early Bird";
    NpcPersonalityTag[NpcPersonalityTag["Night owl"] = 7] = "Night owl";
    NpcPersonalityTag[NpcPersonalityTag["Masochist"] = 8] = "Masochist";
    NpcPersonalityTag[NpcPersonalityTag["Bloodlust"] = 9] = "Bloodlust";
    NpcPersonalityTag[NpcPersonalityTag["Abhors Violence"] = 10] = "Abhors Violence";
    NpcPersonalityTag[NpcPersonalityTag["Gourmand"] = 11] = "Gourmand";
    NpcPersonalityTag[NpcPersonalityTag["Ascetic"] = 12] = "Ascetic";
    NpcPersonalityTag[NpcPersonalityTag["Paranoid"] = 13] = "Paranoid";
    NpcPersonalityTag[NpcPersonalityTag["Trusting"] = 14] = "Trusting";
    NpcPersonalityTag[NpcPersonalityTag["Naive"] = 15] = "Naive";
    NpcPersonalityTag[NpcPersonalityTag["Greedy"] = 16] = "Greedy";
    NpcPersonalityTag[NpcPersonalityTag["Jealous"] = 17] = "Jealous";
    NpcPersonalityTag[NpcPersonalityTag["Psychopath"] = 18] = "Psychopath";
    NpcPersonalityTag[NpcPersonalityTag["Guilt-ridden"] = 19] = "Guilt-ridden";
    NpcPersonalityTag[NpcPersonalityTag["Kind"] = 20] = "Kind";
    NpcPersonalityTag[NpcPersonalityTag["Misandrist"] = 21] = "Misandrist";
    NpcPersonalityTag[NpcPersonalityTag["Misogynist"] = 22] = "Misogynist";
    NpcPersonalityTag[NpcPersonalityTag["Abrasive"] = 23] = "Abrasive";
    NpcPersonalityTag[NpcPersonalityTag["Asexual"] = 24] = "Asexual";
    NpcPersonalityTag[NpcPersonalityTag["Homosexual"] = 25] = "Homosexual";
    NpcPersonalityTag[NpcPersonalityTag["Bisexual"] = 26] = "Bisexual";
    NpcPersonalityTag[NpcPersonalityTag["Addict"] = 27] = "Addict";
    NpcPersonalityTag[NpcPersonalityTag["Recovering Addict"] = 28] = "Recovering Addict";
    NpcPersonalityTag[NpcPersonalityTag["Teetotaler"] = 29] = "Teetotaler";
    NpcPersonalityTag[NpcPersonalityTag["Stern"] = 30] = "Stern";
    NpcPersonalityTag[NpcPersonalityTag["Judging"] = 31] = "Judging";
    NpcPersonalityTag[NpcPersonalityTag["Accepting"] = 32] = "Accepting";
    NpcPersonalityTag[NpcPersonalityTag["Industrious"] = 33] = "Industrious";
    NpcPersonalityTag[NpcPersonalityTag["Hard worker"] = 34] = "Hard worker";
    NpcPersonalityTag[NpcPersonalityTag["Lazy"] = 35] = "Lazy";
    NpcPersonalityTag[NpcPersonalityTag["Slothful"] = 36] = "Slothful";
    NpcPersonalityTag[NpcPersonalityTag["Sanguine"] = 37] = "Sanguine";
    NpcPersonalityTag[NpcPersonalityTag["Optimist"] = 38] = "Optimist";
    NpcPersonalityTag[NpcPersonalityTag["Pessimist"] = 39] = "Pessimist";
    NpcPersonalityTag[NpcPersonalityTag["Depressive"] = 40] = "Depressive";
    NpcPersonalityTag[NpcPersonalityTag["Arrogant"] = 41] = "Arrogant";
    NpcPersonalityTag[NpcPersonalityTag["Modest"] = 42] = "Modest";
    NpcPersonalityTag[NpcPersonalityTag["Confident"] = 43] = "Confident";
    NpcPersonalityTag[NpcPersonalityTag["Vain"] = 44] = "Vain";
    NpcPersonalityTag[NpcPersonalityTag["Confrontational"] = 45] = "Confrontational";
    NpcPersonalityTag[NpcPersonalityTag["Conciliatory"] = 46] = "Conciliatory";
    NpcPersonalityTag[NpcPersonalityTag["Insecure"] = 47] = "Insecure";
    NpcPersonalityTag[NpcPersonalityTag["Nervous"] = 48] = "Nervous";
    NpcPersonalityTag[NpcPersonalityTag["Volatile"] = 49] = "Volatile";
    NpcPersonalityTag[NpcPersonalityTag["Neurotic"] = 50] = "Neurotic";
    NpcPersonalityTag[NpcPersonalityTag["Quiet"] = 51] = "Quiet";
    NpcPersonalityTag[NpcPersonalityTag["Verbose"] = 52] = "Verbose";
    NpcPersonalityTag[NpcPersonalityTag["Distant"] = 53] = "Distant";
    NpcPersonalityTag[NpcPersonalityTag["Full of Life"] = 54] = "Full of Life";
    NpcPersonalityTag[NpcPersonalityTag["Introspective"] = 55] = "Introspective";
    NpcPersonalityTag[NpcPersonalityTag["Unwitting Hypocrite"] = 56] = "Unwitting Hypocrite";
    NpcPersonalityTag[NpcPersonalityTag["Hypocrite"] = 57] = "Hypocrite";
    NpcPersonalityTag[NpcPersonalityTag["Abusive"] = 58] = "Abusive";
    NpcPersonalityTag[NpcPersonalityTag["Suck-up"] = 59] = "Suck-up";
    NpcPersonalityTag[NpcPersonalityTag["Bibliophile"] = 60] = "Bibliophile";
})(NpcPersonalityTag || (NpcPersonalityTag = {}));
class Character extends Card {
    constructor(args) {
        super();
        if (Character.$commonCentralView == null) {
            throw new Error("Premature instantiation of class. " +
                "The page isn't loaded yet.");
        }
        this.name = args.name;
        this.indexName = args.indexName;
        this.campaign = args.campaign;
        this.arc = args.arc;
        this.imgPath = `./assets/images/character_tokens/C${(args.campaign)}/Arc${(args.arc)}/${(args.tokenName)}.png`;
        this.indexKey = this.indexName ? `[character|${this.indexName}]` : `[character|${this.name}]`;
        Character.$tokenSpace.find(`.token_space[data-campaign='${this.campaign}'][data-arc='${this.arc}']`).append($(`
            <img src=${this.imgPath} class="token" alt="[Img Not Found]" data-index-key="${this.indexKey}">
        `));
        args.tags.push(`Campaign ${this.campaign} ${Card.verbose(`Arc ${this.arc}`)}`);
        args.tags.push(`${(args.gender)}${(args.age)}`);
        this.tags = args.tags;
        this.summary = args.summary;
        this.description = args.description;
        this.altImagePaths = args.altImagePaths;
        this.personalityTags = args.personalityTags;
        this.$centralView = Character.$commonCentralView;
        this.registerSelf();
    }
    static loadStaticElements() {
        Character.$commonCentralView = $("#character_idx .central_view");
        Character.$tokenSpace = $("#tokens");
        Character.$commonCentralView.on("click", ".token_selector", function () {
            const $tokens = $(this).parent().siblings(".tokens");
            $tokens.children().hide();
            $tokens.children(`[data-token='${$(this).data("token")}']`).show();
        });
    }
    generateCard(floating) {
        let tokenSpace;
        if (!floating && this.altImagePaths) {
            tokenSpace =
                `<div class="tokens">
                ${Array.from(this.altImagePaths, ([name, filename], index) => `<img src="./assets/images/character_tokens/C${(this.campaign)}/Arc${(this.arc)}/${(filename)}.png"
                          class="token" 
                          data-token="${filename}"
                          alt="[${name} Img not found]"
                          ${index == 0 ? "" : 'style="display: none;"'}>`).join("")}
                </div>
                <div>
                    ${Array.from(this.altImagePaths, ([name, filename]) => `<span class="token_selector tag" data-token="${filename}">${name}</span>`).join("")}
                </div>`;
        }
        else {
            tokenSpace = `<img src=${this.imgPath} class="token" alt="[Img Not Found]">`;
        }
        let personalityTags;
        if (this.personalityTags) {
            personalityTags =
                `<div class="personality_tags">${Array.from(this.personalityTags, ([tag, intensity]) => `<span class="tag leveled t${intensity}">${NpcPersonalityTag[tag]}</span>`).join("")}</div>`;
        }
        else {
            personalityTags = "";
        }
        return $(`
        <div class="character_card" data-index-key="${this.indexKey}">
            <div class="token_space">
                ${tokenSpace}
                ${this.altImagePaths ? `<div></div>` : ""}                        
            </div>
            <div class="content">
                <h5 class="name">${this.name}</h5>
                <div class="tags">${this.tags.map(x => `<span class="tag">${x}</span>`).join("")}</div>
                <div class="details">${this.description}</div>
                ${personalityTags}
                <div class="summary">${this.summary}</div>
            </div>
        </div>`);
    }
}
Character.$commonCentralView = null;
Character.$tokenSpace = null;
(() => {
    //
    // I'd have preferred to put these strings on the global scope so that they don't have those leading whitespaces,
    // but since we aren't using modules, I can't afford the pollution. I'm keeping them here to decrease the indent
    // level (saving lines) and leading whitespace to low values, in case they are rendered somewhere by accident.
    //
    const summaries = new Map([
        ["Lucian",
            `"This darkness is a refuge, a throne, and paradise. The spirits of the dead have never left, and I’ve cursed 
         the world from atop their bones... Seeing me as I am now, do you still want to hear my song? Do you still 
         dare... to stand before me?"<br/>
         Calamity of The Troupe - an unfinished masterpiece of their leader. Was once raised as their rising star in 
         response to the threat that was ${Card.link("[character|Ebenezar]", "the Lich")}. But turned against them only 
         as he slaughtered all the troupe's senior members in one night and escaped into Materia - sealing his 
         memories and powers. He returned to the outer planes by accident and sought out the troupe when he did. 
         Descended into insanity after killing ${Card.link("[character|Mouthpiece]", "The Mouthpiece")} and inheriting 
         his curse. Following which he stealthily assassinated ${Card.link("[character|Othello]", "The Traitor")}, who was 
         preoccupied in fighting 'Agents of the Fifth', thus freeing the Primordial nightmares.`],
        ["Ebenezar",
            `A human kid born in the the classical era. Accidentally entered a perpendicularity inside a 
         subterranean lake into the Gardens. Lived there for a few centuries and trained fanatically as a mage under his
         then-girlfriend ${Card.link("[character|Lesley]", "Lesley")}'s tutelage and soon surpassed her. Became a Lich
         and would often roam in shady alleys of Materia, appearing helpless - then feeding on the souls of any who 
         assaulted him. Stabilized the perpendicularity between the lake he once drowned in - making it his 'lair' - and 
         the Mistflame in the Gardens near Bunker#371. Went to the castle to 'fight death', but failed and died, his 
         last days and whereabouts remain unknown.`],
        ["Caelynn",
            `Born in the last years of the heroic age, fled into The Gardens due to an accidental encounter with the Fifth
          Nightmare. Being extremely gifted, she received guidance from various orders - often from Guardians themselves.
          Was once close to ${Card.link("[character|Othello]", "The Traitor")}. Currently leads the people of the Garden
          as the Guardian of Life. Now an ${Card.link("object", "Atium")} savant.`],
        ["Lesley",
            `A rich higher vampire mage with powerful time control powers. Came to The Gardens after a failed attempt to
          kill ${Card.link("[character|Caelynn Nightbreeze]", "Caelynn")}. Now her best friend  / advisor. Detests her
           family and curbs her bloodlust. Was depressed until recently.`],
        ["Irene",
            `An air genasi who was a junior member of the inquisition of the gardens. All her bunker-mates were killed in 
          an attack by The Troupe around 300 years ago, but the ${Card.link("[character|Kjera]", "Guardian of Magic")}
          took pity on her and replaced them all with physically intractable and sentient illusions. Despite them being 
          near-perfect replicas, Irene eventually figured out their true nature, but being grateful for the concern, she 
          kept the pretense of believing in them. Even so, ${Card.link("[character|Lesley]", "Lesley")} took a personal 
          interest in her and made sure to invite her every now and then to make sure she got to interact with real people.
          During the Hour of Loss, she displayed unexpected skill (leading others to suspect she had specifically been 
          trained for such situations), resolve, and fanaticism in fighting a deep-ocean aberration but went missing in
           the fight.`],
        ["Ling",
            `One of the fragments of an outer primordial. Moved into the Gardens long ago along with 
         ${Card.link("[character|Kjera]", "Kjera")} and worked as a lighthouse keeper there so as to be best placed to
          respond to the revival of her 'parent' or any other outsiders. Was chosen to be the Guardian of Diplomacy after
          the inquisitors' betrayal. Agreed but went missing during the expedition inside the Castle of the Night 
          following Preservation's death and the Survivor's Ascension.`],
        ["Dave",
            `A warforged automaton that was purchased by ${Card.link("[character|Caelynn Nightbreeze]", "Caelynn")}'s 
          batch-mates at a heavy price upon her graduation, to serve and protect her. His modules were heavily operated 
          upon by Lesley who practiced her coding skills on him. Failed to defend Caelynn at one point long ago, and 
          gave his life holding out against a deep-sea aberration to atone for it.`],
        ["Ulrich",
            `A human that lived in the last years of the Archaic era and had shown remarkable skill in making heavy armors 
          for those of his clerical order. Upon his death in war, Preservation gave him a second chance at sentient life
          in the Gardens, as a reward for saving the lives of so many thanks to his meticulous work at their armors. 
          Since then he's been honing his skills and is now regarded as one of the finest smiths in the multiverse.`],
        ["Lia",
            `An elven archer who roamed freely the Feywild until by cruel circumstance she fell prey to the second 
          nightmare. Survived the encounter thanks to ${Card.link("[character|Caelynn Nightbreeze]", "Caelynn")}'s 
          intervention, who remained on the lookout for primordial incursions. Caelynn then offered her asylum with 
          herself promising to keep her safe from the primordial as far as possible, an offer she readily took. 
          Rescued ${Card.link("[character|Ulrich]", "Ulrich")} when he showed up a few centuries later and subsequently 
          married him on his insistence. While not the ideal marriage, the two manage fine nowadays.`],
        ["Conley",
            `A fire genasi rebel who was given refuge by Preservation after he sacrificed his life to save the lives of 
          quite a few of his friends. Served as cook/housekeeper at Bunker#371 where he was everyone's favourite 
          junior. Used to respect ${Card.link("[character|Ebenezar]", "Ben")} before he ditched them all.`],
        ["Vahareth",
            `${Card.link("[character|Caelynn Nightbreeze]", "Caelynn")}'s predecessor as the Guardian of Life as well as a 
          father figure to her. Scouted her out in Materia, then got her to the gardens and personally trained her. 
          Known and feared throughout all the outer planes for his unbreakable will and eyes that could delve into the 
          deepest nature of a person's soul with just a glance. 'Retired' after Leras' death.`],
        ["GOrder",
            `Known across all the realms simply as 'The Master' - the Guardian of Order was an expert at diplomacy, the 
          forceful arm-twisting kind, who always got his way. Unlike most others who took it easy in the garden, he spent
          his whole life scheming and ruthlessly executing ever-more-complex Machiavellian schemes. So complex that even
          his own loyalties were at times doubted, particularly when some links were found between him and
          ${Card.link("[character|Othello]", "The Traitor")}. He was also a very strong warrior, rumoured to be a 
          radiant as well as have hemalurgic powers equivalent of Mistborn of old derived from an inordinate 
          number of spikes. A number equivalent to some of his seniormost counterparts within the castle itself, so many that 
          even Aluminium couldn't negate them in time. Committed suicide when Ruin attempted to assert his will via the
          hemalurgic spikes instead of letting his knowledge fall into the enemies hands. A pity too, for he was 
          literally the personification of one of the ideals of the new Preservation, "There's always another secret."`],
        ["Logos",
            `The enigmatic 'scriptwriter' of the Troupe, who dictates every move they will make. From the 'Troupe Leader'
          gained an uncanny ability to write reality to his whim, anything he writes <i>will exactly occur</i> as he wrote it. 
          However this works better for futures far off and with a lot of possibilities. Is functionally immortal
          since he wrote his own ending in the far future. <br/>
          Before he became the Playwright, he was also a greater demon lord. Banshees being male is extremely rare, and 
          all are very dangerous, and one among them becoming Lord was unheard of before him. Even back then he could 
          cast reality-bending magic simply by speaking (or chanting) aloud or writing his commands in the air.`],
        ["Mostima",
            `A fallen angel who can move through planes without relying on perpendicularities. Has a tendency of talking to
          someone one minute and disappearing the next. Suffers from an advanced case of Nightblood but doesn't seem to 
          suffer from psychosis or neurosis. Carries two staves that appear powerful and seem to be the manifestation of
           an ancient, or rather timeless, soul.`],
        ["Shimaken",
            `An orphan in the Castle of the Night who was adopted and raised by ${Card.link("character", "Lemuen")} along 
          with ${Card.link("[character|Rin Shima]", "his sister")}. Wasn't the
          best at fighting but maintained an unshakable, and contagious, aura of hope and optimism despite having seen 
          his fair share of atrocities and horrors. Organized a 'resistance' aimed at making leaving the castle possible.`],
        ["Shimarin",
            `An orphan adopted and raised by ${Card.link("character", "Lemuen")} who taught her sniping. Took it up as a job after 
          Lemuen got crippled. Worked in a team until ${Card.link("[character|Verrader]", "Verrader")} sold them out, 
          then worked solo. Was there, past midnight, when Ruin almost got complete - she made it back with 
          ${Card.link("[character|Logos]", "The Playwright")}'s aid.`],
        ["Verrader",
            `An influential fixer in Night Castle. Made it big thanks to his incredible charisma and deception skills. 
          Gained ${Card.link("condition", "Nightblood")} in an accident - a result of his first betrayal - during his
          early years spent on the field in a forge which submerged his whole team, except 
          ${Card.link("[character|Rin Shima]", "Shimarin")}, in magma. Died at the hands of the Steel Inquisitors, 
          his soul burnt to power Rin's hemalurgy.`],
        ["Fiest",
            `While he rarely stepped on to the field himself, ${Card.link("[character|Ken Shima]", "Shimaken")} and the 
          others owed a lot to his technical genius. Since he rarely even left the confines of his lab, his life was
          rather sheltered and happy. ${Card.link("character", "Lemuen")}'s boyfriend before she died.`],
        ["Mouthpiece",
            `Was somehow related to the Witch King of lore. The most loyal member of the troupe, he took it upon himself
          to be the host/announcer of the Troupe's 'shows'. Responsible for their most grotesque creations which often 
          were looked down upon by ${Card.link("[character|Logos]", "The Playwright")} as being crude and tasteless. 
          Was killed by a group of adventurers and ${Card.link("[Character|Lucian]", "Solitare")} but he had already 
          accomplished what his master needed...`],
        ["SanguineArch",
            `Little is known (so far) about the first, and primordial, vampire and the de facto Lord of the entire dimension
          of the Shadowfell except that they are extremely dangerous to all but other higher vampires, most of whom regard 
          them with utmost respect. Fear, yes, but respect...`],
        ["Decroa",
            `A higher vampire who had been captured by the Troupe Long ago and used both as a trap against unwanted 
          intruders and for their 'plays' and research. Prolonged torture and withdrawal symptoms had made her a little 
          unhinged, and <i>very</i> thristy. Was finally freed by a group of adventurers and thereafter protected by 
          ${Card.link("[character|The SanguineArch]", "The SanguineArch")} until she could escape the 
          castle. Revealed herself to be a childhood friend of ${Card.link("[character|Lesley]", "Lesley")}'s.`],
        ["Baphomet",
            `The Demon Lord in command of the 'lowest level' of the Castle who often was summoned to other realms to fight
          on the front lines, and so had inherited the traits of lesser demons - namely ferocity in battle without regard
          to self-preservation, an irrational hatred of devils, and a slight dearth of brain cells. Regardless, the mere
          mention of his name brought terror in the hearts of many - particularly in the lower levels of the castle...`],
        ["Kjera",
            `Very little is known (so far) about the Guardian of Magic. Except that she keeps her consciousness distributed
          across various forms and bodies, not all humanoid, across several reams. And so she is pretty much immortal even
          before her primordial origins are taken into account. Since each body has its own reservoir of mana, she 
          herself has near unlimited mana and can cast all non-proprietary spells, and most proprietary ones, known in 
          all the dimensions. She personally maintains the entire internal financial infrastructure of the Gardens.`],
        ["Othello",
            `Once the apprentice guardian of defense, he betrayed the people in Preservation to kill everyone in the bunker
          with the help of the troupe and escaped into the castle. The only person, other than himself, who would've 
          known all the details was ${Card.link("[character|GOrder]", "The Guardian of Order")} before he passed away.
          <br/>
          By the time he was found again by a group of adventurers, he was imprisoned by the troupe next to a rather 
          large explosive, and had completely lost his mind - as he kept babbling some gibberish. As they were escaping
          with him, however, the mists touched him causing him to fully become himself again. Unfortunately, this was but
          for a moment since soon after he was assassinated by ${Card.link("[Character|Lucian]", "Solitaire")}.`],
        ["Mandy",
            `A criminal and gang/cult leader, she was well known and feared throughout the lower levels of the castle for 
          being a very advanced case of nightblood. It gave her powers to manipulate stone, something which also made 
          her near impossible to kill, while completely sapping her of human emotions like empathy, making her a 
          psychopathic killing machine. Seemed to be researching some clues regarding the plane of the earth a 
          ${Card.link("[character|Ebenezar]", "particularly adept spellcaster")} had left behind but was thwarted by a 
          group of adventurers who handed her research to ${Card.link("[character|Verrader]", "Verrader")}.`],
        ["Gen",
            `Little is known (so far) of ${Card.link("[character|Mandragora]", "Mandragora")}'s brother except that he was
          a regular studious boy in Terra Prima until he was kidnapped by a 
          ${Card.link("[character|Mostima]", "bored wandering spacetime-traveller")} and brought into the Castle of 
          Death to be used as a bargaining chip by a group of adventurers, since he was supposedly the only family, and 
          only weakness of his sister.`],
        ["Muelsyse",
            `A well known research specialist from Innovation who specialized in nanomachines and fluid automation. Had 
          come to the castle of Ruin for reasons unknown and there happened to meet, and protect from imminent 
          destruction, ${Card.link("[character|Fiest]", "one of the fans of her research")} and also helped out his group of adventurer 
          friends. However, being in a rush they couldn't really get to know her better then.`],
        ["Shamare",
            `A child who'd been forced into a harsher life someone of her age deserved, the death of her sister caused her
          to inherit her nightblood and learn of her 'arts'. These 'arts' involved weaving the souls of people, and 
          others, into inanimate objects - twisting their identity and spiritual energy to perform certain tasks. The
          first soul she weaved was that of her own sister's, who had been shot - as she was trying to go incognito - by 
          ${Card.link("[character|Rin Shima]", "a sniper")} at the behest of her 
          ${Card.link("[character|Mouthpiece]", "last employer")} after she had completed a certain contract supposedly
          involving a lock. Shamare finally gave up her quest for vengeance when she realized she was being manipulated 
          and at the behest of a very persuasive barbarian.`],
        ["Lemuen",
            `${Card.link("[character|Mostima]", "Mostima")}'s half-sister and ${Card.link("[character|Rin Shima]", "Rin")}'s
          teacher - she was reputed to be a sniper without compare. While her life had a great deal of ups and downs,
          very few individuals would know her full life story - probably only Mostima. And yet, one adventurer did begin
          to bond with a part of her left behind after she died, inheriting her skills and small pieces of her memories.`],
        ["Eugrud",
            `An orc who served as bodyguard to ${Card.link("[character|Verrader]", "Verrader")} and probably shared one 
          braincell with his co-bodyguard, the bugbear gunslinger Roth (and probably received the smaller half of that 
          braincell). While he liked to boast and think he'd seen everything the castle had to offer while working 
          under Verrader, only after his death - after failed attempts to assassinate ${Card.link("[character|Rin Shima]", "Shimarin")}
          and then ${Card.link("[character|Ken Shima]", "Shimaken")} did he realize just how insignificant his life so far had been...`],
        ["", ``],
    ]);
    const caelynnDesc = `
    <h5>Early life</h5>
    Caelynn Nailo was born in ? during the years that marked the end of the Heroic Age, and the onset of the Silent Age. 
    Born in a university to a family of accomplished and well renowned scholars, young Caelynn had led a protected - 
    almost pampered - life. A life that, along with her natural gifts, had allowed her to dream, to reach for the stars,
    to set out near impossible goals and achieve them. Unfortunately, this self-confidence and ambition were dormant 
    seeds of tragedy that finally bore fruit in the years that heralded the Silent Age.<br/>
    And so it was, that one day she found everyone she knew - her family, her friends, her professors - all massacred. 
    As she stared into the essence of The fifth, a horror she could not yet fully 
    comprehend, she <i>knew</i> it would be her next - and welcomed it, for even in her broken mind she knew she had
    caused all their deaths. But the powers that be had decided it was not time for her to die yet.<br/>
    In this case 'the powers' took the form of a single man who had escaped the slaughter and fought back the horror to
    protect her. A man she knew as the HoD of botany, someone she'd never really felt bold enough to interact with. A 
    man who, as she would learn soon, couldn't dream. Another thing she would learn soon was that he came from a 
    different universe - a garden - and went by the title of 'Guardian of Life' there...
    <h5>In the Garden</h5>
    When she entered the garden, she was a different person. Fate had broken her, but she had stood up again and filled 
    the cracks with something stronger. Gone was the childish optimism, the vanity. It was replaced by singular purpose -
    to ensure that none would suffer at the hands of those from without as she did. To ensure that she could, would 
    protect as she had been protected by ${Card.link("[character|Vahareth]", "Vahareth")}. Before long, she was 
    regarded as a prodigy there too - with the different orders of Watchers, Inquisitors and Scholars training her and 
    vying for her to join them. Yet there was little surprise when she chose to join the Watchers - after all she was
    virtually Vahareth's daughter - lived in his bunker, trained under him personally, and had the same cold steel gaze
    that could unnerve the most confident of men.<br/>
    Being so close to power and being the center of attention of so many orders meant that she met a fair share of 
    important people from different orders. One among them was the apprentice of the Guardian of Defense, 
    ${Card.link("[character|Othello]", "Othello Titanborn")}. The gardens, because of their extremely low but <i>very</i>
    highly skilled population, would typically send out squads of two people for most operations - and Caelynn and 
    Othello were often together because of their complementary skills but aligning personalities. The two began courting
    and were a happy couple for quite a few decades. However, that was not to last, and the forces that had broken 
    Caelynn before would soon break her again...
    <h5>The Betrayal and Bunker#371</h5>  
    One day, Preveservation was ablaze with the news that everyone in Bunker#17 had died. When it reached her ears, she 
    was terrified, for that was where Othello lived. Upon reaching there, however, she recieved even worse news from the
    Guardians of Order and Life who were inspecting the site. He was not dead, he was the one who had killed them all, 
    with the assistance of a mysterious group of assassins from the Castle of Ruin known as 'The Troupe' and escaped there
    with them following the slaughter. His motives were unknown, but the evidence was irrefutable. This evidence included
    a prisoner, whom Caelynn, under the superivision and command of the Guardian of Order, tortured and 'practiced' 
    hemalurgy upon.<br/>
    The shock of betrayal, overwhelming sense of abandonment and trauma of hemalurgy sent Caelynn into a downward spiral.
    She would do all future operations alone, with Machiavellian maneuvers executed with utter ruthlessness. And so she
    spent almost two millenia in the service of Preservation. Until during one of her last operations, she came face-to-face 
    against a higher vampire in the streets of Ortus, a major capital of a planet in Materia. While they were antagonistic
    at first, in her eyes Caelynn saw the same look as herself - to be more precise, the same look following both the 
    times life had broken her. This girl, she knew, had seen abandonment, loss and regret, and little else, as she too 
    slid downwards in a spiral of her own demons. Despite herself, Caelynn did keep a close eye on her anyway, and so was there to see 
    when finally the vampire resisted against the spiral, resisted against instincts Caelynn knew were more powerful, 
    more primal than she had ever faced.<br/>
    That moment had moved her to a degree much more than she could anticipate. Buried regrets deep inside came out at 
    last, and so she, for the first time after Othello, reached out to someone. And so she returned to the Gardens with
    ${Card.link("[character|Lesley]", "Lesley")} in tow. The two soon grew very close, also starting to work together on
    operations. A few decades later, as her date of graduation from field service arrived, her collegues gifted her an
    ${Card.link("[character|Dave]", "automaton")} to help defend her in close range. And so the three of them started 
    Bunker#371, and remained its sole members for one and a half millenia. Until finally Caelynn was there for someone
    the way Vahareth had been for her - an elven girl, ${Card.link("[character|Lia Mistcloak]", "Lia Mistcloak")}, who
    was 'taken' by ${Card.link("[aberration|]", "The Second")}. A few centuries after, Lia was to get married and
    ${Card.link("[character|Ulrich Mistcloak]", "her husband")} too moved in. Again after a few centruries Lesley decided
    to 'adopt' ${Card.link("[character|Ebenezar]", "a human boy")} whose soul seemed burdened in the same way that hers and 
    Caelynn's once had. As Caelynn approved, it finally struck her that her lone wolf days were a thing of the long 
    past - and once again she felt warmth in the company of others. It was when this happened that Vahareth finally 
    decided to name her his apprentice formally, meant to succeed him as guardian. Since then there were a few ups and 
    downs - like ${Card.link("[character|Conley]", "Conley")} joining and Ebenezar abandoning Lesley - an act of remarkable
    parallel with the way Othello once had her, but with each other for support, they weathered all that came.
    <h5>The hour of Loss</h5>
    A few days before the hour of loss, Caelynn got notified of a threat that required at least the attention of a 
    Guardian apprentice. On arriving the scene, she found a group of adventurers, of whom 
    ${Card.link("[Character|Lucian]", "all but one")} were peacefully slumbering around a mistflame. The one not 
    slumbering seemed to be raving, and on his neck, she could see a Nightblood inhibitor. She knew what that meant -
    and the people who could venture outside the castle were typically very dangerous - the 
    only ones she'd heard of were members of the troupe, steel inquisitors or the demon lords. The mist clung to him, so 
    he wasn't hemalurgically enhanced. A demon lord wouldn't ever wear an inhibitor, so that left...<br/>
    She was about to raise the alarm, when the inhibitor suddenly broke - and the person starting laughing in a 
    particularly insane way. He then summoned some... aberrations(?), gave them some directions, made some preperations 
    for the others, then... slit the throats of the aberrations until the mists tore apart from him, and then he slipped
    through the realms, giving her - who was wildshaped into a sparrow - a knowing grin as he faded. There would be 
    little point in chasing him, and while she wanted to get a hold of the knife with which he could 'kill' even in here,
    something about his grin unnerved her, and she wanted to learn the motiviations of the others still asleep.<br/>
    Which turned out to be a good idea, since their motivations were as noble as they come. As they willingly gave her 
    the dagger, she allowed them to stay as guests in the bunker. They certainly did make their presence felt out there. 
    They helped them in an odd variety of tasks, but what left her the most grateful for having them was that they
    helped Lesley shed some of her demons. Yet something unnerved her, events were moving too fast for 
    this realm. Circumstances which would have come in years came in days, and they would absolutely not consider the 
    idea of not going to the castle, despite all her warnings.<br/>
    So when the hour of loss finally came, she found herself anticipating it. Preservation was getting weaker since eons,
    and of course <i>they</i> would take advantage of the imbalance between shardic powers. After helping her new guests
    make it into the castle, she focused on rooting out the corruption that spread, yet this incursion was way more than
    had ever been before. They did keep it at bay though, and while no more than half a dozen died in the Garden, the 
    Gardens themselves were completely ravaged. Vahareth too decided to 'retire' to seek out the cause of this, leaving 
    her as the Guardian of Life. Soon after she took power, her guests established contact from within the castle, a 
    feat that required a great deal of magical power and skill. While she did wonder about it, as she did worry about 
    them, this was not the time. The intel they provided strongly suggested that the cause of the rift was somewhere 
    within Ruin's domain. And so all the Guardians set out to deal with it.<br/>          
    Unfortunately, they were too late - by the time they had taken control, and crossed the midnight boundary to find 
    themselves face to face with ${Card.link("[character|Logos]", "The Playwright")} and 
    ${Card.link("[character|The SanguineArch]", "The SanguineArch")}, the primoridal nightmares were already free. 
    Thankfully, all of them being in one place meant that a greater disaster was prevented. Even with all his inquisitors,
    Ruin could not take on the five of them together. That meant he couldn't get the Atium, couldn't complete himself and
    was evenly matched against the new Preservation, 'The Survivor'. But leaving the Atium stash intact was too much of a
    risk, so they offered the adventurers to burn it all if they would like to, an honour for helping protect the entire 
    multiverse from utter and imminent destruction. However, the adventures refused as they felt the Guardians were 
    better suited for the power. They just wanted to have peace and quiet and leave the castle behind finally.<br/>
    However, that was not to be. For one of them had been marked by ${Card.link("[aberration|]", "The Second")}, and the
    Playwright's powers had bound their souls in their skirmish. And so, she once again lost a group of good people, 
    people important to her, people who'd given her hope. There were already plans of war in motion. Of vengence, of
    survival. Until now, they had tried to play nice, it had resulted in the death of friends, in the death of God. 
    No more...`;
    const lesleyDesc = `
    <h5>Early life</h5>
    All higher vampires are aristocrats, served upon - should they require it - by their thralls and other creatures of 
    the shadowfell. However, even among them, the Aeternus family - one of the oldest - was highly feared and regarded,
    since their blood granted them command over the flow of time itself. As such, as their youngest child, Lesley 
    commanded fear and respect before she was even old enough to know what the words meant. It would be long before she
    would learn what respect meant, but unfortunately what fear was became clear to her very early in life.<br/>
    For most higher vampires also share a particular trait - while their bodies are ageless, and can only ever grow 
    stronger - old age is marked as their mind begins to slip. Not in terms of stupidity, loss of wisdom or weakness
    of will - no, a higher vampire could <i>never</i> be weak. It slips in terms of balance and stability. Elder vampires
    of aged minds are extremely paranoid and easy annoyed. They become desperate for solitude, and suffer in every word
    they speak - as if every single word would bring them one step closer to insanity. They also turn into extreme 
    psychopaths - it is said in the shadowfell that should any creature save another higher vampire even approach within
    a mile of them, even unwittingly, they would instantly kill them for offending them with their existence. Ultimately,
    this is what keeps the population in check, for only another higher vampire - or another titan - can truly kill a 
    higher vampire.<br/>
    Unfortunately, for child Lesley this meant she had to bear witness to mind-numbing amounts of domestic violence as
    she grew into her teenage years (i.e., was a century old), to the point where one of the parents ripping out the 
    head of another would just draw a vacant dead glance from her, before she went back to reading her books. Her sole 
    comfort was in her elder brother, who taught her to use the powers of the bloodline - who stood by her - taking the
    brunt of the shit - as her parents seperated, each cocooning up in their subdomains, never to be disturbed again. 
    However, that strain was too much for him too, and on one - only one - occasion, he snapped violently at her. 
    That once was enough, she fled from the realm, never to look back again.
    <h5>Meeting Caelynn</h5>
    In Materia, Lesley took shelter in the vast city of Ortus of Terra Prima. While the rest of the material plane was 
    still using bronze, and in some cases, stone tools. Veteres had already moved on to iron, cement and even niter. 
    Ortus was quickly regaining the glories of times past, Lesley was certain they would learn steel-craft soon too. 
    That glorious, densely populated city was the perfect dream. Books that were a rarity in Shadowfell were present in 
    thousands in the many libraries here. Poets and scholars blossomed in great numbers. Conversation with any stranger 
    was a pleasure. Lesley finally relaxed herself, took the persona of an author and set herself free...<br/>
     Sadly, with all the pent-up darkness within, setting herself free was the most dangerous thing she could do. Soon
    she began to develop a taste for blood, something she'd never had before she came here, which before she knew it 
    was a crippling addiction. But unlike her ilk, she avoided violence, avoided killing, making thralls. It reminded her
    of her family, her kind way too much. The very thought disgusted her. For that matter, so did her addiction, but try as
    she would, she couldn't let go - her darkness returned stronger than ever every time she tried to step away, and what
    was a thing of pleasure soon became a necessity for being able to function.<br/>
    It was at this time that she made friends with a rather nice guy, Nohadon, a person who would one day be regarded as one of 
    the greatest thinkers of the early classical era. To Lesley however, a person who would have been a God-sent company 
    once was now just an object of depraved anticipation. As she softly smiled and discussed ideas with him, she would 
    internally be picturing the oh-so-satisfying look of horror as she turned to feast upon him. However, there was just
    one snag - a random noblewoman, who seemed too smart for her own good, seemed to have caught on to something and was
    time and again thwarting Lesley's attempts to isolate the guy. Finally, Lesley had had enough, for the first time 
    she felt too pissed off to care about her heritage. She would get rid of this meddling arrogant bitch who had no idea
    what she was facing.<br/> 
    Unfortunately, as she lay - a decapitated and bloody mess - tangled in a bunch of thorny vines, she found out 
    the situation was reverse, and it was her who had been utterly deluded. It was at this time that reality of what
    she was trying to do finally dawned on her - she was turning into the same people as those she had detested the 
    most. And so, instead of fleeing and disappearing like the noblewoman advised, she went back to resume her life,
    drawing an angry glare from her more than once. As time passed, she learnt to function, to curtail her bloodlust 
    and just... function. Gradually, her time spent with Nohadon turned 
    considerably more honest, pure and, strangely, fun. The noblewoman too, Lesley learnt her true name was 
    ${Card.link("[character|Caelynn Nightbreeze]", "Caelynn")}, began to warm up to her. Her nightmare was again turning 
    into a dream... until her brother came.<br/>
    Everything shattered, utterly broken and traumatized by what proceeded, that very night Lesley assaulted Nohadon and fed
    on his lifeblood. As her suppressed addiction returned with a vengeance, she sucked out more and more - further than 
    she'd ever gone before - to the point where she could've killed him at any point. But thrilled, anxious, she wanted 
    to pleasure herself more before she did that finale - she wanted to forget everything... but found she couldn't. From
    where she couldn't fathom, but the awful grace of God seemed to have fell on her. She couldn't lose herself, couldn't 
    pretend she enjoyed this - as she finally opened her eyes and faced what she was doing. Aghast, guilt seized her, 
    choked her. He wasn't dead yet - but there was nothing she could do to help him at this stage. Yet she tried, weeping
    and broken, she tried - but could only watch as the life left him...<br/>
    Until a single word forced the life back into him, a single word from Caelynn, more pleasant than any she'd heard her 
    whole life. A word that carried mana considerably stronger than she could ever summon. That was when Caelynn told her 
    everything - including about the place where even <i>her</i> family could never reach her again, a place where a group of 
    eight could well take on a higher vampire, a place where the leaders were evenly matched against 
    ${Card.link("[character|The SanguineArch]", "The SanguineArch")} themself...
    <h5>Ebenezar</h5>  
    Lesley's time in Bunker#371 was satisfying, not entirely perfect - but as happy as a penance could be. Happier than 
    she felt she deserved anyway. And while the blacksmith and his wife pissed her off, subtly reminding her of her 
    family, Caelynn was a pure pleasure. Plus even ${Card.link("[character|Irene]", "an inquisitor")}, who had been 
    so adamant that Lesley was a criminal, that there was something off about her - until Lesley had revealed
    her heritage, was becoming a great friend. And so she was sure she wasn't lacking in any way - until she met 
    ${Card.link("[character|Ebenezar]", "Ben")}. A human 
    boy who'd stumbled into a perpendicularity by accident (well he'd drowned in there), the teenager was solemn far beyond 
    his age. And his eyes seemed so <i>tired</i>, eyes that had seen way too much. Seeing a boy that dead inside reminded 
    Lesley of times long past, times before she'd tasted human blood, times when she still looked up to her brother... 
    she pleaded Caelynn to allow her to take him in. After her approval, as Ben came to live with them, Lesley found out
    that there was one thing which still excited him, one thing that made his eyes shine like a child's again - magic.<br/>
    He'd watch wide-eyed with wonder at every experiment Lesley did, ask about every potion she concocted, be amazed by
    every spell she cast. Flattered by being the subject of such innocent, genuine praise, she offered to teach the kid 
    her ways. He readily agreed, and Lesley watched with pride as this new purpose brought life back into him. His mood 
    improved considerably, he turned to cooking and painting as hobbies, became the best friend of everyone in the 
    bunker, and before long was the glue that held them all together. A slight voice deep inside Lesley made her worry a
    bit on how <i>passionate</i> the boy was about learning, every day in a land where all were immortal, and so 
    preferred to maintain a very healthy work-life balance (often bit a bit more emphasis on the latter), the kid would 
    easily be studying for over 13 hours a day. What was her ward studying that hard for, Lesley couldn't help but wonder, 
    but helped him the best she could anyway.<br/>
    Less than two centuries later, her teaching and his studying turned into both of them researching together, as the
    boy's skills began to rival hers. She also became aware, partly from the teasing of others, that the boy seemed to be
    developing feelings for her - feelings she felt she could, probably did reciprocate. Yet despite being over two 
    centuries old by experience, his body was still that of someone in their late teens. So, his request of being allowed
    time to roam Materia, more specifically, his home planet terra - was met with approval by all. Caelynn did warn her 
    however that something felt wrong in the kid's eyes as she had approved, so Lesley secretly spiked one of his drinks
    with a pinch of her blood - it would let her know if he ever died.<br/>
    He went out more than two dozen times over three centuries, and Lesley was sure her fears were unwarranted, when 
    suddenly her blood froze - Ben was dead! As she immediately prepared herself to project, the connection was 
    re-established, and so she had no idea what happened. If she had trained her vampiric abilities better, instead of 
    leaving them sealed and forgotten until the rare occasions that required them arose - she might've known he'd turned
    to Lichdom. But as it happened, she merely assumed there was some disruption and relaxed herself. Afterwards, he did
    return to the bunker, but continued to go out steadily back into the material plane. As his skills surpassed hers, 
    he also began to become distant, and would at times rebuke her for being too clinging - something very unfair, and 
    something he'd never say before, but also something that struck a deep insecurity within her from her childhood days, 
    and shook her to the core.<br/>
    While their relationship wasn't quite perfect, they still were happy - or at least so Lesley felt. So when she was 
    devastated when he declared he needed to go into the castle. Though he promised he'd return, she knew it was over 
    between them. Maybe she should've stopped him, but old instincts took over that would not allow her to 'look' weak. 
    So instead she, perhaps a bit coldly, said she was ok - but insisted he take a very particular 'watch' with her. With 
    him gone, Lesley finally broke - and old habits returned. However, this time she was wise enough to not drink wantonly, 
    but only from someone who could overpower her if she lost control - someone who was also close to her. While the 
    others always kept encouraging her that he would return - he had learnt magic strong enough to open perpendicularities
    - her blood already had told her he was dead for good. So she drank. Hating herself, she continued to drink, and 
    drink, and drink (becoming the reason for Caelynn to appear even paler than her natural complexion).
    <h5>Forgiveness</h5>
    The first break from her relapse into darkness was when people said a 
    ${Card.link("[character|Mostima]", "mysterious girl with temporal control")} had shown up and wanted to be her ward.
    Though she was in no mood to, Caelynn forced her to take her as a student, something Lesley thanked her for later.
    But the final reprieve came when, a few decades later, Caelynn brought home a group of guests - one of them an aasimar paladin,
    of an oath high enough to be a full knight radiant. From the first day, he could feel something was off in the 
    bunker. He would find her, she knew, and while she could kill him, she found herself unwilling to. Her past had 
    finally caught up, judgement was here, and with her addiction resurfacing, she couldn't find it in herself to try to 
    hinder it. She didn't want to die, though and tried hiding her true nature until hiding it was virtually equivalent 
    to killing him. For he'd conjoined two powerful relics, one from the castle and another from the Guardian of magic, the 
    latter sealing the essence of the Primordials and being watched by Ruin himself. He was taken by surprise and 
    couldn't resist it. He would die before the split-second was over. No one else had noticed yet - and wouldn't before
    it was too late, but even the best of them didn't have the reflexes of a higher vampire - nor the strength.<br/>
    So betraying her true nature, to the shock of many, she broke the conjunction and pulled him out to safety. It was 
    not a plea to spare her life because she'd saved his. No, this was no bargain, no trade deal. After preparing herself
    and wrapping on restraints to suppress her vampiric powers, she stood before him. With the secret out, she answered
    all his questions honestly, and closed her eyes, bracing for the end. Yet he wouldn't strike. While he made it clear
    he didn't fully trust her, she had to be sure he <i>meant</i> it when he chose to spare her. So she asked him to 
    break the restraints she had on - and stand before her in her unrestrained vampiric powers, which he did. Bless the
    man, he did! And so, knowing that they would be heading into the castle - she gave him her vampiric sigil - a token 
    of trust beyond what most mortals could comprehend. It gave him powers like her own which would surface if, and only 
    if, needed. It also lent the authority of her family to him, and gave him the power to truly kill her for good. Such
    a need didn't arise, however. But the group did contact her to confirm Ben was gone (via a device he'd left 
    behind), but she knew that already. Still, when Caelynn told her all the Guardians were heading there, and were 
    likely to run into them, she was all too glad to be a part of that group, even if it meant running into the 
    SanguineArch themself...`;
    const shimaRinDesc = `
    <h5>Early Life and Capture</h5>
    It is hardly unusual for a child to lose their parents at a very young age in the Castle of the Night, and so when her
    parents went missing, eight-year-old Rin found a plenitude of odd jobs, not all very ethical, to support herself and 
    her four-year-old brother ${Card.link("[character|Ken Shima]", "Ken")}. Not all her employers were the most scrupulous,
    however - and on one occasion, now 14 yrs of age, she found herself in the service of a sadistic, hateful and dangerous
    (at least, so it seemed to her then) thug. For his amusement, he forced her to suffer from a round of 'Russian 
    Roulette', and experience that deeply terrified and traumatized her. He then told her that he'd found the trail of a 
    very dangerous assassin that had sniped one of his right-hand men. She was to go and sabotage their rifle with an 
    explosive he gave.<br/>
    This mission lead her to sneak into a remote alley which she learnt had been dubbed 'Saints Row'. Unfortunately, or
    perhaps fortunately, she was woefully under-prepared - while she was quite adept in stealth, she didn't know a very 
    important fact, all 'Saints' were bonded to their firearms. The minute she touched the gun, her target knew. Alarms 
    went off everywhere, and she was surrounded in moments. As she was being apprehended, she couldn't help but notice 
    how all of them were aasimar who looked noble-to-a-fault and had halos and wings hovering around them that appeared
    like light reflected on a crystalline surface. ${Card.link("[character|Mostima]", "One of them")} however, also
    seemed to have the black horns and tails of a fiend. She seemed a lot less noble, and so to Rin a lot more unnerving,
    more like a street thug she was used to instead of a divine being like the others.<br/>
    When her blindfolds were removed, she found herself in a cell. Sitting next to her, with her gun on her lap, was the
    ${Card.link("[character|Lemuen]", "famed sniper")} she'd heard so much off. Her kindly - almost jovial - demeanour
    completely shocked Rin. She seemed not a bit mad, merely amused and curious. The stark contrast between her target,
    supposedly her enemy, and her employer cracked something deep inside of her. She completely broke down, after half a 
    decade of keeping it together while living through hell, she - in the midst of hyperventilation and sobbing - unloaded
    all that her soul had been burdened with at that point. Lemuen heard her whole tale soberly - Rin couldn't help but 
    notice how Lemuen's face hardened when she got to her latest employer. When she was done, with a very comforting hug, 
    Lemuen said she and a few others would leave this colony to diffuse the trail on her. She asked Rin to come along 
    with them for now. Lemuen herself would train Rin to make her strong enough to go back and retrieve her brother. Rin
    gratefully agreed, though she was sure she hadn't been offered a choice (which made her more happy than 
    it should have).<br/>
    Lemuen said the ones coming with her would be her half-sister and 
    ${Card.link("[character|Fiest]", "her boyfriend")} - a human guy they'd met here who 
    used to work on making and maintaining their firearms and other equipment. Also, it turned out the 'half-sister' was
    none other than the half-fiend Rin had noticed earlier. Her earlier assessment was spot on, she was way rougher than
    Lemuen - at least superficially. Though with Lemuen, Mostima too completely let down her guard and was cheerful and
    relaxed. The four of them moved into a very secure, and quite cozy, bunker-like place where the two sisters trained
    her with firearms - Lemuen with rifles and Mostima with handguns. Despite their light-hearted natures, Rin couldn't
    help but notice the two were <i>very</i> good with weapons and infiltration. These were not skills someone acquired
    with experience on the street, but the result of a careful training regimen drilled into elite squads of the 
    strongest militaries.
    <h5>Becoming a Sniper</h5>
    A year later, while she was getting anxious to rescue her brother already - the lingering fear that she wasn't yet 
    prepared to take on the monster that was her former employer continued to haunt her. Unfortunately, fate wouldn't 
    leave her a choice. In their year together, she found out a lot about them - at least about stuff they were willing 
    to share. The two had come from the material plane. Their father had turned away Mostima who'd sought him out, 
    denying that she was his child, and Lemuen had left him to live with her. The two of them had then begun to manifest
    the powers of 'Saints', which had lead a certain organization to seek them out. The others they were living with were
    part of their old squad. Their squad had apparantly been charged with some mission in a place deep under the surface
    of their 'planet' known as the underdark. While there, the trails of some relic of the past had unwittingly led them
    right into a perpendicularity which had led them stright into the pits underneath the castle - where, ever so rarely,
    Atium could be found. Mostima had recognized this as the place where her mother had long ago been summoned from, and
    when the group had learnt they could return, they had established themselves here - awaiting any orders that may come 
    someday.<br/>
    And so, after a year, Rin was deeply troubled when she saw their leader arrive at the doors of their bunker. No 
    order had come, but he'd finally found a trail of the relics that had lead them in this castle in the first place. 
    While the mention of the relics didn't really give the sisters a great deal of happiness - for they were the reason 
    all of them were struggling within the Castle of Death himself instead of chilling in Terra Prima - they would not 
    disobey orders, even if it was uncertain if the chain of command still applied. Plus even they knew the supposed power
    of those relics, and the importance of recovering them. And so the three of them set out, leaving Rin alone in the bunker.<br/>
    A few days later, a familiar - though tired - knock on the door of their bunker was heard. Nervous with excitement, 
    but a bit apprehensive, Rin opened the door... and was shocked to find an abosolutely worn down Mostima, covered 
    with blood, halo and wings turned dark black, carrying an unconcious Lemuen inside. Fiest followed her with a haunted, 
    horrified look. Neither would explain any details, except that Lemuen would survive - though probably had lost the 
    use of her legs - and that Mostima would stay away from guns henceforth, and they would never see the other aasimars
    again. And so the full reality sank into Rin, the only 
    way to survive now was for Rin to take up Lemuen's job. She was not particularly skilled in anything else, save 
    stealth and theivery, but that would never earn enough for the five of them, and none of the others could work. But 
    before that, she needed to sort out her own demons, her own moral quandries. She had seen much, true, had been 
    hardened by life, true, but living with the sisters had made her aware that she couldn't just close her mind and 
    kill. If she went down this path, there was no looking back - and so she had to be absolutely certain that not an 
    iota of doubt or regret survived within her. She had to 'kill' her heart completely.<br/>
    So after forcing Fiest to make some 'special preparations', she set off to rescue her brother. As she reached the 
    doors and corridors of her former employer, she noticed so many weaknesses in his defenses - stuff she'd never 
    noticed before. Security that seemed impregnable before seemed trivial now. One year of training had put her on a 
    level far beyond this. In fact, she probably could've stormed in here even after two months of training. She realized that 
    the person she had feared as a 'monster' before was no more than a petty criminal. Of course the mission he'd sent 
    her on was doomed to fail, a mission far beyond his means, a mission against true 'monsters'. A lucky break had put 
    him on their trail, and he was too low-level to even fathom how foolish pursuing that trail was. Well he'd know now,
    she thought savagely as she finally walked into his room - the wretched man called out for help, but none would come. 
    None could come. She took out her revolver, made sure it was full, then took out one bullet as she headed to him, 
    spinning the chamber.<br/>
    In his defense, he found some backbone somewhere, and flat out declared - despite being terrified - he would not 
    play any games, she could just shoot him and get it over with. But she'd not come here to kill him, she'd come here 
    to die. The others would manage somehow. But if she survived this night, a lot of people would die - some innocent, 
    some undeserving of death. If God didn't want that, now was the time to stop her. She put the muzzle to her own 
    mouth and, as her former-boss looked on - stunned and aghast, she pulled the trigger.... and was still alive. 
    Deep down, at that moment, she swore she could hear reality around her itself chuckle softly. Well, if 
    that's what God desired, who was she to deny Him. She would do what she did best, and would mourn every single time, 
    but then do it again. After the resolve sank in, she turned to her former boss, still crouched in a corner - eyes 
    betraying pure terror - as she emptied the other five bullets in his brain.<br/>
    With that done, she went to find her brother, her iron mask cracking as she tried to imagine the look of horror
    that would paint his face from living a year in this hell alone. But she was wrong. Her brother, while a bit wiser 
    and hardened now, looked as pure and optimistic as the day she'd left him. That moment she realized her brother held
    on to something she'd just killed in herself a few moments ago. Hope. Hope for a better future even while standing 
    in utter darkness. And the courage to act for it, despite all odds. Standing there she could feel him shine so bright
    that she actually squinted her eyes. And that's where she found her purpose, she would stalk the darkness and deal 
    with threats and obstacles there while her brother sought the light.
    <h5>Against the troupe</h5>
    The years that followed did see life change for them all. Lemuen who'd been paralyzed below her waist was recovering 
    under the patient care of Fiest and continued to train Shimarin in the art of sniping. Shimarin chose to become part
    of a crew to persue bigger contracts, however that ended when 
    ${Card.link("[character|Verrader]", "one member of the crew")} betrayed the others for personal gain,
    only to find he himself had been deluded by their 'fixer' - what resulted, therefore, was all of them drowing in 
    magma, except Shimarin, who was covering them from a distance. Of the rest of the crew, only the traitor survived, 
    gaining nightblood at exactly that point. This was something Shimarin learnt much later though, however she never 
    again would work in a crew. During this time Mostima had started to go missing for large amounts of time, and only 
    to her sister would she confide the details of her 'journeys'. Shimarin couldn't help but notice that her mood had 
    stablised and improved considerably, and she seemed to have gained expertise in time magic after her frequent 
    travels - though she didn't pry into more details. A few years later, Lemuen to passed away from her nightblood 
    leading to great loss of morale in the bunker. Yet Mostima had done something before the death, and Rin 
    could feel something was off, the death 'felt' unlike the others she'd seen. A few years after her 
    death, they were joined by a tiefling, who remained in hiding from the demons in the castle. The kindest person 
    they'd ever met, he had taken a liking to her, despite herself. As life looked a bit better, in the years to come, 
    she took many high profile contracts - and didn't ask questions. Some even came from almost mythic figures - like
    once when the troupe ${Card.link("[character|Mouthpiece]", "Mouthpiece")} himself asked her to kill a certain Vulpine soul weaver. <br/>   
    In all her missions
    she always followed one unsaid rule - after killing the target, she could also kill any one person near them of her 
    choice. That prevented her from being a mere pawn, a mere tool - and drove away a lot of petty schemers from her who
    regarded her as too much of a wildcard while attracting clients who wanted people dead for personal reasons but
    weren't strong enough to challenge them. For around such people, it was unlikely she'd want to kill a passer-by. 
    These were the clients she favoured, for their targets were almost always people the world was better off without.
    Unfortunately, this tradition of hers backfired badly one day - she was told by the mouthpiece that a group of people might 
    be coming from the gardens, and may be accompanied by some members of the troupe. If a drow priestess was among them,
    she was to die. She did die, yet Rin found another drow - probably still a teenager, with them. A member of the 
    troupe, having failed a mission - Rin didn't envy her and wasn't surprised when she asked her captors to kill her. 
    Of course, they refused, but then they didn't know the castle, didn't know the troupe, the mouthpiece. Better by her 
    bullet then at their hands, better in Preservation than in Ruin, she thought, as she fired again. And so, her last 
    thoughts were of peace, of being re-assured by the hulking barbarian. She didn't even know when she died. Enviable, 
    Rin thought coldly, as she packed up and went back home. What she didn't know was that she had disrupted one of the 
    major schemes of the troupe and triggered of a cycle of vendetta's and mutual destruction.<br/>
    The next day, the demons had captured the tiefling - and planned to burn him in a pyre of hellfire for some made up
    crimes. Given how stupid demons at this level were, Rin had no doubt they had been assisted, and little doubt as to 
    by whom. Well, she was not stupid enough to go into an execution ground, but she wouldn't let him suffer in hellfire. 
    Strangely enough, and almost as a mockery, she'd also got another assassination contract from the troupe - a junior
    had delivered it this time - that she was to assassinate the executioner. But then something changed all the plans 
    - the same group of adventurers (she'd helped them earlier that day), had taken it upon themselves to resuce the guy.
    She was excited, and for once in a very long time dared to hope as she covered them as they escaped. Sadly, the 
    castle was not a place where hope can live, and with a deep horror, she realized that the party was cornered - and 
    by none other than ${Card.link("[character|Baphomet]", "Baphomet")} himself. There was no way out of this, and so she did what she had planned before, and
    put a bullet into her friend. Something which, by the tears in his eyes, he knew was coming.<br/>
    After that, she decided to bite back at the troupe by taking out their most valuable piece, someone she knew they 
    had big plans for - ${Card.link("[character|Lucian]", "The Solitaire")}. Things didn't go as planned however,
    and instead she ended up in the fortress of the inquisitors, gaining an Atium spike and a Steel spike powered by 
    Verrader's soul followed by heading right past midnight into a showdown that involved more myths and legends than 
    she could even dream of - all the Guardians with Preservation himself in the mists, eight senior inquisitors moved
    by Ruin himself (who was also moving her - despite her best efforts), 
    ${Card.link("[character|Logos]", "The Playwright")} and the Mouthpiece and lastly 
    ${Card.link("[character|The SanguineArch]", "The SanguineArch")} along with two other higher vampires. Finally, 
    there was one other - a single Honorspren who stood next to her, waiting, and had gone unnoticed by all...  
    `;
    $(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
        Character.loadStaticElements();
        /************************* Campaign 1, Arc 1 **************************/
        new Character({
            name: "Lucian",
            tokenName: "lucian_norm",
            arc: 1,
            campaign: 1,
            age: 210,
            gender: "M",
            tags: ['From | Ruin',
                'Allegiance | Ruin / ???',
                'Race | Feline',
                `Class | ${Card.verbose("Echo Knight")} Fighter`,
                `Class | ${Card.verbose("Assassin")} Rogue`,
                `Class | ${Card.verbose("Hexblade")} Warlock`,
                `Nightblood | Ominous Melody`,
                `Aberrant-Fused ${Card.verbose("(Tragodia)")}`,
                `<i>He who quiets</i>`,
                'CR | 19'],
            summary: (_a = summaries.get("Lucian")) !== null && _a !== void 0 ? _a : "???",
            description: "",
            altImagePaths: new Map([
                ["Phantom", "lucian_norm"],
                ["Solitaire", "lucian_mad"],
            ]),
        });
        new Character({
            name: "Ebenezar",
            tokenName: "ebenezar",
            campaign: 1,
            arc: 1,
            age: 750,
            gender: "M",
            tags: ['From | Materia / Preservation / Ruin',
                'Race | Human',
                `Class | ${Card.verbose("Divination")} Wizard`,
                `Lich`,
                `Deceased`,
                `Scholar`,
                'CR | 22'],
            summary: (_b = summaries.get("Ebenezar")) !== null && _b !== void 0 ? _b : "???",
            description: "",
        });
        new Character({
            name: "Caelynn Nightbreeze",
            tokenName: "caelynn",
            arc: 1,
            campaign: 1,
            age: 4560,
            gender: "F",
            tags: ['From | Materia / Preservation',
                'Allegiance | Preservation',
                'Race | Half-Elf',
                `Class | Druid ${Card.verbose("(Circle of Dreams)")}`,
                'Guardian of Life',
                'Watcher',
                'Atium Savant',
                'CR | 25'],
            summary: (_c = summaries.get("Caelynn")) !== null && _c !== void 0 ? _c : "???",
            description: caelynnDesc,
            personalityTags: new Map([
                [NpcPersonalityTag.Industrious, 4],
                [NpcPersonalityTag.Confident, 3],
                [NpcPersonalityTag.Outdoorsman, 3],
                [NpcPersonalityTag.Kind, 2],
                [NpcPersonalityTag.Optimist, 2],
                [NpcPersonalityTag.Ascetic, 2],
                [NpcPersonalityTag.Stern, 1],
                [NpcPersonalityTag.Abrasive, 1],
                [NpcPersonalityTag.Bisexual, 1],
            ]),
        });
        new Character({
            name: "Lesley Aeternus",
            indexName: "Lesley",
            tokenName: "lesley",
            campaign: 1,
            arc: 1,
            age: 2860,
            gender: "F",
            tags: ['From | Shadowfell / Materia / Preservation',
                'Allegiance | Preservation',
                'Race | Higher Vampire',
                `Time Command`,
                `Class | ${Card.verbose("Chronurgy")} Wizard`,
                `Class | ${Card.verbose("Knowledge")} Cleric`,
                `Projector`,
                'CR | 18 / 24'],
            summary: (_d = summaries.get("Lesley")) !== null && _d !== void 0 ? _d : "???",
            description: lesleyDesc,
            personalityTags: new Map([
                [NpcPersonalityTag["Recovering Addict"], 5],
                [NpcPersonalityTag.Bibliophile, 3],
                [NpcPersonalityTag.Recluse, 3],
                [NpcPersonalityTag.Lazy, 2],
                [NpcPersonalityTag.Depressive, 1],
                [NpcPersonalityTag["Guilt-ridden"], 1],
                [NpcPersonalityTag.Introvert, 1],
            ])
        });
        new Character({
            name: "Irene",
            tokenName: "irene",
            campaign: 1,
            arc: 1,
            age: 1390,
            gender: "F",
            tags: ['From | Air / Water / Preservation',
                'Allegiance | Preservation',
                'Race | Air Genasi',
                `Class | ${Card.verbose("Gunslinger")} Fighter`,
                `Class | ${Card.verbose("Storm")} Sorcerer`,
                `Class | ${Card.verbose("Tempest")} Cleric`,
                `Inquisitor`,
                'CR | 14'],
            summary: (_e = summaries.get("Irene")) !== null && _e !== void 0 ? _e : "???",
            description: "",
        });
        new Character({
            name: "Ling",
            tokenName: "ling_garden",
            campaign: 1,
            arc: 1,
            age: "",
            gender: "F",
            tags: ['From | ??? / Preservation',
                `Race | Titan ${Card.verbose("&times; Blue Dragon")}`,
                `Class | ${Card.verbose("Draconic")} Sorcerer`,
                `Primordial | Outsider ${Card.verbose("(Fragment of ???)")}`,
                'Guardian of Diplomacy',
                'Lighthouse Keeper',
                'CR | 19 / 27'],
            summary: (_f = summaries.get("Ling")) !== null && _f !== void 0 ? _f : "???",
            description: "",
            altImagePaths: new Map([
                ["Lighthouse Keeper", "ling_garden"],
                ["Shrine Maiden", "ling_sui"],
            ]),
        });
        new Character({
            name: "Dave Ruhl",
            indexName: "Dave",
            tokenName: "dave",
            campaign: 1,
            arc: 1,
            age: 2500,
            gender: "M",
            tags: ['From | Innovation / Preservation',
                'Race | Warforged',
                `Class | ${Card.verbose("Samurai")} Fighter`,
                `Defender`,
                `Deceased`,
                'CR | 13'],
            summary: (_g = summaries.get("Dave")) !== null && _g !== void 0 ? _g : "???",
            description: "",
        });
        new Character({
            name: "Ulrich Mistcloak",
            indexName: "Ulrich",
            tokenName: "ulrich",
            campaign: 1,
            arc: 1,
            age: 1020,
            gender: "M",
            tags: ['From | Materia / Preservation',
                'Race | Human',
                `Class | ${Card.verbose("Forge")} Cleric`,
                `Scholar`,
                'CR | 7'],
            summary: (_h = summaries.get("Ulrich")) !== null && _h !== void 0 ? _h : "???",
            description: "",
        });
        new Character({
            name: "Lia Mistcloak",
            indexName: "Lia",
            tokenName: "lia",
            campaign: 1,
            arc: 1,
            age: 1280,
            gender: "F",
            tags: ['From | Feywild / Preservation',
                'Allegiance | Preservation',
                'Race | Elf',
                `Class | ${Card.verbose("Samurai")} Fighter`,
                `Watcher`,
                'CR | 9'],
            summary: (_j = summaries.get("Lia")) !== null && _j !== void 0 ? _j : "???",
            description: "",
        });
        new Character({
            name: "Conley",
            tokenName: "conley",
            campaign: 1,
            arc: 1,
            age: 210,
            gender: "M",
            tags: ['From | Fire / Preservation',
                'Race | Fire Genasi',
                `Class | ${Card.verbose("Eloquence")} Bard`,
                `Negotiator`,
                'CR | 7'],
            summary: (_k = summaries.get("Conley")) !== null && _k !== void 0 ? _k : "???",
            description: "",
        });
        new Character({
            name: "Vahareth Tsav Anat",
            indexName: "Vahareth",
            tokenName: "g_life",
            campaign: 1,
            arc: 1,
            age: "50K+",
            gender: "M",
            tags: ['From | Materia / Preservation',
                'Allegiance | Preservation',
                'Race | Kalashtar',
                `Class | Druid`,
                `Guardian of Life`,
                `Inspector`,
                `'Retired'`,
                'CR | 26'],
            summary: (_l = summaries.get("Vahareth")) !== null && _l !== void 0 ? _l : "???",
            description: "",
        });
        new Character({
            name: "The Guardian of Order",
            indexName: "GOrder",
            tokenName: "g_order",
            campaign: 1,
            arc: 1,
            age: "50K+",
            gender: "M",
            tags: ['From | Shadowfell / Preservation',
                'Allegiance | Preservation',
                'Race | Shadar-Kai',
                `Class | ${Card.verbose("Hexblade")} Warlock`,
                `Class | ${Card.verbose("Devotion")} Paladin`,
                `Guardian of Order`,
                `Inquisitor`,
                `Deceased`,
                'CR | 26'],
            summary: (_m = summaries.get("GOrder")) !== null && _m !== void 0 ? _m : "???",
            description: "",
        });
        /************************* Campaign 1, Arc 2 **************************/
        new Character({
            name: "The Playwright",
            indexName: "Logos",
            tokenName: "logos_normal",
            campaign: 1,
            arc: 2,
            age: "50K+",
            gender: "M",
            tags: ['From | Ruin',
                'Race | Banshee (Demon)',
                'Greater Demon Lord',
                'Domain | 01:40 to 01:56',
                `Aberrant-Fused ${Card.verbose("(Tragodia)")}`,
                'CR | 30'],
            summary: (_o = summaries.get("Logos")) !== null && _o !== void 0 ? _o : "???",
            description: "",
            altImagePaths: new Map([
                ["Youthful Writer", "logos_normal"],
                ["Ancient Lord", "logos_banshee"],
            ])
        });
        new Character({
            name: "Mostima",
            tokenName: "mostima",
            campaign: 1,
            arc: 2,
            age: 152,
            gender: "F",
            tags: ['Plane-hopper',
                `From | Ruin`,
                `Race | Aasimar &times; Tiefling`,
                `Class | ${Card.verbose("Clockwork Soul")} Sor-lock`,
                `Class | ${Card.verbose("Chronurgy")} Wizard`,
                `Nightblood | Shattered Time`,
                `'Fallen Saintess'`,
                'CR | 15 / 25'],
            summary: (_p = summaries.get("Mostima")) !== null && _p !== void 0 ? _p : "???",
            description: "",
            altImagePaths: new Map([
                ["Messenger", "mostima"],
                ["Saintess", "mostima_saint"],
            ])
        });
        new Character({
            name: "Ken Shima",
            tokenName: "shimaken",
            campaign: 1,
            arc: 2,
            age: 72,
            gender: "M",
            tags: [`Deceased`,
                'From | Ruin',
                'Allegiance | Preservation',
                'Race | Human',
                `Class | ${Card.verbose("Battlemaster")} Fighter`,
                `Class | ${Card.verbose("Bondsmith")} Paladin`,
                `Lerasium Savant`,
                'CR | ?'],
            summary: (_q = summaries.get("Shimaken")) !== null && _q !== void 0 ? _q : "???",
            description: "",
        });
        new Character({
            name: "Rin Shima",
            tokenName: "shimarin",
            campaign: 1,
            arc: 2,
            age: 81,
            gender: "F",
            tags: [`Deceased`,
                'From | Ruin',
                'Allegiance | Ruin / Preservation',
                'Race | Human',
                `Class | ${Card.verbose("Assassin")} Rogue`,
                `Class | ${Card.verbose("Gunslinger")} Fighter`,
                'CR | 13'],
            summary: (_r = summaries.get("Shimarin")) !== null && _r !== void 0 ? _r : "???",
            description: shimaRinDesc,
            personalityTags: new Map([
                [NpcPersonalityTag.Confident, 3],
                [NpcPersonalityTag.Bloodlust, 3],
                [NpcPersonalityTag.Pessimist, 2],
                [NpcPersonalityTag.Quiet, 2],
                [NpcPersonalityTag.Ascetic, 2],
                [NpcPersonalityTag.Stern, 1],
                [NpcPersonalityTag.Kind, 1],
            ]),
        });
        new Character({
            name: "Verrader",
            tokenName: "verrader",
            campaign: 1,
            arc: 2,
            age: 31,
            gender: "M",
            tags: [`Deceased`,
                'From | Ruin',
                'Race | Human',
                `Class | ${Card.verbose("Eloquence")} Bard`,
                `Class | ${Card.verbose("Elemental Bloodline")} Sorcerer`,
                `Nightblood | Magma`,
                `Zinc Savant`,
                `Copper Savant`,
                'CR | 10'],
            summary: (_s = summaries.get("Verrader")) !== null && _s !== void 0 ? _s : "???",
            description: "",
        });
        new Character({
            name: "Fiest",
            tokenName: "fiest",
            campaign: 1,
            arc: 2,
            age: 80,
            gender: "M",
            tags: [`Deceased`,
                'From | Ruin',
                'Race | Human',
                `Class | Artificer`,
                'CR | 9'],
            summary: (_t = summaries.get("Fiest")) !== null && _t !== void 0 ? _t : "???",
            description: "",
        });
        new Character({
            name: "Mouthpiece",
            tokenName: "ahrendts",
            campaign: 1,
            arc: 2,
            age: "",
            gender: "M",
            tags: [`Deceased`,
                'From | Materia / Shadowfell / Ruin',
                'Allegiance | Ruin &times; Outsiders',
                `Race | Titan ${Card.verbose("&times; Aberration")}`,
                `Primordial | Outsider ${Card.verbose("(Curse)")}`,
                'CR | 23'],
            summary: (_u = summaries.get("Mouthpiece")) !== null && _u !== void 0 ? _u : "???",
            description: "",
        });
        new Character({
            name: "The SanguineArch",
            tokenName: "sarch_m",
            campaign: 1,
            arc: 2,
            age: "",
            gender: "-",
            tags: ['From | Shadowfell',
                `Race | Titan ${Card.verbose("&times; Vampire")}`,
                'Primordial | Shardic',
                'The Original',
                'Life Command',
                'CR | 29'],
            summary: (_v = summaries.get("SanguineArch")) !== null && _v !== void 0 ? _v : "???",
            description: "",
            altImagePaths: new Map([
                ["Male", "sarch_m"],
                ["Female", "sarch_f"],
            ])
        });
        new Character({
            name: "Decroa Sal",
            tokenName: "decroa",
            campaign: 1,
            arc: 2,
            age: "2620",
            gender: "F",
            tags: ['From | Shadowfell',
                'Race | Higher Vampire',
                'Crystal Command',
                'CR | 23'],
            summary: (_w = summaries.get("Decroa")) !== null && _w !== void 0 ? _w : "???",
            description: "",
        });
        new Character({
            name: "Baphomet",
            tokenName: "baphomet",
            campaign: 1,
            arc: 2,
            age: "20K+",
            gender: "M",
            tags: ['From | Ruin',
                'Race | Demon',
                'Demon Lord',
                'Domain | 20:00 to 21:00',
                'CR | 23'],
            summary: (_x = summaries.get("Baphomet")) !== null && _x !== void 0 ? _x : "???",
            description: "",
        });
        new Character({
            name: "Kjeragandr",
            indexName: "Kjera",
            tokenName: "g_mag_stone",
            campaign: 1,
            arc: 2,
            age: "",
            gender: "F",
            tags: ['From | Stone / Preservation',
                `Race | Titan ${Card.verbose("&times; Serpentine")}`,
                `Class | Spellcaster ${Card.verbose("(All)")}`,
                'Primordial | Shardic',
                'Guardian of Magic',
                'Atium Savant',
                'CR | 30'],
            summary: (_y = summaries.get("Kjera")) !== null && _y !== void 0 ? _y : "???",
            description: "",
            altImagePaths: new Map([
                ["Lithic", "g_mag_stone"],
                ["Humanoid", "g_mag_human"],
            ])
        });
        new Character({
            name: "The Guardian of Defense",
            tokenName: "g_def",
            campaign: 1,
            arc: 2,
            age: "40K+",
            gender: "-",
            tags: ['From | Innovation / Preservation',
                `Allegiance | Preservation`,
                `Race | Warforged &times; Aasimar`,
                `Class | Fighter`,
                'Guardian of Defense',
                'Atium Savant',
                `'Saint'`,
                'CR | 27'],
            summary: (_z = summaries.get("GDef")) !== null && _z !== void 0 ? _z : "???",
            description: "",
        });
        new Character({
            name: "Othello The Traitor",
            indexName: "Othello",
            tokenName: "othello",
            campaign: 1,
            arc: 2,
            age: "5020",
            gender: "M",
            tags: ['From | Materia / Preservation / Ruin',
                `Allegiance | Preservation (?)`,
                `Race | Human`,
                `Class | Fighter`,
                `Class | Barbarian`,
                `Class | Paladin`,
                'Apprentice Guardian of Defense',
                '<i>Bearer of Agonies</i>',
                'CR | 20'],
            summary: (_0 = summaries.get("Othello")) !== null && _0 !== void 0 ? _0 : "???",
            description: "",
        });
        new Character({
            name: "Mandragora",
            tokenName: "mandy",
            campaign: 1,
            arc: 2,
            age: "16",
            gender: "F",
            tags: ['From | Materia / Ruin',
                `Race | Ursine`,
                `Nightblood | Stoneward`,
                'CR | 16'],
            summary: (_1 = summaries.get("Mandy")) !== null && _1 !== void 0 ? _1 : "???",
            description: "",
        });
        new Character({
            name: "Gen",
            tokenName: "gen",
            campaign: 1,
            arc: 2,
            age: "69",
            gender: "M",
            tags: ['From | Materia / Ruin / Devotion',
                `Race | Human`,
                `Class | ${Card.verbose("Illusion")} Wizard`,
                `Class | Artificer`,
                'CR | 17'],
            summary: (_2 = summaries.get("Gen")) !== null && _2 !== void 0 ? _2 : "???",
            description: "",
            altImagePaths: new Map([
                ["child", "gen"],
            ])
        });
        new Character({
            name: "Muelsyse",
            tokenName: "muelsyse",
            campaign: 1,
            arc: 2,
            age: "343",
            gender: "F",
            tags: ['From | Water / Innovation',
                `Race | High-Elf`,
                `Class | Artificer`,
                `Director of ??? at ???`,
                'CR | 25'],
            summary: (_3 = summaries.get("Muelsyse")) !== null && _3 !== void 0 ? _3 : "???",
            description: "",
        });
        new Character({
            name: "Shamare",
            tokenName: "shamare",
            campaign: 1,
            arc: 2,
            age: "71",
            gender: "F",
            tags: ['From | Ruin',
                `Race | Vulpine`,
                `Warlock`,
                `Nightblood | Voodoo`,
                `Soul Weaver`,
                'CR | 12'],
            summary: (_4 = summaries.get("Shamare")) !== null && _4 !== void 0 ? _4 : "???",
            description: "",
        });
        new Character({
            name: "Amaia",
            tokenName: "amaia",
            campaign: 1,
            arc: 2,
            age: "",
            gender: "-",
            tags: ['Deceased (Merged)',
                'From | Materia / Water',
                `Race | Human`,
                `Aberrant-fused`,
                `Core of the Many`,
                'CR | ?'],
            summary: (_5 = summaries.get("Amaia")) !== null && _5 !== void 0 ? _5 : "???",
            description: "",
        });
        new Character({
            name: "Lemuen",
            tokenName: "lemuen",
            campaign: 1,
            arc: 2,
            age: "124",
            gender: "F",
            tags: ['Deceased',
                'From | Ruin',
                `Race | Aasimar`,
                `Class | ${Card.verbose("Gunslinger")} Fighter`,
                `Class | ${Card.verbose("Assassin")} Rogue`,
                `'Saintess'`,
                `Nightblood | Neural Link`,
                'CR | 14'],
            summary: (_6 = summaries.get("Lemuen")) !== null && _6 !== void 0 ? _6 : "???",
            description: "",
        });
        new Character({
            name: "Eugrud the Vanquisher",
            indexName: "Eugrud",
            tokenName: "eugrud",
            campaign: 1,
            arc: 2,
            age: "133",
            gender: "M",
            tags: ['From | Ruin',
                `Race | Orc`,
                `Class | ${Card.verbose("Champion")} Fighter`,
                `Class | Barbarian`,
                `Pewter Savant`,
                'CR | 8'],
            summary: (_7 = summaries.get("Eugrud")) !== null && _7 !== void 0 ? _7 : "???",
            description: "",
        });
        // new Character({
        //     name         : "Roth",
        //     tokenName    : "roth",
        //     campaign     : 1,
        //     arc          : 2,
        //     age          : "54",
        //     gender       : "M",
        //     tags         : ['Deceased',
        //                     'From | Ruin',
        //                     `Race | Bugbear`,
        //                     `Class | ${Card.verbose("Gunslinger")} Fighter`,
        //                     `Class | ${Card.verbose("Grave")} Cleric`,
        //                     'CR | 7'],
        //     summary      : summaries.get("roth") ?? "???",
        //     description  : "",
        // });
        /************************* Campaign 2, Arc 1 **************************/
        new Character({
            name: "Andoain 'The Martyr'",
            indexName: "Andoain",
            tokenName: "Andoain",
            campaign: 2,
            arc: 1,
            age: "221",
            gender: "M",
            tags: [],
            summary: (_8 = summaries.get("Andoain")) !== null && _8 !== void 0 ? _8 : "???",
            description: "",
        });
    });
})();
(() => {
    // 'Heart' effects are effects that play around with your hp. Like always, keep them simple.
    const flameHeartFlavour = `
    The fires from the depths of hell course through your veins, bestowing unto you the fiendish vitality of an arch-
    devil. However, these flames are predatory. Once unleashed, they will not, cannot, be contained. They will burn you
    from within even as they grant you the vigour to burn everything without...`;
    const flameHeartDesc = `
    <p>As a bonus action, you encrust your heart with the soul of hellfire. Your hp re-fills to its maximum value, then you
    gain an additional 200 temp hp. However, you take 6d20 continuous damage, which increases by a 6d20 at the start of 
    each of your subsequent turns, to a maximum of 30d20 damage. This damage is hellfire.</p>
    <p>While burning under hellfire, all attacks you make with - i. unarmed strikes, ii. spells dealing fire damage, 
    iii. rare or better weapons attuned to you and iv. weapons summoned by spells or melee spell attacks deal an extra 
    hellfire damage equal to the number of d20s of your continuous self-damage. This hellfire damage has a 5ft AoE.<p/>
    <p>Once activated, this cannot be deactivated until you fall unconscious, when the hellfire immediately stops. After you
    wake up again, you must roll one hit die and reduce your maximum hp by the amount rolled. HP lost this way cannot be 
    restored by anything short of a wish spell.</p>`;
    const heartOfTheFlame = {
        "name": "Heart of the flame",
        "elementalAffinity": "fire",
        "racialAffinity": "devils",
        "flavour": flameHeartFlavour,
        "description": flameHeartDesc,
    };
    const voidHeartFlavour = `
    Underneath the black and cold stars, you stare into the void of the darkest reaches of the shadowfell, allowing your
    soul to comfort in its emptiness. Aeons ago, an immortal walked this path to become the first higher vampire, the 
    original, the SanguineArch. Now your soul does the same, walking into the night, into a world that cannot hold...`;
    const voidHeartDesc = `
    <p>As a bonus action, you open your heart to the innermost darkness of the shadowfell. Immediately as you do this, 
    your hp falls to zero. You then roll a d4. Every creature other than you within 20ft of you looses 2 + the number 
    rolled (max) hp, and you gain temp hp equal to the number of creatures times the number rolled. On every subsequent 
    turn of yours, the dice you roll increases - until it caps at 1d12 - as does the range and constant modifier, to 
    60ft and +6 respectively.<p/>
    <p>On the first turn that the effect doesn't find any victims it ends, and you loose all tmp HP gained. While the 
    effect is active you are considered a (higher) vampire and cannot heal in any way that doesn't involve reducing the 
    max HP of some other creature. Max HP lost by this effect cannot be restored by any way short of the wish spell.</p>`;
    const heartOfTheVoid = {
        "name": "Heart of the Void",
        "elementalAffinity": "necrotic",
        "racialAffinity": "vampires",
        "flavour": voidHeartFlavour,
        "description": voidHeartDesc,
    };
})();
//# sourceMappingURL=main.js.map