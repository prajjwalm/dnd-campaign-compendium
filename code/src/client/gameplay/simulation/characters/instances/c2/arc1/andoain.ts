import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupAndoain()
{
    const c = new Character(NpcId.Andoain);

    c.core.name = "Andoain";
    c.core.imgPath = "character_tokens/C2/Arc1/Andoain.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 1);
    c.card.addCardTag("M221");
    c.card.addCardTag("From | ? / Materia");
    c.card.addCardTag("Race | Aasimar");
    c.card.addCardTag(`Class | <span class='verbose'>Gunslinger</span> Fighter`);
    c.card.addCardTag(`Class | <span class='verbose'>Hexblade</span> Warlock`);
    c.card.addCardTag(`Class | <span class='verbose'>War</span> Cleric`);
    c.card.addCardTag("'Saint'");
    c.card.addCardTag("CR | 21");

    c.card.summary = () =>`
    An aasimar with a halo and glowing wings like reflected glass who mysteriously appeared in Veteres in around 
      1580 AR. Seemed to be supernaturally gifted in the use of firearms and preferred them to swords. Known by all 
      to be an extremely generous and kind soul, but seemed to be haunted by demons of his own, and was always 
      begging God for forgiveness. Was randomly assaulted by a 
      ${Character.get(NpcId.Mostima).createLink("mysterious half-blood fallen aasimar")} while peacefully exploring the
      coast of Aegir.<br/>
      <div class="effect_tag">Incomplete</div>`;

    c.card.finalize();
}
