import {generatedIds}                   from "./contracts";
import {createJaye}                     from "./humans";
import {
    createFreedom,
    createInkling,
    createInklingAberrant,
    createInklingDog,
    createInklingDynamite,
    createInklingTank,
    createInklingWannabeBoss
}                                       from "./inklings";
import {idToSheetGenerator, IStatSheet} from "./sheet";


function setupMonster(category: string,
                      id: string,
                      title: string,
                      imageFileName: string,
                      creationMethod: () => IStatSheet)
{
    idToSheetGenerator.set(id, creationMethod);

    // todo: cache the jquery, add a duplicate creature id check.
    $("#beastiary .selectable_radio_container").append(`
        <div class="selectable radio creature" 
             data-creature-id="${id}"
             data-mob-group="${category}"
             style="display: none;">
            <img class="icon_img" src="assets/images/mob_tokens/${category}/${imageFileName}" alt="[NULL]">
            <div class="title selected_only">${title}</div>
        </div>`
    );
}

export function setupMonsters()
{
    setupMonster("inkling",
                 "inkling_insecurity",
                 "Inkling: Insecurity",
                 "insecurity.png",
                 createInkling);

    setupMonster("inkling",
                 "inkling_impatience",
                 "Inkling: Impatience",
                 "impatience.png",
                 createInklingDog);

    setupMonster("inkling",
                 "inkling_envy",
                 "Inkling: Envy",
                 "envy.png",
                 createInklingAberrant);

    setupMonster("inkling",
                 "inkling_fury",
                 "Inkling: Fury",
                 "fury.png",
                 createInklingWannabeBoss);

    setupMonster("inkling",
                 "inkling_sloth",
                 "Inkling: Sloth",
                 "sloth.png",
                 createInklingTank);

    setupMonster("inkling",
                 "inkling_arrogance",
                 "Inkling: Arrogance",
                 "arrogance.png",
                 createInklingDynamite);

    setupMonster("inkling",
                 "inkling_free",
                 "Freedom",
                 "free.png",
                 createFreedom);

    setupMonster("human",
                 "human_jaye",
                 "Jaye",
                 "jaye.png.lnk",
                 createJaye);


    const $beastiary = $("#beastiary");

    // todo: create the sheets on button click.
    $beastiary.on("click", ".mob_group_icon", function () {
        const groupId = $(this).data("mobGroupId");
        $beastiary.find(".creature").hide();
        $beastiary.find(`.creature[data-mob-group=${groupId}]`).show();
    });

    $beastiary.on("click", ".creature:not(.disabled)", function () {
        setTimeout(() => {
            const creatureId = $("#beastiary .creature.selected").data("creatureId");
            $(".stat_sheet").hide();

            if (!idToSheetGenerator.has(creatureId)) {
                return;
            }

            if (generatedIds.has(creatureId)) {
                $(`#stat_sheet_${creatureId}`).show();
                return;
            }

            $("#sheet_zone").append(idToSheetGenerator.get(creatureId)().render());
            generatedIds.add(creatureId);
        }, 10);
    });
}