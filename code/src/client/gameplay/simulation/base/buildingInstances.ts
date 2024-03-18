const buildingInstances = [
    // new Building(
    //     "Inn",
    //     "buildings/Tavern.jpg",
    //     `<i class="fa-solid fa-bowl-spoon"></i>`,
    //     Rarity.Common,
    //     17,
    //     (c) =>
    //         [NpcID.Dawn].includes(c) ?
    //             Character.get(c).getSkillVal(CSkill.Cooking)[0] : 85,
    //     [NpcID.Dawn, NpcID.Tomasa]
    // )
    //     .addAttribute("Guest Capacity",   "4")
    //     .addAttribute("Dining Capacity",  "20")
    //     .addAttribute("Construction",     "Wood 80%, Stone (Ign) 20%")
    //     .addAttribute("Total Hit Points", "400")
    //     .addAttribute("Defense Rating",   "C")
    //     .addAttribute("Aesthetic Rating", "A-")
    //     .addAttribute("Comfort Rating",   "C")
    //     .addAttribute("Equipment Rating", "C-"),
    //
    // new Building(
    //     "Bakery",
    //     "buildings/Bakers.jpg",
    //     `<i class="fa-solid fa-pie"></i>`,
    //     Rarity.Common,
    //     11,
    //     (c) => {
    //         if (c == NpcID.Jaye) {
    //             const cooking = Character.get(c).getSkillVal(CSkill.Cooking)[0];
    //             return Math.floor(
    //                 (1 - (1 - cooking / 100) * (1 - cooking / 100)) * 100
    //             );
    //         }
    //         if (c == NpcID.Jordi) {
    //             return 55;
    //         }
    //         throw new Error("Character not supposed to work in the bakery.");
    //     },
    //     [NpcID.Jaye, NpcID.Jordi]
    // )
    //     .addAttribute("Throughput",       "5 meals / day")
    //     .addAttribute("Construction",     "Rotten wood 100%")
    //     .addAttribute("Total Hit Points", "80")
    //     .addAttribute("Defense Rating",   "D")
    //     .addAttribute("Aesthetic Rating", "D")
    //     .addAttribute("Comfort Rating",   "D")
    //     .addAttribute("Equipment Rating", "C"),
    //
]

export function generateBuildingsPanel()
{
    const buildingDOMs = [];
    for (const buildingInstance of buildingInstances) {
        buildingDOMs.push(buildingInstance.generateDOMString());
    }
    return `
        <div class="terminal_title">Infrastructure</div>
        <div class="infrastructure">
            ${buildingDOMs.join("")}
        </div>`;
}