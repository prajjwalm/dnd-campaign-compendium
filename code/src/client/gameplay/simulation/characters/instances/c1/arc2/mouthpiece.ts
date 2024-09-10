import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupMouthpiece()
{
    const c = new Character(NpcId.Mouthpiece);

    c.core.name = "Troupe Mouthpiece";
    c.core.imgPath = "character_tokens/C1/Arc2/ahrendts.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag('M');
    c.card.addCardTag(`Deceased`);
    c.card.addCardTag('From | Materia / Shadowfell / Ruin');
    c.card.addCardTag('Allegiance | Ruin &times; Outsiders');
    c.card.addCardTag(`Race | Titan <span class='verbose'>&times; Aberration</span>`);
    c.card.addCardTag(`Primordial | Outsider <span class='verbose'>(Curse)</span>`);
    c.card.addCardTag('CR | 23');

    c.card.summary = () =>`
    Was somehow related to the Witch King of lore. The most loyal member of the troupe, he took it upon himself
      to be the host/announcer of the Troupe's 'shows'. Responsible for their most grotesque creations which often 
      were looked down upon by ${Character.get(NpcId.LogosPlaywright).createLink("The Playwright")} as being crude and tasteless. 
      Was killed by a group of adventurers and ${Character.get(NpcId.Lucian).createLink("Solitare")} but he had already 
      accomplished what his master needed...`;

    c.card.finalize();

}
