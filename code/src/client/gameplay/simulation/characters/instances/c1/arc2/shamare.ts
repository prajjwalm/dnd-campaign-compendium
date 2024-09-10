import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupShamare()
{
    const c = new Character(NpcId.Shamare);

    c.core.name = "Shamare";
    c.core.imgPath = "character_tokens/C1/Arc2/shamare.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag('Deceased?');
    c.card.addCardTag('F52');
    c.card.addCardTag('From | Ruin');
    c.card.addCardTag(`Race | Vulpine`);
    c.card.addCardTag(`Warlock`);
    c.card.addCardTag(`Nightblood | Voodoo`);
    c.card.addCardTag(`Soul Weaver`);
    c.card.addCardTag('CR | 12');

    c.card.summary = () =>`
    A child who'd been forced into a harsher life someone of her age deserved, the death of her sister caused her
      to inherit her nightblood and learn of her 'arts'. These 'arts' involved weaving the souls of people, and 
      others, into inanimate objects - twisting their identity and spiritual energy to perform certain tasks. The
      first soul she weaved was that of her own sister's, who had been shot - as she was trying to go incognito - by 
      ${Character.get(NpcId.Shimarin).createLink("a sniper")} at the behest of her 
      ${Character.get(NpcId.Mouthpiece).createLink("last employer")} after she had completed a certain contract supposedly
      involving a lock. Shamare finally gave up her quest for vengeance when she realized she was being manipulated.`;

    c.card.finalize();
}
