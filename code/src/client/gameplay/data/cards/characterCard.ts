import {Character} from "../../simulation/characters/Character";
import {NpcID}     from "../npcIndex";
import {Card}      from "./card";


enum NpcPersonalityTag {
    "Outdoorsman",
    "Homebody",
    "Recluse",
    "Introvert",
    "Social",
    "Extrovert",
    "Early Bird",
    "Night owl",
    "Masochist",
    "Bloodlust",
    "Abhors Violence",
    "Gourmand",
    "Ascetic",
    "Paranoid",
    "Trusting",
    "Naive",
    "Greedy",
    "Jealous",
    "Psychopath",
    "Guilt-ridden",
    "Kind",
    "Misandrist",
    "Misogynist",
    "Abrasive",
    "Asexual",
    "Homosexual",
    "Bisexual",
    "Addict",
    "Recovering Addict",
    "Teetotaler",
    "Stern",
    "Judging",
    "Accepting",
    "Industrious",
    "Hard worker",
    "Lazy",
    "Slothful",
    "Sanguine",
    "Optimist",
    "Pessimist",
    "Depressive",
    "Arrogant",
    "Modest",
    "Confident",
    "Vain",      // as in someone who deeply cares about others opinions
    "Confrontational",
    "Conciliatory",
    "Insecure",
    "Nervous",
    "Volatile",
    "Neurotic",
    "Quiet",
    "Verbose",
    "Distant",
    "Full of Life",
    "Introspective",
    "Unwitting Hypocrite",
    "Hypocrite",
    "Abusive",
    "Suck-up",
    "Bibliophile",
}

interface CharacterArgs {
    name: string;
    id: NpcID;
    campaign: number;
    arc: number;
    tokenName: string;
    tags: string[];
    summary: string;
    description: string;
    age: string | number;
    altImagePaths?:  Map<string, string>;
    personalityTags?:  Map<NpcPersonalityTag, number>;
    tiesToOtherNpcs?: Map<string, string>
    gender: "M" | "F" | "-";
}

/**
 * @deprecated Use the character interface with the card aspect henceforth.
 */
export class CharacterCard
    extends Card
{
    // Shift to a collection class eventually? Also don't like how both this and
    // parent class have the same static thing. Now that we're taking this code
    // seriously, can we please clean this up?

    public readonly indexKey: string;
    private readonly name: string;
    public readonly id: NpcID;
    public readonly imgPath: string;
    private readonly altImagePaths?: Map<string, string>;
    private readonly personalityTags?: Map<NpcPersonalityTag, number>;
    private readonly summary: string;
    public readonly campaign: number;
    public readonly arc: number;
    private readonly description: string;
    private readonly tags: string[];

    public constructor(args: CharacterArgs)
    {
        super();

        if (Card.$commonCentralView == null) {
            throw new Error("Premature instantiation of class. " +
                            "The page isn't loaded yet.");
        }

        this.name = args.name;
        this.id = args.id;
        this.campaign = args.campaign;
        this.arc = args.arc;
        this.imgPath = `./assets/images/character_tokens/C${(args.campaign)}/Arc${(args.arc)}/${(args.tokenName)}.png`;
        this.indexKey = CharacterCard.getIndex(this.id);

        Card.$tokenSpace.find(`.token_space[data-campaign='${this.campaign}'][data-arc='${this.arc}']`).append($(`
            <img src=${this.imgPath} class="token" alt="[Img Not Found]" data-index-key="${this.indexKey}">
        `));

        args.tags.push(`Campaign ${this.campaign} ${Card.verbose(`Arc ${this.arc}`)}`);
        args.tags.push(`${(args.gender)}${(args.age)}`);

        this.tags = args.tags;
        this.summary = args.summary;
        this.description = args.description;
        this.altImagePaths = args.altImagePaths;
        this.personalityTags = args.personalityTags;

        Card.register(this);
    }

    private static getIndex(id: NpcID)
    {
        return `[character|${id}]`;
    }

    public static linkNpc(id: NpcID, displayText: string)
    {
        return Card.link(CharacterCard.getIndex(id), displayText);
    }

    public generateCard(floating: boolean): string
    {
        let tokenSpace: string;
        if (!floating && this.altImagePaths) {
            tokenSpace =
                `<div class="tokens">
                ${Array.from(
                    this.altImagePaths,
                    ([name, filename], index) =>
                        `<img src="./assets/images/character_tokens/C${(this.campaign)}/Arc${(this.arc)}/${(filename)}.png"
                          class="token" 
                          data-token="${filename}"
                          alt="[${name} Img not found]"
                          ${index == 0 ? "" : 'style="display: none;"'}>`
                ).join("")}
                </div>
                <div>
                    ${Array.from(
                    this.altImagePaths,
                    ([name, filename]) => `<span class="token_selector" data-token="${filename}">${name}</span>`
                ).join("")}
                </div>`;
        } else {
            tokenSpace = `<img src=${this.imgPath} class="token" alt="[Img Not Found]">`;
        }


        let personalityTags: string;
        if (this.personalityTags) {
            personalityTags =
                `<div class="personality_tags">${
                    Array.from(
                        this.personalityTags,
                        ([tag, intensity]) =>
                            `<span class="tag leveled t${intensity}">${NpcPersonalityTag[tag]}</span>`
                    ).join("")
                }</div>`;
        } else {
            personalityTags = "";
        }


        return `
        <div class="character_card" data-index-key="${this.indexKey}">
            <div class="token_space">
                ${tokenSpace}
                ${this.altImagePaths ? `<div></div>` : ""}                        
            </div>
            <div class="content">
                <h5 class="name">${this.name}</h5>
                <div class="tags">${
                    this.tags.map(x => `<span class="tag">${x}</span>`).join("")
                }</div>
                <div class="details">${this.description}</div>
                ${personalityTags}
                <div class="summary">${this.summary}</div>
            </div>
        </div>`;
    }

    public get isVillageNpc()
    {
        return [
            NpcID.Irene,
            NpcID.Dusk,
            NpcID.Dawn,
            NpcID.Andri,
            NpcID.Athlon,
            NpcID.Bjorn,
            NpcID.Cecelia,
            NpcID.Coroto,
            NpcID.Elysium,
            NpcID.Erica,
            NpcID.Genefe,
            NpcID.Hav,
            NpcID.Hina,
            NpcID.Ingrid,
            NpcID.Iona,
            NpcID.Jaye,
            NpcID.Jordi,
            NpcID.Kastor,
            NpcID.Petra,
            NpcID.Roberta,
            NpcID.Sasha,
            NpcID.Sybilla,
            NpcID.Tomasa,
            NpcID.Verna,
            NpcID.Vitacia,
            NpcID.Yuki,
            NpcID.Ezell,
        ].includes(this.id);
    }
}


const summaries: Map<string, string> = new Map([
    ["Logos",
     `The enigmatic 'scriptwriter' of the Troupe, who dictates every move they will make. From the 'Troupe Leader'
      gained an uncanny ability to write reality to his whim, anything he writes <i>will exactly occur</i> as he wrote it. 
      However this works better for futures far off and with a lot of possibilities. Is functionally immortal
      since he wrote his own ending in the far future. <br/>
      Before he became the Playwright, he was also a greater demon lord. Banshees being male is extremely rare, and 
      all are very dangerous, and one among them becoming Lord was unheard of before him. Even back then he could 
      cast reality-bending magic simply by speaking (or chanting) aloud or writing his commands in the air.`],
    ["Mostima",
     `A fallen angel who can move through planes without relying on perpendicularities. Has a tendency of talking to
      someone one minute and disappearing the next. Suffers from an advanced case of Nightblood but doesn't seem to 
      suffer from psychosis or neurosis. Carries two staves that appear powerful and seem to be the manifestation of
       an ancient, or rather timeless, soul.`],
    ["Shimaken",
     `An orphan in the Castle of the Night who was adopted and raised by ${CharacterCard.linkNpc(NpcID.Lemuen, "Lemuen")} along 
      with ${CharacterCard.linkNpc(NpcID.Shimarin, "his sister")}. Wasn't the
      best at fighting but maintained an unshakable, and contagious, aura of hope and optimism despite having seen 
      his fair share of atrocities and horrors. Organized a 'resistance' aimed at making leaving the castle possible.`],
    ["Shimarin",
     `An orphan adopted and raised by ${CharacterCard.linkNpc(NpcID.Lemuen, "Lemuen")} who taught her sniping. Took it up as a job after 
      Lemuen got crippled. Worked in a team until ${CharacterCard.linkNpc(NpcID.Verrader, "Verrader")} sold them out, 
      then worked solo. Was there, past midnight, when Ruin almost got complete - she made it back with 
      ${CharacterCard.linkNpc(NpcID.LogosPlaywright, "The Playwright")}'s aid.`],
    ["Verrader",
     `An influential fixer in Night Castle. Made it big thanks to his incredible charisma and deception skills. 
      Gained Nightblood in an accident - a result of his first betrayal - during his
      early years spent on the field in a forge which submerged his whole team, except 
      ${CharacterCard.linkNpc(NpcID.Shimarin, "Shimarin")}, in magma. Died at the hands of the Steel Inquisitors, 
      his soul burnt to power Rin's hemalurgy.`],
    ["Fiest",
     `While he rarely stepped on to the field himself, ${CharacterCard.linkNpc(NpcID.Shimaken, "Shimaken")} and the 
      others owed a lot to his technical genius. Since he rarely even left the confines of his lab, his life was
      rather sheltered and happy. ${CharacterCard.linkNpc(NpcID.Lemuen, "Lemuen")}'s boyfriend before she died.`],
    ["Mouthpiece",
     `Was somehow related to the Witch King of lore. The most loyal member of the troupe, he took it upon himself
      to be the host/announcer of the Troupe's 'shows'. Responsible for their most grotesque creations which often 
      were looked down upon by ${CharacterCard.linkNpc(NpcID.LogosPlaywright, "The Playwright")} as being crude and tasteless. 
      Was killed by a group of adventurers and ${CharacterCard.linkNpc(NpcID.Lucian, "Solitare")} but he had already 
      accomplished what his master needed...`],
    ["SanguineArch",
     `Little is known (so far) about the first, and primordial, vampire and the de facto Lord of the entire dimension
      of the Shadowfell except that they are extremely dangerous to all but other higher vampires, most of whom regard 
      them with utmost respect. Fear, yes, but respect...`],
    ["Decroa",
     `A higher vampire who had been captured by the Troupe Long ago and used both as a trap against unwanted 
      intruders and for their 'plays' and research. Prolonged torture and withdrawal symptoms had made her a little 
      unhinged, and <i>very</i> thristy. Was finally freed by a group of adventurers and thereafter protected by 
      ${CharacterCard.linkNpc(NpcID.Sanguinarch, "The SanguineArch")} until she could escape the 
      castle. Revealed herself to be a childhood friend of ${CharacterCard.linkNpc(NpcID.Lesley, "Lesley")}'s.`],
    ["Baphomet",
     `The Demon Lord in command of the 'lowest level' of the Castle who often was summoned to other realms to fight
      on the front lines, and so had inherited the traits of lesser demons - namely ferocity in battle without regard
      to self-preservation, an irrational hatred of devils, and a slight dearth of brain cells. Regardless, the mere
      mention of his name brought terror in the hearts of many - particularly in the lower levels of the castle...`],
    ["Kjera",
     `Very little is known (so far) about the Guardian of Magic. Except that she keeps her consciousness distributed
      across various forms and bodies, not all humanoid, across several reams. And so she is pretty much immortal even
      before her primordial origins are taken into account. Since each body has its own reservoir of mana, she 
      herself has near unlimited mana and can cast all non-proprietary spells, and most proprietary ones, known in 
      all the dimensions. She personally maintains the entire internal financial infrastructure of the Gardens.`],
    ["Othello",
     `Once the apprentice guardian of defense, he betrayed the people in Preservation to kill everyone in the bunker
      with the help of the troupe and escaped into the castle. The only person, other than himself, who would've 
      known all the details was ${CharacterCard.linkNpc(NpcID.TheMaster, "The Guardian of Order")} before he passed away.
      <br/>
      By the time he was found again by a group of adventurers, he was imprisoned by the troupe next to a rather 
      large explosive, and had completely lost his mind - as he kept babbling some gibberish. As they were escaping
      with him, however, the mists touched him causing him to fully become himself again. Unfortunately, this was but
      for a moment since soon after he was assassinated by ${CharacterCard.linkNpc(NpcID.Lucian, "Solitaire")}.`],
    ["Mandy",
     `A criminal and gang/cult leader, she was well known and feared throughout the lower levels of the castle for 
      being a very advanced case of nightblood. It gave her powers to manipulate stone, something which also made 
      her near impossible to kill, while completely sapping her of human emotions like empathy, making her a 
      psychopathic killing machine. Seemed to be researching some clues regarding the plane of the earth a 
      ${CharacterCard.linkNpc(NpcID.Ebenezar, "particularly adept spellcaster")} had left behind but was thwarted by a 
      group of adventurers who handed her research to ${CharacterCard.linkNpc(NpcID.Verrader, "Verrader")}.`],
    ["Gen",
     `Little is known (so far) of ${CharacterCard.linkNpc(NpcID.Mandy, "Mandragora")}'s brother except that he was
      a regular studious boy in Terra Prima until he was kidnapped by a 
      ${CharacterCard.linkNpc(NpcID.Mostima, "bored wandering spacetime-traveller")} and brought into the Castle of 
      Death to be used as a bargaining chip by a group of adventurers, since he was supposedly the only family, and 
      only weakness of his sister.`],
    ["Muelsyse",
     `A well known research specialist from Innovation who specialized in nanomachines and fluid automation. Had 
      come to the castle of Ruin for reasons unknown and there happened to meet, and protect from imminent 
      destruction, ${CharacterCard.linkNpc(NpcID.Fiest, "one of the fans of her research")} and also helped out his group of adventurer 
      friends. However, being in a rush they couldn't really get to know her better then.`],
    ["Shamare",
     `A child who'd been forced into a harsher life someone of her age deserved, the death of her sister caused her
      to inherit her nightblood and learn of her 'arts'. These 'arts' involved weaving the souls of people, and 
      others, into inanimate objects - twisting their identity and spiritual energy to perform certain tasks. The
      first soul she weaved was that of her own sister's, who had been shot - as she was trying to go incognito - by 
      ${CharacterCard.linkNpc(NpcID.Shimarin, "a sniper")} at the behest of her 
      ${CharacterCard.linkNpc(NpcID.Mouthpiece, "last employer")} after she had completed a certain contract supposedly
      involving a lock. Shamare finally gave up her quest for vengeance when she realized she was being manipulated 
      and at the behest of a very persuasive barbarian.`],
    ["Lemuen",
     `${CharacterCard.linkNpc(NpcID.Mostima, "Mostima")}'s half-sister and ${CharacterCard.linkNpc(NpcID.Shimarin, "Rin")}'s
      teacher - she was reputed to be a sniper without compare. While her life had a great deal of ups and downs,
      very few individuals would know her full life story - probably only Mostima. And yet, one adventurer did begin
      to bond with a part of her left behind after she died, inheriting her skills and small pieces of her memories.`],
    ["Eugrud",
     `An orc who served as bodyguard to ${CharacterCard.linkNpc(NpcID.Verrader, "Verrader")} and probably shared one 
      braincell with his co-bodyguard, the bugbear gunslinger Roth (and probably received the smaller half of that 
      braincell). While he liked to boast and think he'd seen everything the castle had to offer while working 
      under Verrader, only after his death - after failed attempts to assassinate ${CharacterCard.linkNpc(NpcID.Shimarin, "Shimarin")}
      and then ${CharacterCard.linkNpc(NpcID.Shimaken, "Shimaken")} did he realize just how insignificant his life so far had been...`],
    ["Andoain",
     `An aasimar with a halo and glowing wings like reflected glass who mysteriously appeared in Veteres in around 
      1580 AR. Seemed to be supernaturally gifted in the use of firearms and preferred them to swords. Known by all 
      to be an extremely generous and kind soul, but seemed to be haunted by demons of his own, and was always 
      begging God for forgiveness. Was randomly assaulted by a 
      ${CharacterCard.linkNpc(NpcID.Mostima, "mysterious half-blood fallen aasimar")} while peacefully exploring the
      coast of Aegir.<br/>
      <div class="effect_tag">Incomplete</div>`],
    ["", ``],
])

const shimaRinDesc = `
<h5>Early Life and Capture</h5>
It is hardly unusual for a child to lose their parents at a very young age in the Castle of the Night, and so when her
parents went missing, eight-year-old Rin found a plenitude of odd jobs, not all very ethical, to support herself and 
her four-year-old brother ${CharacterCard.linkNpc(NpcID.Shimaken, "Ken")}. Not all her employers were the most scrupulous,
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
like light reflected on a crystalline surface. ${CharacterCard.linkNpc(NpcID.Mostima, "One of them")} however, also
seemed to have the black horns and tails of a fiend. She seemed a lot less noble, and so to Rin a lot more unnerving,
more like a street thug she was used to instead of a divine being like the others.<br/>
When her blindfolds were removed, she found herself in a cell. Sitting next to her, with her gun on her lap, was the
${CharacterCard.linkNpc(NpcID.Lemuen, "famed sniper")} she'd heard so much off. Her kindly - almost jovial - demeanour
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
${CharacterCard.linkNpc(NpcID.Fiest, "her boyfriend")} - a human guy they'd met here who 
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
${CharacterCard.linkNpc(NpcID.Verrader, "one member of the crew")} betrayed the others for personal gain,
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
once when the troupe ${CharacterCard.linkNpc(NpcID.Mouthpiece, "Mouthpiece")} himself asked her to kill a certain Vulpine soul weaver. <br/>   
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
by none other than ${CharacterCard.linkNpc(NpcID.Baphomet, "Baphomet")} himself. There was no way out of this, and so she did what she had planned before, and
put a bullet into her friend. Something which, by the tears in his eyes, he knew was coming.<br/>
After that, she decided to bite back at the troupe by taking out their most valuable piece, someone she knew they 
had big plans for - ${CharacterCard.linkNpc(NpcID.Lucian, "The Solitaire")}. Things didn't go as planned however,
and instead she ended up in the fortress of the inquisitors, gaining an Atium spike and a Steel spike powered by 
Verrader's soul followed by heading right past midnight into a showdown that involved more myths and legends than 
she could even dream of - all the Guardians with Preservation himself in the mists, eight senior inquisitors moved
by Ruin himself (who was also moving her - despite her best efforts), 
${CharacterCard.linkNpc(NpcID.LogosPlaywright, "The Playwright")} and the Mouthpiece and lastly 
${CharacterCard.linkNpc(NpcID.Sanguinarch, "The SanguineArch")} along with two other higher vampires. Finally, 
there was one other - a single Honorspren who stood next to her, waiting, and had gone unnoticed by all...  
`;


export function setupCharacterCards() {

    /************************* Campaign 1, Arc 1 **************************/
    /************************* Campaign 1, Arc 2 **************************/

    new CharacterCard({
        name     : "The Playwright",
        id       : NpcID.LogosPlaywright,
        tokenName: "logos_normal",
        campaign : 1,
        arc      : 2,
        age      : "50K+",
        gender   : "M",
        tags     : ['From | Ruin',
                        'Race | Banshee (Demon)',
                        'Greater Demon Lord',
                        'Domain | 01:40 to 01:56',
                        `Aberrant-Fused ${Card.verbose("(Tragodia)")}`,
                        'CR | 30'],
        summary      : summaries.get("Logos") ?? "???",
        description  : "",
        altImagePaths: new Map([
            ["Youthful Writer", "logos_normal"],
            ["Ancient Lord", "logos_banshee"],
        ])
    });
    new CharacterCard({
        id           : NpcID.Mostima,
        name         : "Mostima",
        tokenName    : "mostima",
        campaign     : 1,
        arc          : 2,
        age          : 152,
        gender       : "F",
        tags         : ['Plane-hopper',
                        `From | Ruin`,
                        `Race | Aasimar &times; Tiefling`,
                        `Class | ${Card.verbose("Clockwork Soul")} Sor-lock`,
                        `Class | ${Card.verbose("Chronurgy")} Wizard`,
                        `Nightblood | Shattered Time`,
                        `'Fallen Saintess'`,
                        'CR | 15 / 25'],
        summary      : summaries.get("Mostima") ?? "???",
        description  : "",
        altImagePaths: new Map([
            ["Messenger", "mostima"],
            ["Saintess", "mostima_saint"],
        ])
    });
    new CharacterCard({
        id           : NpcID.Shimaken,
        name         : "Ken Shima",
        tokenName    : "shimaken",
        campaign     : 1,
        arc          : 2,
        age          : 72,
        gender       : "M",
        tags         : [`Deceased`,
                        'From | Ruin',
                        'Allegiance | Preservation',
                        'Race | Human',
                        `Class | ${Card.verbose("Battlemaster")} Fighter`,
                        `Class | ${Card.verbose("Bondsmith")} Paladin`,
                        `Lerasium Savant`,
                        'CR | ?'],
        summary      : summaries.get("Shimaken") ?? "???",
        description  : "",
        altImagePaths: new Map([
            ["Rebel", "shimaken"],
            ["Radiant", "shimaken_uber"],
        ]),
    });
    new CharacterCard({
        id           : NpcID.Shimarin,
        name         : "Rin Shima",
        tokenName    : "shimarin",
        campaign     : 1,
        arc          : 2,
        age          : 81,
        gender       : "F",
        tags         : [`Deceased`,
                        'From | Ruin',
                        'Allegiance | Ruin / Preservation',
                        'Race | Human',
                        `Class | ${Card.verbose("Assassin")} Rogue`,
                        `Class | ${Card.verbose("Gunslinger")} Fighter`,
                        'CR | 13'],
        summary      : summaries.get("Shimarin") ?? "???",
        description  : shimaRinDesc,
        personalityTags:  new Map([
            [NpcPersonalityTag.Confident, 3],
            [NpcPersonalityTag.Bloodlust, 3],
            [NpcPersonalityTag.Pessimist, 2],
            [NpcPersonalityTag.Quiet, 2],
            [NpcPersonalityTag.Ascetic, 2],
            [NpcPersonalityTag.Stern, 1],
            [NpcPersonalityTag.Kind, 1],
        ]),
    });
    new CharacterCard({
        id           : NpcID.Verrader,
        name         : "Verrader",
        tokenName    : "verrader",
        campaign     : 1,
        arc          : 2,
        age          : 31,
        gender       : "M",
        tags         : [`Deceased`,
                        'From | Ruin',
                        'Race | Human',
                        `Class | ${Card.verbose("Eloquence")} Bard`,
                        `Class | ${Card.verbose("Elemental Bloodline")} Sorcerer`,
                        `Nightblood | Magma`,
                        `Zinc Savant`,
                        `Copper Savant`,
                        'CR | 10'],
        summary      : summaries.get("Verrader") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Fiest,
        name         : "Fiest",
        tokenName    : "fiest",
        campaign     : 1,
        arc          : 2,
        age          : 80,
        gender       : "M",
        tags         : [`Deceased`,
                        'From | Ruin',
                        'Race | Human',
                        `Class | Artificer`,
                        'CR | 9'],
        summary      : summaries.get("Fiest") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Mouthpiece,
        name         : "Mouthpiece",
        tokenName    : "ahrendts",
        campaign     : 1,
        arc          : 2,
        age          : "",
        gender       : "M",
        tags         : [`Deceased`,
                        'From | Materia / Shadowfell / Ruin',
                        'Allegiance | Ruin &times; Outsiders',
                        `Race | Titan ${Card.verbose("&times; Aberration")}`,
                        `Primordial | Outsider ${Card.verbose("(Curse)")}`,
                        'CR | 23'],
        summary      : summaries.get("Mouthpiece") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Sanguinarch,
        name         : "The SanguineArch",
        tokenName    : "sarch_m",
        campaign     : 1,
        arc          : 2,
        age          : "",
        gender       : "-",
        tags         : ['From | Shadowfell',
                        `Race | Titan ${Card.verbose("&times; Vampire")}`,
                        'Primordial | Shardic',
                        'The Original',
                        'Life Command',
                        'CR | 29'],
        summary      : summaries.get("SanguineArch") ?? "???",
        description  : "",
        altImagePaths: new Map([
            ["Male", "sarch_m"],
            ["Female", "sarch_f"],
        ])
    });
    new CharacterCard({
        id           : NpcID.DecroaSal,
        name         : "Decroa Sal",
        tokenName    : "decroa",
        campaign     : 1,
        arc          : 2,
        age          : "2620",
        gender       : "F",
        tags         : ['From | Shadowfell',
                        'Race | Higher Vampire',
                        'Crystal Command',
                        'CR | 23'],
        summary      : summaries.get("Decroa") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Baphomet,
        name         : "Baphomet",
        tokenName    : "baphomet",
        campaign     : 1,
        arc          : 2,
        age          : "20K+",
        gender       : "M",
        tags         : ['From | Ruin',
                        'Race | Demon',
                        'Demon Lord',
                        'Domain | 20:00 to 21:00',
                        'CR | 23'],
        summary      : summaries.get("Baphomet") ?? "???",
        description  : "",
    });
    new CharacterCard({
        name     : "Kjeragandr",
        id       : NpcID.Kjerra,
        tokenName: "g_mag_stone",
        campaign : 1,
        arc      : 2,
        age      : "",
        gender   : "F",
        tags     : ['From | Stone / Preservation',
                    `Race | Titan ${Card.verbose("&times; Serpentine")}`,
                    `Class | Spellcaster ${Card.verbose("(All)")}`,
                    'Primordial | Shardic',
                    'Guardian of Magic',
                    'Atium Savant',
                    'CR | 30'],
        summary      : summaries.get("Kjera") ?? "???",
        description  : "",
        altImagePaths: new Map([
            ["Lithic", "g_mag_stone"],
            ["Humanoid", "g_mag_human"],
        ])
    });
    new CharacterCard({
        id           : NpcID.GDef,
        name         : "The Guardian of Defense",
        tokenName    : "g_def",
        campaign     : 1,
        arc          : 2,
        age          : "40K+",
        gender       : "-",
        tags         : ['From | Innovation / Preservation',
                        `Allegiance | Preservation`,
                        `Race | Warforged &times; Aasimar`,
                        `Class | Fighter`,
                        'Guardian of Defense',
                        'Atium Savant',
                        `'Saint'`,
                        'CR | 27'],
        summary      : summaries.get("GDef") ?? "???",
        description  : "",
    });
    new CharacterCard({
        name     : "Othello The Traitor",
        id       : NpcID.TraitorOthello,
        tokenName: "othello",
        campaign : 1,
        arc      : 2,
        age      : "5020",
        gender   : "M",
        tags     : ['From | Materia / Preservation / Ruin',
                        `Allegiance | Preservation (?)`,
                        `Race | Human`,
                        `Class | Fighter`,
                        `Class | Barbarian`,
                        `Class | Paladin`,
                        'Apprentice Guardian of Defense',
                        '<i>Bearer of Agonies</i>',
                        'CR | 20'],
        summary      : summaries.get("Othello") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Mandy,
        name         : "Mandragora",
        tokenName    : "mandy",
        campaign     : 1,
        arc          : 2,
        age          : "16",
        gender       : "F",
        tags         : ['From | Materia / Ruin',
                        `Race | Ursine`,
                        `Nightblood | Stoneward`,
                        'CR | 16'],
        summary      : summaries.get("Mandy") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Gen,
        name         : "Gen",
        tokenName    : "gen",
        campaign     : 1,
        arc          : 2,
        age          : "69",
        gender       : "M",
        tags         : ['From | Materia / Ruin / Devotion',
                        `Race | Human`,
                        `Class | ${Card.verbose("Illusion")} Wizard`,
                        `Class | Artificer`,
                        'CR | 17'],
        summary      : summaries.get("Gen") ?? "???",
        description  : "",
        altImagePaths: new Map([
            ["child", "gen"],
        ])
    });
    new CharacterCard({
        id           : NpcID.Mumu,
        name         : "Muelsyse",
        tokenName    : "muelsyse",
        campaign     : 1,
        arc          : 2,
        age          : "343",
        gender       : "F",
        tags         : ['From | Water / Innovation',
                        `Race | High-Elf`,
                        `Class | Artificer`,
                        `Director of ??? at ???`,
                        'CR | 25'],
        summary      : summaries.get("Muelsyse") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Shamare,
        name         : "Shamare",
        tokenName    : "shamare",
        campaign     : 1,
        arc          : 2,
        age          : "71",
        gender       : "F",
        tags         : ['From | Ruin',
                        `Race | Vulpine`,
                        `Warlock`,
                        `Nightblood | Voodoo`,
                        `Soul Weaver`,
                        'CR | 12'],
        summary      : summaries.get("Shamare") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Amaia,
        name         : "Amaia",
        tokenName    : "amaia",
        campaign     : 1,
        arc          : 2,
        age          : "",
        gender       : "-",
        tags         : ['Deceased (Merged)',
                        'From | Materia / Water',
                        `Race | Human`,
                        `Aberrant-fused`,
                        `Core of the Many`,
                        'CR | ?'],
        summary      : summaries.get("Amaia") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Lemuen,
        name         : "Lemuen",
        tokenName    : "lemuen",
        campaign     : 1,
        arc          : 2,
        age          : "124",
        gender       : "F",
        tags         : ['Deceased',
                        'From | Ruin',
                        `Race | Aasimar`,
                        `Class | ${Card.verbose("Gunslinger")} Fighter`,
                        `Class | ${Card.verbose("Assassin")} Rogue`,
                        `'Saintess'`,
                        `Nightblood | Neural Link`,
                        'CR | 14'],
        summary      : summaries.get("Lemuen") ?? "???",
        description  : "",
    });
    new CharacterCard({
        name     : "Eugrud the Vanquisher",
        id       : NpcID.Eugrud,
        tokenName: "eugrud",
        campaign : 1,
        arc      : 2,
        age      : "133",
        gender   : "M",
        tags     : ['From | Ruin',
                        `Race | Orc`,
                        `Class | ${Card.verbose("Champion")} Fighter`,
                        `Class | Barbarian`,
                        `Pewter Savant`,
                        'CR | 8'],
        summary      : summaries.get("Eugrud") ?? "???",
        description  : "",
    });

    /************************* Campaign 2, Arc 1 **************************/

    new CharacterCard({
        name     : "Andoain 'The Martyr'",
        id       : NpcID.Andoain,
        tokenName: "Andoain",
        campaign : 2,
        arc      : 1,
        age      : "221",
        gender   : "M",
        tags     : [
            "From | ? / Materia",
            "Race | Aasimar",
            `Class | ${Card.verbose("Gunslinger")} Fighter`,
            `Class | ${Card.verbose("Hexblade")} Warlock`,
            `Class | ${Card.verbose("War")} Cleric`,
            "'Saint'",
            "CR | 21",
        ],
        summary      : summaries.get("Andoain") ?? "???",
        description  : "",
    });
    // new CharacterCard({
    //     id         : NpcId.Dusk,
    //     name       : "Dusk",
    //     tokenName  : "Dusk",
    //     campaign   : 2,
    //     arc        : 1,
    //     age        : "",
    //     gender     : "F",
    //     tags       : [
    //         'From | ??? / Devotion',
    //         `Race | Titan ${Card.verbose("&times; Jade Dragon")}`,
    //         `<span>Primordial | Outsider ${Card.verbose("(11<sup>th</sup> Fragment of Sui)")}</span>`,
    //         'CR | 26'
    //     ],
    //     summary    : summaries.get("Dusk") ?? "???",
    //     description: "",
    //     // altImagePaths: new Map([
    //     //     ["Wandering Painter", "Dusk"],
    //     //     ["Shrine Maiden", "Dusk_sui"],
    //     // ]),
    // });
    // new CharacterCard({
    //     id           : NpcId.Dawn,
    //     name         : "Dawn",
    //     tokenName    : "Dawn",
    //     campaign     : 2,
    //     arc          : 1,
    //     age          : "32 (405)",
    //     gender       : "F",
    //     tags         : [
    //         "From | Materia / Devotion",
    //         "Race | Human"
    //     ],
    //     summary      : summaries.get("Dawn") ?? "???",
    //     description  : "",
    //     personalityTags: new Map([
    //         // [NpcPersonalityTag["Nature Lover"], 3],
    //         // [NpcPersonalityTag.Industrious, 2],
    //         // [NpcPersonalityTag.Ascetic, 2],
    //         // [NpcPersonalityTag["Abhors Violence"], 2],
    //         // [NpcPersonalityTag.Homosexual, 1],
    //         // [NpcPersonalityTag.Accepting, 1],
    //         // [NpcPersonalityTag.Depressive, 1],
    //     ])
    // });
    new CharacterCard({
        id           : NpcID.Andri,
        name         : "Andri",
        tokenName    : "Andri",
        campaign     : 2,
        arc          : 1,
        age          : 37,
        gender       : "M",
        tags         : [],
        summary      : summaries.get("Andri") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Athlon,
        name         : "Athlon",
        tokenName    : "Athlon",
        campaign     : 2,
        arc          : 1,
        age          : 58,
        gender       : "M",
        tags         : [
        ],
        summary      : summaries.get("Athlon") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag.Addict, 4],
            // [NpcPersonalityTag["Guilt-ridden"], 2],
            // [NpcPersonalityTag.Depressive, 2],
            // [NpcPersonalityTag.Accepting, 1],
            // [NpcPersonalityTag.Psychopath, 1],
            // [NpcPersonalityTag["Abhors Violence"], 1],
        ]),
        // tiesToOtherNpcs: new Map([
        //     [`${Card.link("[character|Yuki]", "Yuki")}`,
        //      `Although he would never say it aloud, he deeply hurts inside for what his son had to go through, and
        //       what it made of him. Has realized the futility of preaching to him, but keeps hope that his family's
        //       noble blood will guide Yuki to the right path.`],
        //     [`${Card.link("[character|Ken Shima]", "Shimaken")}`,
        //      `Saw him as divinity, a saviour and an ideal. Would've died several times over for his sake.
        //       Also kept the others who were with him, like ${Card.link("[character|Rin Shima]", "Shimarin")} and
        //       ${Card.link("[character|Fiest]", "Fiest")}, in very high regard.`],
        // ]),
    });
    new CharacterCard({
        id           : NpcID.Bjorn,
        name         : "Bjorn",
        tokenName    : "Bjorn",
        campaign     : 2,
        arc          : 1,
        age          : 35,
        gender       : "M",
        tags         : [],
        summary      : summaries.get("Bjorn") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Cecelia,
        name         : "Cecilia",
        tokenName    : "Cecilia",
        campaign     : 2,
        arc          : 1,
        age          : 11,
        gender       : "F",
        tags         : [],
        summary      : summaries.get("Cecilia") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag.Conciliatory, 3],
            // [NpcPersonalityTag.Naive, 3],
            // [NpcPersonalityTag.Ascetic, 1],
            // [NpcPersonalityTag.Kind, 1],
            // [NpcPersonalityTag.Depressive, 1],
            // [NpcPersonalityTag["Abhors Violence"], 1],
        ])
    });
    new CharacterCard({
        id           : NpcID.Coroto,
        name         : "Coroto",
        tokenName    : "Coroto",
        campaign     : 2,
        arc          : 1,
        age          : 54,
        gender       : "M",
        tags         : [],
        summary      : summaries.get("Coroto") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag.Paranoid, 3],
            // [NpcPersonalityTag.Industrious, 3],
            // [NpcPersonalityTag.Stern, 2],
            // [NpcPersonalityTag.Confrontational, 2],
            // [NpcPersonalityTag.Insecure, 1],
            // [NpcPersonalityTag.Abusive, 1],
            // [NpcPersonalityTag.Vain, 1],
        ])
    });
    new CharacterCard({
        id           : NpcID.Elysium,
        name         : "Elysium",
        tokenName    : "Elysium",
        campaign     : 2,
        arc          : 1,
        age          : 33,
        gender       : "M",
        tags         : [],
        summary      : summaries.get("Elysium") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Erica,
        name         : "Erica",
        tokenName    : "Erica",
        campaign     : 2,
        arc          : 1,
        age          : 50,
        gender       : "F",
        tags         : [],
        summary      : summaries.get("Erica") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Genefe,
        name         : "Genefe",
        tokenName    : "Genefe",
        campaign     : 2,
        arc          : 1,
        age          : 28,
        gender       : "F",
        tags         : [],
        summary      : summaries.get("Genefe") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag.Conciliatory, 2],
            // [NpcPersonalityTag.Abusive, 2],
            // [NpcPersonalityTag.Ascetic, 1],
            // [NpcPersonalityTag.Depressive, 1],
            // [NpcPersonalityTag.Insecure, 1],
            // [NpcPersonalityTag.Hypocrite, 1],
            // [NpcPersonalityTag.Jealous, 1],
        ])
    });
    new CharacterCard({
        id           : NpcID.Hav,
        name         : "Hav",
        tokenName    : "Hav",
        campaign     : 2,
        arc          : 1,
        age          : 47,
        gender       : "M",
        tags         : [],
        summary      : summaries.get("Hav") ?? "???",
        description  : "",
    });
    // new CharacterCard({
    //     id           : NpcId.Hina,
    //     name         : "Hina",
    //     tokenName    : "Hina",
    //     campaign     : 2,
    //     arc          : 1,
    //     age          : 14,
    //     gender       : "F",
    //     tags         : [
    //     ],
    //     summary      : summaries.get("Hina") ?? "???",
    //     description  : ""
    //     ,
    //     personalityTags:  new Map([
    //         // [NpcPersonalityTag.Gourmand, 3],
    //         // [NpcPersonalityTag.Bloodlust, 2],
    //         // [NpcPersonalityTag.Slothful, 2],
    //         // [NpcPersonalityTag.Sanguine, 2],
    //         // [NpcPersonalityTag.Quiet, 1],
    //         // [NpcPersonalityTag.Distant, 1],
    //         // [NpcPersonalityTag.Psychopath, 1],
    //     ]),
    // });
    new CharacterCard({
        id           : NpcID.Ingrid,
        name         : "Ingrid",
        tokenName    : "Ingrid",
        campaign     : 2,
        arc          : 1,
        age          : 24,
        gender       : "F",
        tags         : [],
        summary      : summaries.get("Ingrid") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Iona,
        name         : "Iona",
        tokenName    : "Iona",
        campaign     : 2,
        arc          : 1,
        age          : 13,
        gender       : "F",
        tags         : [],
        summary      : summaries.get("Iona") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag.Sanguine, 2],
            // [NpcPersonalityTag.Optimist, 2],
            // [NpcPersonalityTag.Trusting, 1],
            // [NpcPersonalityTag.Social, 1],
            // [NpcPersonalityTag.Psychopath, 1],
            // [NpcPersonalityTag.Modest, 1],
        ])
    });
    // new CharacterCard({
    //     id           : NpcId.Jaye,
    //     name         : "Jaye",
    //     tokenName    : "Jaye",
    //     campaign     : 2,
    //     arc          : 1,
    //     age          : 26,
    //     gender       : "M",
    //     tags         : [],
    //     summary      : summaries.get("Jaye") ?? "???",
    //     description  : "",
    // });
    new CharacterCard({
        id           : NpcID.Jordi,
        name         : "Jordi",
        tokenName    : "Jordi",
        campaign     : 2,
        arc          : 1,
        age          : 23,
        gender       : "M",
        tags         : [],
        summary      : summaries.get("Jordi") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag.Modest, 3],
            // [NpcPersonalityTag.Quiet, 2],
            // [NpcPersonalityTag.Trusting, 1],
            // [NpcPersonalityTag.Insecure, 1],
            // [NpcPersonalityTag["Guilt-ridden"], 1],
            // [NpcPersonalityTag.Industrious, 1],
        ])
    });
    new CharacterCard({
        id           : NpcID.Kastor,
        name         : "Kastor",
        tokenName    : "Kastor",
        campaign     : 2,
        arc          : 1,
        age          : 26,
        gender       : "M",
        tags         : [],
        summary      : summaries.get("Kastor") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag.Arrogant, 3],
            // [NpcPersonalityTag.Judging, 2],
            // [NpcPersonalityTag.Insecure, 2],
            // [NpcPersonalityTag.Abrasive, 2],
            // [NpcPersonalityTag.Vain, 1],
            // [NpcPersonalityTag.Confrontational, 1],
        ])
    });
    new CharacterCard({
        id           : NpcID.Petra,
        name         : "Petra",
        tokenName    : "Petra",
        campaign     : 2,
        arc          : 1,
        age          : 84,
        gender       : "F",
        tags         : [],
        summary      : summaries.get("Petra") ?? "???",
        description  : ""
    });
    new CharacterCard({
        id           : NpcID.Roberta,
        name         : "Roberta",
        tokenName    : "Roberta",
        campaign     : 2,
        arc          : 1,
        age          : 25,
        gender       : "F",
        tags         : [],
        summary      : summaries.get("Roberta") ?? "???",
        description  : ""
    });
    new CharacterCard({
        id           : NpcID.Sasha,
        name         : "Sasha",
        tokenName    : "Sasha",
        campaign     : 2,
        arc          : 1,
        age          : 13,
        gender       : "M",
        tags         : [],
        summary      : summaries.get("Sasha") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Sybilla,
        name         : "Sybilla",
        tokenName    : "Sybilla",
        campaign     : 2,
        arc          : 1,
        age          : 34,
        gender       : "F",
        tags         : [],
        summary      : summaries.get("Sybilla") ?? "???",
        description  : "",
    });
    new CharacterCard({
        id           : NpcID.Tomasa,
        name         : "Tomasa",
        tokenName    : "Tomasa",
        campaign     : 2,
        arc          : 1,
        age          : 27,
        gender       : "F",
        tags         : [],
        summary      : summaries.get("Tomasa") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag.Sanguine, 2],
            // [NpcPersonalityTag.Accepting, 2],
            // [NpcPersonalityTag.Gourmand, 1],
            // [NpcPersonalityTag.Industrious, 1],
            // [NpcPersonalityTag.Abrasive, 1],
        ])
    });
    new CharacterCard({
        id           : NpcID.Verna,
        name         : "Verna",
        tokenName    : "Verna",
        campaign     : 2,
        arc          : 1,
        age          : 24,
        gender       : "F",
        tags         : [],
        summary      : summaries.get("Verna") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag.Confident, 2],
            // [NpcPersonalityTag.Abrasive, 2],
            // [NpcPersonalityTag.Stern, 2],
            // [NpcPersonalityTag.Optimist, 1],
            // [NpcPersonalityTag.Judging, 1],
        ])
    });
    new CharacterCard({
        id           : NpcID.Vitacia,
        name         : "Vitacia",
        tokenName    : "Vitacia",
        campaign     : 2,
        arc          : 1,
        age          : 25,
        gender       : "F",
        tags         : [],
        summary      : summaries.get("Vitacia") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag["Nature Lover"], 2],
            // [NpcPersonalityTag.Distant, 2],
            // [NpcPersonalityTag.Nervous, 1],
            // [NpcPersonalityTag.Recluse, 1],
            // [NpcPersonalityTag.Lazy, 1],
            // [NpcPersonalityTag.Vain, 1],
        ])
    });
    new CharacterCard({
        id           : NpcID.Yuki,
        name         : "Yuki",
        tokenName    : "Yuki",
        campaign     : 2,
        arc          : 1,
        age          : 27,
        gender       : "M",
        tags         : [
            // "From | Ruin / Devotion",
            // `Class | ${Card.verbose("Oathbreaker")} Paladin`,
            // `CR | 10`
        ],
        summary      : summaries.get("Yuki") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag.Recluse, 2],
            // [NpcPersonalityTag.Judging, 2],
            // [NpcPersonalityTag.Distant, 2],
            // [NpcPersonalityTag["Guilt-ridden"], 1],
            // [NpcPersonalityTag.Kind, 1],
            // [NpcPersonalityTag.Quiet, 1],
            // [NpcPersonalityTag.Pessimist, 1],
            // [NpcPersonalityTag["Night owl"], 1],
        ]),
    });
    new CharacterCard({
        id           : NpcID.Ezell,
        name         : "Ezell Pastore",
        tokenName    : "Ezell",
        campaign     : 2,
        arc          : 1,
        age          : 22,
        gender       : "M",
        tags         : [
            // "From | Ruin / Devotion",
            // `Class | ${Card.verbose("Oathbreaker")} Paladin`,
            // `CR | 10`
        ],
        summary      : summaries.get("Ezell") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag.Recluse, 2],
            // [NpcPersonalityTag.Judging, 2],
            // [NpcPersonalityTag.Distant, 2],
            // [NpcPersonalityTag["Guilt-ridden"], 1],
            // [NpcPersonalityTag.Kind, 1],
            // [NpcPersonalityTag.Quiet, 1],
            // [NpcPersonalityTag.Pessimist, 1],
            // [NpcPersonalityTag["Night owl"], 1],
        ]),
    });
}
