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
}                                            from "../../../../../data/constants";
import {
    NpcID
}                         from "../../../../../data/npcIndex";
import {D12, D20, D6, D8} from "../../../../../rolling/Dice";
import {Action}           from "../../../../action/Action";
import {wrapDamageType, wrapRoll, wrapSense} from "../../../../action/Wrap";
import {Character}                           from "../../../Character";

export function setupCluster()
{
    const c = new Character(NpcID.Cluster);

    c.core.name = "Cluster";
    c.core.imgPath = "character_tokens/C2/Arc2/Cluster.png";

    c.dStats.initializeStats(18, 17, 23, 22, 14, 19);
    c.dStats.pb = Prof.get(8);

    c.dSKills.setSkillProficiency(DSkill.Arcana, Hidden, ProficiencyLevel.Expert);
    c.dSKills.setSkillProficiency(DSkill.Deception, Hidden, ProficiencyLevel.Expert);
    c.dSKills.setSkillProficiency(DSkill.History, Hidden, ProficiencyLevel.Expert);
    c.dSKills.setSkillProficiency(DSkill.Nature, Hidden, ProficiencyLevel.Expert);
    c.dSKills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Expert);
    c.dSKills.setSkillProficiency(DSkill.Religion, Hidden, ProficiencyLevel.Expert);
    c.dSKills.setSkillProficiency(DSkill.Stealth, Hidden, ProficiencyLevel.Expert);
    c.dSKills.finalizeSkills();

    c.opinions.isOpinionated = false;

    c.combat.addBioHpDice(D12.countHavingE(1000, c.CON), D12);
    c.combat.computeHP();

    c.combat.setSave(DStat.Int);
    c.combat.setSave(DStat.Con);
    c.combat.setSave(DStat.Cha);

    c.combat.setSpeed(Speed.Walking, 30);
    c.combat.setSpeed(Speed.Swimming, 30);

    c.combat.setRes(DamageType.Cold,         -100);
    c.combat.setRes(DamageType.Hellfire,     -100);
    c.combat.setRes(DamageType.Psychic,      -100);
    c.combat.setRes(DamageType.Fire,         50);
    c.combat.setRes(DamageType.Necrotic,     50);
    c.combat.setRes(DamageType.Force,        50);
    c.combat.setRes(DamageType.Physical,     100);
    c.combat.setRes(DamageType.Thunder,      100);
    c.combat.setRes(DamageType.Acid,         100);
    c.combat.setRes(DamageType.Poison,       100);

    c.combat.setSense(Sense.Darkvision, 150);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Abyssal Iterations.</strong></em>The cluster .</p>`
    ));

    c.combat.addAcBonus(c.CON);

    c.sheet.cr = new CRValue(26);

    c.sheet.size = CreatureSize.Huge;

    c.sheet.subtitle = " Fiend, Lawful Evil";
    c.sheet.acDesc = " (Natural Armor)";
    c.sheet.category = "seaborn";

    c.finalize();
}