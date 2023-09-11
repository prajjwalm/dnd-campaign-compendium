import {Prof}      from "../../../../../data/constants";
import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupLucian()
{
    const lucian = new Character(NpcID.Lucian);

    lucian.core.name = "Lucian";
    lucian.core.imgPath = "character_tokens/C1/Arc1/lucian_norm.png";

    lucian.dStats.pb = Prof.get(7);
    lucian.dStats.initializeStats(13, 25, 7, 13, 5, 27);

    lucian.card.setCampaignArc(1, 1);
    lucian.card.addCardTag("M210");
    lucian.card.addCardTag("From | Ruin");
    lucian.card.addCardTag("Allegiance | Ruin / Troupe Leader");
    lucian.card.addCardTag("Race | Feline");
    lucian.card.addCardTag("<span class='verbose'>Echo</span> Warrior / <span class='verbose'>Assassin</span> Rogue / ...");
    // Grave cleric, chrono mage
    lucian.card.addCardTag("Nightblood | Ominous Melody");
    lucian.card.addCardTag("Time Command");
    lucian.card.addCardTag("Aberrant Fused (???)");
    lucian.card.addCardTag("<i>He who quiets</i>");
    lucian.card.addCardTag("CR | 23");
    lucian.card.primaryImageTitle = "Phantom";
    lucian.card.addAlternateImage("Solitaire", "character_tokens/C1/Arc1/lucian_mad.png");

    lucian.card.summary = `
    "This darkness is a refuge, a throne, and paradise. The spirits of the dead have never left, and I’ve cursed 
     the world from atop their bones... Seeing me as I am now, do you still want to hear my song? Do you still
     dare... to stand before me?"<br/>
     Calamity of The Troupe - an unfinished masterpiece of their leader. Was once raised as their rising star in
     response to the threat that was ${'Character.get(Npc.Ebenezar).createLink("the Lich")'}. But turned against them only 
     as he slaughtered all the troupe's senior members in one night and escaped into Materia - sealing his
     memories and powers. He returned to the outer planes by accident and sought out the troupe when he did. 
     Descended into insanity after killing ${'Character.get(Npc.Mouthpiece).createLink("The Mouthpiece")'} and inheriting 
     his curse. Following which he stealthily assassinated ${'Character.get(Npc.TraitorOthello).createLink("The Traitor")'}, who was 
     preoccupied in fighting 'Agents of the Fifth', thus freeing the Primordial nightmares.
    `;

    lucian.opinions.isOpinionated = false;
}