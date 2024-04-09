import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupCellinia()
{
    // Prepare the character object.
    const c = new Character(NpcID.Cellinia);

    c.core.name = "Cellinia";
    c.core.imgPath = "character_tokens/C2/Arc2/Cellinia.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(24, 30, 25, 19, 18, 27);
    c.dStats.pb = 10;
    c.dStats.finalize();

    // todo, also cskills.
    c.dSkills.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("F29");
    c.card.addCardTag("From | Devotion(?)");
    c.card.addCardTag("Race | Shifter[Lupine]");
    c.card.addCardTag("CR | ?");

    c.card.summary = () => `
    A bureaucrat working in the logistics department of the State of Lateran, 
    she's responsible for ensuring express deliveries in the outer fringes of 
    the Saints' domain. (Notably a risky job, since it involves regularly braving
    travels via the warped cognitive realm of the plane.) As an honorary saint, 
    she's one of the few non-aasimar who're permitted to enter the capital.
    <div class="effect_tag">Incomplete</div>`;

    c.card.finalize();
}
