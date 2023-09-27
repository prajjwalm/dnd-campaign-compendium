import {Prof}      from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupAthlon()
{
    const athlon = new Character(NpcID.Athlon);

    athlon.core.name = "Athlon";
    athlon.core.imgPath = "character_tokens/C2/Arc1/Athlon.png";

    // Setup D&D stats.
    athlon.dStats.initializeStats(10, 20, 18, 8, 16, 10);
    athlon.dStats.pb = Prof.get(4);

    athlon.card.setCampaignArc(2, 1);

    athlon.card.addCardTag("M58");

    athlon.card.summary = () => `???`;

    // [NpcPersonalityTag.Addict, 4],
    // [NpcPersonalityTag["Guilt-ridden"], 2],
    // [NpcPersonalityTag.Depressive, 2],
    // [NpcPersonalityTag.Accepting, 1],
    // [NpcPersonalityTag.Psychopath, 1],
    // [NpcPersonalityTag["Abhors Violence"], 1],
    // tiesToOtherNpcs: new Map([
    //     [`${Card.link("[character|Yuki]", "Yuki")}`,
    //      `Although he would never say it aloud, he deeply hurts inside for what his son had to go through, and
    //       what it made of him. Has realized the futility of preaching to him, but keeps hope that his family's
    //       noble blood will guide Yuki to the right path.`],
    //     [`${Card.link("[character|Ken Shima]", "Shimaken")}`,
    //      `Saw him as divinity, a saviour and an ideal. Would've died several times over for his sake.
    //       Also kept the others who were with him, like ${Card.link("[character|Rin Shima]", "Shimarin")} and
    //       ${Card.link("[character|Fiest]", "Fiest")}, in very high regard.`],
    // ]),
    athlon.opinions.isOpinionated = true;
}
