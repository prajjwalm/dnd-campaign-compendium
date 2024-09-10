import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupLing()
{
    const c = new Character(NpcId.Ling);

    c.core.name = "Ling";
    c.core.imgPath = "character_tokens/C1/Arc1/ling_garden.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 1);
    c.card.addCardTag("Deceased");
    c.card.addCardTag("F");
    c.card.addCardTag("CR | 27");
    c.card.addCardTag("From | Preservation");
    c.card.addCardTag("Allegiance | ???");
    c.card.addCardTag("Race | Titan &times; <span class='verbose'>Blue Dragon</span>");
    c.card.addCardTag("<span class='verbose'>Draconic</span> Sorcerer");
    c.card.addCardTag("<span>Primordial | Outsider <span class='verbose'>(3<sup>rd</sup> Fragment of Sui)</span></span>");
    c.card.addCardTag("Ex-Guardian of Diplomacy");
    c.card.addCardTag("Ex-Lighthouse Keeper");
    c.card.primaryImageTitle = "Lighthouse Keeper";
    c.card.addAlternateImage("Shrine Maiden", "character_tokens/C1/Arc1/ling_sui.png");
    c.card.finalize();

    c.card.summary = () =>`One of the fragments of an outer primordial. Moved into the Gardens long ago along with 
     ${Character.get(NpcId.Kjerra).createLink("Kjera")} and worked as a lighthouse keeper there so as to be best placed to
      respond to the revival of her 'parent' or any other outsiders. Was chosen to be the Guardian of Diplomacy after
      the inquisitors' betrayal. Agreed but went missing during the expedition inside the Castle of the Night 
      following Preservation's death and the Survivor's Ascension.`;
}