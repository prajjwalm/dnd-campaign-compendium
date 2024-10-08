import {Activation, Condition, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Speed} from "../../../data/constants";
import {NpcId}                                                                                   from "../../../data/npcIndex";
import {D1, D10, D12, D20, D4, D6, D8, Dice}                                                     from "../../../rolling/Dice";
import {BuffedInternalAttack, IAttack}                                                           from "./attack";
import {BuffedStatSheet}                                                                         from "./sheet";

function createInkling()
{
    const inkSpray = new BuffedInternalAttack({
        title     : "Ink Spray",
        activation: Activation.Special,
        mainStat  : DStat.Con,
        contentGenerator(args: IAttack): string
        {
            return `<p>Upon death, the inkling sprays viscous ink at all creatures within 15 feet of itself. The targets
            must succeed on a DC ${args.getDc()} Constitution saving throw or be blinded until the end of their next turn.</p>`;
        }
    });
    const bite = new BuffedInternalAttack({
        title     : "Bite",
        activation: Activation.Action,
        mainStat  : DStat.Str,
        contentGenerator(args: IAttack): string
        {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr({ name: "Bite" })}, reach 5 ft., one target. 
            Hit: ${args.getDamageRollableStr("Bite")} plus ${args.getDamageRollableStr(
                "Blot")} and ${args.getDamageRollableStr(
                "BlotNeural")}.</p>`;
        },
    }).bindDamages({
        expectedDamage        : 32,
        assignedDamages       : args => new Map([
            ["Bite", new Map([[D4, 1], [D1, args.getMod()]])]
        ]),
        unassignedDamageRatios: new Map([
            ["Blot", new Map([[D8, 1]])],
            ["BlotNeural", new Map([[D8, 1]])]
        ]),
        damageTypes           : new Map([
            ["Bite", DamageType.Piercing],
            ["Blot", DamageType.Poison],
            ["BlotNeural", DamageType.Neural],
        ])
    });

    return new BuffedStatSheet({
        monster_id         : NpcId.InkInsecurity,
        title              : "Inkling (Insecurity)",
        size               : CreatureSize.Medium,
        subtitle           : " Inkling(Ooze), Typically Chaotic Neutral",
        stats              : new Map([
            [DStat.Str, 13],
            [DStat.Dex, 13],
            [DStat.Con, 14],
            [DStat.Int, 16],
            [DStat.Wis, 15],
            [DStat.Cha, 13],
        ]),
        ac                 : 13,
        acDesc             : "(Natural Armor)",
        biologicalHp       : 40,
        attacks            : new Map([
            ["inkSpray", inkSpray],
            ["bite", bite]
        ]),
        crValue            : 2,
        saveProficiencies  : new Map([
            [DStat.Con, [ProficiencyLevel.Prof, 0]],
        ]),
        skillProficiencies : new Map([
            [DSkill.Stealth, [ProficiencyLevel.Expert, 0]],
        ]),
        speeds             : new Map([
            [Speed.Walking, 30]
        ]),
        vulnerabilities    : new Set([
            DamageType.Cold,
            DamageType.Lightning,
            DamageType.Bludgeoning,
        ]),
        resistances        : new Set([
            DamageType.Acid,
            DamageType.Fire,
            DamageType.Piercing,
            DamageType.Thunder,
        ]),
        immunities         : new Set([
            DamageType.Poison,
            DamageType.Psychic,
        ]),
        conditionImmunities: new Set([
            Condition.Blinded,
            Condition.Deafened,
            Condition.Exhaustion,
        ]),
    });
}

function createInklingDog()
{
    const multiattack = new BuffedInternalAttack({
        activation: Activation.Special,
        contentGenerator(args: IAttack): string
        {
            return "<p>The inkling attacks twice on an attack action.</p>";
        },
        mainStat: undefined,
        title   : "Multiattack",
    })

    const bite = new BuffedInternalAttack({
        title     : "Bite",
        activation: Activation.Action,
        mainStat  : DStat.Dex,
        contentGenerator(args: IAttack): string
        {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr({ name: "Bite" })}, reach 5 ft., one target. 
            Hit: ${args.getDamageRollableStr("Bite")} plus ${args.getDamageRollableStr(
                "BiteVenom")}</p>`;
        },
    }).bindDamages({
        expectedDamage        : 10,
        assignedDamages       : args => new Map([
            ["Bite", new Map([[D6, 1], [D1, args.getMod()]])]
        ]),
        unassignedDamageRatios: new Map([
            ["BiteVenom", new Map([[D4, 1]])]
        ]),
        damageTypes           : new Map([
            ["Bite", DamageType.Piercing],
            ["BiteVenom", DamageType.Poison],
        ])
    });

    return new BuffedStatSheet({
        monster_id        : NpcId.InkImpatience,
        title             : "Inkling (Impatience)",
        size              : CreatureSize.Small,
        subtitle          : " Inkling(Fiend), Typically Chaotic Neutral",
        stats             : new Map([
            [DStat.Str, 11],
            [DStat.Dex, 17],
            [DStat.Con, 11],
            [DStat.Int, 6],
            [DStat.Wis, 13],
            [DStat.Cha, 7],
        ]),
        ac                : 13,
        acDesc            : "(Natural Armor)",
        biologicalHp      : 32,
        attacks           : new Map([
            ["bite", bite],
            ["multiattack", multiattack],
        ]),
        crValue           : 1,
        saveProficiencies : new Map([
            [DStat.Dex, [ProficiencyLevel.Prof, 0]],
        ]),
        skillProficiencies: new Map([
            [DSkill.Athletics, [ProficiencyLevel.Prof, 0]],
            [DSkill.Acrobatics, [ProficiencyLevel.Prof, 0]],
        ]),
        speeds            : new Map([
            [Speed.Walking, 50]
        ]),
        vulnerabilities   : new Set([
            DamageType.Fire,
            DamageType.Lightning,
        ]),
        resistances       : new Set([
            DamageType.Cold,
            DamageType.Poison,
            DamageType.Psychic,
        ]),
    });
}

function createInklingAberrant()
{
    const inkSpit = new BuffedInternalAttack({
        contentGenerator(args: IAttack): string
        {
            return `<p>The inkling spits viscous ink at one creature within 60 feet of itself. The target must succeed 
                    on a DC ${args.getDc()} Constitution saving throw. On failure, they take ${args.getDamageRollableStr(
                "Blot")}
                    and are Blinded until the end of their next turn. On success, they take half
                    the poison damage and are not blinded. Regardless of the roll, they take ${args.getDamageRollableStr(
                "BlotNeural")}.</p>`;
        },
        activation: Activation.Action,
        mainStat  : DStat.Con,
        title     : "Ink Spit"
    }).bindDamages({
        expectedDamage        : 50,
        assignedDamages       : args => new Map([
            ["Blot", new Map([[D1, args.getMod(DStat.Con)]])],
            ["BlotNeural", new Map([[D1, args.getMod(DStat.Int)]])]
        ]),
        unassignedDamageRatios: new Map([
            ["Blot", new Map([[D8, 3]])],
            ["BlotNeural", new Map([[D8, 1]])]
        ]),
        damageTypes           : new Map([
            ["Blot", DamageType.Poison],
            ["BlotNeural", DamageType.Psychic],
        ]),
    });

    const charged = new BuffedInternalAttack({
        contentGenerator(args: IAttack): string
        {
            return `<p>The inkling spits viscous ink at one creature within 90 feet of itself. The target must succeed 
                    on a DC ${args.getDc({ prof: ProficiencyLevel.Expert })} Constitution saving throw. On failure, they
                     take ${args.getDamageRollableStr("Blot")}
                    and are Blinded until the end of their next turn. On success, they take half
                    the poison damage and are not blinded. Regardless of the roll, they take ${args.getDamageRollableStr(
                "BlotNeural")}. 
                    This damage is neural damage and can cause the target to be Stunned.</p>`;
        },
        activation: Activation.Action,
        mainStat  : DStat.Int,
        title     : "Charged Spit"
    }).bindDamages({
        expectedDamage        : 100,
        assignedDamages       : args => new Map([
            ["Blot", new Map([[D1, args.getMod(DStat.Con)]])],
            ["BlotNeural", new Map([[D1, args.getMod(DStat.Int)]])]
        ]),
        unassignedDamageRatios: new Map([
            ["Blot", new Map([[D8, 1]])],
            ["BlotNeural", new Map([[D8, 3]])]
        ]),
        damageTypes           : new Map([
            ["Blot", DamageType.Poison],
            ["BlotNeural", DamageType.Psychic],
        ]),
    });

    const charging = new BuffedInternalAttack({
        activation: Activation.BonusAction,
        contentGenerator(args: IAttack): string
        {
            return "The Inkling begins concentrating for a big shot.";
        },
        mainStat: undefined,
        title   : "Charging"

    })

    return new BuffedStatSheet({
        monster_id         : NpcId.InkEnvy,
        title              : "Inkling (Envy)",
        size               : CreatureSize.Medium,
        subtitle           : " Inkling(Aberration), Typically Chaotic Evil",
        stats              : new Map([
            [DStat.Str, 13],
            [DStat.Dex, 11],
            [DStat.Con, 16],
            [DStat.Int, 19],
            [DStat.Wis, 13],
            [DStat.Cha, 15],
        ]),
        ac                 : 11,
        acDesc             : "(Natural Armor)",
        biologicalHp       : 100,
        attacks            : new Map([
            ["inkSpit", inkSpit],
            ["charging", charging],
            ["charged", charged],
        ]),
        crValue            : 5,
        saveProficiencies  : new Map([
            [DStat.Int, [ProficiencyLevel.Prof, 0]],
            [DStat.Wis, [ProficiencyLevel.Prof, 0]],
        ]),
        skillProficiencies : new Map([
            [DSkill.Perception, [ProficiencyLevel.Expert, 0]],
        ]),
        speeds             : new Map([
            [Speed.Flying, 20]
        ]),
        vulnerabilities    : new Set([
            DamageType.Lightning,
            DamageType.Thunder,
        ]),
        immunities         : new Set([
            DamageType.Poison,
            DamageType.Psychic,
        ]),
        conditionImmunities: new Set([
            Condition.Prone,
            Condition.Blinded,
        ]),
    });
}

function createInklingWannabeBoss()
{
    const slamText = new BuffedInternalAttack({
        contentGenerator(args: IAttack): string
        {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr({
                name: "Slam",
                prof: ProficiencyLevel.None
            })}, reach 15 ft., one target. 
                    Hit: ${args.getDamageRollableStr("Slam")} plus ${args.getDamageRollableStr(
                "SlamVibe")}. The primary
                    target must succeed a DC ${args.getDc()} Str save or fall prone. Those within 5ft of the primary 
                    target take half the bludgeoning damage and must make a DC ${args.getDc()} Con save or take the 
                    thunder damage too. On a fail of 10 or more, they are deafened until a long rest.<br/>
                    <em>The behemoth inkling slams a mighty fist into the ground, crushing the poor victim who wasn't 
                    able to run away in time and sending thunderous shockwaves shaking those around.</em></p>`;
        },
        activation: Activation.Action,
        mainStat  : DStat.Str,
        title     : "Slam",
    }).bindDamages({
        assignedDamages       : args => new Map([
            ["Slam", new Map([[D1, args.getMod()]])],
        ]),
        unassignedDamageRatios: new Map([
            ["Slam", new Map([[D8, 3]])],
            ["SlamVibe", new Map([[D8, 1]])]
        ]),
        damageTypes           : new Map([
            ["Slam", DamageType.Bludgeoning],
            ["SlamVibe", DamageType.Thunder],
        ]),
        expectedDamage        : 110,
    });

    const jumpText = new BuffedInternalAttack({
        contentGenerator(_: IAttack): string
        {
            return `<p>Can jump up to 60 ft as a bonus action - can grapple a target within 5 ft of landing or takeoff
                       as part of the same action.</p>`;
        },
        activation: Activation.BonusAction,
        mainStat  : DStat.Str,
        title     : "Jump",
    });
    const reactText = new BuffedInternalAttack({
        contentGenerator(_: IAttack): string
        {
            return `<p>Can slam once as an opportunity attack whenever an enemy comes within range.</p>`;
        },
        activation: Activation.Reaction,
        mainStat  : DStat.Str,
        title     : "Prepared",
    });

    return new BuffedStatSheet({
        monster_id        : NpcId.InkFury,
        title             : "Inkling (Fury)",
        size              : CreatureSize.Huge,
        subtitle          : " Inkling(Beast), Typically Chaotic Neutral",
        stats             : new Map([
            [DStat.Str, 24],
            [DStat.Dex, 13],
            [DStat.Con, 24],
            [DStat.Int, 7],
            [DStat.Wis, 8],
            [DStat.Cha, 13],
        ]),
        ac                : 18,
        acDesc            : "(Natural Armor)",
        biologicalHp      : 160,
        attacks           : new Map([
            ["slamText", slamText],
            ["jumpText", jumpText],
            ["reactText", reactText]
        ]),
        crValue           : 9,
        saveProficiencies : new Map([
            [DStat.Dex, [ProficiencyLevel.Prof, 0]],
        ]),
        skillProficiencies: new Map([
            [DSkill.Athletics, [ProficiencyLevel.Expert, 0]],
            [DSkill.Acrobatics, [ProficiencyLevel.Prof, 0]],
        ]),
        speeds            : new Map([
            [Speed.Walking, 50]
        ]),
        vulnerabilities   : new Set([
            DamageType.Lightning,
        ]),
        resistances       : new Set([
            DamageType.Cold,
            DamageType.Poison,
            DamageType.Psychic,
        ]),
    });
}

function createInklingDynamite()
{

    const boomText = new BuffedInternalAttack({
        contentGenerator(args: IAttack): string
        {
            return `<p>Upon death explodes to deal ${args.getDamageRollableStr(
                "Boom")} to targets within 5 ft. 
                    On coming into contact with its opposite explodes to deal ${args.getDamageRollableStr(
                "BigBoom")} 
                    instead to targets within 20ft and half damage to targets within 40ft.</p>`;
        },
        activation: Activation.Special,
        mainStat  : DStat.Dex,
        title     : "Boom",
    }).bindDamages({
        assignedDamages       : _ => new Map([]),
        unassignedDamageRatios: new Map([
            ["Boom", new Map([[D20, 1]])],
            ["BigBoom", new Map([[D20, 12]])]
        ]),
        damageTypes           : new Map([
            ["Boom", DamageType.Force],
            ["BigBoom", DamageType.Force],
        ]),
        expectedDamage        : 270,
    });

    const halfLifeText = new BuffedInternalAttack({
        contentGenerator(_: IAttack): string
        {
            return `<p> Doesn't die till both opposites explode, instead just enters a diffused state with halved
                    movement speed. If the opposites come into contact and at least one is diffused, damage dealt
                    is half the rolled damage.</p>`;
        },
        activation: Activation.Special,
        mainStat  : DStat.Dex,
        title     : "Half Lives",
    });


    return new BuffedStatSheet({
        monster_id         : NpcId.InkArrogance,
        title              : "Inkling (Arrogance)",
        size               : CreatureSize.Tiny,
        subtitle           : " Inkling(Aberration), Typically Neutral Evil",
        stats              : new Map([
            [DStat.Str, 1],
            [DStat.Dex, 28],
            [DStat.Con, 10],
            [DStat.Int, 13],
            [DStat.Wis, 14],
            [DStat.Cha, 11],
        ]),
        ac                 : 19,
        acDesc             : "(Natural Armor)",
        biologicalHp       : 19,
        attacks            : new Map([
            ["boomText", boomText],
            ["halfLifeText", halfLifeText]
        ]),
        crValue            : 5,
        saveProficiencies  : new Map([
            [DStat.Int, [ProficiencyLevel.Prof, 0]],
            [DStat.Wis, [ProficiencyLevel.Prof, 0]],
            [DStat.Cha, [ProficiencyLevel.Expert, 0]],
        ]),
        skillProficiencies : new Map([
            [DSkill.Perception, [ProficiencyLevel.Expert, 0]],
        ]),
        speeds             : new Map([
            [Speed.Flying, 20]
        ]),
        vulnerabilities    : new Set([
            DamageType.Cold
        ]),
        immunities         : new Set([
            DamageType.Fire,
            DamageType.Poison,
            DamageType.Psychic,
            DamageType.Lightning,
            DamageType.Thunder,
        ]),
        conditionImmunities: new Set([
            Condition.Prone,
            Condition.Blinded,
            Condition.Frightened,
            Condition.Charmed,
            Condition.Grappled,
            Condition.Exhaustion,
        ]),
    });
}

function createInklingTank()
{
    const tauntText = new BuffedInternalAttack({
        contentGenerator(_: IAttack): string
        {
            return `<p>Once a creature enters within 60 ft of them or starts their turn in that area and can see them
                    they must make a DC 24 Cha saving throw. On failure, they can only attack this creature until it 
                    dies. If it goes out of range, they must dash or do whatever they can to approach it as long as they
                    are within 120ft of it. Any AoE spell must be so placed such that this creature takes the maximum 
                    amount of damage possible. They can repeat this save at the start of their turns to break out of 
                    the taunt effect, but the DC increases by 1 with each failure.</p>`;
        },
        activation: Activation.Special,
        mainStat  : DStat.Con,
        title     : "Taunt",
    });

    return new BuffedStatSheet({
        monster_id         : NpcId.InkSloth,
        title              : "Inkling (Sloth)",
        size               : CreatureSize.Small,
        subtitle           : " Inkling(Construct), Typically Neutral",
        stats              : new Map([
            [DStat.Str, 28],
            [DStat.Dex, 1],
            [DStat.Con, 28],
            [DStat.Int, 2],
            [DStat.Wis, 13],
            [DStat.Cha, 16],
        ]),
        ac                 : 22,
        acDesc             : "(Natural Armor)",
        biologicalHp       : 120,
        attacks            : new Map([["tauntText", tauntText]]),
        crValue            : 7,
        saveProficiencies  : new Map([
            [DStat.Str, [ProficiencyLevel.Expert, 0]],
            [DStat.Con, [ProficiencyLevel.Expert, 0]],
            [DStat.Int, [ProficiencyLevel.Expert, 0]],
            [DStat.Wis, [ProficiencyLevel.Expert, 0]],
            [DStat.Cha, [ProficiencyLevel.Expert, 0]],
        ]),
        skillProficiencies : new Map([
            [DSkill.Athletics, [ProficiencyLevel.Expert, 0]],
            [DSkill.Perception, [ProficiencyLevel.Expert, 0]],
        ]),
        speeds             : new Map([
            [Speed.Walking, 10]
        ]),
        vulnerabilities    : new Set([
            DamageType.Force,
            DamageType.Thunder,
        ]),
        resistances        : new Set([
            DamageType.Cold,
            DamageType.Necrotic,
            DamageType.Radiant,
            DamageType.Bludgeoning,
            DamageType.Piercing,
            DamageType.Slashing,
        ]),
        immunities         : new Set([
            DamageType.Acid,
            DamageType.Fire,
            DamageType.Lightning,
            DamageType.Poison,
            DamageType.Psychic,
            DamageType.Bludgeoning,
            DamageType.Piercing,
            DamageType.Slashing,
        ]),
        conditionImmunities: new Set([
            Condition.Exhaustion,
            Condition.Poisoned,
            Condition.Prone,
        ]),
    });
}

function createFreedom()
{
    const amphibious = new BuffedInternalAttack({
        activation: Activation.Special,
        contentGenerator(args: IAttack): string
        {
            return "Freedom can breathe in air and water.";
        },
        mainStat: undefined,
        title   : "Amphibious"
    });
    const legendaryResistance = new BuffedInternalAttack({
        activation: Activation.Special,
        contentGenerator(args: IAttack): string
        {
            return "If Freedom fails a saving throw, she can choose to " +
                   "succeed instead.";
        },
        mainStat: undefined,
        title   : "Legendary Resistance",
        subtitle: "(1 / day)",
    });
    const dualLife = new BuffedInternalAttack({
        activation: Activation.Special,
        contentGenerator(args: IAttack): string
        {
            return "Starts under the blessing of light. When she reaches zero HP " +
                   "for the first time revives herself over the course of 1+ " +
                   "round during which she is invulnerable and cannot attack. At " +
                   "initiative count zero after reviving, she gets a free turn. " +
                   "At the end of that turn looses invulnerability. She falls " +
                   "under the blessing of darkness in her second form.";
        },
        mainStat: undefined,
        title   : "Duality of Life"
    });
    const freeFlowingInk = new BuffedInternalAttack({
        activation: Activation.Special,
        contentGenerator(args: IAttack): string
        {
            return "The movement speed of Freedom cannot be reduced in any way.";
        },
        mainStat: undefined,
        title   : "Freely Flowing Ink"
    });

    const multiattack = new BuffedInternalAttack({
        activation: Activation.Special,
        contentGenerator(args: IAttack): string
        {
            return "<p>The inkling attacks twice on an attack action.</p>";
        },
        mainStat: undefined,
        title   : "Multiattack",
    })
    const inkSwirl = new BuffedInternalAttack({
        activation: Activation.Action,
        contentGenerator(args: IAttack): string
        {
            return `(This action can only be taken once in every three rounds
            at the start of Freedom's turn, and before she moves) Freedom
            targets the closest friendly unit within 60ft of her. If there are
            two friendly units equidistant, she 
            chooses the one with lower HP. That unit and any other non-inklings 
            in 5 ft of it are <u>restrained</u> in an ink swirl and take
            <u>continuous ${args.getDamageRollableStr("inkSwirl")}</u> for
            two rounds. At the start of their turns, they can make a DC 
            ${args.getDc({ stat: DStat.Cha, prof: ProficiencyLevel.Expert })}
            atheletics check to escape the ink. The DC reduces by one after each
            instance of damage. Allies can attempt to draw them out by making 
            the same check, but on failure, the ink envelops them too.`;
        },
        mainStat: DStat.Cha,
        title   : "Ink Swirl"
    }).bindDamages({
        assignedDamages(args: IAttack): Map<string, Map<Dice, number>>
        {
            return new Map([
                ["inkSwirl", new Map([[D1, args.getMod(DStat.Cha)]])]
            ]);
        },
        damageTypes           : new Map([["inkSwirl", DamageType.Corrosion]]),
        expectedDamage        : 25,
        unassignedDamageRatios: new Map([
            ["inkSwirl", new Map([[D4, 1]])]
        ])
    });
    const legendaryActions = new BuffedInternalAttack({
        activation: Activation.Special,
        contentGenerator(args: IAttack): string
        {
            return "Freedom has two legendary actions.";
        },
        mainStat: undefined,
        title   : "Legendary Actions",
    });
    const bite = new BuffedInternalAttack({
        title     : "Bite",
        activation: Activation.LegendaryAction,
        mainStat  : DStat.Str,
        contentGenerator(args: IAttack): string
        {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr({ name: "Bite" })}, reach 30 ft., one target. 
            Hit: ${args.getDamageRollableStr("Bite")} plus ${args.getDamageRollableStr(
                "BiteVenom")}</p>`;
        },
        subtitle: "(Cost 1)",
    }).bindDamages({
        expectedDamage : null,
        assignedDamages: args => new Map([
            ["Bite", new Map([[D10, 2], [D1, args.getMod()]])],
            ["BiteVenom", new Map([[D6, 3]])]
        ]),
        damageTypes    : new Map([
            ["Bite", DamageType.Piercing],
            ["BiteVenom", DamageType.Biochemical],
        ])
    });

    const biteA = new BuffedInternalAttack({
        title     : "Bite",
        activation: Activation.Action,
        mainStat  : DStat.Str,
        contentGenerator(args: IAttack): string
        {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr({ name: "Bite" })}, reach 30 ft., one target. 
            Hit: ${args.getDamageRollableStr("Bite")} plus ${args.getDamageRollableStr(
                "BiteVenom")}. A target hit 
            by this attack is grappled in her jaw till the end of her turn.</p>`;
        }
    }).bindDamages({
        expectedDamage : null,
        assignedDamages: args => new Map([
            ["Bite", new Map([[D10, 2], [D1, args.getMod()]])],
            ["BiteVenom", new Map([[D6, 3]])]
        ]),
        damageTypes    : new Map([
            ["Bite", DamageType.Piercing],
            ["BiteVenom", DamageType.Biochemical],
        ])
    });

    const breakTheChains = new BuffedInternalAttack({
        activation: Activation.BonusAction,
        contentGenerator(args: IAttack): string
        {
            return `At the end of her turn, Freedom has a 25% (35% in her second 
            form) chance to call forth her memories of captivity. If she does 
            succeed, chains with 75HP (105HP in her second form) appear around 
            her and stop her from moving or attacking. If the chains are not 
            destroyed until the start of her next-to-next round, she will free
            herself and release a burst of ${args.getDamageRollableStr("free")}
            (necrotic in her second form) to all creatures within 60 ft of her.
            If the chains are destroyed, she looses 50 HP instead and is stunned 
            until the start of her turn.`;
        },
        mainStat: undefined,
        title   : "Break the Chains"
    }).bindDamages({
        expectedDamage        : 150,
        damageTypes           : new Map([["free", DamageType.Radiant]]),
        unassignedDamageRatios: new Map([["free", new Map([[D12, 1]])]])
    });

    return new BuffedStatSheet({
        monster_id         : NpcId.InkFreedom,
        title              : "Freedom",
        subtitle           : "dragon, typically Chaotic Neutral",
        stats              : new Map<DStat, number>([
            [DStat.Str, 27],
            [DStat.Dex, 15],
            [DStat.Con, 25],
            [DStat.Int, 20],
            [DStat.Wis, 15],
            [DStat.Cha, 24],
        ]),
        ac                 : 21,
        acDesc             : "Natural Armor",
        attacks            : new Map([
            ["amphibious", amphibious],
            ["legendRes", legendaryResistance],
            ["dualLife", dualLife],
            ["freeInk", freeFlowingInk],
            ["multiattack", multiattack],
            ["inkSwirl", inkSwirl],
            ["legendAct", legendaryActions],
            ["bite", bite],
            ["biteA", biteA],
            ["breakTheChains", breakTheChains],
        ]),
        size               : CreatureSize.Huge,
        biologicalHp       : 300,
        conditionImmunities: new Set([
            Condition.Charmed,
            Condition.Grappled,
            Condition.Frightened,
            Condition.Poisoned,
            Condition.Deafened,
            Condition.Restrained,
            Condition.Stunned,
        ]),
        crValue            : 15,
        immunities         : new Set([
            DamageType.Psychic,
            DamageType.Poison,
        ]),
        resistances        : new Set([
            DamageType.Acid,
            DamageType.Slashing,
            DamageType.Piercing,
            DamageType.Bludgeoning,
            DamageType.Thunder,
        ]),
        isTough            : true,
        saveProficiencies  : new Map([
            [DStat.Dex, [ProficiencyLevel.Prof, 0]],
            [DStat.Con, [ProficiencyLevel.Prof, 0]],
            [DStat.Wis, [ProficiencyLevel.Prof, 0]],
            [DStat.Cha, [ProficiencyLevel.Prof, 0]],
        ]),
        skillProficiencies : new Map([
            [DSkill.Performance, [ProficiencyLevel.Expert, 0]],
            [DSkill.Insight, [ProficiencyLevel.Prof, 0]],
            [DSkill.Perception, [ProficiencyLevel.Expert, 0]],
        ]),
        speeds             : new Map([
            [Speed.Walking, 40],
            [Speed.Swimming, 40],
            [Speed.Flying, 80],
        ])
    })
}


export const InklingCreators =
    new Map([
        [NpcId.InkInsecurity, createInkling],
        [NpcId.InkImpatience, createInklingDog],
        [NpcId.InkEnvy,       createInklingAberrant],
        [NpcId.InkFury,       createInklingWannabeBoss],
        [NpcId.InkArrogance,  createInklingDynamite],
        [NpcId.InkSloth,      createInklingTank],
        [NpcId.InkFreedom,    createFreedom],
    ]);
