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

const unspoken      = new Language("The Unspoken",    17, [],                                   []);  //
const oldPrimordial = new Language("Old Primordial",  16, [unspoken],                           [ELanguageTag.Dead]);  // Weave
const mythic        = new Language("Mythic",           7, [oldPrimordial],                      [ELanguageTag.Dead]);  // Cultivation(Old), Nature Chaos, Sage, (Fervus)
const dawnchant     = new Language("Dawnchant",       10, [oldPrimordial],                      [ELanguageTag.Shardic, ELanguageTag.Dead]);  // Honor
const oldInfernal   = new Language("Old Infernal",     9, [oldPrimordial],                      [ELanguageTag.Shardic, ELanguageTag.Dead]);  // Dominion, Odium (old)
const dreamSpeak    = new Language("Dream Speak",      8, [oldPrimordial],                      [ELanguageTag.Dead]);  // Hieroglyphics, Art, Vision, Expressions, Calligraphy
const primordial    = new Language("Primordial",       3, [oldPrimordial],                      [ELanguageTag.Shardic]);  // Preservation
const oldAbyssal    = new Language("Old Abyssal",     11, [oldPrimordial],                      [ELanguageTag.Shardic, ELanguageTag.Dead]);  // Ruin (Old)
const wildHunt      = new Language("Wild Hunt",        6, [mythic, dawnchant],                  [ELanguageTag.Shardic]);  // Cultivation
const celestial     = new Language("Celestial",        4, [oldPrimordial, dawnchant],           [ELanguageTag.Shardic]);  // Devotion
const abyssal       = new Language("Abyssal",          2, [oldAbyssal, wildHunt, oldInfernal],  [ELanguageTag.Shardic]);  // Ruin
const infernal      = new Language("Infernal",         4, [oldInfernal, dawnchant, oldAbyssal], [ELanguageTag.Shardic]);  // Odium
const myogi         = new Language("Myogi",            3, [dreamSpeak],                         [ELanguageTag.Shardic]);  // Virtuosity
const olympian      = new Language("Olympian",         3, [dreamSpeak, celestial],              [ELanguageTag.Shardic]);  // Mercy
const draconic      = new Language("Draconic",         4, [oldPrimordial, wildHunt],            [ELanguageTag.Racial]);
const vampiric      = new Language("Vampiric",         3, [oldPrimordial, oldAbyssal],          [ELanguageTag.Racial]);
const elderCommon   = new Language("Elder Common",     2, [primordial, dawnchant],              [ELanguageTag.Dead]);
const deepSpeech    = new Language("Deep Speech",      5, [elderCommon, unspoken],              []);  // Aberrations
const elderBeastial = new Language("Elder Beastial",   4, [mythic, wildHunt],                   [ELanguageTag.Dead]);
const sami          = new Language("Sami",             3, [mythic, celestial],                  []);
const druidic       = new Language("Druidic",          3, [sami, elderBeastial],                []);
const sylvan        = new Language("Sylvan",           2, [wildHunt],                           []);
const quori         = new Language("Quori",            2, [dreamSpeak],                         []);
const elven         = new Language("Elven",            1, [sylvan],                             [ELanguageTag.Terra]);
const common        = new Language("Common",           1, [elderCommon, elven, olympian],       [ELanguageTag.Terra]);
const latin         = new Language("Latin",            2, [common, primordial, celestial],      [ELanguageTag.Terra]);
const minami        = new Language("Minami",           2, [common, primordial, myogi],          [ELanguageTag.Terra]);
const sanskrit      = new Language("Sanskrit",         2, [common, primordial, sylvan, latin],  [ELanguageTag.Terra]);
const prakrit       = new Language("Prakrit",          1, [common, sanskrit],                   [ELanguageTag.Terra]);
const longyu        = new Language("Longyu",           1, [common, minami, draconic],           [ELanguageTag.Terra]);
const nord          = new Language("Nord",             1, [common, sami],                       [ELanguageTag.Terra]);
const ursine        = new Language("Ursine",           1, [common, elderBeastial, nord],        [ELanguageTag.Terra, ELanguageTag.BeastMaster]);
const loxodon       = new Language("Loxodon",          2, [elderBeastial, elven],               [ELanguageTag.BeastMaster]);
const leonin        = new Language("Leonin",           2, [elderBeastial, wildHunt],            [ELanguageTag.BeastMaster]);

export const L = {
    unspoken,
    oldPrimordial,
    dreamSpeak,
    mythic,
    primordial,
    dawnchant,
    oldInfernal,
    oldAbyssal,
    wildHunt,
    celestial,
    abyssal,
    infernal,
    myogi,
    olympian,
    draconic,
    vampiric,
    elderCommon,
    deepSpeech,
    elderBeastial,
    sami,
    druidic,
    sylvan,
    quori,
    elven,
    common,
    latin,
    minami,
    sanskrit,
    prakrit,
    longyu,
    nord,
    ursine,
    loxodon,
    leonin,
}