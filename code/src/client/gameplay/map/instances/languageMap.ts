import {L}              from "../../languages/instances/instances";
import {Language}       from "../../languages/Language";
import {LanguageEdge}   from "../LanguageEdge";
import {LanguageGraph}  from "../LanguageGraph";
import {LanguageVertex} from "../LanguageVertex";

const g = new LanguageGraph("Lng");

function vertex(x: number,
                y: number,
                l: Language | null = null,
                v_ref: LanguageVertex | null = null,
                weak: boolean = false)
{
    if (l != null) {
        weak = false;
    }
    let v = new LanguageVertex(g, l, weak);

    if (v_ref != null) {
        x += v_ref.x;
        y += v_ref.y;
    }

    v.cartesian = [x, y];

    return v;
}

const edgesPlaced: Map<LanguageVertex, Set<LanguageVertex>> = new Map();

function edge(v1: LanguageVertex, v2: LanguageVertex, weak: boolean = false): LanguageEdge
{
    if (v1 == v2) {
        return;
    }
    if ((edgesPlaced.has(v1) && edgesPlaced.get(v1).has(v2)) ||
        (edgesPlaced.has(v2) && edgesPlaced.get(v2).has(v1)))
    {
        return;
    }
    if (!edgesPlaced.has(v1)) {
        edgesPlaced.set(v1, new Set());
    }
    edgesPlaced.get(v1).add(v2);
    if (!edgesPlaced.has(v2)) {
        edgesPlaced.set(v2, new Set());
    }
    edgesPlaced.get(v2).add(v1);

    return new LanguageEdge(g, v1, v2, weak);
}


const tempVertices: Map<number, Map<number, LanguageVertex>> = new Map();

function computeIfAbsent(x: number,
                         y: number,
                         weak: boolean = false,
                         gen: (x: number, y: number) => LanguageVertex = (x, y) => vertex(x, y, null, null, weak))
    : LanguageVertex
{
    if (!tempVertices.has(x)) {
        tempVertices.set(x, new Map());
    }
    const xMap = tempVertices.get(x);

    if (!xMap.has(y)) {
        xMap.set(y, gen(x, y));
    }
    return xMap.get(y);
}

const v = computeIfAbsent;

function inheritanceEdge(v1: LanguageVertex,
                         v2: LanguageVertex,
                         stops: [number, number, number][] = [],
                         weak: boolean = false)
{
    if (v1.x == v2.x && v1.y == v2.y) {
        return;
    }

    const x1 =  v1.x;
    const x2 =  v2.x;
    const y1 =  v1.y;
    const y2 =  v2.y;

    const stopIdxs: [number, number, number][] = [];
    if (stops.length == 0) {
        if (x1 == x2 || y1 == y2) {
            stopIdxs.push([x1, y1, 16]);
            stopIdxs.push([x2, y2, 16]);
        }
        else {
            stopIdxs.push([x1, y1,    16]);
            stopIdxs.push([x1, y1+50, 16]);
            stopIdxs.push([x2, y1+50, 16]);
            stopIdxs.push([x2, y2,    16]);
        }
    }
    else {
        stopIdxs.push([x1, y1, 16]);
        for (const stop of stops) {
            stopIdxs.push([stop[0], stop[1], stop[2]]);
        }
        stopIdxs.push([x2, y2, 16]);
    }

    const trueStops = [v1];
    for (let i = 1; i < stopIdxs.length - 1; i++) {
        const [x1, y1, _0] = stopIdxs[i-1];
        const [x2, y2, cutSize] = stopIdxs[i];
        const [x3, y3, _1] = stopIdxs[i+1];

        if (x1 == x2) {
            trueStops.push(v(x1, y2 - cutSize * Math.sign(y2 - y1), weak));
        }
        else if (y1 == y2) {
            trueStops.push(v(x2 - cutSize * Math.sign(x2 - x1), y1, weak));
        }
        else {
            throw new Error();
        }

        if (x2 == x3) {
            trueStops.push(v(x2, y2 + cutSize * Math.sign(y3 - y2), weak));
        }
        else if (y3 == y2) {
            trueStops.push(v(x2 + cutSize * Math.sign(x3 - x2), y2, weak));
        }
        else {
            throw new Error();
        }
    }
    trueStops.push(v2);

    for (let i = 0; i < trueStops.length - 1; i++) {
        edge(trueStops[i], trueStops[i+1], weak);
    }
}

// Old zone.
const v_unspoken         = vertex(0, 0, L.unspoken);

// ProtoShardic Zone
const v_oldPrimordial    = vertex(-400, 100, L.oldPrimordial,   v_unspoken);
const v_nocturnal        = vertex(-800, 200, L.nocturnal,       v_unspoken);
const v_stellaria        = vertex( 400, 200, L.stellaria,       v_unspoken);
const v_dawnchant        = vertex( 800, 200, L.dawnchant,       v_unspoken);

// Shardic Zone
const v_primordial       = vertex(  50, 200, L.primordial,      v_oldPrimordial);
const v_wildHunt         = vertex( 200, 300, L.wildHunt,        v_oldPrimordial);
const v_celestial        = vertex(   0, 300, L.celestial,       v_dawnchant);
const v_dreamSpeak       = vertex( -50, 150, L.dreamSpeak,      v_nocturnal);
const v_abyssal          = vertex( 300, 200, L.abyssal,         v_nocturnal);
const v_infernal         = vertex( 100, 250, L.infernal,        v_nocturnal);
const v_myogi            = vertex(   0, 150, L.myogi,           v_dreamSpeak);

// Elder races zone.
const v_giant            = vertex( -250,  150, L.giant,              v_celestial);
const v_draconic         = vertex( -275,  -50, L.draconic,           v_giant);
const v_sylvan           = vertex(v_wildHunt.x - 75, v_draconic.y + 50, L.sylvan);
const v_elderBeastial    = vertex(v_wildHunt.x + 50, v_sylvan.y + 50, L.elderBeastial);
const v_vampiric         = vertex(  175,  400, L.vampiric,           v_nocturnal);
const v_quori            = vertex(    0,  150, L.quori,              v_myogi);

const v_elderCommon      = vertex(  100, Math.max(v_giant.y,
                                                  v_draconic.y,
                                                  v_sylvan.y,
                                                  v_vampiric.y,
                                                  v_quori.y) + 150, L.elderCommon);

const v_deepSpeech       = vertex(   0, 50, L.deepSpeech, v_elderCommon);
const v_sami             = vertex(v_giant.x, v_deepSpeech.y + 50, L.sami);

const v_elemental        = vertex(v_abyssal.x + 50, v_deepSpeech.y + 150, L.elemental);
const v_fire             = vertex(v_infernal.x, v_elemental.y + 100, L.fire);
const v_water            = vertex(v_quori.x, v_elemental.y + 100, L.water);
const v_earth            = vertex(v_sami.x, v_elemental.y + 100, L.earth);
const v_air              = vertex(v_celestial.x, v_elemental.y + 100, L.air);

const v_elven            = vertex(v_sylvan.x, v_deepSpeech.y + 300, L.elven);
const v_mage             = vertex(v_primordial.x - 100, v_elven.y-25, L.mage);
const v_grey             = vertex(v_draconic.x + 50, v_elven.y, L.grey);
const v_druidic          = vertex(v_sami.x - 75, v_sami.y + 350, L.druidic);
const v_dwarven          = vertex(v_earth.x + 150, v_earth.y + 100, L.dwarven);
const v_sancta           = vertex(v_celestial.x, v_druidic.y + 100, L.sancta);
const v_mafioso          = vertex(v_grey.x + 150, v_druidic.y + 200, L.mafioso);

const v_latin            = vertex(v_vampiric.x + 50, v_fire.y + 350, L.latin);
const v_minami           = vertex(v_water.x - 50, v_latin.y + 100, L.minami);
const v_aegir            = vertex(v_water.x + 100, v_latin.y + 100, L.aegir);
const v_sanskrit         = vertex(v_elven.x - 50, v_latin.y + 100, L.sanskrit);
const v_ursine           = vertex(v_elderBeastial.x, v_latin.y + 150, L.ursine);
const v_bavarian         = vertex(v_grey.x, v_latin.y + 150, L.bavarian);
const v_longYu           = vertex(v_draconic.x - 150, v_latin.y + 150, L.longYu);
const v_nordic           = vertex(v_sami.x + 100, v_latin.y + 200, L.nordic);
const v_thieves          = vertex(v_mafioso.x, v_bavarian.y + 50, L.thieves);

const v_common           = vertex(0, v_nordic.y + 150, L.common);
const v_undercommon      = vertex(v_oldPrimordial.x, v_common.y + 100, L.undercommon);

inheritanceEdge(v_unspoken,             v_oldPrimordial);
inheritanceEdge(v_oldPrimordial,        v_dawnchant);
inheritanceEdge(v_oldPrimordial,        v_nocturnal);
inheritanceEdge(v_oldPrimordial,        v_stellaria);

inheritanceEdge(v_oldPrimordial,        v_primordial);
inheritanceEdge(v_oldPrimordial,        v_wildHunt);

inheritanceEdge(v_dawnchant,            v_celestial);
inheritanceEdge(v_primordial,           v_abyssal);
inheritanceEdge(v_nocturnal,            v_abyssal);
inheritanceEdge(v_nocturnal,            v_infernal);
inheritanceEdge(v_nocturnal,            v_dreamSpeak);
inheritanceEdge(v_dreamSpeak,           v_myogi);
// inheritanceEdge(v_dawnchant,            v_olympian);

inheritanceEdge(v_nocturnal,            v_vampiric, [
    [v_nocturnal.x,       v_nocturnal.y + 50, 16],
    [v_vampiric.x,        v_nocturnal.y + 50, 8],
    [v_vampiric.x,        v_infernal.y  - 33, 8],
    [v_infernal.x + 125,  v_infernal.y  - 33, 8],
    [v_infernal.x + 125,  v_infernal.y  + 33, 8],
    [v_vampiric.x,        v_infernal.y  + 33, 8]
]);

inheritanceEdge(v_wildHunt,             v_sylvan);
inheritanceEdge(v_wildHunt,             v_draconic);
inheritanceEdge(v_wildHunt,             v_elderBeastial);
inheritanceEdge(v_stellaria,            v_draconic);
inheritanceEdge(v_stellaria,            v_giant);
inheritanceEdge(v_stellaria,            v_celestial, [], true);
inheritanceEdge(v_stellaria,            v_elderBeastial, [
    [v_stellaria.x, v_stellaria.y + 50, 16],
    [v_draconic.x,  v_stellaria.y + 50, 16],
    [v_draconic.x,  v_elderBeastial.y - 150, 16],
    [v_elderBeastial.x,  v_elderBeastial.y - 150, 16],
], true);

inheritanceEdge(v_myogi,                v_quori);

const elderCommonLine = v_elderCommon.y - 50;

inheritanceEdge(v_sylvan,               v_elderCommon, [
    [v_sylvan.x,      elderCommonLine, 16],
    [v_elderCommon.x, elderCommonLine, 16],
], true);
inheritanceEdge(v_vampiric,             v_elderCommon, [
    [v_vampiric.x,    elderCommonLine, 16],
    [v_elderCommon.x, elderCommonLine, 16],
], true);
inheritanceEdge(v_giant,                v_elderCommon, [
    [v_giant.x,         elderCommonLine, 16],
    [v_elderCommon.x,   elderCommonLine, 16],
], true);
inheritanceEdge(v_quori,                v_elderCommon, [
    [v_quori.x,         elderCommonLine, 16],
    [v_elderCommon.x,   elderCommonLine, 16],
], true);
inheritanceEdge(v_draconic,             v_elderCommon, [
    [v_draconic.x,      elderCommonLine, 16],
    [v_elderCommon.x,   elderCommonLine, 16],
], true);
inheritanceEdge(v_celestial,            v_elderCommon, [
    [v_celestial.x,     elderCommonLine, 16],
    [v_elderCommon.x,   elderCommonLine, 16],
], true);
// inheritanceEdge(v_olympian,             v_elderCommon, [
//     [v_olympian.x,     elderCommonLine],
//     [v_elderCommon.x,  elderCommonLine],
// ], true);
inheritanceEdge(v_primordial,           v_elderCommon, [
    [v_primordial.x,    elderCommonLine, 16],
    [v_elderCommon.x,   elderCommonLine, 16],
], true);
inheritanceEdge(v_abyssal,           v_elderCommon, [
    [v_abyssal.x,    elderCommonLine, 16],
    [v_elderCommon.x,   elderCommonLine, 16],
], true);

inheritanceEdge(v_elderCommon,          v_deepSpeech);

inheritanceEdge(v_unspoken,             v_deepSpeech, [
    [v_unspoken.x, v_deepSpeech.y, 16]
]);

inheritanceEdge(v_sylvan,               v_elven);
inheritanceEdge(v_giant,                v_sami);
inheritanceEdge(v_sami,                 v_druidic, [
    [v_sami.x, v_sami.y+100, 16],
    [v_druidic.x, v_sami.y+100, 16],
]);
inheritanceEdge(v_elderBeastial,        v_druidic, [
    [v_elderBeastial.x, v_druidic.y - 250, 16],
    [v_druidic.x, v_druidic.y - 250, 16],
], true);
inheritanceEdge(v_sylvan,        v_druidic, [
    [v_sylvan.x, v_druidic.y - 250, 16],
    [v_druidic.x, v_druidic.y - 250, 16],
], true);

inheritanceEdge(v_primordial, v_elemental, [
    [v_primordial.x, v_elemental.y - 100, 16],
    [v_elemental.x, v_elemental.y - 100, 16],
]);
inheritanceEdge(v_elemental, v_water);
inheritanceEdge(v_elemental, v_fire);
inheritanceEdge(v_elemental, v_earth);
inheritanceEdge(v_elemental, v_air);
inheritanceEdge(v_quori, v_water, [], true);
inheritanceEdge(v_infernal, v_fire, [], true);
inheritanceEdge(v_sami, v_earth, [], true);
inheritanceEdge(v_celestial, v_air, [], true);


inheritanceEdge(v_earth, v_dwarven);
inheritanceEdge(v_giant, v_dwarven, [
    [v_giant.x, v_elderCommon.y, 16],
    [v_dwarven.x, v_elderCommon.y, 16],
], true);


inheritanceEdge(v_primordial, v_latin, [
   [v_primordial.x, v_elemental.y - 100, 16],
   [v_latin.x,      v_elemental.y - 100, 16],
]);

inheritanceEdge(v_primordial, v_sanskrit, [
   [v_primordial.x, v_elemental.y - 100, 16],
   [v_latin.x,      v_elemental.y - 100, 16],
   [v_latin.x,      v_elven.y + 50, 16],
   [v_sanskrit.x,   v_elven.y + 50, 16],
]);

inheritanceEdge(v_primordial, v_minami, [
   [v_primordial.x, v_elemental.y - 100, 16],
   [v_latin.x,      v_elemental.y - 100, 16],
   [v_latin.x,      v_elven.y + 50, 16],
   [v_minami.x,     v_elven.y + 50, 16],
], true);

inheritanceEdge(v_quori, v_minami);
inheritanceEdge(v_water, v_aegir);
inheritanceEdge(v_water, v_minami, [], true);

inheritanceEdge(v_deepSpeech, v_aegir, [
    [v_deepSpeech.x, v_latin.y - 100, 16],
    [v_aegir.x, v_latin.y - 100, 16],
], true);

inheritanceEdge(v_deepSpeech, v_ursine, [
    [v_deepSpeech.x, v_latin.y - 100, 16],
    [v_ursine.x, v_latin.y - 100, 16],
], true);

inheritanceEdge(v_deepSpeech, v_bavarian, [
    [v_deepSpeech.x, v_latin.y - 100, 16],
    [v_bavarian.x, v_latin.y - 100, 16],
], true);

inheritanceEdge(v_celestial, v_latin, [
    [v_celestial.x, v_celestial.y + 100, 16],
    [v_celestial.x + 100, v_celestial.y + 100, 16],
    [v_celestial.x + 100, v_latin.y - 150, 16],
    [v_latin.x, v_latin.y - 150, 16],
]);
inheritanceEdge(v_celestial, v_sancta, [
    [v_celestial.x, v_celestial.y + 100, 16],
    [v_celestial.x + 100, v_celestial.y + 100, 16],
    [v_celestial.x + 100, v_latin.y - 150, 16],
    [v_sancta.x, v_latin.y - 150, 16],
]);
inheritanceEdge(v_celestial, v_mafioso, [
    [v_celestial.x, v_celestial.y + 100, 16],
    [v_celestial.x + 100, v_celestial.y + 100, 16],
    [v_celestial.x + 100, v_latin.y - 150, 16],
    [v_mafioso.x, v_latin.y - 150, 16],
], true);
inheritanceEdge(v_grey, v_mafioso, [
    [v_grey.x, v_mafioso.y - 100, 16],
    [v_mafioso.x, v_mafioso.y - 100, 16],
]);


inheritanceEdge(v_vampiric, v_latin, [
    [v_vampiric.x, v_fire.y - 25, 8],
    [v_fire.x + 100, v_fire.y - 25, 8],
    [v_fire.x + 100, v_fire.y + 25, 8],
    [v_vampiric.x, v_fire.y + 25, 8],
    [v_vampiric.x, v_latin.y - 150, 8],
    [v_latin.x, v_latin.y - 150, 16],
], true);

inheritanceEdge(v_elven, v_sanskrit);

inheritanceEdge(v_elderBeastial, v_ursine);

inheritanceEdge(v_stellaria, v_grey, [
    [v_stellaria.x, v_stellaria.y + 50, 16],
    [v_stellaria.x + 50, v_stellaria.y + 50, 16],
    [v_stellaria.x + 50, v_sami.y+50, 16],
    [v_grey.x, v_sami.y+50, 16],
]);

inheritanceEdge(v_grey, v_bavarian);
inheritanceEdge(v_draconic, v_longYu, [
    [v_draconic.x, v_latin.y-50, 16],
    [v_longYu.x, v_latin.y-50, 16],
]);

inheritanceEdge(v_earth, v_nordic);
inheritanceEdge(v_latin, v_nordic);
inheritanceEdge(v_latin, v_ursine);
inheritanceEdge(v_latin, v_bavarian);
inheritanceEdge(v_latin, v_minami, [], true);

const commonLine = v_nordic.y + 100;

inheritanceEdge(v_nordic, v_common, [
    [v_nordic.x, commonLine, 16],
    [v_common.x, commonLine, 16],
]);
inheritanceEdge(v_bavarian, v_common, [
    [v_bavarian.x, commonLine, 16],
    [v_common.x, commonLine, 16],
]);
inheritanceEdge(v_latin, v_common, [
    [v_latin.x, commonLine, 16],
    [v_common.x, commonLine, 16],
]);
inheritanceEdge(v_longYu, v_common, [
    [v_longYu.x, commonLine, 16],
    [v_common.x, commonLine, 16],
], true);
inheritanceEdge(v_ursine, v_common, [
    [v_ursine.x, commonLine, 16],
    [v_common.x, commonLine, 16],
], true);
inheritanceEdge(v_sanskrit, v_common, [
    [v_sanskrit.x, commonLine, 16],
    [v_common.x, commonLine, 16],
], true);
inheritanceEdge(v_aegir, v_common, [
    [v_aegir.x, commonLine, 16],
    [v_common.x, commonLine, 16],
], true);
inheritanceEdge(v_minami, v_common, [
    [v_minami.x, commonLine, 16],
    [v_common.x, commonLine, 16],
], true);

inheritanceEdge(v_common, v_undercommon);
inheritanceEdge(v_abyssal, v_undercommon, [
    [v_abyssal.x, v_latin.y - 50, 16],
    [v_undercommon.x, v_latin.y - 50, 16],
], true);

inheritanceEdge(v_mafioso, v_thieves);
inheritanceEdge(v_thieves, v_undercommon, [
    [v_thieves.x, v_undercommon.y-50, 16],
    [v_undercommon.x, v_undercommon.y-50, 16],
], true);

inheritanceEdge(v_primordial, v_mage, [
    [v_primordial.x, v_elemental.y - 100, 16],
    [v_latin.x, v_elemental.y - 100, 16],
    [v_latin.x, v_mage.y, 16],
])


export const languageMap = g;
