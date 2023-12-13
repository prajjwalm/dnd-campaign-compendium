// noinspection PointlessArithmeticExpressionJS

import {L}              from "../../languages/instances/instances";
import {Language}       from "../../languages/Language";
import {LanguageEdge}   from "../LanguageEdge";
import {LanguageGraph}  from "../LanguageGraph";
import {LanguageVertex} from "../LanguageVertex";

const g = new LanguageGraph("Lng");

function vertex(x: number,
                y: number,
                l: Language | null = null,
                v_ref: LanguageVertex | null = null)
{
    let v = new LanguageVertex(g, l);

    if (v_ref != null) {
        x +=   v_ref.x;
        y += (-v_ref.y);
    }

    v.cartesian = [x, -y];

    return v;
}

const edgesPlaced: Map<LanguageVertex, Set<LanguageVertex>> = new Map();

function edge(v1: LanguageVertex, v2: LanguageVertex): LanguageEdge
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

    return new LanguageEdge(g, v1, v2);
}


const tempVertices: Map<number, Map<number, LanguageVertex>> = new Map();

function computeIfAbsent(x: number,
                         y: number,
                         gen: (x: number, y: number) => LanguageVertex = (x, y) => vertex(x, y))
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
                         cutSize: number = 16,
                         stops: LanguageVertex[] = [])
{
    if (v1.x == v2.x && v1.y == v2.y) {
        return;
    }

    const x1 =  v1.x;
    const x2 =  v2.x;
    const y1 = -v1.y;
    const y2 = -v2.y;

    const stopIdxs: [number, number][] = [];
    if (stops.length == 0) {
        if (x1 == x2 || y1 == y2) {
            stopIdxs.push([x1, y1]);
            stopIdxs.push([x2, y2]);
        }
        else {
            stopIdxs.push([x1, y1]);
            stopIdxs.push([x1, y1+50]);
            stopIdxs.push([x2, y1+50]);
            stopIdxs.push([x2, y2]);
        }
    }
    else {
        stopIdxs.push([x1, y1]);
        for (const stop of stops) {
            stopIdxs.push([stop.x, -stop.y]);
        }
        stopIdxs.push([x2, y2]);
    }

    const trueStops = [v1];
    for (let i = 1; i < stopIdxs.length - 1; i++) {
        const [x1, y1] = stopIdxs[i-1];
        const [x2, y2] = stopIdxs[i];
        const [x3, y3] = stopIdxs[i+1];

        if (x1 == x2) {
            trueStops.push(v(x1, y2 - cutSize * Math.sign(y2 - y1)));
        }
        else if (y1 == y2) {
            trueStops.push(v(x2 - cutSize * Math.sign(x2 - x1), y1));
        }
        else {
            throw new Error();
        }

        if (x2 == x3) {
            trueStops.push(v(x2, y2 + cutSize * Math.sign(y3 - y2)));
        }
        else if (y3 == y2) {
            trueStops.push(v(x2 + cutSize * Math.sign(x3 - x2), y2));
        }
        else {
            throw new Error();
        }
    }
    trueStops.push(v2);

    for (let i = 0; i < trueStops.length - 1; i++) {
        edge(trueStops[i], trueStops[i+1]);
    }
}

const zone1 = 0;
const zone2 = 200;
const zone3 = 350;
const zone4 = 700;
const zone5 = 3000;

const v_unspoken         = vertex(0, 0, L.unspoken);
const v_oldPrimordial    = vertex(-400, 100, L.oldPrimordial,   v_unspoken);
const v_nocturnal        = vertex(-800, 200, L.nocturnal,       v_unspoken);
const v_stellaria        = vertex( 400, 200, L.stellaria,       v_unspoken);
const v_dawnchant        = vertex( 800, 200, L.dawnchant,       v_unspoken);

const v_primordial       = vertex(  50, 100, L.primordial,      v_oldPrimordial);
const v_wildHunt         = vertex( 200, 200, L.wildHunt,        v_oldPrimordial);

const v_celestial        = vertex( 100, 200, L.celestial,       v_stellaria);

const v_olympian         = vertex(-100, 200, L.olympian,        v_dawnchant);

const v_dreamSpeak       = vertex(   0, 100, L.dreamSpeak,      v_nocturnal);
const v_abyssal          = vertex( 300, 100, L.abyssal,         v_nocturnal);
const v_infernal         = vertex( 150, 200, L.infernal,        v_nocturnal);
const v_vampiric         = vertex( 200, 500, L.vampiric,        v_nocturnal);

// const v_myogi            = vertex(150,200, L.myogi, v_dreamSpeak);

// const v_sami             = vertex( -700, zone4 + 300, L.sami);
// const v_druidic          = vertex( -800, zone4 + 800, L.druidic);
// const v_sylvan           = vertex( -600, zone4 + 400, L.sylvan);
//
// const v_quori            = vertex( 250, 1000, L.quori, v_myogi);
// const v_draconic         = vertex( 700, zone4 + 100, L.draconic);
// const v_elderCommon      = vertex( 400, zone4 + 200, L.elderCommon);
// const v_deepSpeech       = vertex(   0, zone4 + 250, L.deepSpeech);

inheritanceEdge(v_unspoken,             v_oldPrimordial);
inheritanceEdge(v_oldPrimordial,        v_dawnchant);
inheritanceEdge(v_oldPrimordial,        v_nocturnal);
inheritanceEdge(v_oldPrimordial,        v_stellaria);

inheritanceEdge(v_oldPrimordial,        v_primordial);
inheritanceEdge(v_oldPrimordial,        v_wildHunt);

inheritanceEdge(v_dawnchant,            v_celestial);
inheritanceEdge(v_stellaria,            v_celestial);
inheritanceEdge(v_primordial,           v_abyssal);
inheritanceEdge(v_nocturnal,            v_abyssal);
inheritanceEdge(v_nocturnal,            v_infernal);
inheritanceEdge(v_nocturnal,            v_vampiric);
inheritanceEdge(v_nocturnal,            v_dreamSpeak);
// inheritanceEdge(v_dreamSpeak,           v_myogi);
// inheritanceEdge(v_myogi,                v_quori, );
inheritanceEdge(v_dawnchant,            v_olympian);
inheritanceEdge(v_wildHunt,             v_abyssal);
// inheritanceEdge(v_celestial,            v_elderCommon);
// inheritanceEdge(v_primordial,           v_elderCommon,      450);
// inheritanceEdge(v_olympian,             v_elderCommon);
// inheritanceEdge(v_unspoken,             v_deepSpeech);
// inheritanceEdge(v_elderCommon,          v_deepSpeech);
// inheritanceEdge(v_nocturnal,            v_deepSpeech,       125);
//
// inheritanceEdge(v_wildHunt,             v_sami,             300);
// inheritanceEdge(v_wildHunt,             v_sylvan,           300);
// inheritanceEdge(v_wildHunt,             v_draconic,         300);
// inheritanceEdge(v_stellaria,            v_draconic);
// inheritanceEdge(v_draconic,             v_elderCommon);
// inheritanceEdge(v_vampiric,             v_elderCommon);
// inheritanceEdge(v_sami,                 v_druidic);











// inheritanceEdge(v_dawnchant,            v_wildHunt);
// inheritanceEdge(v_wildHunt,             v_abyssal,              300);
// inheritanceEdge(v_celestial,            v_olympian);
// inheritanceEdge(v_oldPrimordial,        v_draconic,             1000);
// inheritanceEdge(v_oldPrimordial,        v_vampiric,             1000);
// inheritanceEdge(v_abyssal,              v_vampiric);


export const languageMap = g;
