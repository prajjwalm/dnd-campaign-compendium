import {D1, D12, D20, D4, D8, Dice} from "../common/diceConstants";
import {
    Activation,
    DStat,
    DamageType,
    ProficiencyLevel
}                                   from "../definitions/constants";
import {
    AttackContracts,
    BuffedInternalAttack,
    IAttack, IAttackContract
} from "./attack";
import {
    contractIndex,
    IBuffedStatSheet,
    idToSheetGenerator,
    isContractSelected,
    ISheetContract,
    SheetContract
}                          from "./sheet";


const RiskCutoffs = new Map([
    [0,  "D"],
    [2,  "C"],
    [5,  "B"],
    [8,  "A"],
    [12,  "S"],
    [15,  "SS"],
    [18,  "SSS"],
    [24,  "F"],
])


export const generatedIds: Set<string> = new Set();

export function renderContracts()
{
    function resetSheets(e) {
        // Timeout to ensure the selected class is added before this code runs.
        setTimeout(() => {
            e.stopPropagation();
            const $currentSheet = $(".stat_sheet:visible");
            const $riskEffects = $(".risk_effects");
            $riskEffects.empty();

            let totalRisk = 0;
            for (const [id, contract] of contractIndex.entries())
            {
                if (!isContractSelected(id)) {
                    continue;
                }
                totalRisk += contract.risk;
                $(`<div class='risk_effect'>
                       <img class="risk_icon" src="assets/images/risk/CC_Level_${contract.risk}.webp" alt=""> 
                       <span>${contract.desc}</span>
                   </div>`).appendTo($riskEffects);

            }
            $("#risk_value").text(totalRisk);

            let displayGrade = "F";
            for (const [cutoff, grade] of RiskCutoffs.entries()) {
                if (totalRisk >= cutoff) {
                    displayGrade = grade;
                } else {
                    break;
                }
            }
            $("#grade").html(displayGrade);

            if ($currentSheet.length == 0) {
                $(".stat_sheet").remove();
                generatedIds.clear();
                return;
            }
            // stat_sheet_{category}_{name}
            const creatureId = $currentSheet.attr("id").substring(11);
            console.log(creatureId);
            console.log(idToSheetGenerator);
            $(".stat_sheet").remove();
            generatedIds.clear();
            $("#sheet_zone").append(idToSheetGenerator.get(creatureId)().render());
        }, 10);
    }
    // Both need watchers since the selector stops propagation.

    // todo: every use case will need this fix.
    $("#contracts").on("click", ".contract_group", resetSheets);
    $("#contracts").on("click", ".contract", resetSheets);
    for (const contractGroups of Contracts.values()) {

        const cList = [];
        for (const contract of contractGroups.values()) {
            contractIndex.set(contract.id, contract);
            cList.push(contract.render());
        }
        $(`<div class="contract_group selectable_radio_container">${cList.join("")}</div>`)
            .appendTo("#contracts");
    }
}

// todo: make the inner thing a set.
export const Contracts: Map<string, Map<number, ISheetContract>> = new Map([
    ["freedom", new Map([
        [1, new SheetContract(
            1,
            "free1",
            "Unbreakable Freedom I",
            "CC-FreeBuffA1.webp",
            "Freedom has +20% HP/Attack Dice and +1 AC.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_free",
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 1.2);
                }
                for (const [_, attack] of sheet.attacks.entries()) {
                    if (attack.isDamaging) {
                        attack.activateContract(AttackContracts.get("StimulusFree1"));
                    }
                }
                sheet.ac++;
            },
        )],
        [2, new SheetContract(
            2,
            "free2",
            "Unbreakable Freedom II",
            "CC-FreeBuffA2.webp",
            "Freedom has +30% HP Dice and +3 AC. And <em>Break the Chains</em> " +
            "has shockwave radius, HP and probablity increased. She no longer " +
            "takes damage on the chains breaking.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_free",
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 1.3);
                }
                sheet.ac += 3;
                sheet.attacks.set("breakTheChains", new BuffedInternalAttack({
                    activation : Activation.BonusAction,
                    contentGenerator(args: IAttack): string {
                        return `At the end of her turn, Freedom has a 45% (55% in her second 
            form) chance to call forth her memories of captivity. If she does 
            succeed, chains with 100HP (150HP in her second form) appear around 
            her and stop her from moving or attacking. If the chains are not 
            destroyed until the start of her next-to-next round, she will free
            herself and release a burst of ${args.getDamageRollableStr("free")}
            (necrotic in her second form) to all creatures within 90 ft of her. 
            If the chains are broken, she and any creatures in 5ft are stunned
            till the start of their turns.`;
                    },
                    mainStat: undefined,
                    title: "Break the Chains"
                }).bindDamages({
                    expectedDamage: 150,
                    damageTypes: new Map([["free", DamageType.Radiant]]),
                    unassignedDamageRatios: new Map([["free", new Map([[D12, 1]])]])
                }))
            },
        )],
        [3, new SheetContract(
            3,
            "free3",
            "Unbreakable Freedom III",
            "CC-FreeBuffA3.webp",
            "Freedom has +50% HP Dice and +5 AC. And <em>Break the Chains</em> " +
            "has shockwave radius, HP and probablity significantly increased. " +
            "Freedom now retores HP on the chains breaking.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_free",
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 1.5);
                }
                sheet.ac += 5;
                sheet.attacks.set("breakTheChains", new BuffedInternalAttack({
                    activation : Activation.BonusAction,
                    contentGenerator(args: IAttack): string {
                        return `At the end of her turn, Freedom has a 65% (75% in her second 
            form) chance to call forth her memories of captivity. If she does 
            succeed, chains with 150HP (225HP in her second form) appear around 
            her and stop her from moving or attacking. If the chains are not 
            destroyed until the start of her next-to-next round, she will free
            herself and release a burst of ${args.getDamageRollableStr("free")}
            (necrotic in her second form) to all creatures within 120 ft of her. 
            If the chains are destroyed, she gains 25 HP instead. Also, she and 
            any other creatures within 30ft range are stunned till the start of 
            their turns.`;
                    },
                    mainStat: undefined,
                    title: "Break the Chains"
                }).bindDamages({
                    expectedDamage: 150,
                    damageTypes: new Map([["free", DamageType.Radiant]]),
                    unassignedDamageRatios: new Map([["free", new Map([[D12, 1]])]])
                }))
            },
        )],
        [4, new SheetContract(
            2,
            "free4",
            "Dazzling Freedom II",
            "CC-FreeBuffB2.webp",
            "Freedom has +90% HP Dice, +70% Damage Dice and resistance to fire" +
            " and radiant damage. <em>Ink Swirl</em>'s cooldown is reduced.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_free",
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 1.9);
                }
                for (const [_, attack] of sheet.attacks.entries()) {
                    if (attack.isDamaging) {
                        attack.activateContract(AttackContracts.get("StimulusFree2"));
                    }
                }
                sheet.res.add(DamageType.Fire);
                sheet.res.add(DamageType.Radiant);

                sheet.attacks.set("inkSwirl",  new BuffedInternalAttack({
                    activation : Activation.Action,
                    contentGenerator(args: IAttack): string {
                        return `(This action can only be taken once in every two rounds
            at the start of Freedom's turn, and before she moves) Freedom
            targets the closest friendly unit within 60ft of her. If there are
            two friendly units equidistant, she 
            chooses the one with lower HP. That unit and any other non-inklings 
            in 5 ft of it are <u>restrained</u> in an ink swirl and take
            <u>continuous ${args.getDamageRollableStr("inkSwirl")}</u> for
            two rounds. At the start of their turns, they can make a DC 
            ${args.getDc({stat: DStat.Cha, prof: ProficiencyLevel.Expert})}
            atheletics check to escape the ink. The DC reduces by one after each
            instance of damage. Allies can attempt to draw them out by making 
            the same check, but on failure, the ink envelops them too.`;
                    },
                    mainStat: DStat.Cha,
                    title: "Ink Swirl"
                }).bindDamages({
                    assignedDamages(args: IAttack): Map<string, Map<Dice, number>> {
                        return new Map([
                            ["inkSwirl", new Map([[D1, args.getMod(DStat.Cha)]])]
                        ]);
                    },
                    damageTypes: new Map([["inkSwirl", DamageType.Corrosion]]),
                    expectedDamage: 25,
                    unassignedDamageRatios: new Map([
                        ["inkSwirl", new Map([[D4, 1]])]
                    ])
                }));
            },
        )],
        [5, new SheetContract(
            3,
            "free5",
            "Dazzling Freedom III",
            "CC-FreeBuffB3.webp",
            "Freedom has +200% HP Dice, +150% Atk Dice and resistance to fire and radiant damage. " +
            "<em>Ink Swirl</em>'s cooldown is greatly reduced, and it needn't be cast at the " +
            "start of the turn.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_free",
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 3);
                }
                sheet.res.add(DamageType.Fire);
                sheet.res.add(DamageType.Radiant);

                for (const [_, attack] of sheet.attacks.entries()) {
                    if (attack.isDamaging) {
                        attack.activateContract(AttackContracts.get("StimulusFree3"));
                    }
                }
                sheet.attacks.set("inkSwirl",  new BuffedInternalAttack({
                    activation : Activation.Action,
                    contentGenerator(args: IAttack): string {
                        return ` Freedom targets the closest friendly unit
            within 60ft of her. If there are two friendly units equidistant, she 
            chooses the one with lower HP. That unit and any other non-inklings 
            in 5 ft of it are <u>restrained</u> in an ink swirl and take
            <u>continuous ${args.getDamageRollableStr("inkSwirl")}</u> for
            two rounds. At the start of their turns, they can make a DC 
            ${args.getDc({stat: DStat.Cha, prof: ProficiencyLevel.Expert})}
            atheletics check to escape the ink. The DC reduces by one after each
            instance of damage. Allies can attempt to draw them out by making 
            the same check, but on failure, the ink envelops them too.`;
                    },
                    mainStat: DStat.Cha,
                    title: "Ink Swirl"
                }).bindDamages({
                    assignedDamages(args: IAttack): Map<string, Map<Dice, number>> {
                        return new Map([
                            ["inkSwirl", new Map([[D1, args.getMod(DStat.Cha)]])]
                        ]);
                    },
                    damageTypes: new Map([["inkSwirl", DamageType.Corrosion]]),
                    expectedDamage: 25,
                    unassignedDamageRatios: new Map([
                        ["inkSwirl", new Map([[D4, 1]])]
                    ])
                }));
            },
        )]
    ])],
    ["invested", new Map([
        [1, new SheetContract(
            1,
            "inv1",
            "Invested I",
            "CC-EnemyHPBuff1.webp",
            "Enemies have their HP Dice increased by 30%",
            (sheet: IBuffedStatSheet) => true,
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 1.3);
                }
            },
        )],
        [2, new SheetContract(
            2,
            "inv2",
            "Invested II",
            "CC-EnemyHPBuff2.webp",
            "Enemies have their HP Dice increased by 60%",
            (sheet: IBuffedStatSheet) => true,
            (sheet: IBuffedStatSheet) => {
                for (const [dice, number] of sheet.hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    sheet.hpDice.set(dice, number * 1.6);
                }
            },
        )],
        [3, new SheetContract(
            3,
            "inv3",
            "Invested III",
            "CC-EnemyHPBuff3.webp",
            "Enemies have their HP Dice increased by 110%",
            (sheet: IBuffedStatSheet) => true,
            (sheet: IBuffedStatSheet) => {
                for (const [dice, number] of sheet.hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    sheet.hpDice.set(dice, number * 2.1);
                }
            },
        )],
    ])],
    ["def", new Map([
        [1, new SheetContract(
            1,
            "def1",
            "Shield of Ink",
            "CC-EnemyDEFBuff1.webp",
            "All enemies gain +2 AC.",
            (sheet: IBuffedStatSheet) => true,
            (sheet: IBuffedStatSheet) => {
                sheet.ac += 2;
            },
        )],
    ])],
    ["envy", new Map([
        [1, new SheetContract(
            1,
            "env1",
            "Deep Envy I",
            "CC-EnvyBuffA1.png",
            "Envies have +20% HP and gain semi-proficiency in Con Saving throws.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_envy",
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 1.2);
                }
                sheet.saves.set(DStat.Con, [ProficiencyLevel.Half, 0]);
            },
        )],
        [2, new SheetContract(
            2,
            "env2",
            "Deep Envy II",
            "CC-EnvyBuffA2.png",
            "Envies have +70% HP, +30% ATK and gain proficiency in Con Saving throws.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_envy",
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 1.7);
                }
                sheet.saves.set(DStat.Con, [ProficiencyLevel.Prof, 0]);
                for (const [_, attack] of sheet.attacks.entries()) {
                    if (attack.isDamaging) {
                        attack.activateContract(AttackContracts.get("StimulusEnvy1"));
                    }
                }
            },
        )],
        [3, new SheetContract(
            3,
            "env3",
            "Deep Envy III",
            "CC-EnvyBuffA3.png",
            "Envies have +120% HP, +60% ATK and gain expertise in Con Saving throws.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_envy",
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 2.2);
                }
                sheet.saves.set(DStat.Con, [ProficiencyLevel.Expert, 0]);
                for (const [_, attack] of sheet.attacks.entries()) {
                    if (attack.isDamaging) {
                        attack.activateContract(AttackContracts.get("StimulusEnvy2"));
                    }
                }
            },
        )],
        [4, new SheetContract(
            2,
            "env4",
            "Entrenched Envy II",
            "CC-EnvyBuffB2.png",
            "Envies have advantage in Con Saving throws. Also they now charge " +
            "their attacks in half a round and may begin charging anytime.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_envy",
            (sheet: IBuffedStatSheet) => {
                sheet.attacks.set("charging",  new BuffedInternalAttack({
                    activation : Activation.LegendaryAction,
                    contentGenerator(args: IAttack): string {
                        return "The Inkling begins concentrating for a big shot, " +
                               "they'll be done in half a round (*refer to " +
                               "continuous damage initiative cutoffs).";
                    },
                    mainStat: null,
                    title: "Charging"
                }));
                sheet.attacks.set("bonusShot",  new BuffedInternalAttack({
                    activation : Activation.BonusAction,
                    contentGenerator(args: IAttack): string {
                        return `<p>The inkling spits viscous ink at one creature within 60 feet of itself. The target must succeed 
                    on a DC ${args.getDc()} Constitution saving throw. On failure, they take ${args.getDamageRollableStr(
                            "Blot")}
                    and are Blinded until the end of their next turn. On success, they take half
                    the poison damage and are not blinded. Regardless of the roll, they take ${args.getDamageRollableStr(
                            "BlotNeural")}.</p>`;
                    },
                    mainStat  : DStat.Con,
                    title     : "Casual Spit"
                }).bindDamages({
                    expectedDamage        : 30,
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
                }));
            },
        )],
        [5, new SheetContract(
            3,
            "env5",
            "Entrenched Envy III",
            "CC-EnvyBuffB3.png",
            "Envies have super-advantage in Con Saving throws. Also they now charge " +
            "their attacks in quarter of a round and may begin charging anytime.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_envy",
            (sheet: IBuffedStatSheet) => {
                sheet.attacks.set("charging", new BuffedInternalAttack({
                    activation : Activation.LegendaryAction,
                    contentGenerator(args: IAttack): string {
                        return "The Inkling begins concentrating for a big shot, " +
                               "they'll be done in a fourth of a round (*refer to " +
                               "continuous damage initiative cutoffs).";
                    },
                    mainStat: null,
                    title: "Charging"
                }));
                sheet.attacks.set("bonusShot", new BuffedInternalAttack({
                    activation : Activation.BonusAction,
                    contentGenerator(args: IAttack): string {
                        return `<p>The inkling spits viscous ink at one creature within 60 feet of itself. The target must succeed 
                    on a DC ${args.getDc()} Constitution saving throw. On failure, they take ${args.getDamageRollableStr(
                            "Blot")}
                    and are Blinded until the end of their next turn. On success, they take half
                    the poison damage and are not blinded. Regardless of the roll, they take ${args.getDamageRollableStr(
                            "BlotNeural")}.</p>`;
                    },
                    mainStat  : DStat.Con,
                    title     : "Casual Spit"
                }).bindDamages({
                    expectedDamage        : 30,
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
                }));
            },
        )],
    ])],
    ["stimuli", new Map([
        [1, new SheetContract(
            1,
            "sti1",
            "Stimulus I",
            "CC-EnemyATKBuff1.webp",
            "Enemies have their ATK increased by 25%",
            (sheet: IBuffedStatSheet) => true,
            (sheet: IBuffedStatSheet) => {
                for (const [_, attack] of sheet.attacks.entries()) {
                    if (attack.isDamaging) {
                        attack.activateContract(AttackContracts.get("Stimulus1"));
                    }
                }
            },
        )],
        [2, new SheetContract(
            2,
            "sti2",
            "Stimulus II",
            "CC-EnemyATKBuff1.webp",
            "Enemies have their ATK increased by 50%",
            (sheet: IBuffedStatSheet) => true,
            (sheet: IBuffedStatSheet) => {
                for (const [_, attack] of sheet.attacks.entries()) {
                    if (attack.isDamaging) {
                        attack.activateContract(AttackContracts.get("Stimulus1"));
                    }
                }
            },
        )],
    ])],
    ["fast_mouths", new Map([
        [1, new SheetContract(
            1,
            "faj1",
            "Fast Jaws I",
            "CC-EnemyASPDBuff1.webp",
            "Impatience, insecurity and Freedom have one more attack per action.",
            (sheet: IBuffedStatSheet) =>
                ["inkling_insecurity", "inkling_impatience", "inkling_free"]
                    .includes(sheet.monster_id),
            (sheet: IBuffedStatSheet) => {
                const na = sheet.monster_id == "inkling_insecurity" ? "two"
                                                                    : "three";
                sheet.attacks.set(
                    "multiattack",
                    new BuffedInternalAttack({
                        activation: Activation.Special,
                        contentGenerator(args: IAttack): string {
                            return `<p>The inkling makes ${na} bite attacks per turn.</p>`;
                        },
                        mainStat: undefined,
                        title   : "Multiattack"
                }));
            },
        )],
        [2, new SheetContract(
            2,
            "faj2",
            "Fast Jaws II",
            "CC-EnemyASPDBuff2.webp",
            "Impatience, insecurity and Freedom have two more bite attacks per action.",
            (sheet: IBuffedStatSheet) =>
                ["inkling_insecurity", "inkling_impatience", "inkling_free"]
                    .includes(sheet.monster_id),
            (sheet: IBuffedStatSheet) => {
                const na = sheet.monster_id == "inkling_insecurity" ? "three"
                                                                    : "four";
                sheet.attacks.set(
                    "multiattack",
                    new BuffedInternalAttack({
                        activation: Activation.Special,
                        contentGenerator(args: IAttack): string {
                            return `<p>The inkling makes ${na} bite attacks per turn.</p>`;
                        },
                        mainStat: undefined,
                        title   : "Multiattack"
                    }));
            },
        )],
    ])],
    ["covertAction", new Map([
        [1, new SheetContract(
            1,
            "cva1",
            "Covert Action I",
            "CC-SmallerSquad1.webp",
            "One Friendly gains a +10 to stealth rolls but has fragile inflicted " +
            "throughout the operation (Total HP capped at 1).",
            (sheet: IBuffedStatSheet) => true,
            (sheet: IBuffedStatSheet) => {},
        )],
        [2, new SheetContract(
            3,
            "cva2",
            "Covert Action II",
            "CC-SmallerSquad2.webp",
            "Two friendlies gain a +10 to stealth rolls but have fragile inflicted " +
            "throughout the operation (Total HP capped at 1).",
            (sheet: IBuffedStatSheet) => true,
            (sheet: IBuffedStatSheet) => {},
        )],
    ])],
    ["clock", new Map([
        [1, new SheetContract(
            1,
            "flt1",
            "Fleeting Time I",
            "CC-OperatorASPDDebuff1.webp",
            "Time Limit reduced by 25% to 12 rounds.",
            (sheet: IBuffedStatSheet) => true,
            (sheet: IBuffedStatSheet) => {},
        )],
        [2, new SheetContract(
            2,
            "flt2",
            "Fleeting Time II",
            "CC-OperatorASPDDebuff2.webp",
            "Time Limit reduced by 50% to 8 rounds.",
            (sheet: IBuffedStatSheet) => true,
            (sheet: IBuffedStatSheet) => {},
        )],
    ])],
    ["mov", new Map([
        [1, new SheetContract(
            1,
            "mov1",
            "Mobility I",
            "CC-EnemySpeedBuff.webp",
            "All enemies gain +50% movement speeds.",
            (sheet: IBuffedStatSheet) => true,
            (sheet: IBuffedStatSheet) => {
                for (const [k, v] of sheet.speeds.entries()) {
                    sheet.speeds.set(k, Math.floor(v * 0.3) * 5);
                }
            },
        )],
    ])],
    ["arr", new Map([
        [1, new SheetContract(
            1,
            "arr1",
            "Flickering Lights I",
            "CC-ArroganceBuffA1.webp",
            "Arrogance gain +70% HP and halves come back to life with full HP if " +
            "the other half is not killed until the start of their next-to-next turn. " +
            "They will now chase after friendlies.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_arrogance",
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 1.7);
                }
            },
        )],
        [2, new SheetContract(
            2,
            "arr2",
            "Flickering Lights II",
            "CC-ArroganceBuffA2.webp",
            "Arrogance gain +220% HP and halves come back to life with full HP if " +
            "the other half is not killed until the start of their next-to-next turn. " +
            "They will now chase after friendlies.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_arrogance",
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 3.2);
                }
            },
        )],
        [3, new SheetContract(
            3,
            "arr3",
            "Flickering Lights III",
            "CC-ArroganceBuffA3.webp",
            "Arrogance gain +300% HP and halves come back to life with full HP if " +
            "the other half is not killed until the start of their next-to-next turn. " +
            "They will now chase after friendlies.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_arrogance",
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 4);
                }
            },
        )],
        [4, new SheetContract(
            2,
            "arr4",
            "Ephemeral Lights II",
            "CC-ArroganceBuffB2.webp",
            "Arrogance gain +110% HP, increased movement speed (5ft) and a wider blast radius (+50%). " +
            "They will now chase after friendlies.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_arrogance",
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 2.1);
                }
                for (const [k, v] of sheet.speeds.entries()) {
                    sheet.speeds.set(k, v+5);
                }
                sheet.attacks.set("boomText", new BuffedInternalAttack({
                    contentGenerator(args: IAttack): string {
                        return `<p>Upon death explodes to deal ${args.getDamageRollableStr("Boom")} to targets within 5 ft. 
                    On coming into contact with its opposite explodes to deal ${args.getDamageRollableStr("BigBoom")} 
                    instead to targets within 30ft and half damage to targets within 60ft.</p>`;
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
                }));
            },
        )],
        [5, new SheetContract(
            3,
            "arr5",
            "Ephemeral Lights III",
            "CC-ArroganceBuffB3.webp",
            "Arrogance gain +110% HP, increased movement speed (10ft) and a wider blast radius (+100%) with " +
            "increased damage. They will now chase after friendlies.",
            (sheet: IBuffedStatSheet) => sheet.monster_id == "inkling_arrogance",
            (sheet: IBuffedStatSheet) => {
                const hpDice = sheet.hpDice;
                for (const [dice, number] of hpDice.entries()) {
                    if (dice == D1) {
                        continue;
                    }
                    hpDice.set(dice, number * 2.1);
                }
                for (const [k, v] of sheet.speeds.entries()) {
                    sheet.speeds.set(k, v+10);
                }
                let contracts: ReadonlySet<IAttackContract> = sheet.attacks.get("boomText").getContracts();
                sheet.attacks.set("boomText", new BuffedInternalAttack({
                    contentGenerator(args: IAttack): string {
                        return `<p>Upon death explodes to deal ${args.getDamageRollableStr("Boom")} to targets within 5 ft. 
                    On coming into contact with its opposite explodes to deal ${args.getDamageRollableStr("BigBoom")} 
                    instead to targets within 40ft and half damage to targets within 80ft.</p>`;
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
                }));
                for (const [_, attack] of sheet.attacks.entries()) {
                    if (attack.isDamaging) {
                        attack.activateContract(AttackContracts.get("StimulusArrogance3"));
                        for (const contract of contracts) {
                            attack.activateContract(contract); //old contracts
                        }
                    }
                }
            },
        )],
    ])],
    ["ero", new Map([
        [1, new SheetContract(
            1,
            "ero1",
            "Erosion I",
            "CC-HPDebuff1.webp",
            "Friendlies have HP reduced by 20.",
            (sheet: IBuffedStatSheet) => true,
            (sheet: IBuffedStatSheet) => {
            },
        )],
    ])],
]);
