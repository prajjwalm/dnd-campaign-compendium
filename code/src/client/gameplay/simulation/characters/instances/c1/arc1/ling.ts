import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupLing()
{
    const ling = new Character(NpcID.Ling);

    ling.core.name = "Ling";
    ling.core.imgPath = "character_tokens/C1/Arc1/ling_garden.png";

    ling.card.setCampaignArc(1, 1);
    ling.card.addCardTag("F");
    ling.card.addCardTag("CR | 27");
    ling.card.addCardTag("From | Preservation");
    ling.card.addCardTag("Allegiance | ???");
    ling.card.addCardTag("Race | Titan &times; <span class='verbose'>Blue Dragon</span>");
    ling.card.addCardTag("<span class='verbose'>Draconic</span> Sorcerer");
    ling.card.addCardTag("<span>Primordial | Outsider <span class='verbose'>(3<sup>rd</sup> Fragment of Sui)</span></span>");
    ling.card.addCardTag("Ex-Guardian of Diplomacy");
    ling.card.addCardTag("Ex-Lighthouse Keeper");
    ling.card.primaryImageTitle = "Lighthouse Keeper";
    ling.card.addAlternateImage("Shrine Maiden", "character_tokens/C1/Arc1/ling_sui.png");

    ling.card.summary = `One of the fragments of an outer primordial. Moved into the Gardens long ago along with 
     ${'Character.get(Npc.Kjerra).createLink("Kjera")'} and worked as a lighthouse keeper there so as to be best placed to
      respond to the revival of her 'parent' or any other outsiders. Was chosen to be the Guardian of Diplomacy after
      the inquisitors' betrayal. Agreed but went missing during the expedition inside the Castle of the Night 
      following Preservation's death and the Survivor's Ascension.`;

    ling.opinions.isOpinionated = false;
}