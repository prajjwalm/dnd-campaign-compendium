import {NpcId, NpcIndex} from "../../npcs/npcIndex";
import {
    D1,
    D4,
    D6
}                        from "../common/diceConstants";
import {
    Activation,
    AdventurerClasses,
    CoreStat,
    CreatureSize,
    CRValue,
    DamageType,
    ProficiencyLevel,
    Speed
}                        from "../definitions/constants";
import {
    IAttack,
    InternalAttack
}                        from "./attack";
import {
    StatSheet
}                        from "./sheet";


const cunningAction = new InternalAttack({
    title     : "Cunning Action",
    activation: Activation.BonusAction,
    mainStat  : null,
    contentGenerator(_: IAttack): string {
        return `<p>Can use a bonus action to take the Dash, Disengage, or Hide action.`;
    },
});


export function createJaye()
{
    const sneak = new InternalAttack({
        title     : "Sneak Attack",
        activation: Activation.Special,
        mainStat  : null,
        contentGenerator(args: IAttack): string {
            return `<p>Once per turn, Jaye can boost a finesse/ranged weapon attack by 
                    ${args.getDamageRollableStr("sneak")} as per regular sneak attack rules.</p>`;
        },
    }).bindDamages({
        expectedDamage        : null,
        assignedDamages       : () => new Map([
            ["sneak", new Map([[D6, 3]])],
        ])
    });

    const psychicKnife = new InternalAttack({
        title     : "Psionic Knife",
        activation: Activation.Special,
        mainStat  : null,
        contentGenerator(_: IAttack): string {
            return `<p>Though he never learnt how, Jaye seems to have formed a cognitive bond with his favorite 
                       cooking knife. Weapon attacks with it deal additional psychic damage and the knife can cut
                       through non-sentient matter rather easily if Jaye wills so. Also, he can throw the knife point first and 
                       mentally command it to return to his hand (also point first if possible). The return of the knife
                       obeys the conservation of momentum and seems to carry great inertia (much more than its momentum).
                       It would take a DC 27 Str check or 400 kgs wt. equivalent of force to keep the knife and Jaye
                       separate.</p>`;
        },
    });

    const parry = new InternalAttack({
        title     : "Parry",
        activation: Activation.Reaction,
        mainStat  : null,
        contentGenerator(_: IAttack): string {
            return `<p>If he carries a knife, Jaye can add a +2 to his AC against an attack that would hit him 
                       and cause it to miss. The AC increase is a +3 instead if the knife is his favorite cooking
                       knife.</p>`;
        },
    });

    const commandReturn = new InternalAttack({
        title     : "Command Return",
        activation: Activation.Reaction,
        mainStat  : null,
        contentGenerator(_: IAttack): string {
            return `<p>At will, Jaye can command his favorite cooking knife to return to his hands if it is within 240 
                    ft of him. It deals the damage equivalent of a main-hand stab to all creatures in its path and can 
                    pull objects along with it. If possible, sneak attack may only be applied to first creature to be hit.
                    </p>`;
        },
    });

    const focus = new InternalAttack({
        title     : "Predatory Hyperfocus",
        activation: Activation.Special,
        mainStat  : CoreStat.Con,
        contentGenerator(args: IAttack): string {
            return `<p>Everytime he deals damage, Jaye must make a DC ${args.getDc()} Wis save. On failure, Jaye's 
            beastial instincts of an apex predator kick in, and he enters a vampiric hyperfocused state. While in that 
            state, each of Jaye's attacks heals himself or a creature of his choice within 5ft by half the damage dealt.
            Also, anyone hit by his attacks must make a DC ${args.getDc()} Cha save or be <u>silenced</u> until the end
            of their next turn. The downside of this is that in this state, at the start of his turn one creature within
            5ft ft of himself takes 10 Psychic damage. If no creature is within that range, Jaye himself takes that 
            damage.</p>`;
        },
    });

    const skills = new InternalAttack({
        title     : "Expert Hands",
        activation: Activation.Special,
        mainStat  : null,
        contentGenerator(args: IAttack): string {
            return `<p>Jaye is extremely skilled in handling his favorite cooking knife. He performs attacks with it 
                       with expertise and can use it to parry minor blows. Also, if his offhand is free, he can transfer 
                       the knife between his main hand and his offhand and make an extra attack as a bonus action. If 
                       his primary attack that turn was a feint, the secondary attack is at advantage and has a 
                       ${args.getDamageRollableStr("sup")} superiority dice added to the to-hit roll.</p>`;
        },
    }).bindDamages({
        expectedDamage        : null,
        assignedDamages       : () => new Map([
            ["sup", new Map([[D6, 1]])],
        ])
    });

    const knife = new InternalAttack({
        title     : "Cooking Knife",
        activation: Activation.Action,
        mainStat  : CoreStat.Dex,
        contentGenerator(args: IAttack): string {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr({ name: "Slash", prof: ProficiencyLevel.Expert })}, 
            reach 5 ft. (or a 60ft Ranged throw), one target.
            Hit: ${args.getDamageRollableStr("Slash")} (slash) or ${args.getDamageRollableStr("Stab")} (stab) 
            plus ${args.getDamageRollableStr("Psychic")}. Jaye can choose to feint instead of attempting to hit with 
            this attack.</p>`;
        },
    }).bindDamages({
        expectedDamage        : null,
        assignedDamages       : args => new Map([
            ["Slash", new Map([[D6, 1], [D1, args.getMod()]])],
            ["Stab", new Map([[D6, 1], [D1, args.getMod()]])],
            ["Psychic", new Map([[D6, 1]])],
        ]),
        damageTypes           : new Map([
            ["Slash", DamageType.Slashing],
            ["Stab", DamageType.Piercing],
            ["Psychic", DamageType.Psychic],
        ])
    });

    const knifeOff = new InternalAttack({
        title     : "Cooking Knife",
        subtitle  : "(Offhand)",
        activation: Activation.BonusAction,
        mainStat  : CoreStat.Dex,
        contentGenerator(args: IAttack): string {
            return `<p>Melee Weapon Attack: ${args.getToHitRollableStr({ name: "Slash", prof: ProficiencyLevel.Expert })}, 
            reach 5 ft., one target.
            Hit: ${args.getDamageRollableStr("Slash")} (slash) or ${args.getDamageRollableStr("Stab")} (stab) 
            plus ${args.getDamageRollableStr("Psychic")}.</p>`;
        },
    }).bindDamages({
        expectedDamage        : null,
        assignedDamages       : args => new Map([
            ["Slash", new Map([[D4, 1], [D1, args.getMod()]])],
            ["Stab", new Map([[D4, 1], [D1, args.getMod()]])],
            ["Psychic", new Map([[D6, 1]])],
        ]),
        damageTypes           : new Map([
            ["Slash", DamageType.Slashing],
            ["Stab", DamageType.Piercing],
            ["Psychic", DamageType.Psychic],
        ])
    });

    const jaye = NpcIndex.get(NpcId.Jaye)

    return new StatSheet({
        monster_id         : "human_jaye",
        title              : "Jaye",
        size               : CreatureSize.Medium,
        subtitle           : " Humanoid (Ursine | Polar), Neutral Good",
        stats              : new Map([
            [CoreStat.Str, jaye.getStat(CoreStat.Str)],
            [CoreStat.Dex, jaye.getStat(CoreStat.Dex)],
            [CoreStat.Con, jaye.getStat(CoreStat.Con)],
            [CoreStat.Int, jaye.getStat(CoreStat.Int)],
            [CoreStat.Wis, jaye.getStat(CoreStat.Wis)],
            [CoreStat.Cha, jaye.getStat(CoreStat.Cha)],
        ]),
        ac                 : 14,
        acDesc             : "(No Armor)",
        adventurerLevels   : new Map([
            [AdventurerClasses.Rogue, 5]    // todo: use adv dice normally.
        ]),
        biologicalHp       : 5,
        attacks            : new Map([
            ["psychicKnife", psychicKnife],
            ["skills", skills],
            ["focus", focus],
            ["parry", parry],
            ["return", commandReturn],
            ["sneak", sneak],
            ["knife", knife],
            ["knifeOff", knifeOff],
            ["cunning", cunningAction],
        ]),
        crValue            : new CRValue(5, jaye.pb),
        saveProficiencies  : jaye.saves,
        skillProficiencies : jaye.skills,
        speeds             : new Map([
            [Speed.Walking, 30]
        ]),
        resistances        : new Set([
            DamageType.Cold,
        ]),
    });
}
