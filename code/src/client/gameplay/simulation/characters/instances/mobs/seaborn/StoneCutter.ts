import {Activation, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                               from "../../../../../data/npcIndex";
import {D1, D4, D6}                                                                          from "../../../../../rolling/Dice";
import {Action}                                                                                      from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                    from "../../../../action/Wrap";
import {Character}                                                                                   from "../../../Character";

export function setupStoneCutter()
{
    const c = new Character(NpcId.StoneCutter);

    c.core.name = "StoneCutter";
    c.core.imgPath = "mob_tokens/seaborn/Stonecutter.png";
    c.core.finalize();

    c.dStats.initializeStats(17, 8, 12, 8, 12, 10);
    c.dStats.pb = 2;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Athletics, ProficiencyLevel.Expert);
    c.dSkills.finalize();

    c.combat.addBioHpDice(D6.countHavingE(60, c.CON), D6);
    c.combat.computeHP();

    c.combat.setHeavyArmor(16);

    c.combat.setSave(DStat.Str, ProficiencyLevel.Expert);

    c.combat.setSpeed(Speed.Walking, 10);
    c.combat.setSpeed(Speed.Swimming, 20);

    c.combat.setRes(DamageType.Thunder,     -100);
    c.combat.setRes(DamageType.Force,       -100);
    c.combat.setRes(DamageType.Acid,        -100);
    c.combat.setRes(DamageType.Physical,      50);
    c.combat.setRes(DamageType.Lightning,     50);
    c.combat.setRes(DamageType.Fire,          50);
    c.combat.setRes(DamageType.Cold,          50);

    c.combat.setSense(Sense.Darkvision, 120);

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Rapid Fire.</strong></em> Ranged Attack. Range 30ft.  
        ${wrapRoll(c.STR + c.Prof)} to hit. ${wrapRoll([[1, D4], [c.STR, D1]])}
        ${wrapDamageType(DamageType.Piercing)} damage. The StoneCutter continues
        to attack, upto a maximum of 9 times, until it misses twice.
         </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>MultiAttack.</strong></em> The StoneCutter makes two 
        rapid fire attacks if it is anchored.
         </p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Anchor.</em> (1 / Day)</strong> The StoneCutter anchors 
        itself on the spot, retreats inside its carapace and continues to attack.
        It remains anchored until the end of its next turn. During that time it 
        gains +5 AC, its attack rate increases, and all its resistances 
        become immunities, but it cannot move.
         </p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p>The StoneCutter has two legendary actions when it is anchored.
         </p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><em><strong>More Rapid Fire.</strong> (Cost 1) </em> The StoneCutter makes 
        another rapid fire attack.
         </p>`
    ));
    c.combat.cr = 5
    c.combat.finalize();

    c.sheet.size = CreatureSize.Small;

    c.sheet.subtitle = " Seaborn, Neutral Evil";
    c.sheet.acDesc = " (Carapace)";
    c.sheet.category = "seaborn";
    c.sheet.finalize();
}