import {NpcID}             from "../../data/npcIndex";
import {MapEdge}           from "../MapEdge";
import {MapGraph}          from "../MapGraph";
import {MapTransportation} from "../MapTransportation";
import {MapVertex}         from "../MapVertex";
import {MapVertexStatus}   from "../MapVertexStatus";

const g = new MapGraph("Dvo");

g.worldDistancePerPixel = 1000;

function vertex(x: number,
                y: number,
                ref: MapVertex,
                radial: boolean,
                status: MapVertexStatus = null,
                interest: string = null,
                text: string = null)
{
    if (status == null) {
        status = MapVertexStatus.Unknown;
    }
    if (interest == null) {
        interest = "???";
    }

    let vertex: MapVertex = new MapVertex(status, interest, g);

    if (ref == null) {
        if (!radial) {
            vertex.cartesian = [x, y];
        }
        else {
            vertex.radial = [x, y];
        }
    }
    else {
        if (!radial) {
            vertex.setLinearlyWrt(ref, x, y);
        }
        else {
            vertex.setRadiallyWrt(ref, x, y);
        }
    }

    if (text != null) {
        vertex.name = text;
    }

    return vertex;
}

const v00 = vertex(    0,   0,  null, false, MapVertexStatus.Safe,      "Base",                         "The village of Po'Shan");
const v01 = vertex(  -40,  -15,  v00, false, null,                      null,                           null);
const v02 = vertex(  -50,  -60,  v01, false, MapVertexStatus.Deadly,    "Stronghold",                   null);
const v03 = vertex(   40,   40,  v00, false, null,                      null,                           null);
const v04 = vertex(   60,  -45,  v00, false, null,                      null,                           null);
const v05 = vertex(  500,    0,  v00, false, MapVertexStatus.Safe,      "Perpendicularity",             "<span>Devotion's Perpendicularity</span>");
const v06 = vertex(   80,   25,  v03, false, null,                      null,                           null);
const v07 = vertex(  -15,  100,  v00, false, null,                      null,                           null);
const v08 = vertex(  -50, -135,  v00, false, null,                      null,                           null);
const v09 = vertex(  -60,  130,  v07, false, null,                      null,                           null);
const v10 = vertex(  130,   40,  v09, false, null,                      null,                           null);
const v11 = vertex(  170,  -50,  v10, false, null,                      null,                           null);
const v12 = vertex(   25,  -90,  v05, false, MapVertexStatus.Friendly,  "Deity's Abode",                "Mount Hui-ch'i");
const v13 = vertex(  140,   10,  v08, false, null,                      null,                           null);
const v14 = vertex(   40,   45,  v13, false, null,                      null,                           null);
const v15 = vertex(  150,  -95,  v08,  true, MapVertexStatus.Friendly,  "Town",                         "Alvarium");
const v16 = vertex(  140, -140,  v15,  true, null,                      null,                           null);
const v17 = vertex(   50,  -15,  v15,  true, null,                      null,                           null);
const v18 = vertex(   70, -120,  v13, false, null,                      null,                           null);
const v19 = vertex(  150,  -45,  v18,  true, null,                      null,                           null);
const v20 = vertex(  200,   60,  v11,  true, null,                      null,                           null);
const v21 = vertex(  160,  115,  v11,  true, null,                      null,                           null);
const v22 = vertex(  240,  105,  v10,  true, null,                      null,                           null);
const v23 = vertex(  140,  100,  v22,  true, null,                      null,                           null);
const v24 = vertex(  128,   65,  v22,  true, MapVertexStatus.Neutral,   "State Capital",                "Sarausa");
const v25 = vertex(  216,   30,  v22,  true, null,                      null,                           null);
const v26 = vertex(  150,   30,  v21,  true, null,                      null,                           null);
const v27 = vertex(  120,   75,  v26,  true, MapVertexStatus.Friendly,  "City",                         "Aetna");
const v28 = vertex(   60,   30,  v27,  true, null,                      null,                           null);
const v29 = vertex(  120,  -25,  v17,  true, null,                      null,                           null);
const v30 = vertex(  100, -110,  v17,  true, null,                      null,                           null);
const v31 = vertex(  150, -150,  v30,  true, MapVertexStatus.Combat,    "Target",                       "Nix");
const v32 = vertex(  150, -130,  v31,  true, null,                      null,                           null);
const v33 = vertex(  180,  -75,  v31,  true, null,                      null,                           null);
const v34 = vertex(  250,  -75,  v30,  true, null,                      null,                           null);
const v35 = vertex(   40,   55,  v34,  true, null,                      null,                           null);
const v36 = vertex(   40,  -15,  v34,  true, null,                      null,                           null);
const v37 = vertex(   40,  -15,  v35,  true, null,                      null,                           null);
const v38 = vertex(  120,  -30,  v30,  true, MapVertexStatus.Friendly,  "State Capital",                "Sanctabella");
const v39 = vertex(  100,  -15,  v38,  true, null,                      null,                           null);
const v40 = vertex(  140,   30,  v24,  true, null,                      null,                           null);
const v41 = vertex(  140,   85,  v24,  true, null,                      null,                           null);
const v42 = vertex(  140, -155,  v23,  true, null,                      null,                           null);
const v43 = vertex(  250,  115,  v42,  true, null,                      null,                           null);
const v44 = vertex(  150,   95,  v41,  true, null,                      null,                           null);
const v45 = vertex(  150,   85,  v40,  true, null,                      null,                           null);
const v46 = vertex(   70,   60,  v45,  true, null,                      null,                           null);
const v47 = vertex(  135,  130,  v44,  true, MapVertexStatus.Black,     "Death",                        "The 2nd Nightmare");
const v48 = vertex(  150,  115,  v28,  true, null,                      null,                           null);
const v49 = vertex(  100,  120,  v01,  true, null,                      null,                           null);
const v50 = vertex(  140,  135,  v28,  true, null,                      null,                           null);
const v51 = vertex(  130,  105,  v24,  true, null,                      null,                           null);
const v52 = vertex(   55, -160,  v49,  true, null,                      null,                           null);
const v53 = vertex(   75,  -40,  v08,  true, null,                      null,                           null);
const v54 = vertex(  125,  -80,  v39,  true, null,                      null,                           null);
const v55 = vertex(   80, -100,  v54,  true, null,                      null,                           null);
const v56 = vertex(  120,  140,  v15,  true, null,                      null,                           null);
const v57 = vertex(   60,   90,  v48,  true, null,                      null,                           null);
const v58 = vertex(   70,  120,  v21,  true, MapVertexStatus.Emergency, "Civilian Crisis",              "RyneTech Labs Outpost");
const v59 = vertex(  240,  -40,  v33,  true, null,                      null,                           null);
const v60 = vertex(   80,  -60,  v33,  true, null,                      null,                           null);
const v61 = vertex(  180,   85,  v43,  true, null,                      null,                           null);
const v62 = vertex(  125, -120,  v32,  true, null,                      null,                           null);
const v63 = vertex(   50,  -90,  v36,  true, null,                      null,                           null);

v61.z = Math.sqrt(360000 - v61.x * v61.x);
v43.z = Math.sqrt(360000 - v43.x * v43.x);
v42.z = Math.sqrt(360000 - v42.x * v42.x);
v05.z = Math.sqrt(360000 - v05.x * v05.x);
v12.z = Math.sqrt(360000 - v12.x * v12.x);
v19.z = Math.sqrt(360000 - v19.x * v19.x);
v32.z = Math.sqrt(360000 - v32.x * v32.x);
v62.z = Math.sqrt(360000 - v62.x * v62.x);

v00.markAsBase();

v00.intel = `<p>An apology, by an eldritch monstrosity on behalf of a mankind who 
             had failed, terribly, one of their own. One who, while she walked 
             Terra, only got to see the worst that life had to offer.</p>
             <p>On her deathbed, she finally broke. As her Goddess looked down 
             upon her, she wished, choked by wrath and tears. She wished that 
             she could spend just one more day in her childhood village, amidst
             warm company with whom she belonged, in a time and place that just 
             felt <em>right</em>.</p>
             <p>And the Goddess, a Fragment that Should Not Be, listened. And so
             She took her home. And then She painted. Fueled by ferventness and 
             disdain, She painted. And painted. Thus creating a work of art that
             would never be rivaled, bringing to life not just the long-lost 
             village of Po'Shan, but also a myriad breathtaking visions, of 
             alpine meadows and deep ravines, of snow clad hills and warm beaches, in what was 
             before naught but barren rock...</p>
             <p>Over time this painted realm became home to quite a varied 
             assortment of people. Lost and abandoned elsewhere, they found this
             village in the middle of nowhere a welcoming and warm reprieve.</p> 
             <p>A wish fulfilled.</p>
             <p>At least, while it lasted. For the She-Dragon was not human, nor
              mortal. And She did not see Herself as one. Until recently, the 
              village was both a boon and a curse, paradise and damnation.</p>
             <p>But now freed, it forms the key to your survival. With its fate 
             intricately tangled with your own, the path you tread remains to be 
             seen...</p>`

v02.addSiteOfInterest("Utopia of the Faithful",
                      "Sacrosanct Cave",
                      `While the Sea Terrors prey upon humans on land, some humans worship
                and protect them in the ocean's depths. It certainly reflects one 
                aspect of the human race – whether you call it diversity 
                or inferiority is up to you`,
                      [
                      ],
                      0,
                      new Map())

v31.intel = `<p>The territory of Nix (named after the only known 'civilized' 
            town in that area) covers a <em>huge</em> expanse of frigid tundra /
            vast barren glacier-fields, with only coastal areas (barely) 
            suitable for sustaining life. The rest of it is populated by various primitive, 
            loosely-bound chiefdoms having only a handful of families. These still 
            retain their ancient ways of life, isolationism and shamanic cultures while the 
            rest of this universe continues to modernize. Each of these tribes 
            is lead by revered 'SnowPriests' leading to their renowned (yet 
            elusive) culture of mystic animism.</p>
            <p>A land that time forgot. A land that is still deeply invested and
            filled with mysteries and ancient primordials, this infinite 
            icefield has always inspired mixed feelings of fear and reverence,
            and occasionally mockery. Yet of late, a new feeling has begun to 
            surface... A feeling of pure horror. An infection that few know, 
            and fewer yet understand, has begun to creep upon this land - and 
            the wholesale slaughter of the town of Nix doesn't help with its reputation...</p>`

v31.addSiteOfInterest("The town of Nix",
                      "Coastal Town",
                      "The little town of Nix. 'Twas almost yesterday that this " +
                      "was a humble and friendly refuge for many a traveller, and crafts " +
                      "from here adorn many a place in Devotion and even beyond. Unfortunately, " +
                      "the recent bloodbath has gripped this place in a heavy mood of despair " +
                      "and paranoia, and <em>fear</em>.",
                      [
                          ["Leader",     "Sir Gnosis Edelweiss"],
                          ["Population", "~1.3K"],
                          ["Geography",  "Cliff-side"],
                          ["Economy",    "Shambles"],
                      ],
                      2288,
                      new Map([
                          [MapTransportation.Foot,       "~57 days"],
                          [MapTransportation.Horse,      "~22 days"],
                          [MapTransportation.Automobile, "~2  days"],
                          [MapTransportation.Jet,        "~1  hour"],
                      ]))

v31.addCharacterToken(NpcID.Gnosis);

v58.intel = `Outpost #4d37335c of RyneTech Labs, Devotion Sector. Responsible 
             for low latency front line research concerning phenomenon observed in this
             sector of Devotion. Like most 
             other outposts outside the plane of innovation, this area only 
             maintains comms with the 'fringes' of Innovation, and its 
             existence is classified to most inhabitants of the plane it swears 
             allegiance to.<br/>
             Several campuses have popped up here after the executives of the 
             Labs decided to choose this region to spearhead their research. Other
             than the central campus, The Kernel, where sensitive and military 
             research occurs, security is fairly lax. But then, the suburbs 
             built on reinforced steel, aluminium and polymers are confident 
             that they needn't fear obsolete arms, magic, siege weapons or 
             even myths and deities.<br/>
             Most civilians here, while not so 
             oblivious to the multiverse as those within the inner reaches of 
             Innovation are, have never seen an invested being or application of
             magic in their lives. That's in part due to the extensive 
             surveillance of this area. Scores of satellites patrolling the 
             skies detect signs of life anywhere in this region - and intruders,
             particularly invested intruders are quarantined or eliminated with 
             extreme professionalism.
             <div class="map_vertex_details__subheader theme_subheader">
                 Crisis Details
             </div>
             ???
             `

v58.addSiteOfInterest("The Kernel",
                      "Military Research Hub",
                      `The central research center of the Outpost. All studies 
                       performed here are classified to the most severe degree. 
                       Highest grade security and fusion-powered defenses
                       plus a framework made almost entirely upon Aluminium 
                       means this has been impenetrable by man or God, or 
                       anything in between, so far at least.`,
                      [
                          ["Manager", "Yasin Natael"],
                          ["Population", "~1.0K"],
                          ["Geography", "High Altitude Plains"],
                          ["Defenses", "SS Grade"],
                          ["Research Focus", "???"],
                      ],
                      25600,
                      new Map([
                          [MapTransportation.Automobile, "~9   days"],
                          [MapTransportation.Jet,        "~5   hours"],
                          [MapTransportation.Space,      "75   minutes"],
                      ]));

v58.addSiteOfInterest("Park District",
                      "Neighbourhood",
                      `The civilian research area of the Outpost. 4 hours rail 
                      from the Kernel. Most of the civilization needed to support 
                      The Kernel resides here. Also notably, a high population 
                      of Graduate students engage in non-military studies, 
                      enjoying a relaxed sub-urb life subsidised by the labs.`,
                      [
                          ["Population", "~12K"],
                          ["Geography", "Fertile Plains"],
                          ["Defenses", "None"],
                      ],
                      22400,
                      new Map([
                          [MapTransportation.Horse,      "~96  days"],
                          [MapTransportation.Automobile, "~8   days"],
                          [MapTransportation.Jet,        "~4.5 hours"],
                          [MapTransportation.Space,      "70   minutes"],
                      ]));

v58.addSiteOfInterest("Sand Ridge",
                      "Badlands Camp",
                      `Home to a corporate funded task force and local militia.
                       Mainly self-sufficient and independent, the growth of 
                       this 'Camp' has been encouraged by the authorities in 
                       Innovation so that they could provide (at a price) goods
                       and services, and protection, needed by the research areas
                       in case of emergencies....`,
                      [
                          ["Manager", "Saito San"],
                          ["Population", "~4.2K"],
                          ["Geography", "Semi-barren Plateaus"],
                          ["Defenses", "B Grade"],
                      ],
                      18400,
                      new Map([
                          [MapTransportation.Horse,      "~72 days"],
                          [MapTransportation.Automobile, "~7   days"],
                          [MapTransportation.Jet,        "~4   hours"],
                      ]));


function edge(v00: MapVertex, v01: MapVertex, distMul: number = 1.0): void
{
    const e = new MapEdge(g, v00, v01);
    e.worldLengthMultiplier = distMul;
}

edge(v00, v01, 0.8);
edge(v00, v07, 0.9);
edge(v00, v03);
edge(v00, v04, 0.6);
edge(v00, v05, 0.01);
edge(v00, v08);
edge(v00, v13, 1.2);
edge(v01, v02, 0.4);
edge(v01, v07);
edge(v01, v49);
edge(v02, v56, 0.3);
edge(v03, v06);
edge(v04, v06);
edge(v04, v13);
edge(v05, v11, 0.1);
edge(v05, v12, 0.1);
edge(v06, v11);
edge(v07, v11);
edge(v08, v15);
edge(v08, v13);
edge(v08, v53);
edge(v09, v10);
edge(v09, v49);
edge(v09, v52);
edge(v10, v11, 0.1);
edge(v10, v22);
edge(v10, v21);
edge(v10, v42, 0.1);
edge(v11, v20);
edge(v11, v21);
edge(v12, v19, 0.1);
edge(v13, v14);
edge(v13, v17);
edge(v13, v18);
edge(v15, v16);
edge(v15, v56);
edge(v16, v31);
edge(v17, v29);
edge(v17, v30);
edge(v19, v38, 0.1);
edge(v20, v28);
edge(v21, v26);
edge(v21, v25);
edge(v21, v58);
edge(v22, v23);
edge(v22, v24);
edge(v22, v25);
edge(v23, v41);
edge(v23, v51);
edge(v24, v40);
edge(v24, v41);
edge(v25, v26);
edge(v26, v27);
edge(v26, v50);
edge(v27, v28);
edge(v28, v48);
edge(v29, v38);
edge(v29, v39);
edge(v30, v31);
edge(v30, v34);
edge(v30, v38);
edge(v31, v33);
edge(v31, v34);
edge(v32, v38, 0.1);
edge(v32, v62, 0.1);
edge(v33, v59);
edge(v33, v60);
edge(v34, v35);
edge(v34, v36);
edge(v35, v37);
edge(v35, v38);
edge(v36, v37);
edge(v36, v63);
edge(v37, v39);
edge(v38, v39);
edge(v39, v54);
edge(v40, v44);
edge(v40, v45);
edge(v41, v44);
edge(v41, v51);
edge(v42, v43, 0.1);
edge(v43, v61, 0.1);
edge(v44, v51);
edge(v45, v46);
edge(v45, v47);
edge(v45, v48);
edge(v45, v50);
edge(v44, v47);
edge(v46, v47);
edge(v46, v57);
edge(v54, v55);

export const devotionMap = g;