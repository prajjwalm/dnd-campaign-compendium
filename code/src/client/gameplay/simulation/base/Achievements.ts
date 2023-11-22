import {IDOMGenerator} from "../../IDomGenerator";


/**
 * Something that grants the players XP.
 */
interface IAchievement
    extends IDOMGenerator
{
    /**
     * The total amount of Xp that can be extracted via this achievement in any
     * way whatsoever.
     */
    get maxExp(): number;

    /**
     * The amount of Xp that the players have currently received from this
     * achievement.
     */
    get curExp(): number;
}

/**
 * A basic, single isolated task achievement.
 */
class StdAchievement
    implements IAchievement
{
    /**
     * CTOR.
     */
    public constructor(private readonly title: string,
                       private readonly desc: string,
                       public readonly maxExp: number,
                       private readonly complete: boolean)
    {}

    /**
     * @inheritDoc
     */
    public generateDOMString(): string
    {
        return `
        <div class="achievement ${this.complete ? "achievement--complete" : ""}">
            <div class="achievement__title">${this.title}</div>
            <div class="achievement__xp">${this.maxExp} xp</div>
            <div class="achievement__desc">${this.desc}</div>
            <div class="achievement__status"><i class="fa-solid fa-circle-check"></i></div>
        </div>`;
    }

    /**
     * @inheritDoc
     */
    public get curExp(): number
    {
        return this.complete ? this.maxExp : 0;
    }
}


/**
 * A achievement with various routes to get to it, each route taken grants
 * bonus xp.
 */
class NestedAchievement
    implements IAchievement
{
    private readonly routeDOMs: string[];

    private _curExp: number;

    /**
     * CTOR.
     */
    public constructor(private readonly title: string,
                       private readonly desc: string,
                       public readonly baseExp: number,
                       private readonly done: boolean)
    {
        this._curExp = this.done ? this.baseExp : 0;
        this.routeDOMs = [];
    }

    /**
     * Add a route.
     */
    public addRoute(title: string, desc: string, xp: number, taken: boolean): this
    {
        if (taken) {
            if (!this.done) {
                throw new Error();
            }
            this._curExp += xp;
        }
        this.routeDOMs.push(
            `<div class="achievement--inner ${taken ? "achievement--complete" : ""}">
                <div class="achievement__title">${title}</div>
                <div class="achievement__xp">${xp} xp</div>
                <div class="achievement__desc">${desc}</div>
                <div class="achievement__status"><i class="fa-solid fa-circle-check"></i></div>
            </div>`
        );
        return this;
    }

    /**
     * @inheritDoc
     */
    public get curExp(): number
    {
        return this._curExp;
    }

    /**
     * @inheritDoc
     */
    public generateDOMString(): string
    {
        return `
        <div class="achievement ${this.done ? "achievement--complete" : ""}">
            <div class="achievement__title">${this.title}</div>
            <div class="achievement__xp">${this.baseExp} xp</div>
            <div class="achievement__desc">${this.desc}</div>
            <div class="achievement__status"><i class="fa-solid fa-circle-check"></i></div>
        </div>
        <div class="achievement_parts">${this.routeDOMs.join("")}</div>`;
    }

    /**
     * @inheritDoc
     */
    public get maxExp(): number
    {
        throw new Error("Not implemented: Nested achievements are no longer xor")
    }
}

const SprenQuestAchievements: Map<string, IAchievement[]> = new Map([
    ["The Candles", [
        new StdAchievement("That's a familiar scent?",
                           "Understand the nature of the unusual candles and trace their past.",
                           500,
                           false),
        new NestedAchievement("A breath of wind",
                              "Defeat the Reimagined after it enters its Poltergeist state.",
                              1000,
                              true)
            .addRoute("Melody of Death",
                      "Ignite 8 candles to the rhythm of Ruin to destroy the poltergeist.",
                      400,
                      false)
            .addRoute("Beats of Passion",
                      "Ignite 9 candles to the rhythm of Odium to dominate the poltergeist.",
                      450,
                      false)
            .addRoute("Overtones of Absolute Command",
                      "Ignite 10 candles to the rhythm of Honor to deny the poltergeist.",
                      600,
                      false),
        new StdAchievement("Dangerous Experiments",
                           "Investigate how the Reimagined came to be.",
                           600,
                           false),
    ]],
    ["The Shardbearer", [
        new StdAchievement("Kneel!",
                           "Capture the shardbearer alive.",
                           1200,
                           false),
        new NestedAchievement("He who lives by the blade...",
                              "Kill the Shardbearer.",
                              800,
                              true)
            .addRoute("Surgical Precision",
                      "While dealing < 200 points of damage.",
                      500,
                      false)
            .addRoute("Why use a scalpel when you have a sledgehammer?",
                      "While dealing > 800 points of damage.",
                      800,
                      false)
            .addRoute("Unconventional methods",
                      "Without using a weapon for the killing blow (acid/lava/quicksand etc.).",
                      1000,
                      false)
            .addRoute("Esse ventus",
                      "Without any party member suffering a major blow.",
                      1000,
                      true)
            .addRoute("Absolute Dominance",
                      "Without any party member suffering a major blow and " +
                      "without Hina dying even once.",
                      1600,
                      false)

    ]],
    ["The clock", [
        new StdAchievement("Meeting the deadline",
                           "Return from the expedition before Dusk's magic fades away.",
                           1000,
                           true),
        new StdAchievement("ez",
                           "Return from the expedition within 1 day in devotion's time.",
                           1500,
                           true),
        new StdAchievement("No need for suspense",
                           "Return from the expedition within 1 hour in devotion's time.",
                           2500,
                           false),
        new StdAchievement("You're not dead yet",
                           "Return from the expedition in the last hour to midnight on the last day.",
                           2500,
                           false),
    ]],
    ["The sand soldier", [
        new NestedAchievement("Prudence...",
                              "Choose not to stand against the sand soldier.",
                              500,
                              true)
            .addRoute("Master of the black market",
                      "Uncover the name and identity of the sand soldier.",
                      1400,
                      false)
            .addRoute("A passenger onboard",
                      "Have the Sand Soldier join your village.",
                      800,
                      false),
        new NestedAchievement("... is for the weak",
                              "Prevent the sand soldier from leaving with the blade.",
                              1000,
                              false)
            .addRoute("I can do this all day",
                      "Kill the sand soldier after the shardbearer fight but before taking the subsequent rest.",
                      3000,
                      false),
        new StdAchievement("In a moment's dream",
                           "Recruit the sand soldier's sister into your village.",
                           1200,
                           false)
    ]],
    ["The heist", [
        new NestedAchievement("Heh, noobs",
                              "Do not fall for the illusionary bridge trap.",
                              500,
                              true)
            .addRoute("Now why are they looking that way?",
                      "Cross the lava stream for the first time using the invisible bridge.",
                      800,
                      true)
            .addRoute("Who needs a bridge anyway",
                      "Have the whole party cross the lava stream for the first time without using the invisible bridge.",
                      800,
                      false),
        new NestedAchievement("Oh no! Did something happen?",
                              "Reach the ground level without being recognized as the thieves of the safe.",
                              600,
                              true)
            .addRoute("Must be rats",
                      "Attract attention at least 3 times but never have the alarm raised.",
                      1000,
                      true)
            .addRoute("[Bonus] Out of sight, out of mind",
                      "Trapped 4 guards in the bio research room without getting detected.",
                      1600,
                      true),
        new StdAchievement("Pacifist's creed",
                           "Do not kill a single resident of the shelter.",
                           1200,
                           true),
        new StdAchievement("It was luxuries like air conditioning",
                           "While on the way out, enter the bio research room",
                           800,
                           true),
        new NestedAchievement("Unbreakable from the outside",
                              "Extract the Amethyst from the wall of force enclosing it.",
                              700,
                              true)
            .addRoute("Witness to true perfection",
                      "Form a bond with the ancient inkspren trapped in the Amethyst before returning to Devotion.",
                      3000,
                      false)
    ]],
    ["The exile", [
        new StdAchievement("Berserk",
                           "Learn of Hina's cyberpunk nature.",
                           700,
                           true),
        new StdAchievement("Unusual attire for a tribesman",
                           "Figure out how Ruzaki ended up here.",
                           1300,
                           false),
        new StdAchievement("You've been talking to them too?",
                           "Witness Hina's audience with the Shards",
                           1400,
                           true),
        new StdAchievement("Yeah, science!",
                           "Enter into and understand how Ruzaki's sulphuric acid manufacturing works.",
                           600,
                           true),
        new StdAchievement("Fire with fire",
                           "Learn what the shards wanted from Hina.",
                           1000,
                           false),
        new StdAchievement("Now I am become death",
                           "Investigate Ruzaki's research notes.",
                           1000,
                           false),
        new StdAchievement("Free as a bird",
                           "Sign-up Hina as the village labourer.",
                           500,
                           true),
        new StdAchievement("Deal with the devil",
                           "Recruit Ruzaki into the village.",
                           1500,
                           false),
        new StdAchievement("I'm somewhat of a scientist myself",
                           "Recruit Teiai into the village.",
                           500,
                           false),
    ]]
]);


const baseAchievements1: Map<string, IAchievement[]> = new Map([
    ["", [
        new StdAchievement("Fallen from grace",
                           "Figure out the identity of the silver tree and " +
                           "isolate it from the seaborn.",
                           700,
                           true),
        new StdAchievement("Don't starve together",
                           "Find enough food to survive the week.",
                           500,
                           true),
    ]],["Who stole the food?", [
        new NestedAchievement("Merely a scouting party",
                              "Face the first wave of assault by the seaborn -",
                              1200,
                              true)
            .addRoute("A sense of Deja Vu",
                      "With Roberta surviving the first harpoon.",
                      500,
                      true)
            .addRoute("Safeguarding innocence",
                      "With all the children alive after the raid.",
                      600,
                      true)
            .addRoute("No need for heroes",
                      "Without Elysium dying in the attack.",
                      2100,
                      false)
            .addRoute("Fewer mouths to feed",
                      "With over 12 villagers dying in the attack.",
                      1000,
                      false)
            .addRoute("No screaming in the cave",
                      "With no more than 3 villagers other than Elysium dead " +
                      "after the attack.",
                      1200,
                      true)
            .addRoute("Before the high tides",
                      "Before the Nethersea Brand reaches " +
                      "either the Creeping Branch or the Cave.",
                      700,
                      true),
        new StdAchievement("???" // "Taking no chances"
                      , "???" // "Don't attempt to stop Irene from executing Jordi"
                      , 500,
                      false),
        new StdAchievement("???" // "You don't want to do this"
                      , "???" // "Protect Jordi from Irene"
                      , 500,
                      false),
        new StdAchievement("Just shut up and die!",
                          "Deal over 150 damage to the shrieker.",
                          800,
                          true),
        new StdAchievement("Seaweed Salad",
                      "Don't take any damage from any seaborn other than the " +
                      "shrieker or the Brand. (+ 200 bonus for exploiting weakness)",
                      700,
                      true),
    ]],["Most dangerous of them all", [
        new NestedAchievement("In the service of Odium",
                              "Take the liquidation contract from Yuki",
                              300,
                              true)
            .addRoute("Of envy and ambition",
                      "Without being manipulated by Yuki to utter treasonous " +
                      "words.",
                      900,
                      true)
            .addRoute("You're not needed anymore",
                      "Kill Yuki after Odium reaches out but before the " +
                      "seaborn raid.",
                      500,
                      false)
            .addRoute("Hell is This",
                      "Be subjected to Odium's own pain.",
                      300,
                      true)
            .addRoute("Emergency Response",
                      "Successfully follow all directions given by ??? until " +
                      "Mostima arrives.",
                      500,
                      true)
            .addRoute("Believer",
                      "Break free of the pain Odium unleashes using His aid.",
                      500,
                      true)
            .addRoute("Disappointments and broken oaths",
                      "Witness Hina liberate Yuki's spren.",
                      300,
                      true)
    ]],
]);

export function generateAchievementsPanel()
{
    const elements = [];
    let cXP = 34000;
    for (const [title, achievements] of SprenQuestAchievements.entries()) {
        elements.push(`<div class="achievement_category">${title}</div>`);
        for (const achievement of achievements) {
            elements.push(achievement.generateDOMString());
            cXP += achievement.curExp;
        }
    }
    const elements2 = [];
    for (const [title, achievements] of baseAchievements1.entries()) {
        elements2.push(`<div class="achievement_category">${title}</div>`);
        for (const achievement of achievements) {
            elements2.push(achievement.generateDOMString());
            cXP += achievement.curExp;
        }
    }
    return `
        <div class="achievements">
            <div class="achievements__scroller">
                <div class="achievements__header">
                    <div class="terminal_title">Achievements: After the sun sets...</div>
                    <div class="xp_summary">Current XP: <span class="gained">${cXP}</span></div>
                </div>
                
                <div class="achievements__list">
                    ${elements2.join("")}            
                </div>
                <div class="achievements__header">
                    <div class="terminal_title">Achievements: For a piece of Honor</div>
                </div>
                
                <div class="achievements__list">
                    ${elements.join("")}            
                </div>
            </div>
        </div>
    `;
}