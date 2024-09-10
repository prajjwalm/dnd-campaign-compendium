import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupMandragora()
{
    const c = new Character(NpcId.Mandy);

    c.core.name = "Mandragora";
    c.core.imgPath = "character_tokens/C1/Arc2/mandy.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag('F76 (16)');
    c.card.addCardTag('From | Materia / Ruin');
    c.card.addCardTag(`Race | Ursine`);
    c.card.addCardTag(`Nightblood | Stoneward`);
    c.card.addCardTag('CR | 16');

    c.card.summary = () =>`
    A criminal and gang/cult leader, she was well known and feared throughout the lower levels of the castle for 
      being a very advanced case of nightblood. It gave her powers to manipulate stone, something which also made 
      her near impossible to kill, while completely sapping her of human emotions like empathy, making her a 
      psychopathic killing machine. Seemed to be researching some clues regarding the plane of the earth a 
      ${Character.get(NpcId.Ebenezar).createLink("particularly adept spellcaster")} had left behind but was thwarted by a 
      group of adventurers who handed her research to ${Character.get(NpcId.Verrader).createLink("Verrader")}.`;

    c.card.finalize();
}
