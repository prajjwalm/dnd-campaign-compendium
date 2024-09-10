import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupSybilla()
{
    const c = new Character(NpcId.Sybilla);

    c.core.name = "Sybilla";
    c.core.imgPath = "character_tokens/C2/Arc1/Sybilla.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("F34");
    c.card.addCardTag("CR 1");
    c.card.summary = () => `???`;
    c.card.finalize();
}
