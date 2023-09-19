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

const Achievements: Map<string, IAchievement[]> = new Map([
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
                           false),
        new StdAchievement("ez",
                           "Return from the expedition within 1 day in devotion's time.",
                           1500,
                           false),
        new StdAchievement("No need for suspense",
                           "Return from the expedition within 1 hour in devotion's time.",
                           2500,
                           false),
        new StdAchievement("You're not dead yet",
                           "???",
                           // "Return from the expedition in the last hour to midnight on the last day.",
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
                      "Have the Sand Soldier join your cause.",
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
                           "Recruit the sand soldier's sister.",
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


export function generateAchievementsPanel() {
    const elements = [];
    let cXP = 0;
    for (const [title, achievements] of Achievements.entries()) {
        elements.push(`<div class="achievement_category">${title}</div>`);
        for (const achievement of achievements) {
            elements.push(achievement.generateDOMString());
            cXP += achievement.curExp;
        }
    }
    return `
        <div class="achievements">
            <div class="achievements__header">
                <div class="terminal_title">Current Quest Achievements</div>
                <div class="xp_summary"><span class="gained">${cXP}</span> xp obtained so far</div>
            </div>
            
            <div class="achievements__list">
                ${elements.join("")}            
            </div>
        </div>
    `;
}