import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupShimarin()
{
    const c = new Character(NpcId.Shimarin);

    c.core.name = "Rin Shima";
    c.core.imgPath = "character_tokens/C1/Arc2/shimarin.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);

    c.card.addCardTag(`Deceased`);
    c.card.addCardTag('F81');
    c.card.addCardTag('From | Ruin');
    c.card.addCardTag('Allegiance | Ruin / Preservation');
    c.card.addCardTag('Race | Human');
    c.card.addCardTag(`Class | <span class='verbose'>Assassin</span> Rogue`);
    c.card.addCardTag(`Class | <span class='verbose'>Gunslinger</span> Fighter`);
    c.card.addCardTag('CR | 13');

    c.card.summary = () =>`
    An orphan adopted and raised by ${Character.get(NpcId.Lemuen).createLink()} who taught her sniping. Took it up as a job after 
    Lemuen got crippled. Worked in a team until ${Character.get(NpcId.Verrader).createLink("Verrader")} sold them out, 
    then worked solo. Was there, past midnight, when Ruin almost got complete - she made it back with 
    ${Character.get(NpcId.LogosPlaywright).createLink("The Playwright")}'s aid.`;

    c.card.story = () => `
<h5>Early Life and Capture</h5>
It is hardly unusual for a child to lose their parents at a very young age in the Castle of the Night, and so when her
parents went missing, eight-year-old Rin found a plenitude of odd jobs, not all very ethical, to support herself and 
her four-year-old brother ${Character.get(NpcId.Shimaken).createLink("Ken")}. Not all her employers were the most scrupulous,
however - and on one occasion, now 14 yrs of age, she found herself in the service of a sadistic, hateful and dangerous
(at least, so it seemed to her then) thug. For his amusement, he forced her to suffer from a round of 'Russian 
Roulette', and experience that deeply terrified and traumatized her. He then told her that he'd found the trail of a 
very dangerous assassin that had sniped one of his right-hand men. She was to go and sabotage their rifle with an 
explosive he gave.<br/>
This mission lead her to sneak into a remote alley which she learnt had been dubbed 'Saints Row'. Unfortunately, or
perhaps fortunately, she was woefully under-prepared - while she was quite adept in stealth, she didn't know a very 
important fact, all 'Saints' were bonded to their firearms. The minute she touched the gun, her target knew. Alarms 
went off everywhere, and she was surrounded in moments. As she was being apprehended, she couldn't help but notice 
how all of them were aasimar who looked noble-to-a-fault and had halos and wings hovering around them that appeared
like light reflected on a crystalline surface. ${Character.get(NpcId.Mostima).createLink("One of them")} however, also
seemed to have the black horns and tails of a fiend. She seemed a lot less noble, and so to Rin a lot more unnerving,
more like a street thug she was used to instead of a divine being like the others.<br/>
When her blindfolds were removed, she found herself in a cell. Sitting next to her, with her gun on her lap, was the
${Character.get(NpcId.Lemuen).createLink("famed sniper")} she'd heard so much off. Her kindly - almost jovial - demeanour
completely shocked Rin. She seemed not a bit mad, merely amused and curious. The stark contrast between her target,
supposedly her enemy, and her employer cracked something deep inside of her. She completely broke down, after half a 
decade of keeping it together while living through hell, she - in the midst of hyperventilation and sobbing - unloaded
all that her soul had been burdened with at that point. Lemuen heard her whole tale soberly - Rin couldn't help but 
notice how Lemuen's face hardened when she got to her latest employer. When she was done, with a very comforting hug, 
Lemuen said she and a few others would leave this colony to diffuse the trail on her. She asked Rin to come along 
with them for now. Lemuen herself would train Rin to make her strong enough to go back and retrieve her brother. Rin
gratefully agreed, though she was sure she hadn't been offered a choice (which made her more happy than 
it should have).<br/>
Lemuen said the ones coming with her would be her half-sister and 
${Character.get(NpcId.Fiest).createLink("her boyfriend")} - a human guy they'd met here who 
used to work on making and maintaining their firearms and other equipment. Also, it turned out the 'half-sister' was
none other than the half-fiend Rin had noticed earlier. Her earlier assessment was spot on, she was way rougher than
Lemuen - at least superficially. Though with Lemuen, Mostima too completely let down her guard and was cheerful and
relaxed. The four of them moved into a very secure, and quite cozy, bunker-like place where the two sisters trained
her with firearms - Lemuen with rifles and Mostima with handguns. Despite their light-hearted natures, Rin couldn't
help but notice the two were <i>very</i> good with weapons and infiltration. These were not skills someone acquired
with experience on the street, but the result of a careful training regimen drilled into elite squads of the 
strongest militaries.
<h5>Becoming a Sniper</h5>
A year later, while she was getting anxious to rescue her brother already - the lingering fear that she wasn't yet 
prepared to take on the monster that was her former employer continued to haunt her. Unfortunately, fate wouldn't 
leave her a choice. In their year together, she found out a lot about them - at least about stuff they were willing 
to share. The two had come from the material plane. Their father had turned away Mostima who'd sought him out, 
denying that she was his child, and Lemuen had left him to live with her. The two of them had then begun to manifest
the powers of 'Saints', which had lead a certain organization to seek them out. The others they were living with were
part of their old squad. Their squad had apparantly been charged with some mission in a place deep under the surface
of their 'planet' known as the underdark. While there, the trails of some relic of the past had unwittingly led them
right into a perpendicularity which had led them stright into the pits underneath the castle - where, ever so rarely,
Atium could be found. Mostima had recognized this as the place where her mother had long ago been summoned from, and
when the group had learnt they could return, they had established themselves here - awaiting any orders that may come 
someday.<br/>
And so, after a year, Rin was deeply troubled when she saw their leader arrive at the doors of their bunker. No 
order had come, but he'd finally found a trail of the relics that had lead them in this castle in the first place. 
While the mention of the relics didn't really give the sisters a great deal of happiness - for they were the reason 
all of them were struggling within the Castle of Death himself instead of chilling in Terra Prima - they would not 
disobey orders, even if it was uncertain if the chain of command still applied. Plus even they knew the supposed power
of those relics, and the importance of recovering them. And so the three of them set out, leaving Rin alone in the bunker.<br/>
A few days later, a familiar - though tired - knock on the door of their bunker was heard. Nervous with excitement, 
but a bit apprehensive, Rin opened the door... and was shocked to find an abosolutely worn down Mostima, covered 
with blood, halo and wings turned dark black, carrying an unconcious Lemuen inside. Fiest followed her with a haunted, 
horrified look. Neither would explain any details, except that Lemuen would survive - though probably had lost the 
use of her legs - and that Mostima would stay away from guns henceforth, and they would never see the other aasimars
again. And so the full reality sank into Rin, the only 
way to survive now was for Rin to take up Lemuen's job. She was not particularly skilled in anything else, save 
stealth and theivery, but that would never earn enough for the five of them, and none of the others could work. But 
before that, she needed to sort out her own demons, her own moral quandries. She had seen much, true, had been 
hardened by life, true, but living with the sisters had made her aware that she couldn't just close her mind and 
kill. If she went down this path, there was no looking back - and so she had to be absolutely certain that not an 
iota of doubt or regret survived within her. She had to 'kill' her heart completely.<br/>
So after forcing Fiest to make some 'special preparations', she set off to rescue her brother. As she reached the 
doors and corridors of her former employer, she noticed so many weaknesses in his defenses - stuff she'd never 
noticed before. Security that seemed impregnable before seemed trivial now. One year of training had put her on a 
level far beyond this. In fact, she probably could've stormed in here even after two months of training. She realized that 
the person she had feared as a 'monster' before was no more than a petty criminal. Of course the mission he'd sent 
her on was doomed to fail, a mission far beyond his means, a mission against true 'monsters'. A lucky break had put 
him on their trail, and he was too low-level to even fathom how foolish pursuing that trail was. Well he'd know now,
she thought savagely as she finally walked into his room - the wretched man called out for help, but none would come. 
None could come. She took out her revolver, made sure it was full, then took out one bullet as she headed to him, 
spinning the chamber.<br/>
In his defense, he found some backbone somewhere, and flat out declared - despite being terrified - he would not 
play any games, she could just shoot him and get it over with. But she'd not come here to kill him, she'd come here 
to die. The others would manage somehow. But if she survived this night, a lot of people would die - some innocent, 
some undeserving of death. If God didn't want that, now was the time to stop her. She put the muzzle to her own 
mouth and, as her former-boss looked on - stunned and aghast, she pulled the trigger.... and was still alive. 
Deep down, at that moment, she swore she could hear reality around her itself chuckle softly. Well, if 
that's what God desired, who was she to deny Him. She would do what she did best, and would mourn every single time, 
but then do it again. After the resolve sank in, she turned to her former boss, still crouched in a corner - eyes 
betraying pure terror - as she emptied the other five bullets in his brain.<br/>
With that done, she went to find her brother, her iron mask cracking as she tried to imagine the look of horror
that would paint his face from living a year in this hell alone. But she was wrong. Her brother, while a bit wiser 
and hardened now, looked as pure and optimistic as the day she'd left him. That moment she realized her brother held
on to something she'd just killed in herself a few moments ago. Hope. Hope for a better future even while standing 
in utter darkness. And the courage to act for it, despite all odds. Standing there she could feel him shine so bright
that she actually squinted her eyes. And that's where she found her purpose, she would stalk the darkness and deal 
with threats and obstacles there while her brother sought the light.
<h5>Against the troupe</h5>
The years that followed did see life change for them all. Lemuen who'd been paralyzed below her waist was recovering 
under the patient care of Fiest and continued to train Shimarin in the art of sniping. Shimarin chose to become part
of a crew to persue bigger contracts, however that ended when 
${Character.get(NpcId.Verrader).createLink("one member of the crew")} betrayed the others for personal gain,
only to find he himself had been deluded by their 'fixer' - what resulted, therefore, was all of them drowing in 
magma, except Shimarin, who was covering them from a distance. Of the rest of the crew, only the traitor survived, 
gaining nightblood at exactly that point. This was something Shimarin learnt much later though, however she never 
again would work in a crew. During this time Mostima had started to go missing for large amounts of time, and only 
to her sister would she confide the details of her 'journeys'. Shimarin couldn't help but notice that her mood had 
stablised and improved considerably, and she seemed to have gained expertise in time magic after her frequent 
travels - though she didn't pry into more details. A few years later, Lemuen to passed away from her nightblood 
leading to great loss of morale in the bunker. Yet Mostima had done something before the death, and Rin 
could feel something was off, the death 'felt' unlike the others she'd seen. A few years after her 
death, they were joined by a tiefling, who remained in hiding from the demons in the castle. The kindest person 
they'd ever met, he had taken a liking to her, despite herself. As life looked a bit better, in the years to come, 
she took many high profile contracts - and didn't ask questions. Some even came from almost mythic figures - like
once when the troupe ${Character.get(NpcId.Mouthpiece).createLink("Mouthpiece")} himself asked her to kill a certain Vulpine soul weaver. <br/>   
In all her missions
she always followed one unsaid rule - after killing the target, she could also kill any one person near them of her 
choice. That prevented her from being a mere pawn, a mere tool - and drove away a lot of petty schemers from her who
regarded her as too much of a wildcard while attracting clients who wanted people dead for personal reasons but
weren't strong enough to challenge them. For around such people, it was unlikely she'd want to kill a passer-by. 
These were the clients she favoured, for their targets were almost always people the world was better off without.
Unfortunately, this tradition of hers backfired badly one day - she was told by the mouthpiece that a group of people might 
be coming from the gardens, and may be accompanied by some members of the troupe. If a drow priestess was among them,
she was to die. She did die, yet Rin found another drow - probably still a teenager, with them. A member of the 
troupe, having failed a mission - Rin didn't envy her and wasn't surprised when she asked her captors to kill her. 
Of course, they refused, but then they didn't know the castle, didn't know the troupe, the mouthpiece. Better by her 
bullet then at their hands, better in Preservation than in Ruin, she thought, as she fired again. And so, her last 
thoughts were of peace, of being re-assured by the hulking barbarian. She didn't even know when she died. Enviable, 
Rin thought coldly, as she packed up and went back home. What she didn't know was that she had disrupted one of the 
major schemes of the troupe and triggered of a cycle of vendetta's and mutual destruction.<br/>
The next day, the demons had captured the tiefling - and planned to burn him in a pyre of hellfire for some made up
crimes. Given how stupid demons at this level were, Rin had no doubt they had been assisted, and little doubt as to 
by whom. Well, she was not stupid enough to go into an execution ground, but she wouldn't let him suffer in hellfire. 
Strangely enough, and almost as a mockery, she'd also got another assassination contract from the troupe - a junior
had delivered it this time - that she was to assassinate the executioner. But then something changed all the plans 
- the same group of adventurers (she'd helped them earlier that day), had taken it upon themselves to resuce the guy.
She was excited, and for once in a very long time dared to hope as she covered them as they escaped. Sadly, the 
castle was not a place where hope can live, and with a deep horror, she realized that the party was cornered - and 
by none other than ${Character.get(NpcId.Baphomet).createLink("Baphomet")} himself. There was no way out of this, and so she did what she had planned before, and
put a bullet into her friend. Something which, by the tears in his eyes, he knew was coming.<br/>
After that, she decided to bite back at the troupe by taking out their most valuable piece, someone she knew they 
had big plans for - ${Character.get(NpcId.Lucian).createLink("The Solitaire")}. Things didn't go as planned however,
and instead she ended up in the fortress of the inquisitors, gaining an Atium spike and a Steel spike powered by 
Verrader's soul followed by heading right past midnight into a showdown that involved more myths and legends than 
she could even dream of - all the Guardians with Preservation himself in the mists, eight senior inquisitors moved
by Ruin himself (who was also moving her - despite her best efforts), 
${Character.get(NpcId.LogosPlaywright).createLink("The Playwright")} and the Mouthpiece and lastly 
${Character.get(NpcId.Sanguinarch).createLink("The SanguineArch")} along with two other higher vampires. Finally, 
there was one other - a single Honorspren who stood next to her, waiting, and had gone unnoticed by all...  
`;

    // [NpcPersonalityTag.Confident, 3],
    // [NpcPersonalityTag.Bloodlust, 3],
    // [NpcPersonalityTag.Pessimist, 2],
    // [NpcPersonalityTag.Quiet, 2],
    // [NpcPersonalityTag.Ascetic, 2],
    // [NpcPersonalityTag.Stern, 1],
    // [NpcPersonalityTag.Kind, 1],
    c.card.finalize();
}
