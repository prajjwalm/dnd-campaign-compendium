import {Rarity}            from "../../../homebrew/definitions/Rarity";
import {UpgradeEdge}       from "../UpgradeEdge";
import {UpgradeGraph}      from "../UpgradeGraph";
import {UpgradeVertex}     from "../UpgradeVertex";
import {UpgradeVertexType} from "../UpgradeVertexConfig";

const g = new UpgradeGraph("sk");

function vertex(x: number,
                y: number,
                ref: UpgradeVertex,
                radial: boolean,
                display: boolean,
                type: UpgradeVertexType = null,
                rarity: Rarity = null,
                activation: number = 0)
{
    const v = new UpgradeVertex(g, display, type, rarity, activation);
    if (ref == null) {
        if (!radial) {
            v.cartesian = [x, y];
        }
        else {
            v.radial = [x, y];
        }
    }
    else {
        if (!radial) {
            v.setLinearlyWrt(ref, x, y);
        }
        else {
            v.setRadiallyWrt(ref, x, y);
        }
    }

    return v;
}

function edge(v0: UpgradeVertex, v1: UpgradeVertex, vc: UpgradeVertex = null, zIndex: number = 0)
{
    const e = new UpgradeEdge(g, v0, v1, vc);
    e.zIndex = zIndex;
}

const r11: number =  80;
const r12: number = 160;
const r13: number = 250;
const r14: number = 350;
const r15: number = 500;
const r16: number = 720;

const r21: number =  80;
const r22: number = 150;
const r23: number = 240;
const r24: number = 330;
const r25: number = 500;

const r31: number =  80;
const r32: number = 150;
const r33: number = 270;
const r34: number = 400;

const r41: number =  80;
const r42: number = 160;
const r43: number = 320;

const v00 = vertex(  0,      0, null, false, true, UpgradeVertexType.Sync,                 Rarity.Artefact, 1);
const v01 = vertex(r11,    -45,  v00,  true, true, UpgradeVertexType.StatsWis,             Rarity.Common);
const v02 = vertex(r11,    -90,  v00,  true, true, UpgradeVertexType.HP,                   Rarity.Black);
const v03 = vertex(r11,   -135,  v00,  true, true, UpgradeVertexType.StatsInt,             Rarity.Common);
const v04 = vertex(r11,    180,  v00,  true, true, UpgradeVertexType.Damage,               Rarity.Uncommon);
const v05 = vertex(r12,      0,  v00,  true, true, UpgradeVertexType.StatsCon,             Rarity.Common);
const v06 = vertex(r12,    -45,  v00,  true, true, UpgradeVertexType.DeathSaves,           Rarity.Black);
const v07 = vertex(r12,    -90,  v00,  true, true, UpgradeVertexType.HP,                   Rarity.Common);
const v12 = vertex(r12,   -135,  v00,  true, true, UpgradeVertexType.AC,                   Rarity.Uncommon);
const v08 = vertex(r12,   -180,  v00,  true, true, UpgradeVertexType.StatsDex,             Rarity.Common);
const v09 = vertex(r13,  -22.5,  v00,  true, true, UpgradeVertexType.StatsStr,             Rarity.Common);
const v10 = vertex(r13,    -90,  v00,  true, true, UpgradeVertexType.HP,                   Rarity.Uncommon);
const v11 = vertex(r13, -112.5,  v00,  true, true, UpgradeVertexType.StatsCha,             Rarity.Common);
const v13 = vertex(r14,      0,  v00,  true, true, UpgradeVertexType.SavesIntWisCha,       Rarity.Uncommon);
const v14 = vertex(r14,  -22.5,  v00,  true, true, UpgradeVertexType.LandMovement,         Rarity.Common);
const v15 = vertex(r14,    -45,  v00,  true, true, UpgradeVertexType.Accuracy,             Rarity.Rare);
const v16 = vertex(r14,    -90,  v00,  true, true, UpgradeVertexType.HP,                   Rarity.Rare);
const v17 = vertex(r14, -112.5,  v00,  true, true, UpgradeVertexType.LandMovement,         Rarity.Common);
const v18 = vertex(r14,   -135,  v00,  true, true, UpgradeVertexType.DeathSaves,           Rarity.Rare);
const v19 = vertex(r14, -157.5,  v00,  true, true, UpgradeVertexType.SeaMovement,          Rarity.Rare);
const v20 = vertex(r14,   -180,  v00,  true, true, UpgradeVertexType.Initiative,           Rarity.Uncommon);
const v21 = vertex(r15,      0,  v00,  true, true, UpgradeVertexType.SkillsAll,            Rarity.Epic);
const v22 = vertex(r15,  -22.5,  v00,  true, true, UpgradeVertexType.Initiative,           Rarity.Rare);
const v23 = vertex(r15,    -90,  v00,  true, true, UpgradeVertexType.HP,                   Rarity.Epic);
const v24 = vertex(r15, -112.5,  v00,  true, true, UpgradeVertexType.SavesStrDexCon,       Rarity.Uncommon);
const v25 = vertex(r15,   -135,  v00,  true, true, UpgradeVertexType.DeathSaves,           Rarity.Legendary);
const v26 = vertex(r15, -157.5,  v00,  true, true, UpgradeVertexType.Damage,               Rarity.Epic);
const v27 = vertex(r15,   -180,  v00,  true, true, UpgradeVertexType.StepMovement,         Rarity.Epic);
const v28 = vertex(r16,  -22.5,  v00,  true, true, UpgradeVertexType.AC,                   Rarity.Black);
const v29 = vertex(r16, -157.5,  v00,  true, true, UpgradeVertexType.Accuracy,             Rarity.Black);
const v64 = vertex(r16,    -90,  v00,  true, true, UpgradeVertexType.HP,                   Rarity.Legendary);

const v30 = vertex(  0,   -r25,  v28, false, true, UpgradeVertexType.Sync,                 Rarity.Artefact);
const v31 = vertex(r21,     30,  v30,  true, true, UpgradeVertexType.Accuracy,             Rarity.Rare);
const v32 = vertex(r21,    150,  v30,  true, true, UpgradeVertexType.SeaMovement,          Rarity.Rare);
const v33 = vertex(r22,     90,  v30,  true, true, UpgradeVertexType.Damage,               Rarity.Uncommon);
const v34 = vertex(r22,     30,  v30,  true, true, UpgradeVertexType.SkillsBrilliance,     Rarity.Uncommon);
const v35 = vertex(r22,    -30,  v30,  true, true, UpgradeVertexType.AC,                   Rarity.Legendary);
const v36 = vertex(r22,    -90,  v30,  true, true, UpgradeVertexType.LandMovement,         Rarity.Uncommon);
const v37 = vertex(r22,   -150,  v30,  true, true, UpgradeVertexType.ProfBonus,            Rarity.Legendary);
const v38 = vertex(r22,    150,  v30,  true, true, UpgradeVertexType.SkillsNinjutsu,       Rarity.Uncommon);
const v39 = vertex(r23,     90,  v30,  true, true, UpgradeVertexType.LandMovement,         Rarity.Common);
const v40 = vertex(r23,     60,  v30,  true, true, UpgradeVertexType.Damage,               Rarity.Epic);
const v41 = vertex(r23,    -30,  v30,  true, true, UpgradeVertexType.Accuracy,             Rarity.Uncommon);
const v42 = vertex(r24,      0,  v30,  true, true, UpgradeVertexType.StatsChaStr,          Rarity.Epic);
const v43 = vertex(r24,    120,  v30,  true, true, UpgradeVertexType.Accuracy,             Rarity.Uncommon);
const v44 = vertex(r24,    150,  v30,  true, true, UpgradeVertexType.Damage,               Rarity.Uncommon);

const v45 = vertex(  0,   -r34,  v29, false, true, UpgradeVertexType.Sync,                 Rarity.Artefact);
const v46 = vertex(r31,     90,  v45,  true, false);
const v47 = vertex(r31,      0,  v45,  true, true, UpgradeVertexType.Damage,               Rarity.Rare);
const v48 = vertex(r31,   -135,  v45,  true, true, UpgradeVertexType.AC,                   Rarity.Rare);
const v49 = vertex(r32,    180,  v45,  true, true, UpgradeVertexType.SkillsWildHeart,      Rarity.Uncommon);
const v50 = vertex(r32,     90,  v45,  true, true, UpgradeVertexType.AC,                   Rarity.Uncommon);
const v51 = vertex(r32,      0,  v45,  true, true, UpgradeVertexType.SkillsIndoctrination, Rarity.Uncommon);
const v52 = vertex(r32,    -90,  v45,  true, true, UpgradeVertexType.ProfBonus,            Rarity.Legendary);
const v53 = vertex(r33,    180,  v45,  true, true, UpgradeVertexType.StatsWisCon,          Rarity.Epic);
const v54 = vertex(r33,    -30,  v45,  true, true, UpgradeVertexType.LandMovement,         Rarity.Black);

const v55 = vertex(r43,    -30,  v54,  true, true, UpgradeVertexType.Sync,                 Rarity.Artefact);
const v56 = vertex(r41,   -150,  v55,  true, true, UpgradeVertexType.StatsStrDexCon,       Rarity.Legendary);
const v57 = vertex(r41,     30,  v55,  true, true, UpgradeVertexType.StatsIntWisCha,       Rarity.Legendary);
const v58 = vertex(r42,    -30,  v55,  true, true, UpgradeVertexType.Accuracy,             Rarity.Epic);
const v59 = vertex(r42,    -90,  v55,  true, true, UpgradeVertexType.SavesAll,             Rarity.Rare);
const v60 = vertex(r42,   -150,  v55,  true, true, UpgradeVertexType.Initiative,           Rarity.Epic);
const v61 = vertex(r42,    150,  v55,  true, true, UpgradeVertexType.SeaMovement,          Rarity.Rare);
const v62 = vertex(r42,     90,  v55,  true, true, UpgradeVertexType.StatsIntDex,          Rarity.Epic);
const v63 = vertex(r42,     30,  v55,  true, true, UpgradeVertexType.SkillsProdigy,        Rarity.Rare);

const v65 = vertex( r11,      0,  v00, true,  false);
const v66 = vertex( r13,    -45,  v00, true,  false);
const v67 = vertex( r13,   -135,  v00, true,  false);
const v68 = vertex( r21,    -90,  v30, true,  false);
const v69 = vertex( r23,    120,  v30, true,  false);
const v70 = vertex( r23,      0,  v30, true,  false);
const v71 = vertex( r32,    -30,  v45, true,  false);


edge(v00, v02);
edge(v65, v05);
edge(v65, v01, v00,  -1);
edge(v01, v02, v00,  -1);
edge(v02, v03, v00,  -1);
edge(v03, v04, v00,  -1);
edge(v06, v07, v00,  -2);
edge(v07, v12, v00,  -2);
edge(v02, v07);
edge(v04, v08);
edge(v06, v66);
edge(v09, v66,  v00, -3);
edge(v07, v10);
edge(v11, v67,  v00, -3);
edge(v66, v15);
edge(v67, v12);
edge(v13, v14,  v00, -4);
edge(v14, v15,  v00, -4);
edge(v10, v16);
edge(v11, v17);
edge(v67, v18);
edge(v16, v17,  v00, -5);
edge(v18, v19,  v00, -5);
edge(v19, v20,  v00, -5);
edge(v08, v20);
edge(v13, v21);
edge(v14, v22);
edge(v16, v23);
edge(v17, v24);
edge(v24, v25,  v00, -6);
edge(v19, v26);
edge(v26, v27,  v00, -6);
edge(v22, v28);
edge(v26, v29);
edge(v23, v64);

edge(v28, v39);

edge(v30, v31);
edge(v30, v32);
edge(v32, v31,  v30, -1);
edge(v68, v32,  v30, -1);
edge(v31, v34);
edge(v68, v36);
edge(v32, v38);
edge(v33, v39);
edge(v33, v34,  v30, -2);
edge(v35, v36,  v30, -2);
edge(v37, v38,  v30, -2);
edge(v69, v39,  v30, -3);
edge(v39, v40,  v30, -3);
edge(v40, v41,  v30, -3);
edge(v70, v42);
edge(v69, v43);
edge(v35, v41);
edge(v42, v44,  v30, -4);
edge(v44, v43,  v30, -4);
edge(v38, v44);

edge(v29, v50);

edge(v45, v46);
edge(v45, v47);
edge(v45, v48);
edge(v47, v48, v45, -1);
edge(v48, v46, v45, -1);
edge(v49, v50, v45, -2);
edge(v50, v51, v45, -2);
edge(v50, v71, v45, -2);
edge(v71, v52, v45, -2);
edge(v46, v50);
edge(v49, v53);
edge(v71, v54);
edge(v54, v53, v45, -3);

edge(v54, v61);

edge(v55, v56);
edge(v55, v57);
edge(v57, v56, v55, -1);
edge(v58, v59, v55, -2);
edge(v59, v60, v55, -2);
edge(v60, v61, v55, -2);
edge(v61, v62, v55, -2);
edge(v62, v63, v55, -2);
edge(v56, v60);
edge(v57, v63);

export const skillMap = g;