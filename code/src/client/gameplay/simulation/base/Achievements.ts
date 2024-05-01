import {XpForLevel}    from "../../data/constants";
import {IDOMGenerator} from "../../IDomGenerator";


/**
 * Something that grants the players XP.
 */
class Achievement
    implements IDOMGenerator
{
    private readonly nested: Achievement[] = [];

    public constructor(private readonly title: string,
                       private readonly subtitle: string,
                       public readonly exp: number,
                       private readonly done: boolean)
    {}

    public nest(a: Achievement): this
    {
        this.nested.push(a);
        return this;
    }

    public computeNestedExp(): number
    {
        let ne = 0;
        for (const achievement of this.nested) {
            ne += achievement.computeNestedExp();
        }
        return ne + (this.done ? this.exp : 0);
    }

    public generateDOMString(): string
    {
        const nestedDOMs = [];
        for (const achievement of this.nested) {
            nestedDOMs.push(achievement.generateDOMString());
        }

        return `
        <div class="achievement ${this.done ? "achievement--complete" : ""}">
            <div class="achievement__title">${this.title}</div>
            <div class="achievement__xp">${this.exp} xp</div>
            <div class="achievement__desc">${this.subtitle}</div>
            <div class="achievement__status"><i class="fa-solid fa-circle-check"></i></div>
        </div>
        <div class="achievement__nested">${nestedDOMs.join("")}</div>`;
    }
}

/**
 * Mapping from quest -> category -> Top level achievements.
 */
const achievements: Map<string, Map<string, Achievement[]>> = new Map([
    ["Surging Tides", new Map([
        ["Diving into the Deep", [
            new Achievement(
                "The Eye, Lifeless",
                "Reach the old Lighthouse",
                1000,
                true
            )
                .nest(new Achievement(
                    "A rest for weary sailors",
                    "Arrive within 30 ft of the lifeberg.",
                    1000,
                    true
                )
                    .nest(new Achievement(
                        "Neptune's chosen",
                        "Leave the 'berg with the boat intact.",
                        1200,
                        false
                    ))
                    .nest(new Achievement(
                        "Not today",
                        "Leave the 'berg with Hav alive.",
                        2000,
                        false
                    ))
                    .nest(new Achievement(
                        "They're not running away?",
                        "Get a glimpse of the lifeberg and its related ecosystem's" +
                        "food cycle.",
                        800,
                        true
                    ))
                )
                .nest(new Achievement(
                    "Too convenient to be true",
                    "Steer clear of the lifeberg and reach the lighthouse directly.",
                    800,
                    false
                )
                    .nest(new Achievement(
                        "Swat the flies",
                        "Kill at least 12 drifters before reaching the lighthouse.",
                        1500,
                        false
                    ))
                    .nest(new Achievement(
                        "Outrun the buzzing",
                        "Reach the lighthouse with no more than 12 drifters " +
                        "killed and the boat intact.",
                        1500,
                        false
                    ))
                )
                .nest(new Achievement(
                    "Eye into the past",
                    "Find High Inquisitor Dario's lantern before " +
                    "entering the lighthouse.",
                    500,
                    false
                )
                    .nest(new Achievement(
                        "A rage inherited",
                        "Find out who Dario was, using the lantern on the shore.",
                        1000,
                        false
                    ))
                )
                .nest(new Achievement(
                    "Shady dealings",
                    "Make a trade with Cannot before entering the lighthouse.",
                    700,
                    false
                ))
                .nest(new Achievement(
                    "Overseas exports",
                    "Find the boat and the stash of beer on the " +
                    "opposite shore.",
                    400,
                    true
                )
                    .nest(new Achievement(
                        "I'm outta here",
                        "Escape the place via the boat and reach Po'Shan alive.",
                        4000,
                        false
                    ))
                    .nest(new Achievement(
                        "Good stuff... Uhh.. <em>the fuck's that??</em>",
                        "Sample one of the bottles after it's been touched by " +
                        "Cannot before entering the lighthouse.",
                        1500,
                        false
                    ))
                )
                .nest(new Achievement(
                    "Virus in the brain",
                    "Have a strange dream in a sleep induced by the " +
                    "fumes released by the lifeberg.",
                    800,
                    true
                ))
                .nest(new Achievement(
                    "Tracing footsteps",
                    "Destroy the boulder and enter the lighthouse",
                    1200,
                    true
                )
                    .nest(new Achievement(
                        "Offense is the best defense",
                        "Destroy the first wave of enemies before dealing 200 " +
                        "damage to the door.",
                        1800,
                        false
                    ))
                    .nest(new Achievement(
                        "Prioritization",
                        "Destroy the boulder before killing even a single enemy.",
                        1800,
                        true
                    ))
                    .nest(new Achievement(
                        "Demolitions 101",
                        "While targeting its structural weakness at least once " +
                        "(+500 bonus for Mold Earth at the base).",
                        1300,
                        true
                    ))
                )
                .nest(new Achievement(
                    "Technologies Ancient?",
                    "Witness the lighthouse's internal systems power " +
                    "up as you enter.",
                    300,
                    true
                )
                    .nest(new Achievement(
                        "Empirical observations",
                        "Figure out a pattern in the switches and reach the other " +
                        "end.",
                        300,
                        true
                    ))
                    .nest(new Achievement(
                        "Electrostatic Analysis",
                        "Figure out the physics behind the switches and why they " +
                        "work as they do.",
                        400,
                        false
                    ))
                    .nest(new Achievement(
                        "Flames of Castigation",
                        "Aim, charge up and fire the cannon. (+500 bonus for " +
                        "targeting over 7 enemies together)",
                        1200,
                        true
                    ))
                    .nest(new Achievement(
                        "Cranking the levers",
                        "Restore the mechanism and descend as low as possible via " +
                        "the chains... before plummeting the rest of the way.",
                        1000,
                        false
                    ))
                )
                .nest(new Achievement(
                    "Shut up and fight",
                    "Do not engage the possessed shrieker in a conversation",
                    800,
                    true
                ))
                .nest(new Achievement(
                    "Buying time",
                    "Stall the shrieker by talking through it.",
                    500,
                    false
                )
                    .nest(new Achievement(
                        "Tongue of pure silver",
                        "Conclude the conversation without putting Irene in " +
                        "mortal danger or surrendering Jordi.",
                        1500,
                        false
                    ))
                ),
            new Achievement(
                "The Passages, Sunless",
                "Reach the TimeShifted town of Takemaria.",
                2000,
                true,
            )
                .nest(new Achievement(
                    "Buckle up",
                    "Survive the landing into the nethersea cave.",
                    1500,
                    true
                ))
                .nest(new Achievement(
                    "Rusts and Ruin",
                    "Seize the Rusted Rapier after defeating all seaborn excavating it.",
                    500,
                    true
                ))
                .nest(new Achievement(
                    "Candles and Primal forests",
                    "Enter the woods the brand hasn't touched.",
                    300,
                    false
                )
                    .nest(new Achievement(
                        "A Defense of The Ancients",
                        "Investigate the device that nullifies the brand.",
                        700,
                        false
                    ))
                    .nest(new Achievement(
                        "Soothing Melodies",
                        "Defeat a shrieker with the aid of a Sphere of Repose.",
                        500,
                        false
                    ))
                )
                .nest(new Achievement(
                    "Backs to the wall",
                    "Destroy / sneak past the seaborn settlement guarding " +
                    "the perpendicularity.",
                    2500,
                    false
                )
                    .nest(new Achievement(
                        "Just a dream?",
                        "Escape via the perpendicularity.",
                        500,
                        false
                    ))
                    .nest(new Achievement(
                        "Invocation to the void",
                        "Draw upon the arcane signature of the sigil of death.",
                        1200,
                        false
                    ))
                    .nest(new Achievement(
                        "Just another big fish",
                        "Defeat the leviathan guarding the passage between the " +
                        "cave system and the plane of water.",
                        5000,
                        false
                    ))
                ),
            new Achievement(
                "The Town, Mirthless",
                "Head past the grottos to reach the cliffs marking the shore " +
                "of the Nethersea.",
                3000,
                false
            )
                .nest(new Achievement(
                    "Rage and Hunger",
                    "Investigate the brutal murders happening around the town " +
                    "for the last 29 days.",
                    1000,
                    false,
                )
                    .nest(new Achievement(
                        "Blood and Oil",
                        "Prevent the murderer from claiming their 30th victim.",
                        600,
                        false
                    ))
                )
                .nest(new Achievement(
                    "A Herald of New Gods",
                    "Learn of the town's technological advisor and investigate " +
                    "his research room.",
                    1000,
                    true
                )
                    .nest(new Achievement(
                        "The Essence of Evolution",
                        "Read the exchange of emails between Ruzaki and the " +
                        "Scarab.",
                        700,
                        false,
                    ))
                    .nest(new Achievement(
                        "Tongue of Chrome",
                        "Leave the Scarab's residence after entering his " +
                        "research room without fighting Marin.",
                        1500,
                        false
                    ))
                    .nest(new Achievement(
                        "Static beyond the Wall",
                        "Allow or deny a daemon her vengeance.",
                        800,
                        false
                    ))
                    .nest(new Achievement(
                        "The Power that makes Gods",
                        "Use Fortune of your own violation.",
                        1000,
                        false
                    ))
                    .nest(new Achievement(
                        "The Shield of Fear",
                        "Temporarily revive an old hero who died trapped by the " +
                        "second nightmare.",
                        1000,
                        false
                    )
                        .nest(new Achievement(
                            "The Blade of Vengeance",
                            "Use the ultimate weapon to reap your enemies' souls.",
                            1500,
                            false
                        )))
                    .nest(new Achievement(
                        "Black Rice",
                        "Unleash the power of Ruin to obliterate your enemies.",
                        2000,
                        false
                    ))
                )
                .nest(new Achievement(
                    "Destructive Interference",
                    "Talk to Maaya.",
                    600,
                    true
                )
                    .nest(new Achievement(
                        "The Game of Kings",
                        "Play a game with Maaya and win.",
                        1200,
                        false
                    )
                        .nest(new Achievement(
                            "Heeding Advice",
                            "Refuse to raise the stakes.",
                            1000,
                            false
                        ))
                        .nest(new Achievement(
                            "Sore losers get what they deserve",
                            "Use the game to destroy at least one dreadful foe.",
                            10000,
                            false
                        ))
                    )
                    .nest(new Achievement(
                        "The Sacred and the Profane",
                        "Get Maaya to reveal vital intel.",
                        500,
                        false
                    )
                        .nest(new Achievement(
                            "Misery shared is misery halved",
                            "Tell Maaya your story.",
                            500,
                            false
                        ))
                    )
                )
                .nest(new Achievement(
                    "The Lord of the Faceless",
                    "Learn of the presence of a demon lord in the vicinity.",
                    600,
                    true
                )
                    .nest(new Achievement(
                        "The Virtuous Sister",
                        "Encounter an offshoot of the demon lord's core body. " +
                        "(+500 Bonus for how things unfolded)",
                        900,
                        true
                    ))
                    .nest(new Achievement(
                        "The Abyssal Currency",
                        "Buy one of the items Damatzi is selling.",
                        1200,
                        true
                    ))
                    .nest(new Achievement(
                        "Master Tracker",
                        "Deduce the presence of the demon lord's core body " +
                        "in your vicinity before it is too late.",
                        600,
                        false
                    ))
                )
                .nest(new Achievement(
                    "A change of plans",
                    "Meet with the sleeper agent.",
                    500,
                    true
                )
                    .nest(new Achievement(
                        "A change of heart",
                        "Gain a situational advantage due to the agent " +
                        "'replacing' one of the other NPCs.",
                        1000,
                        true
                    ))
                )
                .nest(new Achievement(
                    "And they come from Alpha Centauri",
                    "Listen to the madman's ranting.",
                    200,
                    true
                ))
                .nest(new Achievement(
                    "Mastercrafter",
                    "Have Gnatt make you a master quality or better weapon.",
                    500,
                    false
                )
                    .nest(new Achievement(
                        "Contingency Measures",
                        "Benefit from one of the many precautions the " +
                        "most intelligent creature alive placed in the " +
                        "light of impending death.",
                        500,
                        true
                    )))
                .nest(new Achievement(
                    "The Son of God",
                    "Investigate the chamber of wishes in the town",
                    800,
                    true
                ))
                .nest(new Achievement(
                    "Fishing in a dry pond",
                    "Barter at least 2 items with Cannot while in Takemaria.",
                    300,
                    false
                ))
                .nest(new Achievement(
                    "And then there was light",
                    "Uncover all secrets, plots and schemes the various " +
                    "factions of the town are devising against each other.",
                    3000,
                    false
                )
                    .nest(new Achievement(
                        "Betrayals Abound",
                        "Side with either Aulus or Isin and kill the other.",
                        1000,
                        false
                    ))
                    .nest(new Achievement(
                        "Champions of Ruin",
                        "Leave behind a wake of death. (At least seven of " +
                        "Gnatt, Damatzi, Ubbo Sathla, Hina, VoSee, Ephremis, Garcia, " +
                        "Maaya, Quintus, Aulus, Isin, Scarab, Elettra, Marin or " +
                        "Zaadimus should be dead for good when you sail the " +
                        "Nethersea).",
                        8000,
                        false
                    ))
                )
            ]
        ],
        ["Vanquishing the tides", [
            new Achievement(
                "Plucking the flowers",
                "Defeat the tangled twins, J&C.",
                5000,
                false,
            ),
            new Achievement(
                "Correcting the course",
                "Defeat the original PathShaper, Garcia.",
                8000,
                true,
            )
                .nest(new Achievement(
                    "In the name of Ruin",
                    "Kill Garcia for good.",
                    2000,
                    true
                ))
                .nest(new Achievement(
                    "Masala Slime Tikka",
                    "Defeat the Greater Demon Lord, Ubbo Sathla.",
                    5000,
                    false,
                )
                    .nest(new Achievement(
                        "To defeat the undefeatable",
                        "Without Hina's aid.",
                        20000,
                        false
                    ))
                    .nest(new Achievement(
                        "Please keep your mask on",
                        "Imprison Ubbo Sathla.",
                        5000,
                        false,
                    )))
                .nest(new Achievement(
                    "Black SoulKiller",
                    "Defeat Elettra's engram after it takes over the 'vampire'.",
                    7500,
                    false
                )),
            new Achievement(
                "Settling the mutiny",
                "Defeat the FathomKing, Capt. Alfonso.",
                12000,
                false,
            )
                .nest(new Achievement(
                    "With A spark of heroism",
                    "Have the Captain slay the last monster standing.",
                    4000,
                    false
                ))
                .nest(new Achievement(
                    "Slay the Sea!",
                    "Defeat the Tidal Knight.",
                    15000,
                    false
                ))
            ,
            new Achievement(
                "Dispelling the Illusion",
                "Defeat Maaya.",
                18000,
                false,
            )
                .nest(new Achievement(
                    "With the blessings of Ruin",
                    "Kill Maaya for good.",
                    3000,
                    false
                ))
                .nest(new Achievement(
                    "And Shunning the Paranoia",
                    "Save Maaya.",
                    3000,
                    false
                ))
                .nest(new Achievement(
                    "A voice drowning deep in the sea",
                    "Figure out Maaya's fatal weakness.",
                    3000,
                    false
                ))
            ,
            new Achievement(
                "Silencing the Opposition",
                "Defeat the First to Talk, Ephremis.",
                21000,
                false
            )
                .nest(new Achievement(
                    "By the Flames of Castigation",
                    "Help Irene avenge her mentor.",
                    4000,
                    false
                ))
                .nest(new Achievement(
                    "Tick. Tock. Tick. Tock.",
                    "Defeat the Nourished Big Sad Lock.",
                    40000,
                    false
                )),
            new Achievement(
                "Ignoring the Call",
                "Defeat the Core of We Many, Amaia.",
                60000,
                false
            )
        ]]
    ])],
    ["When the sun sets", new Map([
        ["", [
            new Achievement(
                "Fallen from grace",
                "Figure out the identity of the silver tree and " +
                "isolate it from the seaborn.",
                700,
                true
            ),
            new Achievement(
                "Don't starve together",
                "Find enough food to survive the week.",
                500,
                true
            ),
        ]
        ], [
            "Who stole the food?", [
                new Achievement(
                    "Merely a scouting party",
                    "Face the first wave of assault by the seaborn -",
                    1200,
                    true
                )
                    .nest(new Achievement(
                        "A sense of Deja Vu",
                        "With Roberta surviving the first harpoon.",
                        500,
                        true
                    ))
                    .nest(new Achievement(
                        "Safeguarding innocence",
                        "With all the children alive after the raid.",
                        600,
                        true
                    ))
                    .nest(new Achievement(
                        "No need for heroes",
                        "Without Elysium dying in the attack.",
                        2100,
                        false
                    ))
                    .nest(new Achievement(
                        "Fewer mouths to feed",
                        "With over 12 villagers dying in the attack.",
                        1000,
                        false
                    ))
                    .nest(new Achievement(
                        "No screaming in the cave",
                        "With no more than 3 villagers other than Elysium dead " +
                        "after the attack.",
                        1200,
                        true
                    ))
                    .nest(new Achievement(
                        "Before the high tides",
                        "Before the Nethersea Brand reaches " +
                        "either the Creeping Branch or the Cave.",
                        700,
                        true
                    )),
                new Achievement(
                    "Taking no chances"
                    , "Don't attempt to stop Irene from executing Jordi"
                    , 500,
                    false
                ),
                new Achievement(
                    "You don't want to do this"
                    , "Protect Jordi from Irene"
                    , 500,
                    true
                ),
                new Achievement(
                    "Just shut up and die!",
                    "Deal over 150 damage to the shrieker.",
                    800,
                    true
                ),
                new Achievement(
                    "Seaweed Salad",
                    "Don't take any damage from any seaborn other than the " +
                    "shrieker or the Brand. (+ 200 bonus for exploiting weakness)",
                    700,
                    true
                ),
            ]],["Most dangerous of them all", [
            new Achievement(
                "In the service of Odium",
                "Take the liquidation contract from Yuki",
                300,
                true
            )
                .nest(new Achievement(
                    "Of envy and ambition",
                    "Without being manipulated by Yuki to utter treasonous " +
                    "words.",
                    900,
                    true
                ))
                .nest(new Achievement(
                    "You're not needed anymore",
                    "Kill Yuki after Odium reaches out but before the " +
                    "seaborn raid.",
                    500,
                    false
                ))
                .nest(new Achievement(
                    "Hell is This",
                    "Be subjected to Odium's own pain.",
                    300,
                    true
                ))
                .nest(new Achievement(
                    "Emergency Response",
                    "Successfully follow all directions given by ??? until " +
                    "Mostima arrives.",
                    500,
                    true
                ))
                .nest(new Achievement(
                    "Believer",
                    "Break free of the pain Odium unleashes using His aid.",
                    500,
                    true
                ))
                .nest(new Achievement(
                    "Disappointments and broken oaths",
                    "Witness Hina liberate Yuki's spren.",
                    300,
                    true
                ))
        ]
        ],
    ])],
    ["For a piece of Honor", new Map([
        ["The Candles", [
            new Achievement(
                "That's a familiar scent?",
                "Understand the nature of the unusual candles and trace their past.",
                500,
                false
            ),
            new Achievement(
                "A breath of wind",
                "Defeat the Reimagined after it enters its Poltergeist state.",
                1000,
                true
            )
                .nest(new Achievement(
                    "Melody of Death",
                    "Ignite 8 candles to the rhythm of Ruin to destroy the poltergeist.",
                    400,
                    false
                ))
                .nest(new Achievement(
                    "Beats of Passion",
                    "Ignite 9 candles to the rhythm of Odium to dominate the poltergeist.",
                    450,
                    false
                ))
                .nest(new Achievement(
                    "Overtones of Absolute Command",
                    "Ignite 10 candles to the rhythm of Honor to deny the poltergeist.",
                    600,
                    false
                )),
            new Achievement(
                "Dangerous Experiments",
                "Investigate how the Reimagined came to be.",
                600,
                false
            ),
        ]],
        ["The Shardbearer", [
            new Achievement(
                "Kneel!",
                "Capture the shardbearer alive.",
                1200,
                false
            ),
            new Achievement(
                "He who lives by the blade...",
                "Kill the Shardbearer.",
                800,
                true
            )
                .nest(new Achievement(
                    "Surgical Precision",
                    "While dealing < 200 points of damage.",
                    500,
                    false
                ))
                .nest(new Achievement(
                    "Why use a scalpel when you have a sledgehammer?",
                    "While dealing > 800 points of damage.",
                    800,
                    false
                ))
                .nest(new Achievement(
                    "Unconventional methods",
                    "Without using a weapon for the killing blow (acid/lava/quicksand etc.).",
                    1000,
                    false
                ))
                .nest(new Achievement(
                    "Esse ventus",
                    "Without any party member suffering a major blow.",
                    1000,
                    true
                ))
                .nest(new Achievement(
                    "Absolute Dominance",
                    "Without any party member suffering a major blow and " +
                    "without Hina dying even once.",
                    1600,
                    false
                ))
        ]],
        ["The clock", [
            new Achievement(
                "Meeting the deadline",
                "Return from the expedition before Dusk's magic fades away.",
                1000,
                true
            ),
            new Achievement(
                "ez",
                "Return from the expedition within 1 day in devotion's time.",
                1500,
                true),
            new Achievement(
                "No need for suspense",
                "Return from the expedition within 1 hour in devotion's time.",
                2500,
                false
            ),
            new Achievement(
                "You're not dead yet",
                "Return from the expedition in the last hour to midnight on the last day.",
                2500,
                false
            ),
        ]],
        ["The sand soldier", [
            new Achievement(
                "Prudence...",
                "Choose not to stand against the sand soldier.",
                500,
                true
            )
                .nest(new Achievement(
                    "Master of the black market",
                    "Uncover the name and identity of the sand soldier.",
                    1400,
                    false
                ))
                .nest(new Achievement(
                    "A passenger onboard",
                    "Have the Sand Soldier join your village.",
                    800,
                    false
                )),
            new Achievement(
                "... is for the weak",
                "Prevent the sand soldier from leaving with the blade.",
                1000,
                false
            )
                .nest(new Achievement(
                    "I can do this all day",
                    "Kill the sand soldier after the shardbearer fight but before taking the subsequent rest.",
                    3000,
                    false
                )),
            new Achievement(
                "In a moment's dream",
                "Recruit the sand soldier's sister into your village.",
                1200,
                false
            )
        ]],
        ["The heist", [
            new Achievement(
                "Heh, noobs",
                "Do not fall for the illusionary bridge trap.",
                500,
                true
            )
                .nest(new Achievement(
                    "Now why are they looking that way?",
                    "Cross the lava stream for the first time using the invisible bridge.",
                    800,
                    true
                ))
                .nest(new Achievement(
                    "Who needs a bridge anyway",
                    "Have the whole party cross the lava stream for the first time without using the invisible bridge.",
                    800,
                    false
                )),
            new Achievement(
                "Oh no! Did something happen?",
                "Reach the ground level without being recognized as the thieves of the safe.",
                600,
                true
            )
                .nest(new Achievement(
                    "Must be rats",
                    "Attract attention at least 3 times but never have the alarm raised.",
                    1000,
                    true
                ))
                .nest(new Achievement(
                    "[Bonus] Out of sight, out of mind",
                    "Trapped 4 guards in the bio research room without getting detected.",
                    1600,
                    true
                )),
            new Achievement(
                "Pacifist's creed",
                "Do not kill a single resident of the shelter.",
                1200,
                true
            ),
            new Achievement(
                "It was luxuries like air conditioning",
                "While on the way out, enter the bio research room",
                800,
                true
            ),
            new Achievement(
                "Unbreakable from the outside",
                "Extract the Amethyst from the wall of force enclosing it.",
                700,
                true
            )
                .nest(new Achievement(
                    "Witness to true perfection",
                    "Form a bond with the ancient inkspren trapped in the Amethyst before returning to Devotion.",
                    3000,
                    false
                ))
        ]],
        ["The exile", [
            new Achievement("Berserk",
                "Learn of Hina's cyberpunk nature.",
                700,
                true),
            new Achievement("Unusual attire for a tribesman",
                "Figure out how Ruzaki ended up here.",
                1300,
                false),
            new Achievement("You've been talking to them too?",
                "Witness Hina's audience with the Shards",
                1400,
                true),
            new Achievement("Yeah, science!",
                "Enter into and understand how Ruzaki's sulphuric acid manufacturing works.",
                600,
                true),
            new Achievement("Fire with fire",
                "Learn what the shards wanted from Hina.",
                1000,
                false),
            new Achievement("Now I am become death",
                "Investigate Ruzaki's research notes.",
                1000,
                false),
            new Achievement("Free as a bird",
                "Sign-up Hina as the village labourer.",
                500,
                true),
            new Achievement("Deal with the devil",
                "Recruit Ruzaki into the village.",
                1500,
                false),
            new Achievement("I'm somewhat of a scientist myself",
                "Recruit Teiai into the village.",
                500,
                false),
        ]]
    ])]
]);


export function generateAchievementsPanel()
{
    let cXP = XpForLevel[7];

    const questAchievements = [];
    for (const [quest, achievementsPerCategory] of achievements.entries()) {
        const elements = [];
        for (const [category, achievements] of achievementsPerCategory.entries()) {
            elements.push(`<div class="achievement_category">${category}</div>`);
            for (const achievement of achievements) {
                elements.push(achievement.generateDOMString());
                cXP += achievement.computeNestedExp();
            }
        }
        questAchievements.push(`
            <div class="achievements__header">
                <div class="terminal_subtitle">Quest: ${quest}</div>
            </div>
            <div class="achievements__list">
                ${elements.join("")}            
            </div>`);
    }

    let nextLevel;
    for (nextLevel = 0; nextLevel < 20; nextLevel++) {
        if (cXP < XpForLevel[nextLevel]) {
            break;
        }
    }
    const toNextLevel = XpForLevel[nextLevel] - cXP;

    return `
        <div class="achievements">
            <div class="achievements__summary">
                <div class="terminal_title">Achievements</div>
                <div class="xp_summary">Current XP: <span class="gained">${cXP}</span></div>
                <span>Base level: ${nextLevel}</span>
                <span>To next level: ${toNextLevel}</span>
            </div>
            <div class="achievements__scroller">
                ${questAchievements.join("")}
            </div>
        </div>`;
}