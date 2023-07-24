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


export function setupStatSheet(category: string,
                               id: string,
                               title: string,
                               imageFileName: string,
                               sheetObjectGetter: () => IStatSheet,
                               fullImgPath: boolean = false)
{
    console.log("setup stat sheet called for", id);
    console.trace();
    idToSheetGenerator.set(id, sheetObjectGetter);

    const ip = fullImgPath ?
               `<img class="icon_img" src="assets/images/${imageFileName}" alt="[NULL]">` :
               `<img class="icon_img" src="assets/images/mob_tokens/${category}/${imageFileName}" alt="[NULL]">`;

    // todo: cache the jquery, add a duplicate creature id check.
    $("#beastiary .selectable_radio_container").append(`
        <div class="selectable radio creature" 
             data-creature-id="${id}"
             data-mob-group="${category}"
             style="display: none;">
            ${ip}
            <div class="title selected_only">${title}</div>
        </div>`
    );
}

export function setupMonsters()
{
    setupStatSheet("inkling",
                   "inkling_insecurity",
                   "Inkling: Insecurity",
                   "insecurity.png",
                   createInkling);

    setupStatSheet("inkling",
                   "inkling_impatience",
                   "Inkling: Impatience",
                   "impatience.png",
                   createInklingDog);

    setupStatSheet("inkling",
                   "inkling_envy",
                   "Inkling: Envy",
                   "envy.png",
                   createInklingAberrant);

    setupStatSheet("inkling",
                   "inkling_fury",
                   "Inkling: Fury",
                   "fury.png",
                   createInklingWannabeBoss);

    setupStatSheet("inkling",
                   "inkling_sloth",
                   "Inkling: Sloth",
                   "sloth.png",
                   createInklingTank);

    setupStatSheet("inkling",
                   "inkling_arrogance",
                   "Inkling: Arrogance",
                   "arrogance.png",
                   createInklingDynamite);

    setupStatSheet("inkling",
                   "inkling_free",
                   "Freedom",
                   "free.png",
                   createFreedom);

    // setupStatSheet("human",
    //                "human_jaye",
    //                "Jaye",
    //                "jaye.png.lnk",
    //                createJaye);


    const $beastiary = $("#beastiary");

    // todo: create the sheets on button click.
    $beastiary.on("click", ".mob_group_icon", function () {
        const groupId = $(this).data("mobGroupId");
        $beastiary.find(".creature").hide();
        $beastiary.find(`.creature[data-mob-group=${groupId}]`).show();
        console.log("mobgroup clicked");
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