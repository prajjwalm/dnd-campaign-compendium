type eraNames = "Shardic" |
                "Divergence" |
                "Primordial" |
                "Inflationary" |
                "Archean" |
                "Mythic" |
                "Heroic" |
                "Silent" |
                "Archaic" |
                "Classical" |
                "Medieval" |
                "Renaissance";


interface EraArgs {
    start: string;
    epoch: string;
    height: number;     // px.
}


interface EventArgs {
    text: string;
    era: eraNames;
    rel_t: number;
    lane: 1 | 0;
}

const eras: Map<eraNames, EraArgs> = new Map([
    ["Shardic", {
        "start" : `~10<sup>9</sup> BR (T=0)`,
        "epoch" : `Genesis`,
        "height": 42,
    }],
    ["Divergence", {
        "start" : `~10<sup>9</sup> BR (T=10<sup>-16</sup>s)`,
        "epoch" : `Genesis`,
        "height": 40,
    }],
    ["Primordial", {
        "start" : `~10<sup>9</sup> BR (T=0.1s)`,
        "epoch" : `Genesis`,
        "height": 64,
    }],
    ["Inflationary", {
        "start" : `~10<sup>9</sup> BR (T=1s)`,
        "epoch" : `Genesis`,
        "height": 40,
    }],
    ["Archean", {
        "start" : `~4.1 &times; 10<sup>8</sup> BR`,
        "epoch" : `Genesis`,
        "height": 40,
    }],
    ["Mythic", {
        "start" : `~2.8 &times; 10<sup>7</sup> BR`,
        "epoch" : `Legendary`,
        "height": 144,
    }],
    ["Heroic", {
        "start" : `~1.6 &times; 10<sup>5</sup> BR`,
        "epoch" : `Legendary`,
        "height": 120,
    }],
    ["Silent", {
        "start" : `~20,000 BR`,
        "epoch" : `Darkness`,
        "height": 72,
    }],
    ["Archaic", {
        "start" : `~1,800 BR`,
        "epoch" : `Darkness`,
        "height": 64,
    }],
    ["Classical", {
        "start" : `0 AR`,
        "epoch" : `Recreance`,
        "height": 72,
    }],
    ["Medieval", {
        "start" : `1070 AR`,
        "epoch" : `Recreance`,
        "height": 100,
    }],
    ["Renaissance", {
        "start" : `1600 AR (now)`,
        "epoch" : `Recreance`,
        "height": 40,
    }],
]);

const cummHeights: Map<eraNames, number> = new Map();

const topMargin = 0;
let totalHeight = 0;
for (const [name, { height }] of Array.from(eras).reverse()) {
    cummHeights.set(name, totalHeight + height);
    totalHeight = cummHeights.get(name);
}

const events: Map<string, EventArgs> = new Map([
    ["TheoGenesis", {
        text : "Shards Appear - Spacetime & Investiture form.",
        era  : "Shardic",
        rel_t: 0,
        lane : 0,
    }],
    ["Genesis", {
        text : "Invariants form - Matter/Energy/Momentum/Charge...",
        era  : "Shardic",
        rel_t: 0.50,
        lane : 1,
    }],
    ["Divergence", {
        text : "Planes separate",
        era  : "Divergence",
        rel_t: 0.00,
        lane : 0,
    }],
    ["OuterPrimordialsInvade", {
        text : "Outer Primordials Invade",
        era  : "Primordial",
        rel_t: 0,
        lane : 0,
    }],
    ["ShardicPrimordialCreation", {
        text : "Shardic Primordials are born",
        era  : "Primordial",
        rel_t: 0.25,
        lane : 1,
    }],
    ["OuterPrimordialsDefeated", {
        text : "Outer Primordials are Defeated",
        era  : "Primordial",
        rel_t: 0.8,
        lane : 0,
    }],
    ["Expansion", {
        text : "Planes take shape, The Universe expands",
        era  : "Inflationary",
        rel_t: 0.1,
        lane : 1,
    }],
    ["AstralFormation", {
        text : "Astral Bodies Form",
        era  : "Inflationary",
        rel_t: 0.8,
        lane : 0,
    }],
    ["Life", {
        text : "First Physical Lifeforms emerge",
        era  : "Archean",
        rel_t: 0,
        lane : 1,
    }],
    ["SpiritualLife", {
        text : "First Non-Physical Lifeforms emerge",
        era  : "Archean",
        rel_t: 0.9,
        lane : 0,
    }],
    ["ComplexLife", {
        text : "Complex/Mortal Lifeforms emerge",
        era  : "Mythic",
        rel_t: 0.1,
        lane : 1,
    }],
    ["PrimordialLife", {
        text : "Shardic Primordials Gain Physical Forms",
        era  : "Mythic",
        rel_t: 0.2,
        lane : 0,
    }],
    ["SentientLife", {
        text : "Sentient Life Forms",
        era  : "Mythic",
        rel_t: 0.45,
        lane : 0,
    }],
    ["MythicLife", {
        text : "Creatures of Myth and Legend Roam the multiverse",
        era  : "Mythic",
        rel_t: 0.5,
        lane : 1,
    }],
    ["IntelligentLife", {
        text : "Intelligent Species emerge",
        era  : "Mythic",
        rel_t: 0.67,
        lane : 0,
    }],
    ["SocialLife", {
        text : "Societies and Cultures begin to take shape",
        era  : "Mythic",
        rel_t: 0.85,
        lane : 1,
    }],
    ["SocialLife", {
        text : "Humans race appears",
        era  : "Mythic",
        rel_t: 0.9,
        lane : 0,
    }],
    ["Heroes", {
        text : "Powerful Nations form - Heroes walk the land",
        era  : "Heroic",
        rel_t: 0.2,
        lane : 0,
    }],
    ["War", {
        text : "Shardic Wars Ensue",
        era  : "Heroic",
        rel_t: 0.33,
        lane : 1,
    }],
    ["Kelsier", {
        text : "The 'Survivor' Dies",
        era  : "Heroic",
        rel_t: 0.5,
        lane : 0,
    }],
    ["Re-invasion", {
        text : "Outsiders begin to seep within",
        era  : "Heroic",
        rel_t: 0.8,
        lane : 1,
    }],
    ["Silence", {
        text : "History falls silent - No records of this time remain",
        era  : "Silent",
        rel_t: 0,
        lane : 0,
    }],
    ["Isolation", {
        text : "Outer Planes self isolate",
        era  : "Silent",
        rel_t: 0.4,
        lane : 1,
    }],
    ["Archaic", {
        text : "Civilizations restart from scratch post-desolation",
        era  : "Archaic",
        rel_t: 0,
        lane : 0,
    }],
    ["Classical", {
        text : "Some Cities/Civilizations begin to match those of old",
        era  : "Classical",
        rel_t: 0,
        lane : 0,
    }],
    ["Rome", {
        text : "Veteres becomes a global empire on Terra Prima",
        era  : "Classical",
        rel_t: 0.1,
        lane : 1,
    }],
    ["Annatar", {
        text : "1539 AR: The Primordial Nightmares gain a foothold",
        era  : "Medieval",
        rel_t: 0.75,
        lane : 1,
    }],
    ["Leras", {
        text : "1540 AR: The Hour of Darkness",
        era  : "Medieval",
        rel_t: 0.8,
        lane : 0,
    }],
])

export function setupHistory() {
    const $historyZones = $("#history_zones");
    const $lane = [
        $("#history_left_tags"),
        $("#history_right_tags"),
    ]

    for (const [name, { height, start, epoch }] of eras.entries()) {
        $(`<div class='history_zone' style='height: ${height}px;'>
            <div class="zone_start">${start}</div>
            <div class="zone_name">${name}<span class="zone_epoch"> | ${epoch}</span></div>
          </div>`).appendTo($historyZones);
    }

    for (const [id, details] of events.entries()) {
        const distFromTop =
            topMargin +
            cummHeights.get("Shardic")
            - cummHeights.get(details["era"])
            + eras.get(details["era"]).height * details["rel_t"];

        $(
            `<div class="history_event" style="top: ${distFromTop}px;">${details.text}</div>`
        ).appendTo($lane[details["lane"]]);
    }
}