import {numberToText}                                                                                from "../../../../../../common/common";
import {Activation, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                       from "../../../../../data/npcIndex";
import {D1, D12, D6, D8}                                                                             from "../../../../../rolling/Dice";
import {Action}                                                                                      from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                    from "../../../../action/Wrap";
import {Character}                                                                                   from "../../../Character";
import {CharacterVariant}                                                                            from "../../../CharacterVariant";


function generateMultiattack(count: number)
{
    return () =>
        `<p><em><strong>MultiAttack.</strong></em> The Predator makes ${numberToText(count)}
        bite attacks.</p>`
}

export function setupPincers()
{
    const c = new Character(NpcID.Pincer);

    c.core.name = "Pincer";
    c.core.imgPath = "mob_tokens/seaborn/Pincer.png";
    c.core.finalize();

    c.dStats.initializeStats(17, 13, 17, 2, 10, 7);
    c.dStats.pb = 2;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Stealth, );
    c.dSkills.setSkillProficiency(DSkill.Athletics, );
    c.dSkills.finalize();

    const predHpDice = D6.countHavingE(30, c.CON);
    c.combat.addBioHpDice(predHpDice, D6);
    c.combat.computeHP();

    c.combat.setLightArmor(11);

    c.combat.setSave(DStat.Dex, ProficiencyLevel.Prof);

    c.combat.setSpeed(Speed.Walking,  35);
    c.combat.setSpeed(Speed.Swimming, 50);

    c.combat.setRes(DamageType.Acid,         -100);
    c.combat.setRes(DamageType.Thunder,      -100);
    c.combat.setRes(DamageType.Poison,         50);
    c.combat.setRes(DamageType.Fire,           50);

    c.combat.setSense(Sense.Darkvision, 60);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Deadly Jaws.</strong></em> Whenever the Pincer bites 
        someone of small size or smaller, they can grapple and carry them off in
        their jaws, using a BA to throw them within 5 ft. While grappled, the 
        victim takes ${wrapRoll([[c.SemiProf, D8], [c.STR, D1]])}
        ${wrapDamageType(DamageType.Piercing)} damage at the start of each of 
        their turns.
         </p>`
    ), "jaws");

    c.combat.addAction(new Action(
        Activation.Action,
        generateMultiattack(2)
    ), "multiattack");

    c.combat.addAction(new Action(
        Activation.Action,
        c => `<p><em><strong>Bite.</strong></em> Melee Attack.  
        ${wrapRoll(c.STR + c.Prof)} to hit. ${wrapRoll([[c.SemiProf, D8], [c.STR, D1]])}
        ${wrapDamageType(DamageType.Piercing)} damage.
         </p>`
    ));

    c.combat.cr = 3;
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Seaborn, Lawful Evil";
    c.sheet.acDesc   = " (Natural Armor)";
    c.sheet.category = "seaborn";
    c.sheet.finalize();

    const n = new CharacterVariant(NpcID.PincerN, NpcID.Pincer);

    n.core.name = "Nourished Pincer";
    n.core.imgPath = "mob_tokens/seaborn/PincerN.png";
    n.core.finalize();

    n.dStats.initializeStats(21, 14, 19, 3, 12, 10);
    n.dStats.pb = 3;
    n.dStats.finalize();

    n.combat.addBioHpDice(predHpDice, D8);
    n.combat.computeHP();

    n.combat.setMediumArmor(16);

    n.combat.setSave(DStat.Dex, ProficiencyLevel.Prof);
    n.combat.setSave(DStat.Str, ProficiencyLevel.Prof);

    n.combat.setSpeed(Speed.Walking, 60);
    n.combat.setSpeed(Speed.Swimming, 70);

    n.combat.addAction(new Action(
        Activation.Special,
        c=>`<p><em><strong>Deadly Jaws.</strong></em> Whenever the Pincer bites 
        someone of medium size or smaller, they can grapple and carry them off in
        their jaws, using a BA to throw them within 15 ft. While grappled, the 
        victim takes ${wrapRoll([[c.Prof, D8], [c.STR, D1]])}
        ${wrapDamageType(DamageType.Piercing)} damage at the start of each of 
        their turns.
         </p>`
    ), "jaws");

    n.combat.addAction(new Action(
        Activation.Action,
        generateMultiattack(3)
    ), "multiattack");

    n.combat.cr = 6;
    n.combat.finalize();

    n.sheet.theme = "danger_1";
    n.sheet.finalize();
}