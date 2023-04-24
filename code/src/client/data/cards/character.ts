import { Card } from "./card";

interface CharacterArgs {
    name: string;
    indexName?: string;
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

class Character extends Card
{
    private static $commonCentralView: JQuery = null;
    private static $tokenSpace: JQuery = null;
    public readonly $centralView: JQuery;
    public readonly indexKey: string;
    private readonly name: string;
    private readonly indexName?: string;
    private readonly imgPath: string;
    private readonly altImagePaths?: Map<string, string>;
    private readonly personalityTags?: Map<NpcPersonalityTag, number>;
    private readonly summary: string;
    private readonly campaign: number;
    private readonly arc: number;
    private readonly description: string;
    private readonly tags: string[];

    public constructor(args: CharacterArgs)
    {
        super();

        if (Character.$commonCentralView == null) {
            throw new Error("Premature instantiation of class. " +
                            "The page isn't loaded yet.");
        }

        this.name = args.name;
        this.indexName = args.indexName;
        this.campaign = args.campaign;
        this.arc = args.arc;
        this.imgPath = `./assets/images/character_tokens/C${(args.campaign)}/Arc${(args.arc)}/${(args.tokenName)}.png`;

        this.indexKey = this.indexName ? `[character|${this.indexName}]`:`[character|${this.name}]`;

        Character.$tokenSpace.find(`.token_space[data-campaign='${this.campaign}'][data-arc='${this.arc}']`).append($(`
            <img src=${this.imgPath} class="token" alt="[Img Not Found]" data-index-key="${this.indexKey}">
        `));

        args.tags.push(`Campaign ${this.campaign} ${Card.verbose(`Arc ${this.arc}`)}`);
        args.tags.push(`${(args.gender)}${(args.age)}`);

        this.tags = args.tags;
        this.summary = args.summary;
        this.description = args.description;
        this.altImagePaths = args.altImagePaths;
        this.personalityTags = args.personalityTags;

        this.$centralView = Character.$commonCentralView;

        this.registerSelf();
    }

    public static loadStaticElements()
    {
        Character.$commonCentralView = $("#character_idx .central_view");
        Character.$tokenSpace = $("#tokens");

        Character.$commonCentralView.on("click", ".token_selector", function () {
            const $tokens = $(this).parent().siblings(".tokens");
            $tokens.children().hide();
            $tokens.children(`[data-token='${$(this).data("token")}']`).show();
        });
    }

    protected generateCard(floating: boolean): JQuery
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
                    ([name, filename]) => `<span class="token_selector tag" data-token="${filename}">${name}</span>`
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


        return $(`
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
        </div>`);
    }
}


const summaries: Map<string, string> = new Map([
    ["Lucian",
     `"This darkness is a refuge, a throne, and paradise. The spirits of the dead have never left, and I’ve cursed 
     the world from atop their bones... Seeing me as I am now, do you still want to hear my song? Do you still 
     dare... to stand before me?"<br/>
     Calamity of The Troupe - an unfinished masterpiece of their leader. Was once raised as their rising star in 
     response to the threat that was ${Card.link("[character|Ebenezar]", "the Lich")}. But turned against them only 
     as he slaughtered all the troupe's senior members in one night and escaped into Materia - sealing his 
     memories and powers. He returned to the outer planes by accident and sought out the troupe when he did. 
     Descended into insanity after killing ${Card.link("[character|Mouthpiece]", "The Mouthpiece")} and inheriting 
     his curse. Following which he stealthily assassinated ${Card.link("[character|Othello]", "The Traitor")}, who was 
     preoccupied in fighting 'Agents of the Fifth', thus freeing the Primordial nightmares.`],
    ["Ebenezar",
     `A human kid born in the the classical era. Accidentally entered a perpendicularity inside a 
     subterranean lake into the Gardens. Lived there for a few centuries and trained fanatically as a mage under his
     then-girlfriend ${Card.link("[character|Lesley]", "Lesley")}'s tutelage and soon surpassed her. Became a Lich
     and would often roam in shady alleys of Materia, appearing helpless - then feeding on the souls of any who 
     assaulted him. Stabilized the perpendicularity between the lake he once drowned in - making it his 'lair' - and 
     the Mistflame in the Gardens near Bunker#371. Went to the castle to 'fight death', but failed and died, his 
     last days and whereabouts remain unknown.`],
    ["Caelynn",
     `Born in the last years of the heroic age, fled into The Gardens due to an accidental encounter with the Fifth
      Nightmare. Being extremely gifted, she received guidance from various orders - often from Guardians themselves.
      Was once close to ${Card.link("[character|Othello]", "The Traitor")}. Currently leads the people of the Garden
      as the Guardian of Life. Now an ${Card.link("object", "Atium")} savant.`],
    ["Lesley",
     `A rich higher vampire mage with powerful time control powers. Came to The Gardens after a failed attempt to
      kill ${Card.link("[character|Caelynn Nightbreeze]", "Caelynn")}. Now her best friend  / advisor. Detests her
       family and curbs her bloodlust. Was depressed until recently.`],
    ["Irene",
     `An air genasi who was a junior member of the inquisition of the gardens. All her bunker-mates were killed in 
      an attack by The Troupe around 300 years ago, but the ${Card.link("[character|Kjera]", "Guardian of Magic")}
      took pity on her and replaced them all with physically intractable and sentient illusions. Despite them being 
      near-perfect replicas, Irene eventually figured out their true nature, but being grateful for the concern, she 
      kept the pretense of believing in them. Even so, ${Card.link("[character|Lesley]", "Lesley")} took a personal 
      interest in her and made sure to invite her every now and then to make sure she got to interact with real people.
      During the Hour of Loss, she displayed unexpected skill (leading others to suspect she had specifically been 
      trained for such situations), resolve, and fanaticism in fighting a deep-ocean aberration but went missing in
       the fight.`],
    ["Ling",
     `One of the fragments of an outer primordial. Moved into the Gardens long ago along with 
     ${Card.link("[character|Kjera]", "Kjera")} and worked as a lighthouse keeper there so as to be best placed to
      respond to the revival of her 'parent' or any other outsiders. Was chosen to be the Guardian of Diplomacy after
      the inquisitors' betrayal. Agreed but went missing during the expedition inside the Castle of the Night 
      following Preservation's death and the Survivor's Ascension.`],
    ["Dave",
     `A warforged automaton that was purchased by ${Card.link("[character|Caelynn Nightbreeze]", "Caelynn")}'s 
      batch-mates at a heavy price upon her graduation, to serve and protect her. His modules were heavily operated 
      upon by Lesley who practiced her coding skills on him. Failed to defend Caelynn at one point long ago, and 
      gave his life holding out against a deep-sea aberration to atone for it.`],
    ["Ulrich",
     `A human that lived in the last years of the Archaic era and had shown remarkable skill in making heavy armors 
      for those of his clerical order. Upon his death in war, Preservation gave him a second chance at sentient life
      in the Gardens, as a reward for saving the lives of so many thanks to his meticulous work at their armors. 
      Since then he's been honing his skills and is now regarded as one of the finest smiths in the multiverse.`],
    ["Lia",
     `An elven archer who roamed freely the Feywild until by cruel circumstance she fell prey to the second 
      nightmare. Survived the encounter thanks to ${Card.link("[character|Caelynn Nightbreeze]", "Caelynn")}'s 
      intervention, who remained on the lookout for primordial incursions. Caelynn then offered her asylum with 
      herself promising to keep her safe from the primordial as far as possible, an offer she readily took. 
      Rescued ${Card.link("[character|Ulrich]","Ulrich")} when he showed up a few centuries later and subsequently 
      married him on his insistence. While not the ideal marriage, the two manage fine nowadays.`],
    ["Conley",
     `A fire genasi rebel who was given refuge by Preservation after he sacrificed his life to save the lives of 
      quite a few of his friends. Served as cook/housekeeper at Bunker#371 where he was everyone's favourite 
      junior. Used to respect ${Card.link("[character|Ebenezar]", "Ben")} before he ditched them all.`],
    ["Vahareth",
     `${Card.link("[character|Caelynn Nightbreeze]", "Caelynn")}'s predecessor as the Guardian of Life as well as a 
      father figure to her. Scouted her out in Materia, then got her to the gardens and personally trained her. 
      Known and feared throughout all the outer planes for his unbreakable will and eyes that could delve into the 
      deepest nature of a person's soul with just a glance. 'Retired' after Leras' death.`],
    ["GOrder",
     `Known across all the realms simply as 'The Master' - the Guardian of Order was an expert at diplomacy, the 
      forceful arm-twisting kind, who always got his way. Unlike most others who took it easy in the garden, he spent
      his whole life scheming and ruthlessly executing ever-more-complex Machiavellian schemes. So complex that even
      his own loyalties were at times doubted, particularly when some links were found between him and
      ${Card.link("[character|Othello]", "The Traitor")}. He was also a very strong warrior, rumoured to be a 
      radiant as well as have hemalurgic powers equivalent of Mistborn of old derived from an inordinate 
      number of spikes. A number equivalent to some of his seniormost counterparts within the castle itself, so many that 
      even Aluminium couldn't negate them in time. Committed suicide when Ruin attempted to assert his will via the
      hemalurgic spikes instead of letting his knowledge fall into the enemies hands. A pity too, for he was 
      literally the personification of one of the ideals of the new Preservation, "There's always another secret."`],
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
     `An orphan in the Castle of the Night who was adopted and raised by ${Card.link("character", "Lemuen")} along 
      with ${Card.link("[character|Rin Shima]", "his sister")}. Wasn't the
      best at fighting but maintained an unshakable, and contagious, aura of hope and optimism despite having seen 
      his fair share of atrocities and horrors. Organized a 'resistance' aimed at making leaving the castle possible.`],
    ["Shimarin",
     `An orphan adopted and raised by ${Card.link("character", "Lemuen")} who taught her sniping. Took it up as a job after 
      Lemuen got crippled. Worked in a team until ${Card.link("[character|Verrader]", "Verrader")} sold them out, 
      then worked solo. Was there, past midnight, when Ruin almost got complete - she made it back with 
      ${Card.link("[character|Logos]", "The Playwright")}'s aid.`],
    ["Verrader",
     `An influential fixer in Night Castle. Made it big thanks to his incredible charisma and deception skills. 
      Gained ${Card.link("condition", "Nightblood")} in an accident - a result of his first betrayal - during his
      early years spent on the field in a forge which submerged his whole team, except 
      ${Card.link("[character|Rin Shima]", "Shimarin")}, in magma. Died at the hands of the Steel Inquisitors, 
      his soul burnt to power Rin's hemalurgy.`],
    ["Fiest",
     `While he rarely stepped on to the field himself, ${Card.link("[character|Ken Shima]", "Shimaken")} and the 
      others owed a lot to his technical genius. Since he rarely even left the confines of his lab, his life was
      rather sheltered and happy. ${Card.link("character", "Lemuen")}'s boyfriend before she died.`],
    ["Mouthpiece",
     `Was somehow related to the Witch King of lore. The most loyal member of the troupe, he took it upon himself
      to be the host/announcer of the Troupe's 'shows'. Responsible for their most grotesque creations which often 
      were looked down upon by ${Card.link("[character|Logos]", "The Playwright")} as being crude and tasteless. 
      Was killed by a group of adventurers and ${Card.link("[Character|Lucian]", "Solitare")} but he had already 
      accomplished what his master needed...`],
    ["SanguineArch",
     `Little is known (so far) about the first, and primordial, vampire and the de facto Lord of the entire dimension
      of the Shadowfell except that they are extremely dangerous to all but other higher vampires, most of whom regard 
      them with utmost respect. Fear, yes, but respect...`],
    ["Decroa",
     `A higher vampire who had been captured by the Troupe Long ago and used both as a trap against unwanted 
      intruders and for their 'plays' and research. Prolonged torture and withdrawal symptoms had made her a little 
      unhinged, and <i>very</i> thristy. Was finally freed by a group of adventurers and thereafter protected by 
      ${Card.link("[character|The SanguineArch]", "The SanguineArch")} until she could escape the 
      castle. Revealed herself to be a childhood friend of ${Card.link("[character|Lesley]", "Lesley")}'s.`],
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
      known all the details was ${Card.link("[character|GOrder]", "The Guardian of Order")} before he passed away.
      <br/>
      By the time he was found again by a group of adventurers, he was imprisoned by the troupe next to a rather 
      large explosive, and had completely lost his mind - as he kept babbling some gibberish. As they were escaping
      with him, however, the mists touched him causing him to fully become himself again. Unfortunately, this was but
      for a moment since soon after he was assassinated by ${Card.link("[Character|Lucian]", "Solitaire")}.`],
    ["Mandy",
     `A criminal and gang/cult leader, she was well known and feared throughout the lower levels of the castle for 
      being a very advanced case of nightblood. It gave her powers to manipulate stone, something which also made 
      her near impossible to kill, while completely sapping her of human emotions like empathy, making her a 
      psychopathic killing machine. Seemed to be researching some clues regarding the plane of the earth a 
      ${Card.link("[character|Ebenezar]", "particularly adept spellcaster")} had left behind but was thwarted by a 
      group of adventurers who handed her research to ${Card.link("[character|Verrader]", "Verrader")}.`],
    ["Gen",
     `Little is known (so far) of ${Card.link("[character|Mandragora]", "Mandragora")}'s brother except that he was
      a regular studious boy in Terra Prima until he was kidnapped by a 
      ${Card.link("[character|Mostima]", "bored wandering spacetime-traveller")} and brought into the Castle of 
      Death to be used as a bargaining chip by a group of adventurers, since he was supposedly the only family, and 
      only weakness of his sister.`],
    ["Muelsyse",
     `A well known research specialist from Innovation who specialized in nanomachines and fluid automation. Had 
      come to the castle of Ruin for reasons unknown and there happened to meet, and protect from imminent 
      destruction, ${Card.link("[character|Fiest]","one of the fans of her research")} and also helped out his group of adventurer 
      friends. However, being in a rush they couldn't really get to know her better then.`],
    ["Shamare",
     `A child who'd been forced into a harsher life someone of her age deserved, the death of her sister caused her
      to inherit her nightblood and learn of her 'arts'. These 'arts' involved weaving the souls of people, and 
      others, into inanimate objects - twisting their identity and spiritual energy to perform certain tasks. The
      first soul she weaved was that of her own sister's, who had been shot - as she was trying to go incognito - by 
      ${Card.link("[character|Rin Shima]", "a sniper")} at the behest of her 
      ${Card.link("[character|Mouthpiece]", "last employer")} after she had completed a certain contract supposedly
      involving a lock. Shamare finally gave up her quest for vengeance when she realized she was being manipulated 
      and at the behest of a very persuasive barbarian.`],
    ["Lemuen",
     `${Card.link("[character|Mostima]", "Mostima")}'s half-sister and ${Card.link("[character|Rin Shima]", "Rin")}'s
      teacher - she was reputed to be a sniper without compare. While her life had a great deal of ups and downs,
      very few individuals would know her full life story - probably only Mostima. And yet, one adventurer did begin
      to bond with a part of her left behind after she died, inheriting her skills and small pieces of her memories.`],
    ["Eugrud",
     `An orc who served as bodyguard to ${Card.link("[character|Verrader]", "Verrader")} and probably shared one 
      braincell with his co-bodyguard, the bugbear gunslinger Roth (and probably received the smaller half of that 
      braincell). While he liked to boast and think he'd seen everything the castle had to offer while working 
      under Verrader, only after his death - after failed attempts to assassinate ${Card.link("[character|Rin Shima]", "Shimarin")}
      and then ${Card.link("[character|Ken Shima]", "Shimaken")} did he realize just how insignificant his life so far had been...`],
    ["Andoain",
     `An aasimar with a halo and glowing wings like reflected glass who mysteriously appeared in Veteres in around 
      1580 AR. Seemed to be supernaturally gifted in the use of firearms and preferred them to swords. Known by all 
      to be an extremely generous and kind soul, but seemed to be haunted by demons of his own, and was always 
      begging God for forgiveness. Was randomly assaulted by a 
      ${Card.link("[character|Mostima]", "mysterious half-blood fallen aasimar")} while peacefully exploring the
      coast of Aegir.<br/>[INCOMPLETE]`],
    ["", ``],
])


const caelynnDesc = `
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
protect as she had been protected by ${Card.link("[character|Vahareth]", "Vahareth")}. Before long, she was 
regarded as a prodigy there too - with the different orders of Watchers, Inquisitors and Scholars training her and 
vying for her to join them. Yet there was little surprise when she chose to join the Watchers - after all she was
virtually Vahareth's daughter - lived in his bunker, trained under him personally, and had the same cold steel gaze
that could unnerve the most confident of men.<br/>
Being so close to power and being the center of attention of so many orders meant that she met a fair share of 
important people from different orders. One among them was the apprentice of the Guardian of Defense, 
${Card.link("[character|Othello]", "Othello Titanborn")}. The gardens, because of their extremely low but <i>very</i>
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
${Card.link("[character|Lesley]", "Lesley")} in tow. The two soon grew very close, also starting to work together on
operations. A few decades later, as her date of graduation from field service arrived, her collegues gifted her an
${Card.link("[character|Dave]", "automaton")} to help defend her in close range. And so the three of them started 
Bunker#371, and remained its sole members for one and a half millenia. Until finally Caelynn was there for someone
the way Vahareth had been for her - an elven girl, ${Card.link("[character|Lia Mistcloak]", "Lia Mistcloak")}, who
was 'taken' by ${Card.link("[aberration|]", "The Second")}. A few centuries after, Lia was to get married and
${Card.link("[character|Ulrich Mistcloak]", "her husband")} too moved in. Again after a few centruries Lesley decided
to 'adopt' ${Card.link("[character|Ebenezar]", "a human boy")} whose soul seemed burdened in the same way that hers and 
Caelynn's once had. As Caelynn approved, it finally struck her that her lone wolf days were a thing of the long 
past - and once again she felt warmth in the company of others. It was when this happened that Vahareth finally 
decided to name her his apprentice formally, meant to succeed him as guardian. Since then there were a few ups and 
downs - like ${Card.link("[character|Conley]", "Conley")} joining and Ebenezar abandoning Lesley - an act of remarkable
parallel with the way Othello once had her, but with each other for support, they weathered all that came.
<h5>The hour of Loss</h5>
A few days before the hour of loss, Caelynn got notified of a threat that required at least the attention of a 
Guardian apprentice. On arriving the scene, she found a group of adventurers, of whom 
${Card.link("[Character|Lucian]", "all but one")} were peacefully slumbering around a mistflame. The one not 
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
themselves face to face with ${Card.link("[character|Logos]", "The Playwright")} and 
${Card.link("[character|The SanguineArch]", "The SanguineArch")}, the primoridal nightmares were already free. 
Thankfully, all of them being in one place meant that a greater disaster was prevented. Even with all his inquisitors,
Ruin could not take on the five of them together. That meant he couldn't get the Atium, couldn't complete himself and
was evenly matched against the new Preservation, 'The Survivor'. But leaving the Atium stash intact was too much of a
risk, so they offered the adventurers to burn it all if they would like to, an honour for helping protect the entire 
multiverse from utter and imminent destruction. However, the adventures refused as they felt the Guardians were 
better suited for the power. They just wanted to have peace and quiet and leave the castle behind finally.<br/>
However, that was not to be. For one of them had been marked by ${Card.link("[aberration|]", "The Second")}, and the
Playwright's powers had bound their souls in their skirmish. And so, she once again lost a group of good people, 
people important to her, people who'd given her hope. There were already plans of war in motion. Of vengence, of
survival. Until now, they had tried to play nice, it had resulted in the death of friends, in the death of God. 
No more...`;

const lesleyDesc = `
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
${Card.link("[character|Caelynn Nightbreeze]", "Caelynn")}, began to warm up to her. Her nightmare was again turning 
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
${Card.link("[character|The SanguineArch]", "The SanguineArch")} themself...
<h5>Ebenezar</h5>  
Lesley's time in Bunker#371 was satisfying, not entirely perfect - but as happy as a penance could be. Happier than 
she felt she deserved anyway. And while the blacksmith and his wife pissed her off, subtly reminding her of her 
family, Caelynn was a pure pleasure. Plus even ${Card.link("[character|Irene]", "an inquisitor")}, who had been 
so adamant that Lesley was a criminal, that there was something off about her - until Lesley had revealed
her heritage, was becoming a great friend. And so she was sure she wasn't lacking in any way - until she met 
${Card.link("[character|Ebenezar]", "Ben")}. A human 
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
${Card.link("[character|Mostima]", "mysterious girl with temporal control")} had shown up and wanted to be her ward.
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

const shimaRinDesc = `
<h5>Early Life and Capture</h5>
It is hardly unusual for a child to lose their parents at a very young age in the Castle of the Night, and so when her
parents went missing, eight-year-old Rin found a plenitude of odd jobs, not all very ethical, to support herself and 
her four-year-old brother ${Card.link("[character|Ken Shima]", "Ken")}. Not all her employers were the most scrupulous,
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
like light reflected on a crystalline surface. ${Card.link("[character|Mostima]", "One of them")} however, also
seemed to have the black horns and tails of a fiend. She seemed a lot less noble, and so to Rin a lot more unnerving,
more like a street thug she was used to instead of a divine being like the others.<br/>
When her blindfolds were removed, she found herself in a cell. Sitting next to her, with her gun on her lap, was the
${Card.link("[character|Lemuen]", "famed sniper")} she'd heard so much off. Her kindly - almost jovial - demeanour
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
${Card.link("[character|Fiest]", "her boyfriend")} - a human guy they'd met here who 
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
${Card.link("[character|Verrader]", "one member of the crew")} betrayed the others for personal gain,
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
once when the troupe ${Card.link("[character|Mouthpiece]", "Mouthpiece")} himself asked her to kill a certain Vulpine soul weaver. <br/>   
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
by none other than ${Card.link("[character|Baphomet]", "Baphomet")} himself. There was no way out of this, and so she did what she had planned before, and
put a bullet into her friend. Something which, by the tears in his eyes, he knew was coming.<br/>
After that, she decided to bite back at the troupe by taking out their most valuable piece, someone she knew they 
had big plans for - ${Card.link("[character|Lucian]", "The Solitaire")}. Things didn't go as planned however,
and instead she ended up in the fortress of the inquisitors, gaining an Atium spike and a Steel spike powered by 
Verrader's soul followed by heading right past midnight into a showdown that involved more myths and legends than 
she could even dream of - all the Guardians with Preservation himself in the mists, eight senior inquisitors moved
by Ruin himself (who was also moving her - despite her best efforts), 
${Card.link("[character|Logos]", "The Playwright")} and the Mouthpiece and lastly 
${Card.link("[character|The SanguineArch]", "The SanguineArch")} along with two other higher vampires. Finally, 
there was one other - a single Honorspren who stood next to her, waiting, and had gone unnoticed by all...  
`;


export function setupCharacterCards() {
    Character.loadStaticElements();

    /************************* Campaign 1, Arc 1 **************************/

    new Character({
        name         : "Lucian",
        tokenName    : "lucian_norm",
        arc          : 1,
        campaign     : 1,
        age          : 210,
        gender       : "M",
        tags         : ['From | Ruin',
                        'Allegiance | Ruin / ???',
                        'Race | Feline',
                        `Class | ${Card.verbose("Echo Knight")} Fighter`,
                        `Class | ${Card.verbose("Assassin")} Rogue`,
                        `Class | ${Card.verbose("Hexblade")} Warlock`,
                        `Nightblood | Ominous Melody`,
                        `Aberrant-Fused ${Card.verbose("(Tragodia)")}`,
                        `<i>He who quiets</i>`,
                        'CR | 19'],
        summary      : summaries.get("Lucian") ?? "???",
        description  : "",
        altImagePaths: new Map([
            ["Phantom", "lucian_norm"],
            ["Solitaire", "lucian_mad"],
        ]),
    });
    new Character({
        name         : "Ebenezar",
        tokenName    : "ebenezar",
        campaign     : 1,
        arc          : 1,
        age          : 750,
        gender       : "M",
        tags         : ['From | Materia / Preservation / Ruin',
                        'Race | Human',
                        `Class | ${Card.verbose("Divination")} Wizard`,
                        `Lich`,
                        `Deceased`,
                        `Scholar`,
                        'CR | 22'],
        summary      : summaries.get("Ebenezar") ?? "???",
        description  : "",
    });
    new Character({
        name         : "Caelynn Nightbreeze",
        tokenName    : "caelynn",
        arc          : 1,
        campaign     : 1,
        age          : 4560,
        gender       : "F",
        tags         : ['From | Materia / Preservation',
                        'Allegiance | Preservation',
                        'Race | Half-Elf',
                        `Class | Druid ${Card.verbose("(Circle of Dreams)")}`,
                        'Guardian of Life',
                        'Watcher',
                        'Atium Savant',
                        'CR | 25'],
        summary      : summaries.get("Caelynn") ?? "???",
        description  : caelynnDesc,
        personalityTags: new Map([
            [NpcPersonalityTag.Industrious, 4],
            [NpcPersonalityTag.Confident, 3],
            [NpcPersonalityTag.Outdoorsman, 3],
            [NpcPersonalityTag.Kind, 2],
            [NpcPersonalityTag.Optimist, 2],
            [NpcPersonalityTag.Ascetic, 2],
            [NpcPersonalityTag.Stern, 1],
            [NpcPersonalityTag.Abrasive, 1],
            [NpcPersonalityTag.Bisexual, 1],
        ]),
    });
    new Character({
        name         : "Lesley Aeternus",
        indexName    : "Lesley",
        tokenName    : "lesley",
        campaign     : 1,
        arc          : 1,
        age          : 2860,
        gender       : "F",
        tags         : ['From | Shadowfell / Materia / Preservation',
                        'Allegiance | Preservation',
                        'Race | Higher Vampire',
                        `Time Command`,
                        `Class | ${Card.verbose("Chronurgy")} Wizard`,
                        `Class | ${Card.verbose("Knowledge")} Cleric`,
                        `Projector`,
                        'CR | 18 / 24'],
        summary      : summaries.get("Lesley") ?? "???",
        description  : lesleyDesc,
        personalityTags: new Map([
            [NpcPersonalityTag["Recovering Addict"], 5],
            [NpcPersonalityTag.Bibliophile, 3],
            [NpcPersonalityTag.Recluse, 3],
            [NpcPersonalityTag.Lazy, 2],
            [NpcPersonalityTag.Depressive, 1],
            [NpcPersonalityTag["Guilt-ridden"], 1],
            [NpcPersonalityTag.Introvert, 1],
        ])
    });
    new Character({
        name         : "Irene",
        tokenName    : "irene",
        campaign     : 1,
        arc          : 1,
        age          : 1390,
        gender       : "F",
        tags         : ['From | Air / Water / Preservation',
                        'Allegiance | Preservation',
                        'Race | Air Genasi',
                        `Class | ${Card.verbose("Gunslinger")} Fighter`,
                        `Class | ${Card.verbose("Storm")} Sorcerer`,
                        `Class | ${Card.verbose("Tempest")} Cleric`,
                        `Inquisitor`,
                        'CR | 14'],
        summary      : summaries.get("Irene") ?? "???",
        description  : "",
    });
    new Character({
        name         : "Ling",
        tokenName    : "ling_garden",
        campaign     : 1,
        arc          : 1,
        age          : "",
        gender       : "F",
        tags         : ['From | ??? / Preservation',
                        `Race | Titan ${Card.verbose("&times; Blue Dragon")}`,
                        `Class | ${Card.verbose("Draconic")} Sorcerer`,
                        `Primordial | Outsider ${Card.verbose("(Fragment of ???)")}`,
                        'Guardian of Diplomacy',
                        'Lighthouse Keeper',
                        'CR | 19 / 27'],
        summary      : summaries.get("Ling") ?? "???",
        description  : "",
        altImagePaths: new Map([
            ["Lighthouse Keeper", "ling_garden"],
            ["Shrine Maiden", "ling_sui"],
        ]),
    });
    new Character({
        name         : "Dave Ruhl",
        indexName    : "Dave",
        tokenName    : "dave",
        campaign     : 1,
        arc          : 1,
        age          : 2500,
        gender       : "M",
        tags         : ['From | Innovation / Preservation',
                        'Race | Warforged',
                        `Class | ${Card.verbose("Samurai")} Fighter`,
                        `Defender`,
                        `Deceased`,
                        'CR | 13'],
        summary      : summaries.get("Dave") ?? "???",
        description  : "",
    });
    new Character({
        name         : "Ulrich Mistcloak",
        indexName    : "Ulrich",
        tokenName    : "ulrich",
        campaign     : 1,
        arc          : 1,
        age          : 1020,
        gender       : "M",
        tags         : ['From | Materia / Preservation',
                        'Race | Human',
                        `Class | ${Card.verbose("Forge")} Cleric`,
                        `Scholar`,
                        'CR | 7'],
        summary      : summaries.get("Ulrich") ?? "???",
        description  : "",
    });
    new Character({
        name         : "Lia Mistcloak",
        indexName    : "Lia",
        tokenName    : "lia",
        campaign     : 1,
        arc          : 1,
        age          : 1280,
        gender       : "F",
        tags         : ['From | Feywild / Preservation',
                        'Allegiance | Preservation',
                        'Race | Elf',
                        `Class | ${Card.verbose("Samurai")} Fighter`,
                        `Watcher`,
                        'CR | 9'],
        summary      : summaries.get("Lia") ?? "???",
        description  : "",
    });
    new Character({
        name         : "Conley",
        tokenName    : "conley",
        campaign     : 1,
        arc          : 1,
        age          : 210,
        gender       : "M",
        tags         : ['From | Fire / Preservation',
                        'Race | Fire Genasi',
                        `Class | ${Card.verbose("Eloquence")} Bard`,
                        `Negotiator`,
                        'CR | 7'],
        summary      : summaries.get("Conley") ?? "???",
        description  : "",
    });
    new Character({
        name         : "Vahareth Tsav Anat",
        indexName    : "Vahareth",
        tokenName    : "g_life",
        campaign     : 1,
        arc          : 1,
        age          : "50K+",
        gender       : "M",
        tags         : ['From | Materia / Preservation',
                        'Allegiance | Preservation',
                        'Race | Kalashtar',
                        `Class | Druid`,
                        `Guardian of Life`,
                        `Inspector`,
                        `'Retired'`,
                        'CR | 26'],
        summary      : summaries.get("Vahareth") ?? "???",
        description  : "",
    });
    new Character({
        name         : "The Guardian of Order",
        indexName    : "GOrder",
        tokenName    : "g_order",
        campaign     : 1,
        arc          : 1,
        age          : "50K+",
        gender       : "M",
        tags         : ['From | Shadowfell / Preservation',
                        'Allegiance | Preservation',
                        'Race | Shadar-Kai',
                        `Class | ${Card.verbose("Hexblade")} Warlock`,
                        `Class | ${Card.verbose("Devotion")} Paladin`,
                        `Guardian of Order`,
                        `Inquisitor`,
                        `Deceased`,
                        'CR | 26'],
        summary      : summaries.get("GOrder") ?? "???",
        description  : "",
    });

    /************************* Campaign 1, Arc 2 **************************/

    new Character({
        name         : "The Playwright",
        indexName    : "Logos",
        tokenName    : "logos_normal",
        campaign     : 1,
        arc          : 2,
        age          : "50K+",
        gender       : "M",
        tags         : ['From | Ruin',
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
    new Character({
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
    new Character({
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
    });
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
        name         : "Kjeragandr",
        indexName    : "Kjera",
        tokenName    : "g_mag_stone",
        campaign     : 1,
        arc          : 2,
        age          : "",
        gender       : "F",
        tags         : ['From | Stone / Preservation',
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
    new Character({
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
    new Character({
        name         : "Othello The Traitor",
        indexName    : "Othello",
        tokenName    : "othello",
        campaign     : 1,
        arc          : 2,
        age          : "5020",
        gender       : "M",
        tags         : ['From | Materia / Preservation / Ruin',
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
        name         : "Eugrud the Vanquisher",
        indexName    : "Eugrud",
        tokenName    : "eugrud",
        campaign     : 1,
        arc          : 2,
        age          : "133",
        gender       : "M",
        tags         : ['From | Ruin',
                        `Race | Orc`,
                        `Class | ${Card.verbose("Champion")} Fighter`,
                        `Class | Barbarian`,
                        `Pewter Savant`,
                        'CR | 8'],
        summary      : summaries.get("Eugrud") ?? "???",
        description  : "",
    });

    /************************* Campaign 2, Arc 1 **************************/

    new Character({
        name         : "Andoain 'The Martyr'",
        indexName    : "Andoain",
        tokenName    : "Andoain",
        campaign     : 2,
        arc          : 1,
        age          : "221",
        gender       : "M",
        tags         : [
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
    // new Character({
    //     name         : "Dusk",
    //     tokenName    : "Dusk",
    //     campaign     : 2,
    //     arc          : 1,
    //     age          : "",
    //     gender       : "F",
    //     tags         : [],
    //     summary      : summaries.get("Dusk") ?? "???",
    //     description  : "",
    // });
    new Character({
        name         : "Dawn",
        tokenName    : "Dawn",
        campaign     : 2,
        arc          : 1,
        age          : 32,
        gender       : "F",
        tags         : [
        ],
        summary      : summaries.get("Dawn") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag["Nature Lover"], 3],
            // [NpcPersonalityTag.Industrious, 2],
            // [NpcPersonalityTag.Ascetic, 2],
            // [NpcPersonalityTag["Abhors Violence"], 2],
            // [NpcPersonalityTag.Homosexual, 1],
            // [NpcPersonalityTag.Accepting, 1],
            // [NpcPersonalityTag.Depressive, 1],
        ])
    });
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
        name         : "Hina",
        tokenName    : "Hina",
        campaign     : 2,
        arc          : 1,
        age          : 14,
        gender       : "F",
        tags         : [
        ],
        summary      : summaries.get("Hina") ?? "???",
        description  : ""
        ,
        personalityTags:  new Map([
            // [NpcPersonalityTag.Gourmand, 3],
            // [NpcPersonalityTag.Bloodlust, 2],
            // [NpcPersonalityTag.Slothful, 2],
            // [NpcPersonalityTag.Sanguine, 2],
            // [NpcPersonalityTag.Quiet, 1],
            // [NpcPersonalityTag.Distant, 1],
            // [NpcPersonalityTag.Psychopath, 1],
        ]),
    });
    new Character({
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
    new Character({
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
    new Character({
        name         : "Jaye",
        tokenName    : "Jaye",
        campaign     : 2,
        arc          : 1,
        age          : 26,
        gender       : "M",
        tags         : [],
        summary      : summaries.get("Jaye") ?? "???",
        description  : "",
    });
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
        name         : "Taihe",
        tokenName    : "Taihe",
        campaign     : 2,
        arc          : 1,
        age          : 22,
        gender       : "M",
        tags         : [],
        summary      : summaries.get("Taihe") ?? "???",
        description  : "",
        personalityTags: new Map([
            // [NpcPersonalityTag.Kind, 3],
            // [NpcPersonalityTag["Nature Lover"], 2],
            // [NpcPersonalityTag.Accepting, 2],
            // [NpcPersonalityTag.Jealous, 1],
            // [NpcPersonalityTag.Modest, 1],
            // [NpcPersonalityTag.Industrious, 1],
        ])
    });
    new Character({
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
    new Character({
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
    new Character({
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
    new Character({
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
}
