import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupLucian()
{
    const c = new Character(NpcId.Lucian);

    c.core.name = "Lucian";
    c.core.imgPath = "character_tokens/C1/Arc1/lucian_norm.png";
    c.core.finalize();

    c.dStats.pb = 7;
    c.dStats.initializeStats(13, 25, 7, 13, 5, 27);
    c.dStats.finalize();

    c.card.setCampaignArc(1, 1);
    c.card.addCardTag("M210");
    c.card.addCardTag("From | Ruin");
    c.card.addCardTag("Allegiance | Ruin / Troupe Leader");
    c.card.addCardTag("Race | Feline");
    c.card.addCardTag("<span class='verbose'>Echo</span> Warrior / <span class='verbose'>Assassin</span> Rogue / ...");
    // Grave cleric, chrono mage
    c.card.addCardTag("Nightblood | Ominous Melody");
    c.card.addCardTag("Time Command");
    c.card.addCardTag("Aberrant Fused (???)");
    c.card.addCardTag("<i>He who quiets</i>");
    c.card.addCardTag("CR | 23");
    c.card.primaryImageTitle = "Phantom";
    c.card.addAlternateImage("Solitaire", "character_tokens/C1/Arc1/lucian_mad.png");

    c.card.summary = () =>`
    "This darkness is a refuge, a throne, and paradise. The spirits of the dead have never left, and I’ve cursed 
     the world from atop their bones... Seeing me as I am now, do you still want to hear my song? Do you still
     dare... to stand before me?"<br/>
     Calamity of The Troupe - an unfinished masterpiece of their leader. Was once raised as their rising star in
     response to the threat that was ${Character.get(NpcId.Ebenezar).createLink("the Lich")}. But turned against them only 
     as he slaughtered all the troupe's senior members in one night and escaped into Materia - sealing his
     memories and powers. He returned to the outer planes by accident and sought out the troupe when he did. 
     Descended into insanity after killing ${Character.get(NpcId.Mouthpiece).createLink("The Mouthpiece")} and inheriting 
     his curse. Following which he stealthily assassinated ${Character.get(NpcId.TraitorOthello).createLink("The Traitor")}, who was 
     preoccupied in fighting 'Agents of the Fifth', thus freeing the Primordial nightmares.
    `;
    c.card.finalize();
}