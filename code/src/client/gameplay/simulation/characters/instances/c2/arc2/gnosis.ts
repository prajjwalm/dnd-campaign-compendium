
import {
    Prof,
    DSkill,
    Hidden
}                  from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupGnosis()
{
    // Prepare the character object.
    const c = new Character(NpcID.Gnosis);

    c.core.name = "Sir Gnosis Edelweiss";
    c.core.imgPath = "character_tokens/C2/Arc2/Gnosis.png";

    c.opinions.isOpinionated = false;

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("M41")
    c.card.addCardTag("Race | Human(?)");
    c.card.addCardTag("From | Devotion (Nix)");
    c.card.addCardTag("CR | 13");
}
