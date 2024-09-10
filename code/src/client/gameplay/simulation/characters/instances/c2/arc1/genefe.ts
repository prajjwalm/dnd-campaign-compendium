import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupGenefe()
{
    const c = new Character(NpcId.Genefe);

    c.core.name = "Genefe";
    c.core.imgPath = "character_tokens/C2/Arc1/Genefe.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("F28");
    c.card.addCardTag("CR 3");
    c.card.summary = () => `???`;
    c.card.finalize();

    // [NpcPersonalityTag.Conciliatory, 2],
    // [NpcPersonalityTag.Abusive, 2],
    // [NpcPersonalityTag.Ascetic, 1],
    // [NpcPersonalityTag.Depressive, 1],
    // [NpcPersonalityTag.Insecure, 1],
    // [NpcPersonalityTag.Hypocrite, 1],
    // [NpcPersonalityTag.Jealous, 1],
}
