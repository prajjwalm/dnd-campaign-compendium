import {DStat}     from "../../homebrew/definitions/constants";
import {NpcId}     from "../../npcs/npcIndex";
import {Character} from "../simulation/characters/Character";
import {
    setupEphremis
}                  from "../simulation/characters/instances/mobs/seaborn/Ephremis";

export function setupHoth()
{
    $(".mob_space").each(function () {
        const npcId: NpcId = NpcId[$(this).data("npcId")] as unknown as NpcId;

        const npc = Character.get(npcId);

        $(this).empty();
        const headerString = `<div class="mob_space__header">Target: ${npc.name}</div>`;
        $(`${headerString}`).appendTo($(this));

        const $s = $("<div class='spinners'></div>");

        let active = " active";
        const strSlots = [];
        for (let i = npc.stats.get(DStat.Str).stat; i > 0; i--) {
            strSlots.push(`<div class="spinner__slots__slot${active}" data-stat-id="STR" data-stat-val="${i}">${i}</div>`);
            active = "";
        }
        $(`<div class="spinners">
                <div class="spinner">
                    <div class="spinner__title">STR</div>
                    <div class="spinner__slots">
                    ${strSlots.join("")}
                    </div>
                </div>
            </div>`).appendTo($s);

        const dexSlots = [];
        active = " active";
        for (let i = npc.stats.get(DStat.Dex).stat; i > 0; i--) {
            dexSlots.push(`<div class="spinner__slots__slot${active}" data-stat-id="DEX" data-stat-val="${i}">${i}</div>`);
            active = "";
        }
        $(`<div class="spinners">
                <div class="spinner">
                    <div class="spinner__title">DEX</div>
                    <div class="spinner__slots">
                    ${dexSlots.join("")}
                    </div>
                </div>
            </div>`).appendTo($s);

        const conSlots = [];
        active = " active";
        for (let i = npc.stats.get(DStat.Con).stat; i > 0; i--) {
            conSlots.push(`<div class="spinner__slots__slot${active}" data-stat-id="CON" data-stat-val="${i}">${i}</div>`);
            active = "";
        }
        $(`<div class="spinners">
                <div class="spinner">
                    <div class="spinner__title">CON</div>
                    <div class="spinner__slots">
                    ${conSlots.join("")}
                    </div>
                </div>
            </div>`).appendTo($s);

        const intSlots = [];
        active = " active";
        for (let i = npc.stats.get(DStat.Int).stat; i > 0; i--) {
            intSlots.push(`<div class="spinner__slots__slot${active}" data-stat-id="INT" data-stat-val="${i}">${i}</div>`);
            active = "";
        }
        $(`<div class="spinners">
                <div class="spinner">
                    <div class="spinner__title">INT</div>
                    <div class="spinner__slots">
                    ${intSlots.join("")}
                    </div>
                </div>
            </div>`).appendTo($s);

        const wisSlots = [];
        active = " active";
        for (let i = npc.stats.get(DStat.Wis).stat; i > 0; i--) {
            wisSlots.push(`<div class="spinner__slots__slot${active}" data-stat-id="WIS" data-stat-val="${i}">${i}</div>`);
            active = "";
        }
        $(`<div class="spinners">
                <div class="spinner">
                    <div class="spinner__title">WIS</div>
                    <div class="spinner__slots">
                    ${wisSlots.join("")}
                    </div>
                </div>
            </div>`).appendTo($s);

        const chaSlots = [];
        active = " active";
        for (let i = npc.stats.get(DStat.Cha).stat; i > 0; i--) {
            chaSlots.push(`<div class="spinner__slots__slot${active}" data-stat-id="CHA" data-stat-val="${i}">${i}</div>`);
            active = "";
        }
        $(`<div class="spinners">
                <div class="spinner">
                    <div class="spinner__title">CHA</div>
                    <div class="spinner__slots">
                    ${chaSlots.join("")}
                    </div>
                </div>
            </div>`).appendTo($s);

        $s.appendTo($(this));
    });

    const stats = new Map([
        ["STR", 30],
        ["DEX", 24],
        ["CON", 29],
        ["INT", 21],
        ["WIS", 18],
        ["CHA", 28],
    ]);

    $("#combat").on("click", ".spinner__slots__slot", function () {
        const statId = $(this).data("statId");
        const statVal = $(this).data("statVal");

        stats.set(statId, statVal);
        $(`.spinner__slots__slot[data-stat-id=${statId}]`).removeClass("active");
        $(this).addClass("active");
        setupEphremis(stats);
    });
}