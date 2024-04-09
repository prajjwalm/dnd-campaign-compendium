import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupGnosis()
{
    // Prepare the character object.
    const c = new Character(NpcID.Gnosis);

    c.core.name = "Sir Gnosis Edelweiss";
    c.core.imgPath = "character_tokens/C2/Arc2/Gnosis.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("M41")
    c.card.addCardTag("Race | Human(?)");
    c.card.addCardTag("From | Devotion (Nix)");
    c.card.addCardTag("CR | 13");

    c.card.summary = () => `
    The last surviving heir to the noble family governing the town of Nix. Was
    performing some business in Terra when the town, along with his family, was
    massacred by an unknown criminal. Odium wants him dead for some reason.
    <div class="effect_tag">Incomplete</div>`;

    c.card.finalize();
}
