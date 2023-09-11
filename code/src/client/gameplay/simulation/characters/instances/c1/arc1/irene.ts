import {NpcID}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupIrene()
{
    const irene = new Character(NpcID.Irene);

    irene.core.name = "Irene";
    irene.core.imgPath = "character_tokens/C1/Arc1/irene.png";

    irene.card.setCampaignArc(1, 1);
    irene.card.addCardTag("F1390");
    irene.card.addCardTag("CR | 16");
    irene.card.addCardTag("From | Air / Water / Preservation");
    irene.card.addCardTag("Allegiance | Preservation");
    irene.card.addCardTag("Race | Air Genasi");
    irene.card.addCardTag("<span class='verbose'>Gunslinger</span> Fighter / <span class='verbose'>Tempest</span> Cleric / <span class='verbose'>Storm</span> Sorcerer");
    irene.card.addCardTag("Faction: Inquisitor");
    irene.card.addCardTag("Inquisitor of ???");

    irene.card.summary = `
    An air genasi who was a junior member of the inquisition of the gardens. All her bunker-mates were killed in 
    an attack by The Troupe around 300 years ago, but the ${'Character.get(Npc.Kjerra).createLink("Guardian of Magic")'}
    took pity on her and replaced them all with physically intractable and sentient illusions. Despite them being 
    near-perfect replicas, Irene eventually figured out their true nature, but being grateful for the concern, she 
    kept the pretense of believing in them. Even so, ${Character.get(NpcID.Lesley).createLink("Lesley")} took a personal 
    interest in her and made sure to invite her every now and then to make sure she got to interact with real people.
    During the Hour of Loss, she displayed unexpected skill (leading others to suspect she had specifically been 
    trained for such situations), resolve, and fanaticism in fighting a deep-ocean aberration but went missing in
    the fight.`;

    irene.opinions.isOpinionated = false;
}