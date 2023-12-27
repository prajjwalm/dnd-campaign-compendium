import {Language}     from "../Language";


export const L = Object.freeze({

    // Forbidden Zone.
    "unspoken"     : new Language("The Unspoken",    17, [], []),

    // ProtoShardic Zone.
    "oldPrimordial": new Language("Elder Primordial",  16, [], []),  // Preservation, Ruin, Prudence, Cultivation
    "dawnchant"    : new Language("Dawnchant",       10, [], []),  // Honor, Devotion, Mercy, Endowment
    "nocturnal"    : new Language("Nocturnal",        9, [], []),  // Ambition, Odium, Whimsy, Virtuousity
    "stellaria"    : new Language("Stellaria",        9, [], []),  // Valor, Autonomy, Dominion, Innovation

    // Shardic Zone.
    "primordial"   : new Language("Primordial",       3, [], []),  // Preservation
    "celestial"    : new Language("Celestial",        5, [], []),  // Devotion
    "wildHunt"     : new Language("Wild Hunt",        7, [], []),  // Cultivation, Nature Chaos, Sage, (Fervus)
    "abyssal"      : new Language("Abyssal",          5, [], []),  // Ruin
    "dreamSpeak"   : new Language("Dream Speak",      8, [], []),  // Whimsy, Hieroglyphics, Art, Vision, Expressions, Calligraphy
    "infernal"     : new Language("Infernal",         5, [], []),  // Odium
    "myogi"        : new Language("Myogi",            6, [], []),  // Virtuosity
    // "olympian"     : new Language("Olympian",         4, [], []),  // Mercy

    // Elder Tongues
    "draconic"      : new Language("Draconic",         4, [], []),
    "giant"         : new Language("Giant",            3, [], []),
    "sylvan"        : new Language("Sylvan",           3, [], []),
    "vampiric"      : new Language("Vampiric",         4, [], []),
    "quori"         : new Language("Quori",            3, [], []),
    "elderBeastial" : new Language("Elder Beastial",   6, [], []),
    "elderCommon"   : new Language("Elder Common",     3, [], []),
    "deepSpeech"    : new Language("Deep Speech",      9, [], []),

    // Elemental Zone
    "elemental"     : new Language("Proto Elemental",  5, [], []),
    "fire"          : new Language("Ignis",            2, [], []),
    "earth"         : new Language("Jarrun",           4, [], []),
    "water"         : new Language("Mizu",             3, [], []),
    "air"           : new Language("Auran",            3, [], []),

    // Ancient Zone
    "sami"          : new Language("Sami",             3, [], []),
    "mage"          : new Language("MageScript",      3, [], []),
    "druidic"       : new Language("Druidic",          4, [], []),
    "elven"         : new Language("Elven",            3, [], []),
    "grey"          : new Language("Grey Words",       1, [], []),
    "dwarven"       : new Language("High Dwarven",     3, [], []),
    "sancta"        : new Language("Sancta",           3, [], []),
    "mafioso"       : new Language("Mafioso",          2, [], []),

    // Terran Zone
    "minami"        : new Language("Minami",           2, [], []),
    "aegir"         : new Language("Aegir",            2, [], []),
    "latin"         : new Language("Latin",            2, [], []),
    "sanskrit"      : new Language("Sanskrit",         2, [], []),
    "ursine"        : new Language("Ursine",           1, [], []),
    "bavarian"      : new Language("Bavarian",         1, [], []),
    "longYu"        : new Language("LongYu",           2, [], []),
    "nordic"        : new Language("Nordic",           1, [], []),
    "common"        : new Language("Common",           1, [], []),
    "undercommon"   : new Language("Undercommon",      1, [], []),
    "thieves"       : new Language("Thieves' Cant",     2, [], []),
});
