import {
    Activation,
    CreatureSize,
    CRValue,
    DamageType,
    DSkill,
    DStat,
    Hidden,
    Prof,
    ProficiencyLevel,
    Sense,
    Speed
}                                 from "../../../../../data/constants";
import {NpcID}                    from "../../../../../data/npcIndex";
import {D1, D12, D4, D6}          from "../../../../../rolling/Dice";
import {Action}                   from "../../../../action/Action";
import {wrapDamageType, wrapRoll} from "../../../../action/Wrap";
import {Character}                from "../../../Character";

export function setupStoneCutter()
{
    const cutter = new Character(NpcID.StoneCutter);

    cutter.core.name = "StoneCutter";
    cutter.core.imgPath = "mob_tokens/seaborn/Stonecutter.png";

    cutter.dStats.initializeStats(17, 8, 12, 8, 12, 10);
    cutter.dStats.pb = Prof.get(2);

    cutter.dSKills.setSkillProficiency(DSkill.Athletics, Hidden, ProficiencyLevel.Expert);
    cutter.dSKills.finalizeSkills();

    cutter.opinions.isOpinionated = false;

    cutter.combat.addBioHpDice(D6.countHavingE(60, cutter.CON), D6);
    cutter.combat.computeHP();

    cutter.combat.setHeavyArmor(16);

    cutter.combat.setSave(DStat.Str, ProficiencyLevel.Expert);

    cutter.combat.setSpeed(Speed.Walking, 10);
    cutter.combat.setSpeed(Speed.Swimming, 20);

    cutter.combat.setRes(DamageType.Thunder,     -100);
    cutter.combat.setRes(DamageType.Force,       -100);
    cutter.combat.setRes(DamageType.Acid,        -100);
    cutter.combat.setRes(DamageType.Physical,      50);
    cutter.combat.setRes(DamageType.Lightning,     50);
    cutter.combat.setRes(DamageType.Fire,          50);
    cutter.combat.setRes(DamageType.Cold,          50);

    cutter.combat.setSense(Sense.Darkvision, 120);

    cutter.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Rapid Fire.</strong></em> Ranged Attack. Range 30ft.  
        ${wrapRoll(cutter.STR + cutter.Prof)} to hit. ${wrapRoll([[1, D4], [cutter.STR, D1]])}
        ${wrapDamageType(DamageType.Piercing)} damage. The StoneCutter continues
        to attack, upto a maximum of 9 times, until it misses twice.
         </p>`
    ));

    cutter.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>MultiAttack.</strong></em> The StoneCutter makes two 
        rapid fire attacks if it is anchored.
         </p>`
    ));

    cutter.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Anchor.</em> (1 / Day)</strong> The StoneCutter anchors 
        itself on the spot, retreats inside its carapace and continues to attack.
        It remains anchored until the end of its next turn. During that time it 
        gains +5 AC, its attack rate increases, and all its resistances 
        become immunities, but it cannot move.
         </p>`
    ));

    cutter.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p>The StoneCutter has two legendary actions when it is anchored.
         </p>`
    ));

    cutter.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><em><strong>More Rapid Fire.</strong> (Cost 1) </em> The StoneCutter makes 
        another rapid fire attack.
         </p>`
    ));
    cutter.sheet.cr = new CRValue(5);

    cutter.sheet.size = CreatureSize.Small;

    cutter.sheet.subtitle = " Seaborn, Neutral Evil";
    cutter.sheet.acDesc = " (Carapace)";
    cutter.sheet.category = "seaborn";

    cutter.finalize();
}