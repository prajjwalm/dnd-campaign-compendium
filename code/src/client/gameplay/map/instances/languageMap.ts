import {L}              from "../../languages/instances/instances";
import {Language}       from "../../languages/Language";
import {LanguageEdge}   from "../LanguageEdge";
import {LanguageGraph}  from "../LanguageGraph";
import {LanguageVertex} from "../LanguageVertex";

const g = new LanguageGraph("Lng");

function vertex(x: number,
                y: number,
                l: Language | null = null)
{
    let v = new LanguageVertex(g, l);

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

function inheritanceEdge(v1: LanguageVertex,
                         v2: LanguageVertex,
                         cutAfter: number = 100,
                         cutSize: number = 20)
{
    if (v1.x == v2.x) {
        edge(v1, v2);
        return;
    }

    const y2 = -v1.y + cutAfter;
    const y1 = y2 - cutSize;
    const y3 = y2;
    const y4 = y2 + cutSize;

    const sgn = v2.x > v1.x ? 1 : -1;

    const x1 = v1.x;
    const x2 = x1 + sgn * cutSize;
    const x4 = v2.x;
    const x3 = x4 - sgn * cutSize;

    if (y2 > -v2.y) {
        throw new Error();
    }
    else if (y2 == -v2.y) {
        const vTemp1 = computeIfAbsent(x1, y1);
        const vTemp2 = computeIfAbsent(x2, y2);

        edge(v1, vTemp1);
        edge(vTemp1, vTemp2);
        edge(vTemp2, v2);
    }
    else {
        const vTemp1 = computeIfAbsent(x1, y1);
        const vTemp2 = computeIfAbsent(x2, y2);
        const vTemp3 = computeIfAbsent(x3, y3);
        const vTemp4 = computeIfAbsent(x4, y4);

        edge(v1, vTemp1);
        edge(vTemp1, vTemp2);
        edge(vTemp2, vTemp3);
        edge(vTemp3, vTemp4);
        edge(vTemp4, v2);
    }
}

const zone1 = 0;
const zone2 = 200;
const zone3 = 1200;

const v_unspoken         = vertex(    0, zone1 +   0, L.unspoken);
const v_oldPrimordial    = vertex(    0, zone1 + 100, L.oldPrimordial);

const v_mythic           = vertex( -800, zone2 + 100, L.mythic);
const v_dawnchant        = vertex( -500, zone2 + 100, L.dawnchant);
const v_oldInfernal      = vertex(  500, zone2 + 100, L.oldInfernal);
const v_dreamSpeak       = vertex(  800, zone2 + 100, L.dreamSpeak);
const v_primordial       = vertex(  100, zone2 + 300, L.primordial);
const v_oldAbyssal       = vertex(  350, zone2 + 200, L.oldAbyssal);
const v_wildHunt         = vertex( -700, zone2 + 400, L.wildHunt);
const v_celestial        = vertex( -400, zone2 + 500, L.celestial);
const v_abyssal          = vertex(  350, zone2 + 800, L.abyssal);
const v_infernal         = vertex(  500, zone2 + 800, L.infernal);
const v_myogi            = vertex(  900, zone2 + 600, L.myogi);
const v_olympian         = vertex(  700, zone2 + 800, L.olympian);

const v_draconic         = vertex( -700, zone3 + 100, L.draconic);
const v_vampiric         = vertex(  200, zone3 + 100, L.vampiric);
// const v_elderCommon      = vertex(    0, zone3 + 300, L.vampiric);

inheritanceEdge(v_unspoken,             v_oldPrimordial);
inheritanceEdge(v_oldPrimordial,        v_mythic);
inheritanceEdge(v_oldPrimordial,        v_dawnchant);
inheritanceEdge(v_oldPrimordial,        v_oldInfernal);
inheritanceEdge(v_oldPrimordial,        v_dreamSpeak);
inheritanceEdge(v_oldPrimordial,        v_primordial);
inheritanceEdge(v_oldPrimordial,        v_oldAbyssal);
inheritanceEdge(v_mythic,               v_wildHunt);
inheritanceEdge(v_dawnchant,            v_wildHunt);
inheritanceEdge(v_dawnchant,            v_celestial);
inheritanceEdge(v_oldPrimordial,        v_celestial,            400);
inheritanceEdge(v_oldAbyssal,           v_abyssal);
inheritanceEdge(v_wildHunt,             v_abyssal,              300);
inheritanceEdge(v_primordial,           v_abyssal,              400);
inheritanceEdge(v_oldInfernal,          v_infernal);
inheritanceEdge(v_dreamSpeak,           v_myogi);
inheritanceEdge(v_dreamSpeak,           v_olympian);
inheritanceEdge(v_celestial,            v_olympian);
inheritanceEdge(v_wildHunt,             v_draconic);
inheritanceEdge(v_oldPrimordial,        v_draconic,             1000);
inheritanceEdge(v_oldPrimordial,        v_vampiric,             1000);
inheritanceEdge(v_abyssal,              v_vampiric);


export const languageMap = g;
