interface CountryArgs {
    planet: string;
    name: string;
    fullName: string;
    capital: string;
    leader?: string;
    government: string;
    primaryCulture: string;
    area: number;
    population: string;
    capitalSummary: string;
    capitalElevation: string;
    capitalTemperature: string;
    capitalPopulation: string;
    races: Map<string, number>;
    exoticRaces?: string[];
    exclusiveRaces?: string[];
    tags: string[];
    capitalTags: Map<CityTag, number>;
    description: string;
    leaderDescription: string;
}

enum CityTag {
    "Ghost Town",
    Ruins,
    Undefended,
    Open,
    Walled,
    Fortified,
    Impregnable,
    Sprawling,
    Organized,
    "Space Crunch",
    Cluttered,
    "Merchant Guilds",
    "Central Market",
    "Commercial Hub",
    "Trade Hotspot",
    "Academic Focus",
    "Research Centre",
    "Craftsman's Guilds",
    "Industrial Zone",
    "Mining Ops",
    "Mafia Control",
    "Lawless",
    "Efficient Police",
    "Military Curfew",
    "Unhygienic",
    "Sewage System",
    "Fresh Water",
    "Performing Artists",
    "Cultural Hub",
    "Tourist Hotspot",
    "Slums",
    "Underground",
    "Underworld",
    "Organized Crime",
    "Harbor",
    "Seaport",
    "Greens",
    "Entertainment Infra",
    "Medical Infra",
    "Charming",
    "Breathtaking",
    "Mage Presence",
    "Holy Sites"
}

class Country {
    private static readonly countriesIndex: Map<string, Country> = new Map();

    private static $countryNames: JQuery = null;
    private static $countryDesc: JQuery = null;

    private readonly $myName: JQuery = null;
    private readonly $myDesc: JQuery = null;

    private readonly index: string;
    private readonly planet: string;
    private readonly name: string;
    private readonly fullName: string;
    private readonly capital: string;
    private readonly leader?: string;
    private readonly government: string;
    private readonly primaryCulture: string;
    private readonly area: number;
    private readonly population: string;
    private readonly races: Map<string, number>;
    private readonly exoticRaces?: string[];
    private readonly exclusiveRaces?: string[];
    private readonly description: string;
    private readonly leaderDescription: string;

    // todo: languages
    private readonly tags: string[];
    private readonly capitalTags: Map<CityTag, number>;
    private readonly capitalSummary: string;
    private readonly capitalPopulation: string;
    private readonly capitalElevation: string;
    private readonly capitalTemperature: string;

    constructor(args: CountryArgs)
    {
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

    public static loadStaticElements() : void {
        this.$countryNames = $(".country_names");
        this.$countryDesc = $(".country_desc");

        this.$countryNames.on("click", ".country_name:not(.active)", function () {
            const indexKey = $(this).data("indexKey");
            Country.countriesIndex.get(indexKey).showCountry();
        });
    }

    private showCountry() : void {
        Country.$countryDesc.children().hide();
        Country.$countryNames.children().removeClass("active");
        this.$myName.addClass("active");
        this.$myDesc.show();
    }

    private generateDOM() : JQuery {
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
                <div class="tags">${Array.from(
                        this.capitalTags,
                        ([tag, val])  => `<span class="tag leveled t${val}">${CityTag[tag]}</span>`
                    ).join("")}
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
                    <div>Mainly inhabited by ${
                        this.races.size > 0 ? 
                            Array.from(
                                this.races,
                                ([name, percent]) => 
                                    `${name} (${Math.round(percent * 100) / 100}%)`
                            ).join(", ") : "?"
                    }.</div>
                    ${Array.isArray(this.exoticRaces) && this.exoticRaces.length 
                      ? `<div>${this.exoticRaces.join(", ")} can notably be found here.</div>` : ""}
                    ${Array.isArray(this.exclusiveRaces) && this.exclusiveRaces.length 
                      ? `<div>${this.exclusiveRaces.join(", ")} only come from here.</div>` : ""}
                </div>
            </div>
        </div>`);
    }
}

(() => {
    $(() => {
        Country.loadStaticElements();

        new Country({
            planet            : "Terra Prima",
            name              : "Veteres",
            fullName          : "Regnum Veteres",
            capital           : "Ortus",
            area              : 106,
            population        : "2.6M",
            government        : "Emperor / Senate",
            primaryCulture    : "Roma",
            leader            : "Rex Augustus IV",
            tags              : [],
            races             : new Map([
                ["Humans", 60.8],
                ["Half-Elves", 30.5],
                ["Elves", 8.7],
            ]),
            exoticRaces       : ["Aasimars", "Eladrin", "Vampires"],
            exclusiveRaces    : [],
            capitalPopulation : "218K",
            capitalElevation  : "4.2m",
            capitalTemperature: "8&#8451;",
            capitalTags       : new Map([
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
            capitalSummary    : `
                The city where modern civilization is began following the darkness. A city that has seen all. Earliest remaining 
                written records of all sentient races and cultures can be traced here. For a long time, this was the 
                capital of an empire that sprawled the world, and even now remains the single most important city of all.
                What secrets do its archives hold?`,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Rycerz",
            fullName          : "Holy Empire of Rycerz",
            capital           : "Kiragg",
            area              : 114,
            population        : "6.9M",
            government        : "Feudal Empire",
            primaryCulture    : "Pegaz",
            leader            : "Sir Enciodas Silverash",
            tags              : [],
            races             : new Map([
                ["Humans", 56],
                ["Shifters[Equines]", 25],
                ["Half-Orcs", 10],
                ["DragonBorn", 3],
                ["Dwarves", 3],
                ["Half-Elves", 2],
                ["Elves", 1],
            ]),
            exoticRaces       : ["Orcs", "Earth Genasi"],
            exclusiveRaces    : ["Centaurs"],
            capitalPopulation : "307K",
            capitalElevation  : "5480m",
            capitalTemperature: "-24&#8451;",
            capitalTags       : new Map([
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
            capitalSummary    : `
                Rumoured to have been made by a Goddess, this city, 'purchased' by Rycerz in the times past, is a vast 
                cave system within one of the worlds topmost peaks. Other than rather low atmospheric pressure, the
                caves, beyond all reason, are perfect for life. Hot springs provide fresh water and maintain temperature
                while certain bluish crystals provide light strangely like that of the sun.`,
            description       : "",
            leaderDescription : ``

        });

        new Country({
            planet            : "Terra Prima",
            name              : "Ursus",
            fullName          : "Eternal Tsardom of Ursus",
            capital           : "Ivangrad",
            area              : 241,
            population        : "3.1M",
            government        : "Tsardom",
            primaryCulture    : "Rus",
            leader            : "Tsar Ivanovich Kashchey",
            tags              : [],
            races             : new Map([
                ["Humans", 60],
                ["Shifters[Ursine]", 36],
                ["Dwarves", 2],
                ["Tieflings", 1],
                ["DragonBorn", 1],
            ]),
            exoticRaces       : ["Goliaths", "Demons", "Minotaurs", "Hobgoblins", "Yuan-ti"],
            exclusiveRaces    : ["Bugbears"],
            capitalPopulation : "121K",
            capitalElevation  : "202m",
            capitalTemperature: "-3&#8451;",
            capitalTags       : new Map([
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
            capitalSummary    : `
                A dangerous city at the centre of a dangerous country. At its very centre sits a dynasty that predates 
                the very empire, rumoured to be the soul of Ursus itself. Military forces crush dissenters and criminals 
                alike with an iron hand. Right underneath their gazes crime lords operating throughout Terra flourish. 
                And yet, this tyranny is home to many a genius incomparable...`,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Farando",
            fullName          : "Farando Shogunate",
            capital           : "Setsujoku",
            area              : 68,
            population        : "2.9M",
            government        : "Shogunate",
            primaryCulture    : "Minami",
            leader            : "Meijin Souya",
            tags              : [],
            races             : new Map([
                ["Humans", 79],
                ["Halflings", 8],
                ["Half-Elves", 7],
                ["Dwarves", 4],
                ["Elves", 2],
            ]),
            exoticRaces       : ["Tritons", "Air genasi", "Githyanki", "Kenku", "Tabaxi", "Sea Elves", "Oni"],
            exclusiveRaces    : [],
            capitalPopulation : "284K",
            capitalElevation  : "9.7m",
            capitalTemperature: "0&#8451;",
            capitalTags       : new Map([
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
            capitalSummary    : `
                A city that would not die, there was a time when this one city was all that the now-mighty empire had. 
                With the land burning, barbarians at the gates, the first Meijin took command. His will became the city's
                will - a will of survival, of vengeance. Countless generations have passed since then and the capital has
                thrived in more ways than one, but even now the people here view the arrival of the mists with reverence...`,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Sadhvastan",
            fullName          : "Sadhvarajya",
            capital           : "Nagasyaranya",
            area              : 62,
            population        : "3.2M",
            government        : "Raj",
            primaryCulture    : "Vedic",
            leader            : "Raja Devavrata",
            tags              : [],
            races             : new Map([
                ["Humans", 55],
                ["Shifters[Serpentine]", 21],
                ["Shifters[Feline]", 15],
                ["Yuan-ti", 6],
                ["Aarakocra", 2],
                ["Elves", 1],
            ]),
            exoticRaces       : ["Aasimars", "Goblins", "Harengon", "Githyanki", "Kenku", "Tortles"],
            exclusiveRaces    : ["Loxodon", "Githzerai", "Leonin"],
            capitalPopulation : "165K",
            capitalElevation  : "56m",
            capitalTemperature: "9&#8451;",
            capitalTags       : new Map([
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
            capitalSummary    : `
                 A city that embodies the free, untamed spirit of the forest. In a world that rapidly changes, this 
                 remains the only mega-city where not a single piece of concrete or steel has gone into the infrastructure.
                 Buried deep within inaccessible woods, every single building is made from trees, several still alive. 
                 Rumours are that a titanic serpent unseen to man guards and provides shelter to it till this date.`,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Stahlern",
            fullName          : "Stahlern Imperium",
            capital           : "Julsburg",
            area              : 93,
            population        : "4.1M",
            government        : "Reich",
            primaryCulture    : "Hexenfurst",
            leader            : "Kaiser Alexander Siegfried Von Lohengramm",
            tags              : [],
            races             : new Map([
                ["Humans", 85],
                ["Dwarves", 5],
                ["Half-Elves", 7],
                ["Elves", 2],
                ["Gnomes", 1],
            ]),
            exoticRaces       : ["Deep Gnomes", "Duergar", "Drow", "Earth Genasi"],
            exclusiveRaces    : ["Warforged"],
            capitalPopulation : "120K",
            capitalElevation  : "28m",
            capitalTemperature: "3&#8451;",
            capitalTags       : new Map([
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
            capitalSummary    : `
                A heart of steel that pumps a lifeblood of coal and iron throughout the Imperium and outside and the
                one of the only two places where a ton of copper is cheaper than a ton of apples. Massive factories 
                extract resources at an unbelievable rate, with highly organized industries consuming them to produce
                components and machines with supernatural efficiency. An uber-efficient police denies any possibility
                of crime in this steampunk city with their uncanny amount of intel.
            `,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Naiyumi",
            fullName          : "Most Serene Republic of Naiyumi",
            capital           : "Gugong",
            area              : 117,
            population        : "6.0M",
            government        : "'Republic'",
            primaryCulture    : "Yan",
            leader            : "Captain Yang Wenli",
            tags              : [],
            races             : new Map([
                ["Humans", 67],
                ["Halflings", 13],
                ["Gnomes", 12],
                ["HalfElves", 5],
                ["DragonBorn", 2],
                ["Elves", 1],
            ]),
            exoticRaces       : ["Satyr", "Owlin", "Lizardfolk", "Tabaxi", "Shifters", "Changelings"],
            exclusiveRaces    : [],
            capitalPopulation : "74K",
            capitalElevation  : "4.2m",
            capitalTemperature: "22&#8451;",
            capitalTags       : new Map([
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
            capitalSummary    : `
                Rumoured to be the most serene place on Terra and easily the one with the highest per-capita assets, 
                only the most influential or the most loyal of Naiyumi are allowed into this forbidden city. Historically,
                leaders across generations have cocooned themselves in this secure paradise to shut themselves off to the 
                disturbing realities of the world outside. Word is, that under the current regime, this won't remain 
                capital for long.`,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Celatum",
            fullName          : "United Provinces of Celatum",
            capital           : "Emberston",
            area              : 109,
            population        : "3.2M",
            government        : "Kingdom / Serfdom",
            primaryCulture    : "Neo-Anglo",
            leader            : "Queen Argela",
            tags              : [],
            races             : new Map([
                ["Humans", 65],
                ["DragonBorn", 15],
                ["Halflings", 13],
                ["Half-Orcs", 4],
                ["Gnomes", 3],
            ]),
            exoticRaces       : ["Changelings", "Firbolgs", "Harengons", "Satyrs", "Orcs", "Vampires"],
            exclusiveRaces    : [],
            capitalPopulation : "142K",
            capitalElevation  : "40m",
            capitalTemperature: "0&#8451;",
            capitalTags       : new Map([
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
            capitalSummary    : `
                A newly founded city by Queen Argela herself. This city has grown to mirror her philosophy and become the
                greatest center of medical research on Terra. Healers and doctors from here are valued worldwide, for 
                this atmosphere of freedom and comfort along with the best standards of hygiene and beauty cultivates 
                the very best of them. However, for all its happiness, such unrestrained freedom does attract the 
                unscrupulous...`,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Aegir",
            fullName          : "Duchy of Aegir",
            capital           : "Eldfjalla (pron. Uld-Fia-Tla)",
            area              : 67,
            population        : "2.4M",
            government        : "Aristocracy / Matriarchy",
            primaryCulture    : "Skaldic",
            leader            : "Jarl Gladiia",
            tags              : [],
            races             : new Map([
                ["Humans", 72],
                ["Half-Elves", 14],
                ["Sea-Elves", 8],
                ["Shifters[Aquatic]", 6],
            ]),
            exoticRaces       : ["Triton", "Water Genasi", "Yuan-ti"],
            exclusiveRaces    : ["Seaborn"],
            capitalPopulation : "17K",
            capitalElevation  : "2071m",
            capitalTemperature: "-2&#8451;",
            capitalTags       : new Map([
                [CityTag["Breathtaking"], 5],
                [CityTag["Research Centre"], 5],
                [CityTag["Holy Sites"], 3],
                [CityTag["Lawless"], 2],
                [CityTag.Undefended, 1],
            ]),
            capitalSummary    : `
                Built upon the warm, fertile and mineral rich lands of an old volcano, this beautiful little city is an 
                oasis in the frigid wastelands around it. Yet life in the middle of nowhere is not for everyone, and so 
                few choose to live here. Fewer still are encouraged to, for those that live here come to be aware of certain
                secrets best left untold - and know that the scholars that propel the research here do not all come from Terra...`,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Calentaur",
            fullName          : "Serene Valleys of Calentaur",
            capital           : "Annwyn",
            area              : 57,
            population        : "2.1M",
            government        : "Council",
            primaryCulture    : "Foehn",
            leader            : "Lady Shiadhal",
            tags              : [],
            races             : new Map([
                ["Elves", 66],
                ["Half-Elves", 14],
                ["Humans", 10],
                ["Halflings", 6],
                ["Gnomes", 4],
            ]),
            exoticRaces       : ["Eladrin", "Satyr", "Owlin", "Goblins"],
            exclusiveRaces    : ["Fairies"],
            capitalPopulation : "59K",
            capitalElevation  : "271m",
            capitalTemperature: "8&#8451;",
            capitalTags       : new Map([
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
            capitalSummary    : `
                A city that bridges between the material plane and the feywild, and yet belongs to neither. The only way 
                to access it is via a perpendicularity of uncertain location. The few non-elves who have been there have
                been forever enraptured. Depictions describe it as a supernatural city of eternal youth, beauty, health 
                and abundance, of sophisticated marble architecture with lush green vines and vivid flowers. Yet some 
                who've come back do not feel particularly inclined to return there...`,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Vinland",
            fullName          : "Free Territory of Vinland",
            capital           : "Frihet",
            area              : 57,
            population        : "2.1M",
            government        : "Free Territory",
            primaryCulture    : "Rus / Pegaz / Neo-Anglo",
            leader            : "",
            tags              : [],
            races             : new Map([
                ["Humans", 70],
                ["Halflings", 21],
                ["Gnomes", 9],
            ]),
            exoticRaces       : ["Firbolgs", "Trolls", "Goblins", "Kobolds"],
            exclusiveRaces    : [],
            capitalPopulation : "16K",
            capitalElevation  : "56m",
            capitalTemperature: "4&#8451;",
            capitalTags       : new Map([
                [CityTag["Central Market"], 3],
                [CityTag["Craftsman's Guilds"], 3],
                [CityTag["Entertainment Infra"], 3],
                [CityTag["Fresh Water"], 2],
                [CityTag["Greens"], 2],
                [CityTag["Charming"], 2],
                [CityTag.Undefended, 1],
            ]),
            capitalSummary    : `
                Possibly the most unassuming capital of Terra Prima, the city of liberty is open to all, yet doesn't 
                make any bow underneath its grandeur. The lack of authority means no real power is gathered in the 
                capital, and so economy, and life, here is slow and relaxed. Yet the few who do live here wouldn't leave
                behind the family like atmosphere plus the ease of availability of a capital for anything else in the 
                world.`,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Altava",
            fullName          : "Wild Hinterlands of Altava",
            capital           : "Sal Venito",
            area              : 103,
            population        : "0.3M",
            government        : "Anarchy",
            primaryCulture    : "Liberi / Skaldic / Roma",
            leader            : "",
            tags              : [],
            races             : new Map([
                ["Humans", 90],
                ["DragonBorn", 5],
                ["Tieflings", 4],
                ["Air Genasi", 1],
            ]),
            exoticRaces       : ["Goblins", "Hobgoblins", "Tortle"],
            exclusiveRaces    : ["Vedalken"],
            capitalPopulation : "4K",
            capitalElevation  : "56m",
            capitalTemperature: "4&#8451;",
            capitalTags       : new Map([
                [CityTag.Ruins, 6],
                [CityTag.Harbor, 3],
                [CityTag.Organized, 3],
                [CityTag["Mafia Control"], 3],
                [CityTag["Underworld"], 3],
                [CityTag["Lawless"], 2],
                [CityTag["Sewage System"], 2],
                [CityTag["Fresh Water"], 1],
            ]),
            capitalSummary    : `
                Not more than a century ago a city to rival Ortus, all that remains of this arrogant capital are ruins and
                shattered dreams. They dared to take on those that must not be spoken of, and all that remained from that
                was mere fodder for scavengers - criminals, pirates and rival states alike. Now that the corpse has been
                picked to the bone, a few refugees and hinterland tribesmen still find shelter and comfort in the ruins,
                still grand and intimating even in decay...
            `,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Nidavellir",
            fullName          : "Depths of Nidavellir",
            capital           : "Idavoll",
            area              : 61,
            population        : "2.9M",
            government        : "Kingdom",
            primaryCulture    : "Durinn",
            leader            : "Queen Dagfid",
            tags              : [],
            races             : new Map([
                ["Dwarves", 64],
                ["Drow", 20],
                ["Tieflings", 8],
                ["Deep Gnomes", 6],
                ["Humans", 2],
            ]),
            exoticRaces       : ["Duergar", "Fire Genasi", "Kenku", "Orcs"],
            exclusiveRaces    : [],
            capitalPopulation : "90K",
            capitalElevation  : "-1222m",
            capitalTemperature: "43&#8451;",
            capitalTags       : new Map([
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
            capitalSummary    : `
                The entrance to the underdark, visitors to the city of Idavoll are greeted by its hot and acrid air, 
                followed by the angry red glare of eternally burning smelters. With its paranoid inhabitants, toiling 
                endlessly and operating ruthlessly in a city that has never seen sunlight, Idavoll is the least 
                accessible settlement on Terra - but it is accessible. Much more than can be said for anything in the 
                passages that descend beneath it... passages rumoured to be the home of great and terrible demon lords, 
                passages rumoured to be the only way into Terra Incognita.`,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Gaulle",
            fullName          : "United Clans of Gaulle",
            capital           : "Lutetia",
            area              : 52,
            population        : "4.0M",
            government        : "Free Tribes",
            primaryCulture    : "Hexenfurst",
            leader            : "Chief Vercingetorix",
            tags              : [],
            races             : new Map([
                ["Humans", 88],
                ["Shifters", 12],
            ]),
            exoticRaces       : ["Aarakocra", "Owlin", "Tabaxi", "Changeling", "Kalashtar", "Fire Genasi"],
            exclusiveRaces    : ["Werewolves"],
            capitalPopulation : "217K",
            capitalElevation  : "18m",
            capitalTemperature: "12&#8451;",
            capitalTags       : new Map([
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
            capitalSummary    : `
                A large and bustling city of a large and bustling country, it mirrors the serious congestion and 
                overpopulation evident in the rest of the country. For those from outside, reaching from their tavern to 
                their destination can easily take hours - yet those who know their way about know this to be one of the
                most resourceful places on Terra. There are rumours that a mass renovation is in the works...`,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Reindal",
            fullName          : "Snowy realms of Reindal",
            capital           : "Witstad",
            area              : 39,
            population        : "0.7M",
            government        : "Federation",
            primaryCulture    : "Roma",
            leader            : "Sir Lucius Artorius Castus",
            tags              : [],
            races             : new Map([
                ["Humans", 90],
                ["DragonBorn", 5],
                ["Half-Elves", 2],
                ["Gnomes", 1],
                ["Halflings", 1],
                ["Elves", 1],
            ]),
            exoticRaces       : ["Aasimar", "Eladrin", "Goblin", "Kalashtar", "Changelings"],
            exclusiveRaces    : [],
            capitalPopulation : "67K",
            capitalElevation  : "918m",
            capitalTemperature: "-8&#8451;",
            capitalTags       : new Map([
                [CityTag["Breathtaking"], 6],
                [CityTag["Mage Presence"], 5],
                [CityTag["Academic Focus"], 3],
                [CityTag["Greens"], 3],
                [CityTag["Holy Sites"], 2],
                [CityTag["Merchant Guilds"], 1],
                [CityTag.Undefended, 1],
            ]),
            capitalSummary    : `
                Much like the lands to which it belongs, this town, enchanting in its beautiful, pure and perennial snow,
                is a safe haven from all the conflicts in terra. Originally inhabited by refugees tired of war or slaves
                escaping to freedom, few people now wish to come here, but those who do come find comfort and peace like
                no where else. Despite being soft spoken and kind to a fault, the people here would work harder than all 
                others to secure the said comfort. And to secure the said peace...            `,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "KingsFall",
            fullName          : "Cursed Plains of KingsFall",
            capital           : "Necropolis",
            area              : 40,
            population        : "0.2M",
            government        : "Anarchy",
            primaryCulture    : "Hexenfurst",
            leader            : "",
            tags              : [],
            races             : new Map([
                ["Humans", 89],
                ["Tieflings", 11],
            ]),
            exoticRaces       : ["Shadar-Kai", "Kalashtar", "Vampires", "Hexbloods", "Reborn"],
            exclusiveRaces    : [],
            capitalPopulation : "0 ?",
            capitalElevation  : "352m",
            capitalTemperature: "7&#8451;",
            capitalTags       : new Map([
                [CityTag["Ghost Town"], 1]
            ]),
            capitalSummary    : `
                Once long ago, these buildings used to be a flourishing city. However, like the rest of the plains - whosoever
                held it found themselves on the loosing side of a particularly brutal war. These empty streets have
                changed hands dozens of times - each time involving mass brutality, plunder and slaughter. Now, none 
                dare venture here and only terrible ghosts haunt this mass grave of a capital. Some madmen have reported
                seeing the Witch King of ancient lore glide the streets even today, dancing a terrible dance along with 
                several human-puppets who they said comprise his troupe...`,
            description       : "",
            leaderDescription : ""
        });

        new Country({
            planet            : "Terra Prima",
            name              : "Terra Incognita",
            fullName          : "Terra Incognita",
            capital           : "?",
            area              : 75,
            population        : "?",
            government        : "?",
            primaryCulture    : "?",
            leader            : "?",
            tags              : [],
            races             : new Map(),
            exoticRaces       : [],
            exclusiveRaces    : [],
            capitalPopulation : "?",
            capitalElevation  : "?",
            capitalTemperature: "?",
            capitalTags       : new Map(),
            capitalSummary    : `???`,
            description       : "",
            leaderDescription : ""
        });
    });
})();
