import {Activation, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                               from "../../../../../data/npcIndex";
import {D1, D12, D6, D8}                                                                     from "../../../../../rolling/Dice";
import {Action}                                                                              from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                            from "../../../../action/Wrap";
import {Character}                                                                           from "../../../Character";


function corrosiveAttackGenerator(spitStrength: number,
                                  c: Character)
    : string
{
    const p: { range: number, } = new Map([
        [3,  { "range": 40, }],
        [1,  { "range": 20, }],
        [0,  { "range": 10, }],
    ]).get(spitStrength);

    return `
    <p><em><strong>Corrosive Electrolyte</strong></em> The skimmer spews a corrosive acid in a ${p.range} ft cone. Targets must make a DC 
     ${(c.STR + c.CON + c.Prof + 8)} DEX save to avoid the worst of the damage. Creatures who fail the save take 
     ${wrapRoll([[2 + spitStrength, D12], [c.STR + c.CON, D1]])} ${wrapDamageType(DamageType.Corrosion)} damage, creatures who succeed the
     save take only half damage and the damage type is considered acid instead.</p>`;
}

export function setupSkimmer()
{
    const c = new Character(NpcId.Skimmer);

    c.core.name = "Skimmer";
    c.core.imgPath = "mob_tokens/seaborn/Skimmer.png";
    c.core.finalize();

    c.dStats.initializeStats(14, 14, 20, 13, 10, 11);
    c.dStats.pb = 3;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Athletics, ProficiencyLevel.Expert);
    c.dSkills.finalize();

    const harpoonerHitDiceCount = D8.countHavingE(90, c.CON);
    c.combat.addBioHpDice(harpoonerHitDiceCount, D8);
    c.combat.computeHP();

    c.combat.setSave(DStat.Int, ProficiencyLevel.Prof);

    c.combat.setSpeed(Speed.Walking, 15);
    c.combat.setSpeed(Speed.Flying, 45);
    c.combat.setSpeed(Speed.Swimming, 30);

    c.combat.setRes(DamageType.Hellfire,    -100);
    c.combat.setRes(DamageType.Psychic,      50);
    c.combat.setRes(DamageType.Lightning,    100);
    c.combat.setRes(DamageType.Cold,         100);
    c.combat.setRes(DamageType.Acid,         100);

    c.combat.setSense(Sense.Darkvision, 60);

    let ct = corrosiveAttackGenerator(1, c);

    c.combat.addAction(new Action(Activation.Special,
        "<p><strong><em>Low Altitude Hovering.</em></strong>The skimmer glides 15 ft over the ground. While gliding, it has +3 AC, increased movement speed," +
        "+3 to all saves, takes 3 damage less from all sources and reflects lightning damage. The gliding is lost if it gets stunned, or suffers from a similar status effect. </p>"))
    c.combat.addAction(new Action(Activation.Action, ct));
    c.combat.addAction(new Action(Activation.BonusAction,
        "<p><strong><em>To the Skies.</em></strong>The skimmer resumes its low altitude hovering. It will always take " +
        "this BA if it isn't hovering.</P>"))
    c.combat.addAction(new Action(Activation.BonusAction,
        `<p><strong><em>Manta Ray Discharge.</em></strong>The skimmer lets free an electronic pulse in a 30 ft sphere. 
        All creatures on that sphere who have taken corrosion damage since the start of the round take 
        ${wrapRoll([c.CON, D6])} ${wrapDamageType(DamageType.Lightning)} damage.</p>`))

    c.combat.cr = 6;
    c.combat.finalize();

    c.sheet.size     = CreatureSize.Medium;
    c.sheet.subtitle = " Seaborn, Neutral Evil";
    c.sheet.acDesc   = " (Natural Armor)";
    c.sheet.category = "seaborn";
    c.sheet.finalize();

}