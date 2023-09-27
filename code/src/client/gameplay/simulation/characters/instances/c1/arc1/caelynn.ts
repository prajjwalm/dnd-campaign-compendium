import {NpcID}         from "../../../../../data/npcIndex";
import {Character}     from "../../../Character";

export function setupCaelynn()
{
    const cae = new Character(NpcID.Caelynn);

    cae.core.name = "Caelynn Nailo";
    cae.core.imgPath = "character_tokens/C1/Arc1/caelynn.png";

    cae.card.setCampaignArc(1, 1);
    cae.card.addCardTag("F4560");
    cae.card.addCardTag("CR | 25");
    cae.card.addCardTag("From | Materia / Preservation");
    cae.card.addCardTag("Allegiance | Preservation");
    cae.card.addCardTag("Race | Half-Elf");
    cae.card.addCardTag("<span class='verbose'>Circle of Dreams</span> Druid");
    cae.card.addCardTag("Guardian of Life");
    cae.card.addCardTag("Atium Savant");
    cae.card.addCardTag("Faction: Watchers");

    cae.card.summary = () =>`Born in the last years of the heroic age, fled into The Gardens due to an accidental encounter with the Fifth
      Nightmare. Being extremely gifted, she received guidance from various orders - often from Guardians themselves.
      Was once close to ${Character.get(NpcID.TraitorOthello).createLink("The Traitor")}. Currently leads the people of the Garden
      as the Guardian of Life. Now an Atium savant.`;

    cae.card.story = () => `
<h5>Early life</h5>
Caelynn Nailo was born in ? during the years that marked the end of the Heroic Age, and the onset of the Silent Age. 
Born in a university to a family of accomplished and well renowned scholars, young Caelynn had led a protected - 
almost pampered - life. A life that, along with her natural gifts, had allowed her to dream, to reach for the stars,
to set out near impossible goals and achieve them. Unfortunately, this self-confidence and ambition were dormant 
seeds of tragedy that finally bore fruit in the years that heralded the Silent Age.<br/>
And so it was, that one day she found everyone she knew - her family, her friends, her professors - all massacred. 
As she stared into the essence of The fifth, a horror she could not yet fully 
comprehend, she <i>knew</i> it would be her next - and welcomed it, for even in her broken mind she knew she had
caused all their deaths. But the powers that be had decided it was not time for her to die yet.<br/>
In this case 'the powers' took the form of a single man who had escaped the slaughter and fought back the horror to
protect her. A man she knew as the HoD of botany, someone she'd never really felt bold enough to interact with. A 
man who, as she would learn soon, couldn't dream. Another thing she would learn soon was that he came from a 
different universe - a garden - and went by the title of 'Guardian of Life' there...
<h5>In the Garden</h5>
When she entered the garden, she was a different person. Fate had broken her, but she had stood up again and filled 
the cracks with something stronger. Gone was the childish optimism, the vanity. It was replaced by singular purpose -
to ensure that none would suffer at the hands of those from without as she did. To ensure that she could, would 
protect as she had been protected by ${Character.get(NpcID.Vahareth).createLink("Vahareth")}. Before long, she was 
regarded as a prodigy there too - with the different orders of Watchers, Inquisitors and Scholars training her and 
vying for her to join them. Yet there was little surprise when she chose to join the Watchers - after all she was
virtually Vahareth's daughter - lived in his bunker, trained under him personally, and had the same cold steel gaze
that could unnerve the most confident of men.<br/>
Being so close to power and being the center of attention of so many orders meant that she met a fair share of 
important people from different orders. One among them was the apprentice of the Guardian of Defense, 
${Character.get(NpcID.TraitorOthello).createLink("Othello Titanborn")}. The gardens, because of their extremely low but <i>very</i>
highly skilled population, would typically send out squads of two people for most operations - and Caelynn and 
Othello were often together because of their complementary skills but aligning personalities. The two began courting
and were a happy couple for quite a few decades. However, that was not to last, and the forces that had broken 
Caelynn before would soon break her again...
<h5>The Betrayal and Bunker#371</h5>  
One day, Preveservation was ablaze with the news that everyone in Bunker#17 had died. When it reached her ears, she 
was terrified, for that was where Othello lived. Upon reaching there, however, she recieved even worse news from the
Guardians of Order and Life who were inspecting the site. He was not dead, he was the one who had killed them all, 
with the assistance of a mysterious group of assassins from the Castle of Ruin known as 'The Troupe' and escaped there
with them following the slaughter. His motives were unknown, but the evidence was irrefutable. This evidence included
a prisoner, whom Caelynn, under the superivision and command of the Guardian of Order, tortured and 'practiced' 
hemalurgy upon.<br/>
The shock of betrayal, overwhelming sense of abandonment and trauma of hemalurgy sent Caelynn into a downward spiral.
She would do all future operations alone, with Machiavellian maneuvers executed with utter ruthlessness. And so she
spent almost two millenia in the service of Preservation. Until during one of her last operations, she came face-to-face 
against a higher vampire in the streets of Ortus, a major capital of a planet in Materia. While they were antagonistic
at first, in her eyes Caelynn saw the same look as herself - to be more precise, the same look following both the 
times life had broken her. This girl, she knew, had seen abandonment, loss and regret, and little else, as she too 
slid downwards in a spiral of her own demons. Despite herself, Caelynn did keep a close eye on her anyway, and so was there to see 
when finally the vampire resisted against the spiral, resisted against instincts Caelynn knew were more powerful, 
more primal than she had ever faced.<br/>
That moment had moved her to a degree much more than she could anticipate. Buried regrets deep inside came out at 
last, and so she, for the first time after Othello, reached out to someone. And so she returned to the Gardens with
${Character.get(NpcID.Lesley).createLink("Lesley")} in tow. The two soon grew very close, also starting to work together on
operations. A few decades later, as her date of graduation from field service arrived, her collegues gifted her an
${Character.get(NpcID.DaveRuhl).createLink("automaton")} to help defend her in close range. And so the three of them started 
Bunker#371, and remained its sole members for one and a half millenia. Until finally Caelynn was there for someone
the way Vahareth had been for her - an elven girl, ${Character.get(NpcID.Lia).createLink("Lia Mistcloak")}, who
was 'taken' by the second. A few centuries after, Lia was to get married and
${Character.get(NpcID.Ulrich).createLink("her husband")} too moved in. Again after a few centruries Lesley decided
to 'adopt' ${Character.get(NpcID.Ebenezar).createLink("a human boy")} whose soul seemed burdened in the same way that hers and 
Caelynn's once had. As Caelynn approved, it finally struck her that her lone wolf days were a thing of the long 
past - and once again she felt warmth in the company of others. It was when this happened that Vahareth finally 
decided to name her his apprentice formally, meant to succeed him as guardian. Since then there were a few ups and 
downs - like Conley joining and Ebenezar abandoning Lesley - an act of remarkable
parallel with the way Othello once had her, but with each other for support, they weathered all that came.
<h5>The hour of Loss</h5>
A few days before the hour of loss, Caelynn got notified of a threat that required at least the attention of a 
Guardian apprentice. On arriving the scene, she found a group of adventurers, of whom 
${Character.get(NpcID.Lucian).createLink("all but one")} were peacefully slumbering around a mistflame. The one not 
slumbering seemed to be raving, and on his neck, she could see a Nightblood inhibitor. She knew what that meant -
and the people who could venture outside the castle were typically very dangerous - the 
only ones she'd heard of were members of the troupe, steel inquisitors or the demon lords. The mist clung to him, so 
he wasn't hemalurgically enhanced. A demon lord wouldn't ever wear an inhibitor, so that left...<br/>
She was about to raise the alarm, when the inhibitor suddenly broke - and the person starting laughing in a 
particularly insane way. He then summoned some... aberrations(?), gave them some directions, made some preperations 
for the others, then... slit the throats of the aberrations until the mists tore apart from him, and then he slipped
through the realms, giving her - who was wildshaped into a sparrow - a knowing grin as he faded. There would be 
little point in chasing him, and while she wanted to get a hold of the knife with which he could 'kill' even in here,
something about his grin unnerved her, and she wanted to learn the motiviations of the others still asleep.<br/>
Which turned out to be a good idea, since their motivations were as noble as they come. As they willingly gave her 
the dagger, she allowed them to stay as guests in the bunker. They certainly did make their presence felt out there. 
They helped them in an odd variety of tasks, but what left her the most grateful for having them was that they
helped Lesley shed some of her demons. Yet something unnerved her, events were moving too fast for 
this realm. Circumstances which would have come in years came in days, and they would absolutely not consider the 
idea of not going to the castle, despite all her warnings.<br/>
So when the hour of loss finally came, she found herself anticipating it. Preservation was getting weaker since eons,
and of course <i>they</i> would take advantage of the imbalance between shardic powers. After helping her new guests
make it into the castle, she focused on rooting out the corruption that spread, yet this incursion was way more than
had ever been before. They did keep it at bay though, and while no more than half a dozen died in the Garden, the 
Gardens themselves were completely ravaged. Vahareth too decided to 'retire' to seek out the cause of this, leaving 
her as the Guardian of Life. Soon after she took power, her guests established contact from within the castle, a 
feat that required a great deal of magical power and skill. While she did wonder about it, as she did worry about 
them, this was not the time. The intel they provided strongly suggested that the cause of the rift was somewhere 
within Ruin's domain. And so all the Guardians set out to deal with it.<br/>          
Unfortunately, they were too late - by the time they had taken control, and crossed the midnight boundary to find 
themselves face to face with ${Character.get(NpcID.LogosPlaywright).createLink("The Playwright")} and 
${Character.get(NpcID.Sanguinarch).createLink("The SanguineArch")}, the primoridal nightmares were already free. 
Thankfully, all of them being in one place meant that a greater disaster was prevented. Even with all his inquisitors,
Ruin could not take on the five of them together. That meant he couldn't get the Atium, couldn't complete himself and
was evenly matched against the new Preservation, 'The Survivor'. But leaving the Atium stash intact was too much of a
risk, so they offered the adventurers to burn it all if they would like to, an honour for helping protect the entire 
multiverse from utter and imminent destruction. However, the adventures refused as they felt the Guardians were 
better suited for the power. They just wanted to have peace and quiet and leave the castle behind finally.<br/>
However, that was not to be. For one of them had been marked by The second, and the
Playwright's powers had bound their souls in their skirmish. And so, she once again lost a group of good people, 
people important to her, people who'd given her hope. There were already plans of war in motion. Of vengence, of
survival. Until now, they had tried to play nice, it had resulted in the death of friends, in the death of God. 
No more...`;

// [NpcPersonalityTag.Industrious, 4],
// [NpcPersonalityTag.Confident, 3],
// [NpcPersonalityTag.Outdoorsman, 3],
// [NpcPersonalityTag.Kind, 2],
// [NpcPersonalityTag.Optimist, 2],
// [NpcPersonalityTag.Ascetic, 2],
// [NpcPersonalityTag.Stern, 1],
// [NpcPersonalityTag.Abrasive, 1],
// [NpcPersonalityTag.Bisexual, 1],

    cae.opinions.isOpinionated = false;


}