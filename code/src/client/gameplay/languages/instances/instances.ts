// import {Language} from "../Language";
//
// const common =
//     new Language("Common",
//                  [],
//                  1);
//
// const abyssal =
//     new Language("Abyssal",
//                  [],
//                  1);
//
// const celestial =
//     new Language("Celestial",
//                  [],
//                  1);
//
// const elderPrimordial =
//     new Language("Elder Primordial",
//                  [],
//                  4)
//
// const primordial =
//     new Language("Primordial",
//                  [elderPrimordial],
//                  2);
//
// const sylvan =
//     new Language("Sylvan",
//                  [],
//                  2);
//
// const elven =
//     new Language("Elven",
//                  [sylvan],
//                  1);
//
// const sanskrit =
//     new Language("Sanskrit",
//                  [sylvan, primordial],
//                  2);
//
// const latin =
//     new Language("Latin",
//                  [primordial, celestial],
//                  2);
//
//
//
//
//
//
//
//
// celestial.desc = `
//
// `
//
// primordial.desc = `
// The first 'language' to exist, this is a language only in the loosest of terms.
// A means of communication that flows from almost the start of time, this was
// first used by the shardic primordials to communicate when they first formed.
// This refers to a time before they had proper bodies, indeed a time before the
// multiverse was even well formed and thus using the vibrations of sound and light
// for communication wasn't an option.
//
// Instead this language employs the spiritual realm as a means of communication.
// Or in other words, it taps the weave.
//
// As it is the preferred language of the Guardian of Magic, it forms
// the syntactical language of choice for most arcane texts and spells.
// `;


import {ELanguageTag} from "../ELanguageTag";
import {Language}     from "../Language";


export const L = Object.freeze({
    "unspoken"     : new Language("The Unspoken",    17, [], []),
    "oldPrimordial": new Language("Elder Primordial",  16, [], []),  // Preservation, Ruin, Prudence, Cultivation
    "dawnchant"    : new Language("Dawnchant",       10, [], []),  // Honor, Devotion, Mercy, Endowment
    "nocturnal"    : new Language("Nocturnal",        9, [], []),  // Ambition, Odium, Whimsy, Virtuousity
    "stellaria"    : new Language("Stellaria",        9, [], []),  // Valor, Autonomy, Dominion, Innovation
    "primordial"   : new Language("Primordial",       3, [], []),  // Preservation
    "celestial"    : new Language("Celestial",        5, [], []),  // Devotion
    "wildHunt"     : new Language("Wild Hunt", 7, [], []),  // Cultivation, Nature Chaos, Sage, (Fervus)
    "abyssal"      : new Language("Abyssal",          4, [], []),  // Ruin
    "dreamSpeak"   : new Language("Dream Speak",      8, [], []),  // Hieroglyphics, Art, Vision, Expressions, Calligraphy
    "infernal"     : new Language("Infernal",         4, [], []),  // Odium
    "myogi"        : new Language("Myogi",            4, [], []),  // Virtuosity
    "olympian"     : new Language("Olympian",         4, [], []),  // Mercy


    // "elderBeastial" : new Language("Elder Beastial",   4, [], []),
    "sami"          : new Language("Sami",             4, [], []),
    "druidic"       : new Language("Druidic",          5, [], []),
    "sylvan"        : new Language("Sylvan",           2, [], []),
    "elderCommon"   : new Language("Elder Common",     3, [], []),
    "deepSpeech"    : new Language("Deep Speech",      9, [], []),  // Aberrations
    "draconic"      : new Language("Draconic",         4, [], []),
    "vampiric"      : new Language("Vampiric",         3, [], []),
    "quori"         : new Language("Quori",            2, [], []),
    "elven"         : new Language("Elven",            2, [], []),
});



const common        = new Language("Common",           1, [], []);
const latin         = new Language("Latin",            2, [], []);
const minami        = new Language("Minami",           2, [], []);
const sanskrit      = new Language("Sanskrit",         2, [], []);
const prakrit       = new Language("Prakrit",          1, [], []);
const longyu        = new Language("Longyu",           1, [], []);
const nord          = new Language("Nord",             1, [], []);
const ursine        = new Language("Ursine",           1, [], []);
const loxodon       = new Language("Loxodon",          2, [], []);
const leonin        = new Language("Leonin",           2, [], []);

// export const L = {
//     unspoken,
//     oldPrimordial,
//     dreamSpeak,
//     mythic,
//     primordial,
//     dawnchant,
//     oldInfernal,
//     oldAbyssal,
//     wildHunt,
//     celestial,
//     abyssal,
//     infernal,
//     myogi,
//     olympian,
//     draconic,
//     vampiric,
//     elderCommon,
//     deepSpeech,
//     elderBeastial,
//     sami,
//     druidic,
//     sylvan,
//     quori,
//     elven,
//     common,
//     latin,
//     minami,
//     sanskrit,
//     prakrit,
//     longyu,
//     nord,
//     ursine,
//     loxodon,
//     leonin,
// }