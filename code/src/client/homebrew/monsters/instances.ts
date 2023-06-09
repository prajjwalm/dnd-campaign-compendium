import {D1, D20, D4, D6, D8}                           from "../common/diceConstants";
import {
    Activation,
    Conditions,
    CoreStat,
    CreatureSize,
    CRValue,
    DamageType,
    ProficiencyLevel,
    Skill,
    Speed,
    StatValue
}                                                      from "../definitions/constants";
import {BuffedInternalAttack, IAttack, InternalAttack} from "./attack";
import {renderStatSheet, StatSheet}                    from "./sheet";

function createInkling()
{
    const inkSprayText = new InternalAttack({
        title     : "Ink Spray",
        activation: Activation.Special,
        mainStat  : CoreStat.Con,
        contentGenerator(args: IAttack): string {
            return `<p>Upon death, the inkling sprays viscous ink at all creatures within 15 feet of itself. The targets
            must succeed on a DC ${args.getDc()} Constitution saving throw or be blinded until the end of their next turn.</p>`;
        }
    });
    const biteText = new InternalAttack({
        title     : "Bite",
        activation: Activation.Action,
        mainStat  : CoreStat.Str,
        contentGenerator(args: IAttack): string {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr({ name: "Bite" })}, reach 5 ft., one target. 
            Hit: ${args.getDamageRollableStr("Bite")} plus ${args.getDamageRollableStr("Blot")} and ${args.getDamageRollableStr(
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
            ["BlotNeural", DamageType.Psychic],
        ])
    });

    return new StatSheet({
        title              : "Inkling (Insecurity)",
        size               : CreatureSize.Medium,
        subtitle           : " Inkling(Ooze), Typically Chaotic Neutral",
        stats              : new Map([
            [CoreStat.Str, new StatValue(13)],
            [CoreStat.Dex, new StatValue(13)],
            [CoreStat.Con, new StatValue(14)],
            [CoreStat.Int, new StatValue(16)],
            [CoreStat.Wis, new StatValue(15)],
            [CoreStat.Cha, new StatValue(13)],
        ]),
        ac                 : 13,
        acDesc             : "(Natural Armor)",
        biologicalHp       : 40,
        attacks            : [inkSprayText, biteText],
        crValue            : new CRValue(2),
        saveProficiencies  : new Map([
            [CoreStat.Con, ProficiencyLevel.Prof],
        ]),
        skillProficiencies : new Map([
            [Skill.Stealth, ProficiencyLevel.Expert],
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
            Conditions.Blinded,
            Conditions.Deafened,
            Conditions.Exhaustion,
        ]),
    });
}

function createInklingDog()
{
    const biteText = new InternalAttack({
        title     : "Bite",
        activation: Activation.Action,
        mainStat  : CoreStat.Dex,
        contentGenerator(args: IAttack): string {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr({ name: "Bite" })}, reach 5 ft., one target. 
            Hit: ${args.getDamageRollableStr("Bite")} plus ${args.getDamageRollableStr("BiteVenom")}</p>`;
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

    return new StatSheet({
        title             : "Inkling (Impatience)",
        size              : CreatureSize.Small,
        subtitle          : " Inkling(Fiend), Typically Chaotic Neutral",
        stats             : new Map([
            [CoreStat.Str, new StatValue(11)],
            [CoreStat.Dex, new StatValue(17)],
            [CoreStat.Con, new StatValue(11)],
            [CoreStat.Int, new StatValue(6)],
            [CoreStat.Wis, new StatValue(13)],
            [CoreStat.Cha, new StatValue(7)],
        ]),
        ac                : 13,
        acDesc            : "(Natural Armor)",
        biologicalHp      : 32,
        attacks           : [biteText],
        crValue           : new CRValue(1),
        saveProficiencies : new Map([
            [CoreStat.Dex, ProficiencyLevel.Prof],
        ]),
        skillProficiencies: new Map([
            [Skill.Athletics, ProficiencyLevel.Prof],
            [Skill.Acrobatics, ProficiencyLevel.Prof],
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
    const inkSpitText = new BuffedInternalAttack({
        contentGenerator(args: IAttack): string {
            return `<p>The inkling spits viscous ink at one creature within 60 feet of itself. The target must succeed 
                    on a DC ${args.getDc()} Constitution saving throw. On failure, they take ${args.getDamageRollableStr(
                "Blot")}
                    and are Blinded until the end of their next turn. On success, they take half
                    the poison damage and are not blinded. Regardless of the roll, they take ${args.getDamageRollableStr(
                "BlotNeural")}.</p>`;
        },
        activation: Activation.Action,
        mainStat  : CoreStat.Con,
        title     : "Ink Spit"
    }).bindDamages({
        expectedDamage        : 50,
        assignedDamages       : args => new Map([
            ["Blot", new Map([[D1, args.getMod(CoreStat.Con)]])],
            ["BlotNeural", new Map([[D1, args.getMod(CoreStat.Int)]])]
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

    const chargedText = new BuffedInternalAttack({
        contentGenerator(args: IAttack): string {
            return `<p>The inkling spits viscous ink at one creature within 90 feet of itself. The target must succeed 
                    on a DC ${args.getDc()} Constitution saving throw. On failure, they take ${args.getDamageRollableStr(
                "Blot")}
                    and are Blinded until the end of their next turn. On success, they take half
                    the poison damage and are not blinded. Regardless of the roll, they take ${args.getDamageRollableStr(
                "BlotNeural")}. 
                    This damage is neural damage and can cause the target to be Stunned.</p>`;
        },
        activation: Activation.Action,
        mainStat  : CoreStat.Int,
        title     : "Charged Spit"
    }).bindDamages({
        expectedDamage        : 100,
        assignedDamages       : args => new Map([
            ["Blot", new Map([[D1, args.getMod(CoreStat.Con)]])],
            ["BlotNeural", new Map([[D1, args.getMod(CoreStat.Int)]])]
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

    return new StatSheet({
        title              : "Inkling (Envy)",
        size               : CreatureSize.Medium,
        subtitle           : " Inkling(Aberration), Typically Chaotic Evil",
        stats              : new Map([
            [CoreStat.Str, new StatValue(13)],
            [CoreStat.Dex, new StatValue(11)],
            [CoreStat.Con, new StatValue(16)],
            [CoreStat.Int, new StatValue(19)],
            [CoreStat.Wis, new StatValue(13)],
            [CoreStat.Cha, new StatValue(15)],
        ]),
        ac                 : 11,
        acDesc             : "(Natural Armor)",
        biologicalHp       : 100,
        attacks            : [inkSpitText, chargedText],
        crValue            : new CRValue(5),
        saveProficiencies  : new Map([
            [CoreStat.Int, ProficiencyLevel.Prof],
            [CoreStat.Wis, ProficiencyLevel.Prof],
        ]),
        skillProficiencies : new Map([
            [Skill.Perception, ProficiencyLevel.Expert],
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
            Conditions.Prone,
            Conditions.Blinded,
        ]),
    });
}

function createInklingWannabeBoss()
{
    const slamText = new InternalAttack({
        contentGenerator(args: IAttack): string {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr({ name: "Slam", prof: ProficiencyLevel.None })}, reach 15 ft., one target. 
                    Hit: ${args.getDamageRollableStr("Slam")} plus ${args.getDamageRollableStr("SlamVibe")}. The primary
                    target must succeed a DC ${args.getDc()} Str save or fall prone. Those within 5ft of the primary 
                    target take half the bludgeoning damage and must make a DC ${args.getDc()} Con save or take the 
                    thunder damage too. On a fail of 10 or more, they are deafened until a long rest.<br/>
                    <em>The behemoth inkling slams a mighty fist into the ground, crushing the poor victim who wasn't 
                    able to run away in time and sending thunderous shockwaves shaking those around.</em></p>`;
        },
        activation: Activation.Action,
        mainStat  : CoreStat.Str,
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

    const jumpText = new InternalAttack({
        contentGenerator(_: IAttack): string {
            return `<p>Can jump up to 60 ft as a bonus action - can grapple a target within 5 ft of landing or takeoff
                       as part of the same action.</p>`;
        },
        activation: Activation.BonusAction,
        mainStat  : CoreStat.Str,
        title     : "Jump",
    });
    const reactText = new InternalAttack({
        contentGenerator(_: IAttack): string {
            return `<p>Can slam once as an opportunity attack whenever an enemy comes within range.</p>`;
        },
        activation: Activation.Reaction,
        mainStat  : CoreStat.Str,
        title     : "Jump",
    });

    return new StatSheet({
        title             : "Inkling (Fury)",
        size              : CreatureSize.Huge,
        subtitle          : " Inkling(Beast), Typically Chaotic Neutral",
        stats             : new Map([
            [CoreStat.Str, new StatValue(24)],
            [CoreStat.Dex, new StatValue(13)],
            [CoreStat.Con, new StatValue(24)],
            [CoreStat.Int, new StatValue(7)],
            [CoreStat.Wis, new StatValue(8)],
            [CoreStat.Cha, new StatValue(13)],
        ]),
        ac                : 18,
        acDesc            : "(Natural Armor)",
        biologicalHp      : 160,
        attacks           : [slamText, jumpText, reactText],
        crValue           : new CRValue(9),
        saveProficiencies : new Map([
            [CoreStat.Dex, ProficiencyLevel.Prof],
        ]),
        skillProficiencies: new Map([
            [Skill.Athletics, ProficiencyLevel.Expert],
            [Skill.Acrobatics, ProficiencyLevel.Prof],
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

    const boomText = new InternalAttack({
        contentGenerator(args: IAttack): string {
            return `<p>Upon death explodes to deal ${args.getDamageRollableStr("Boom")} to targets within 5 ft. 
                    On coming into contact with its opposite explodes to deal ${args.getDamageRollableStr("BigBoom")} 
                    instead to targets within 20ft and half damage to targets within 40ft.</p>`;
        },
        activation: Activation.Special,
        mainStat  : CoreStat.Dex,
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

    const halfLifeText = new InternalAttack({
        contentGenerator(_: IAttack): string {
            return `<p> Doesn't die till both opposites explode, instead just enters a diffused state with halved
                    movement speed. If the opposites come into contact and at least one is diffused, damage dealt
                    is half the rolled damage.</p>`;
        },
        activation: Activation.Special,
        mainStat  : CoreStat.Dex,
        title     : "Half Lives",
    });


    return new StatSheet({
        title              : "Inkling (Arrogance)",
        size               : CreatureSize.Tiny,
        subtitle           : " Inkling(Aberration), Typically Neutral Evil",
        stats              : new Map([
            [CoreStat.Str, new StatValue(1)],
            [CoreStat.Dex, new StatValue(28)],
            [CoreStat.Con, new StatValue(10)],
            [CoreStat.Int, new StatValue(13)],
            [CoreStat.Wis, new StatValue(14)],
            [CoreStat.Cha, new StatValue(11)],
        ]),
        ac                 : 19,
        acDesc             : "(Natural Armor)",
        biologicalHp       : 19,
        attacks            : [boomText, halfLifeText],
        crValue            : new CRValue(5),
        saveProficiencies  : new Map([
            [CoreStat.Int, ProficiencyLevel.Prof],
            [CoreStat.Wis, ProficiencyLevel.Prof],
            [CoreStat.Cha, ProficiencyLevel.Expert],
        ]),
        skillProficiencies : new Map([
            [Skill.Perception, ProficiencyLevel.Expert],
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
            Conditions.Prone,
            Conditions.Blinded,
            Conditions.Frightened,
            Conditions.Charmed,
            Conditions.Grappled,
            Conditions.Exhaustion,
        ]),
    });
}

function createInklingTank()
{
    const tauntText = new InternalAttack({
        contentGenerator(_: IAttack): string {
            return `<p>Once a creature enters within 60 ft of them or starts their turn in that area and can see them
                    they must make a DC 24 Cha saving throw. On failure, they can only attack this creature until it 
                    dies. If it goes out of range, they must dash or do whatever they can to approach it as long as they
                    are within 120ft of it. Any AoE spell must be so placed such that this creature takes the maximum 
                    amount of damage possible. They can repeat this save at the start of their turns to break out of 
                    the taunt effect, but the DC increases by 1 with each failure.</p>`;
        },
        activation: Activation.Special,
        mainStat  : CoreStat.Con,
        title     : "Taunt",
    });


    return new StatSheet({
        title              : "Inkling (Sloth)",
        size               : CreatureSize.Small,
        subtitle           : " Inkling(Construct), Typically Neutral",
        stats              : new Map([
            [CoreStat.Str, new StatValue(28)],
            [CoreStat.Dex, new StatValue(1)],
            [CoreStat.Con, new StatValue(28)],
            [CoreStat.Int, new StatValue(2)],
            [CoreStat.Wis, new StatValue(13)],
            [CoreStat.Cha, new StatValue(16)],
        ]),
        ac                 : 22,
        acDesc             : "(Natural Armor)",
        biologicalHp       : 120,
        attacks            : [tauntText],
        crValue            : new CRValue(7, 1),
        saveProficiencies  : new Map([
            [CoreStat.Str, ProficiencyLevel.Expert],
            [CoreStat.Con, ProficiencyLevel.Expert],
            [CoreStat.Int, ProficiencyLevel.Expert],
            [CoreStat.Wis, ProficiencyLevel.Expert],
            [CoreStat.Cha, ProficiencyLevel.Expert],
        ]),
        skillProficiencies : new Map([
            [Skill.Athletics, ProficiencyLevel.Expert],
            [Skill.Perception, ProficiencyLevel.Expert],
        ]),
        speeds             : new Map([
            [Speed.Walking, 50]
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
            Conditions.Exhaustion,
            Conditions.Poisoned,
            Conditions.Prone,
        ]),
    });
}

export function setupMonsters()
{
    const idToGenerator: Map<string, () => StatSheet> = new Map([
        ["inkling_insecurity", createInkling],
        ["inkling_impatience", createInklingDog],
        ["inkling_envy", createInklingAberrant],
        ["inkling_fury", createInklingWannabeBoss],
        ["inkling_sloth", createInklingTank],
        ["inkling_arrogance", createInklingDynamite],
    ]);

    const generatedIds: Set<string> = new Set();
    $("#beastiary").on("click", ".creature:not(.disabled)", function () {
        const creatureId = $(this).data("creatureId");
        $(".stat_sheet").hide();

        if (!idToGenerator.has(creatureId)) {
            return;
        }

        if (generatedIds.has(creatureId)) {
            $(`#stat_sheet_${creatureId}`).show();
            return;
        }

        const statSheet = idToGenerator.get(creatureId)();
        $("#sheet_zone").append(renderStatSheet(creatureId, statSheet));
        generatedIds.add(creatureId);
    });
}