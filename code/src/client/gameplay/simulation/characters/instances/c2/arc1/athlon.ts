import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupAthlon()
{
    const c = new Character(NpcId.Athlon);

    c.core.name = "Athlon";
    c.core.imgPath = "character_tokens/C2/Arc1/Athlon.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(10, 20, 18, 8, 16, 10);
    c.dStats.pb = 4;
    c.dStats.finalize();

    c.dSkills.finalize();

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("M58");
    c.card.addCardTag("CR 7")

    c.card.summary = () => `???`;
    c.card.finalize();

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
    c.opinions.isOpinionated = true;
    c.opinions.finalize();
}
