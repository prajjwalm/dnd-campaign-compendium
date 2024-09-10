import {NpcId}     from "../../data/npcIndex";
import {Character} from "../characters/Character";


export const OperatorProfiles: Map<NpcId, () => string> = new Map();

export function generateOperatorProfileSelection()
{
    const operatorProfileButtons = [];
    for (const id of OperatorProfiles.keys()) {
        const character = Character.get(id);
        operatorProfileButtons.push(`
            <div class="operator_profile" data-operator-id="${id}">
                <img src="${character.imgPath}" alt="">
            </div>
        `);
    }

    return `
    <div class="operator_profiles">
        <div class="operator_profiles__header">Villager Profiles</div>
        <div class="operator_profiles__list">
            ${operatorProfileButtons.join("")}
        </div>
    </div>`
}

export function generateOperatorProfile(npcID: NpcId)
{
    if (OperatorProfiles.has(npcID)) {
        return OperatorProfiles.get(npcID)();
    }
    return "";
}


export function setupBaseOperatorLogic()
{
    const $sideBanner = $("#side_banner");

    $sideBanner.on("click", ".operator_profile", function () {
        const $operatorSection = $(".base_management__villagers");
        const id = $(this).data("operatorId");
        $operatorSection.empty();
        $operatorSection.append(generateOperatorProfile(id));
    });

    $sideBanner.on("click", ".operator_screen__back", function () {
        const $operatorSection = $(".base_management__villagers");
        $operatorSection.empty();
        $operatorSection.append(generateOperatorProfileSelection());
    });

}