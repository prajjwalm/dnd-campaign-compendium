import {NpcId}     from "../../../../../data/npcIndex";
import {Character} from "../../../Character";

export function setupLesley()
{
    const c = new Character(NpcId.Lesley);

    c.core.name = "Lesley Aeternus";
    c.core.imgPath = "character_tokens/C1/Arc1/lesley.png";
    c.core.finalize();

    c.card.addCardTag("Deceased");
    c.card.setCampaignArc(1, 1);
    c.card.addCardTag("F2860");
    c.card.addCardTag("CR | 18 / 24");
    c.card.addCardTag("From | Shadowfell / Materia / Preservation");
    c.card.addCardTag("Allegiance | Preservation");
    c.card.addCardTag("Race | Higher Vampire");
    c.card.addCardTag("<span class='verbose'>Chronurgy</span> Wizard / <span class='verbose'>Knowledge</span> Cleric");
    c.card.addCardTag("Time Command");
    c.card.addCardTag("Faction: Projectors");

    c.card.summary = () =>`A rich higher vampire mage with powerful time control powers. Came to The Gardens after a failed attempt to
      kill ${Character.get(NpcId.Caelynn).createLink("Caelynn")}. Lived for two millennia there as her closest friend/advisor. Detested 
      her family and avoided using her higher vampiric and bloodline powers. Instead, spent all that time cultivating her arcane skills,
      becoming a highly skilled mage/enchanter over time. Her skills eventually becoming so well known in the right circles that clients
      from various planes would give her contracts to research new spells or enchantments at their direction.<br/>
      In her time during the gardens, she took on two students - both of whom left her after their training was complete. One, 
      ${Character.get(NpcId.Ebenezar).createLink("a human with whom she was romantically involved with")}, eventually ditched her to 
      persue lichdom and delve deeper into the arcane. The other? Well ${Character.get(NpcId.Mostima).createLink("that fallen angel")} was 
      clear from the start she wouldn't stay there forever, but would continue to occasionally drop in for a cup of tea, before 
      disappearing off to God knows where.<br/>
      In her last days, she went one step further and even stopped feeding on blood entirely. While a laudable step, it
      took a toll on her mental health, and though she didn't cause trouble to anyone, her resolve failed her when an 
      ${Character.get(NpcId.Lucian).createLink("assassin in black")} finally came for her life. But by some twist of fate, she had forged a
      bond with a person who was supposed to be her judge, jury and executioner - but he had deemed her not guilty. And via that bond...`;

    c.card.story = () => `
<h5>Early life</h5>
All higher vampires are aristocrats, served upon - should they require it - by their thralls and other creatures of 
the shadowfell. However, even among them, the Aeternus family - one of the oldest - was highly feared and regarded,
since their blood granted them command over the flow of time itself. As such, as their youngest child, Lesley 
commanded fear and respect before she was even old enough to know what the words meant. It would be long before she
would learn what respect meant, but unfortunately what fear was became clear to her very early in life.<br/>
For most higher vampires also share a particular trait - while their bodies are ageless, and can only ever grow 
stronger - old age is marked as their mind begins to slip. Not in terms of stupidity, loss of wisdom or weakness
of will - no, a higher vampire could <i>never</i> be weak. It slips in terms of balance and stability. Elder vampires
of aged minds are extremely paranoid and easy annoyed. They become desperate for solitude, and suffer in every word
they speak - as if every single word would bring them one step closer to insanity. They also turn into extreme 
psychopaths - it is said in the shadowfell that should any creature save another higher vampire even approach within
a mile of them, even unwittingly, they would instantly kill them for offending them with their existence. Ultimately,
this is what keeps the population in check, for only another higher vampire - or another titan - can truly kill a 
higher vampire.<br/>
Unfortunately, for child Lesley this meant she had to bear witness to mind-numbing amounts of domestic violence as
she grew into her teenage years (i.e., was a century old), to the point where one of the parents ripping out the 
head of another would just draw a vacant dead glance from her, before she went back to reading her books. Her sole 
comfort was in her elder brother, who taught her to use the powers of the bloodline - who stood by her - taking the
brunt of the shit - as her parents seperated, each cocooning up in their subdomains, never to be disturbed again. 
However, that strain was too much for him too, and on one - only one - occasion, he snapped violently at her. 
That once was enough, she fled from the realm, never to look back again.
<h5>Meeting Caelynn</h5>
In Materia, Lesley took shelter in the vast city of Ortus of Terra Prima. While the rest of the material plane was 
still using bronze, and in some cases, stone tools. Veteres had already moved on to iron, cement and even niter. 
Ortus was quickly regaining the glories of times past, Lesley was certain they would learn steel-craft soon too. 
That glorious, densely populated city was the perfect dream. Books that were a rarity in Shadowfell were present in 
thousands in the many libraries here. Poets and scholars blossomed in great numbers. Conversation with any stranger 
was a pleasure. Lesley finally relaxed herself, took the persona of an author and set herself free...<br/>
 Sadly, with all the pent-up darkness within, setting herself free was the most dangerous thing she could do. Soon
she began to develop a taste for blood, something she'd never had before she came here, which before she knew it 
was a crippling addiction. But unlike her ilk, she avoided violence, avoided killing, making thralls. It reminded her
of her family, her kind way too much. The very thought disgusted her. For that matter, so did her addiction, but try as
she would, she couldn't let go - her darkness returned stronger than ever every time she tried to step away, and what
was a thing of pleasure soon became a necessity for being able to function.<br/>
It was at this time that she made friends with a rather nice guy, Nohadon, a person who would one day be regarded as one of 
the greatest thinkers of the early classical era. To Lesley however, a person who would have been a God-sent company 
once was now just an object of depraved anticipation. As she softly smiled and discussed ideas with him, she would 
internally be picturing the oh-so-satisfying look of horror as she turned to feast upon him. However, there was just
one snag - a random noblewoman, who seemed too smart for her own good, seemed to have caught on to something and was
time and again thwarting Lesley's attempts to isolate the guy. Finally, Lesley had had enough, for the first time 
she felt too pissed off to care about her heritage. She would get rid of this meddling arrogant bitch who had no idea
what she was facing.<br/> 
Unfortunately, as she lay - a decapitated and bloody mess - tangled in a bunch of thorny vines, she found out 
the situation was reverse, and it was her who had been utterly deluded. It was at this time that reality of what
she was trying to do finally dawned on her - she was turning into the same people as those she had detested the 
most. And so, instead of fleeing and disappearing like the noblewoman advised, she went back to resume her life,
drawing an angry glare from her more than once. As time passed, she learnt to function, to curtail her bloodlust 
and just... function. Gradually, her time spent with Nohadon turned 
considerably more honest, pure and, strangely, fun. The noblewoman too, Lesley learnt her true name was 
${Character.get(NpcId.Caelynn).createLink("Caelynn")}, began to warm up to her. Her nightmare was again turning 
into a dream... until her brother came.<br/>
Everything shattered, utterly broken and traumatized by what proceeded, that very night Lesley assaulted Nohadon and fed
on his lifeblood. As her suppressed addiction returned with a vengeance, she sucked out more and more - further than 
she'd ever gone before - to the point where she could've killed him at any point. But thrilled, anxious, she wanted 
to pleasure herself more before she did that finale - she wanted to forget everything... but found she couldn't. From
where she couldn't fathom, but the awful grace of God seemed to have fell on her. She couldn't lose herself, couldn't 
pretend she enjoyed this - as she finally opened her eyes and faced what she was doing. Aghast, guilt seized her, 
choked her. He wasn't dead yet - but there was nothing she could do to help him at this stage. Yet she tried, weeping
and broken, she tried - but could only watch as the life left him...<br/>
Until a single word forced the life back into him, a single word from Caelynn, more pleasant than any she'd heard her 
whole life. A word that carried mana considerably stronger than she could ever summon. That was when Caelynn told her 
everything - including about the place where even <i>her</i> family could never reach her again, a place where a group of 
eight could well take on a higher vampire, a place where the leaders were evenly matched against 
${Character.get(NpcId.Sanguinarch).createLink("The SanguineArch")} themself...
<h5>Ebenezar</h5>  
Lesley's time in Bunker#371 was satisfying, not entirely perfect - but as happy as a penance could be. Happier than 
she felt she deserved anyway. And while the blacksmith and his wife pissed her off, subtly reminding her of her 
family, Caelynn was a pure pleasure. Plus even ${Character.get(NpcId.Irene).createLink("an inquisitor")}, who had been 
so adamant that Lesley was a criminal, that there was something off about her - until Lesley had revealed
her heritage, was becoming a great friend. And so she was sure she wasn't lacking in any way - until she met 
${Character.get(NpcId.Ebenezar).createLink("Ben")}. A human 
boy who'd stumbled into a perpendicularity by accident (well he'd drowned in there), the teenager was solemn far beyond 
his age. And his eyes seemed so <i>tired</i>, eyes that had seen way too much. Seeing a boy that dead inside reminded 
Lesley of times long past, times before she'd tasted human blood, times when she still looked up to her brother... 
she pleaded Caelynn to allow her to take him in. After her approval, as Ben came to live with them, Lesley found out
that there was one thing which still excited him, one thing that made his eyes shine like a child's again - magic.<br/>
He'd watch wide-eyed with wonder at every experiment Lesley did, ask about every potion she concocted, be amazed by
every spell she cast. Flattered by being the subject of such innocent, genuine praise, she offered to teach the kid 
her ways. He readily agreed, and Lesley watched with pride as this new purpose brought life back into him. His mood 
improved considerably, he turned to cooking and painting as hobbies, became the best friend of everyone in the 
bunker, and before long was the glue that held them all together. A slight voice deep inside Lesley made her worry a
bit on how <i>passionate</i> the boy was about learning, every day in a land where all were immortal, and so 
preferred to maintain a very healthy work-life balance (often bit a bit more emphasis on the latter), the kid would 
easily be studying for over 13 hours a day. What was her ward studying that hard for, Lesley couldn't help but wonder, 
but helped him the best she could anyway.<br/>
Less than two centuries later, her teaching and his studying turned into both of them researching together, as the
boy's skills began to rival hers. She also became aware, partly from the teasing of others, that the boy seemed to be
developing feelings for her - feelings she felt she could, probably did reciprocate. Yet despite being over two 
centuries old by experience, his body was still that of someone in their late teens. So, his request of being allowed
time to roam Materia, more specifically, his home planet terra - was met with approval by all. Caelynn did warn her 
however that something felt wrong in the kid's eyes as she had approved, so Lesley secretly spiked one of his drinks
with a pinch of her blood - it would let her know if he ever died.<br/>
He went out more than two dozen times over three centuries, and Lesley was sure her fears were unwarranted, when 
suddenly her blood froze - Ben was dead! As she immediately prepared herself to project, the connection was 
re-established, and so she had no idea what happened. If she had trained her vampiric abilities better, instead of 
leaving them sealed and forgotten until the rare occasions that required them arose - she might've known he'd turned
to Lichdom. But as it happened, she merely assumed there was some disruption and relaxed herself. Afterwards, he did
return to the bunker, but continued to go out steadily back into the material plane. As his skills surpassed hers, 
he also began to become distant, and would at times rebuke her for being too clinging - something very unfair, and 
something he'd never say before, but also something that struck a deep insecurity within her from her childhood days, 
and shook her to the core.<br/>
While their relationship wasn't quite perfect, they still were happy - or at least so Lesley felt. So when she was 
devastated when he declared he needed to go into the castle. Though he promised he'd return, she knew it was over 
between them. Maybe she should've stopped him, but old instincts took over that would not allow her to 'look' weak. 
So instead she, perhaps a bit coldly, said she was ok - but insisted he take a very particular 'watch' with her. With 
him gone, Lesley finally broke - and old habits returned. However, this time she was wise enough to not drink wantonly, 
but only from someone who could overpower her if she lost control - someone who was also close to her. While the 
others always kept encouraging her that he would return - he had learnt magic strong enough to open perpendicularities
- her blood already had told her he was dead for good. So she drank. Hating herself, she continued to drink, and 
drink, and drink (becoming the reason for Caelynn to appear even paler than her natural complexion).
<h5>Forgiveness</h5>
The first break from her relapse into darkness was when people said a 
${Character.get(NpcId.Mostima).createLink("mysterious girl with temporal control")} had shown up and wanted to be her ward.
Though she was in no mood to, Caelynn forced her to take her as a student, something Lesley thanked her for later.
But the final reprieve came when, a few decades later, Caelynn brought home a group of guests - one of them an aasimar paladin,
of an oath high enough to be a full knight radiant. From the first day, he could feel something was off in the 
bunker. He would find her, she knew, and while she could kill him, she found herself unwilling to. Her past had 
finally caught up, judgement was here, and with her addiction resurfacing, she couldn't find it in herself to try to 
hinder it. She didn't want to die, though and tried hiding her true nature until hiding it was virtually equivalent 
to killing him. For he'd conjoined two powerful relics, one from the castle and another from the Guardian of magic, the 
latter sealing the essence of the Primordials and being watched by Ruin himself. He was taken by surprise and 
couldn't resist it. He would die before the split-second was over. No one else had noticed yet - and wouldn't before
it was too late, but even the best of them didn't have the reflexes of a higher vampire - nor the strength.<br/>
So betraying her true nature, to the shock of many, she broke the conjunction and pulled him out to safety. It was 
not a plea to spare her life because she'd saved his. No, this was no bargain, no trade deal. After preparing herself
and wrapping on restraints to suppress her vampiric powers, she stood before him. With the secret out, she answered
all his questions honestly, and closed her eyes, bracing for the end. Yet he wouldn't strike. While he made it clear
he didn't fully trust her, she had to be sure he <i>meant</i> it when he chose to spare her. So she asked him to 
break the restraints she had on - and stand before her in her unrestrained vampiric powers, which he did. Bless the
man, he did! And so, knowing that they would be heading into the castle - she gave him her vampiric sigil - a token 
of trust beyond what most mortals could comprehend. It gave him powers like her own which would surface if, and only 
if, needed. It also lent the authority of her family to him, and gave him the power to truly kill her for good. Such
a need didn't arise, however. But the group did contact her to confirm Ben was gone (via a device he'd left 
behind), but she knew that already. Still, when Caelynn told her all the Guardians were heading there, and were 
likely to run into them, she was all too glad to be a part of that group, even if it meant running into the 
SanguineArch themself...`;

    c.card.finalize();

    c.opinions.isOpinionated = false;
    c.opinions.finalize();
}