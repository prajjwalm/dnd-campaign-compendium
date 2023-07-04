import {getEnumIterator}                       from "../../common/common";
import {CharacterCard}                         from "../../data/cards/characterCard";
import {PcCharismaMods, PcIndex, PcTokenNames}              from "../../data/pcIndex";
import {NpcId}                                              from "../../npcs/npcIndex";
import {T_START}                                            from "../common";
import {NpcInteractionEvent, NpcOpinionV2, PositiveEmotion} from "./npcOpinions";
import {session2NpcInteractions}                            from "./sessions/s2";
import {session3NpcInteractions}                            from "./sessions/s3";
import {session4NpcInteractions}                            from "./sessions/s4";
import {session5NpcInteractions}                            from "./sessions/s5";
import {session6NpcInteractions}                            from "./sessions/s6";
import {session7NpcInteractions}                            from "./sessions/s7";
import {session8NpcInteractions}                            from "./sessions/s8";
import {session9NpcInteractions}                            from "./sessions/s9";


export function renderNpcOpinionTable(
    $container: JQuery,
    npcOpinions: Map<NpcId, Map<PcIndex, NpcOpinionV2>>): void
{
    const $table = $("<div class='opinion_summary_table'></div>");

    const $headerRow = $("<div class='row header'><div class='cell'></div></div>");
    for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
        const imgPath =
            `./assets/images/character_tokens/C2/pcs/${PcTokenNames.get(pc)}.png`;
        const $pcCell =
            $(`<div class="cell character_token"><img src="${imgPath}" alt="[Img not found]"></div>`);

        $pcCell.appendTo($headerRow);
    }
    $headerRow.appendTo($table);

    const $tableBody = $("<div class='table_body'></div>");

    for (const [npcIndex, npc] of CharacterCard.IndexById) {
        if (!npc.isVillageNpc) {
            continue;
        }
        const $tableRow = $("<div class='row'></div>");
        const $npcCell =
            $(`<div class='cell character_token'><img src="${npc.imgPath}" alt="[Img not found]"></div>`);
        $npcCell.appendTo($tableRow);

        for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
            const npcOpinion = npcOpinions.get(npcIndex).get(pc);

            $tableRow.append(npcOpinion.generateSummaryTableCellContents());
        }

        $tableRow.appendTo($tableBody);
    }

    $tableBody.appendTo($table);
    $table.appendTo($container);
}

export function setupNpcOpinions()
{
    const npcOpinions: Map<NpcId, Map<PcIndex, NpcOpinionV2>> = new Map();

    for (const [npcIndex, npc] of CharacterCard.IndexById) {
        if (!npc.isVillageNpc) {
            continue;
        }
        const npcMap: Map<PcIndex, NpcOpinionV2> = new Map();
        for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
            npcMap.set(pc, new NpcOpinionV2(npcIndex, pc));
        }
        npcOpinions.set(npcIndex, npcMap);
    }

    // Adjust for charisma respect.
    for (const [npcIndex, npc] of CharacterCard.IndexById) {
        if (!npc.isVillageNpc) {
            continue;
        }
        for (const pc of getEnumIterator(PcIndex) as Generator<PcIndex>) {
            npcOpinions.get(npcIndex).get(pc).addEvent(
                new NpcInteractionEvent(
                    T_START,
                    "Base Charisma.",
                    new Map([[PositiveEmotion.Respect, PcCharismaMods.get(pc)]])
                )
            );
        }
    }

    session2NpcInteractions(npcOpinions);
    session3NpcInteractions(npcOpinions);
    session4NpcInteractions(npcOpinions);
    session5NpcInteractions(npcOpinions);
    session6NpcInteractions(npcOpinions);
    session7NpcInteractions(npcOpinions);
    session8NpcInteractions(npcOpinions);
    session9NpcInteractions(npcOpinions);

    const $individualAst = $("#individual_ast");
    const $table_area = $("#attitude_summary_table_area");
    renderNpcOpinionTable($table_area, npcOpinions);

    $table_area.on("click", ".npc_opinion", function () {
        const npcId: NpcId = $(this).data("npcId");
        const pcId: PcIndex = $(this).data("pcId");
        $individualAst.html(npcOpinions.get(npcId).get(pcId).generateTimeline());
        $individualAst.show();
    });
}
