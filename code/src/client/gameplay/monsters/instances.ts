import {GENERATED_IDS}                                                                                                                             from "./contracts";
import {createFreedom, createInkling, createInklingAberrant, createInklingDog, createInklingDynamite, createInklingTank, createInklingWannabeBoss} from "./inklings";
import {ID_TO_SHEET_GENERATOR, IStatSheet}                                                                                                         from "./sheet";


export function setupStatSheet(category: string,
                               id: string,
                               title: string,
                               imageFileName: string,
                               sheetObjectGetter: () => IStatSheet,
                               fullImgPath: boolean = false,
                               theme: string = "")
{
    // Is created on the first call, ID_TO_SHEET_GENERATOR is set only here.
    const iconCreated = ID_TO_SHEET_GENERATOR.has(id);
    ID_TO_SHEET_GENERATOR.set(id, sheetObjectGetter);


    if (!iconCreated) {
        // Create icon.
        const ip = fullImgPath ?
                   `<img class="icon_img" src="${imageFileName}" alt="[NULL]">` :
                   `<img class="icon_img" src="assets/images/mob_tokens/${category}/${imageFileName}" alt="[NULL]">`;

        $("#beastiary .selectable_radio_container").append(`
            <div class="selectable radio creature ${theme}" 
                 data-creature-id="${id}"
                 data-mob-group="${category}"
                 style="display: none;">
                ${ip}
                <div class="title selected_only">${title}</div>
            </div>`
        );
    }

    // Three cases - active sheet, has sheet, doesn't have sheet.
    const $sheet = $(`#stat_sheet_${id}`);
    if ($sheet.length > 1) {
        throw new Error(`Duplicate sheet with id stat_sheet_${id}.`);
    }

    if ($sheet.length == 0) {
        // Do nothing. When the sheet is lazily created, it'll be as per the new
        // generator method.
        return;
    }

    const isHidden = $sheet.is(":hidden");

    if (isHidden) {
        // Just remove the sheet, the next time its selected it'll be
        // regenerated.
        GENERATED_IDS.delete(id);
        $sheet.remove();
    }
    else {
        // We have to update the sheet now, so remove the old and generate
        // a new.
        $sheet.remove();
        $("#sheet_zone").append(sheetObjectGetter().render());
    }

}

/**
 * @deprecated
 */
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

    const $beastiary = $("#beastiary");

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

            if (!ID_TO_SHEET_GENERATOR.has(creatureId)) {
                return;
            }

            if (GENERATED_IDS.has(creatureId)) {
                $(`#stat_sheet_${creatureId}`).show();
                return;
            }

            $("#sheet_zone").append(ID_TO_SHEET_GENERATOR.get(creatureId)().render());
            GENERATED_IDS.add(creatureId);
        }, 10);
    });
}