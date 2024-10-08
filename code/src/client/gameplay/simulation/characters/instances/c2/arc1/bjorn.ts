import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupBjron()
{
    const c = new Character(NpcId.Bjorn);

    c.core.name = "Bjron";
    c.core.imgPath = "character_tokens/C2/Arc1/Bjorn.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("M35");
    c.card.summary = () => `???`;
    c.card.finalize();
}
