import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupShuo()
{
    // Prepare the character object.
    const c = new Character(NpcID.Shuo);

    c.core.name = "Shuo";
    c.core.imgPath = "character_tokens/C2/Arc2/Shuo.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("M");
    c.card.addCardTag("From | Honor");
    c.card.addCardTag("Race | Titan <span class='verbose'>&times; Black/Gold Dragon</span>");
    c.card.addCardTag(`<span>Primordial | Outsider <span class='verbose'>(1<sup>st</sup> Fragment of Sui)</span></span>`);
    c.card.addCardTag(`The First Martial Artist`);
    c.card.addCardTag("CR | 24");
    c.card.summary = () => `
    The progenitor of martial arts and the Grandmaster and Guardian of the fortress
    of Yomen in the planet Ashyn, Shuo left his identity as the first and strongest
    fragemnt of Sui behind as soon as he possibly could. Yet, despite his attempts
    to live a normal life, he forever remained a being of the Heavens, a monstrosity
    that could never acquire friends among his mortal companions. A hermit that 
    could never be matched by any of his students. And so it was that the first 
    fragment was slaughtered, pierced by Cultivation right before it could be 
    merged back into Sui.`;

    c.card.finalize();
}
