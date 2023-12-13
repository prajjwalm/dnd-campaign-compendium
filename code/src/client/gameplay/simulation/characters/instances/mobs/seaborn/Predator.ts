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
import {NpcID}               from "../../../../../data/npcIndex";
import {D1, D12, D4, D6, D8} from "../../../../../rolling/Dice";
import {Action}              from "../../../../action/Action";
import {wrapDamageType, wrapRoll} from "../../../../action/Wrap";
import {Character}                from "../../../Character";

export function setupPredator()
{
    const pred = new Character(NpcID.Predator);

    pred.core.name = "Predator";
    pred.core.imgPath = "mob_tokens/seaborn/Predator.png";

    pred.dStats.initializeStats(17, 18, 15, 11, 13, 15);
    pred.dStats.pb = Prof.get(3);

    pred.dSKills.setSkillProficiency(DSkill.Stealth, Hidden, ProficiencyLevel.Expert);
    pred.dSKills.setSkillProficiency(DSkill.Acrobatics, Hidden, ProficiencyLevel.Expert);
    pred.dSKills.finalizeSkills();

    pred.opinions.isOpinionated = false;

    pred.combat.addBioHpDice(D8.countHavingE(40, pred.CON), D8);
    pred.combat.computeHP();

    pred.combat.setLightArmor(13);

    pred.combat.setSave(DStat.Dex, ProficiencyLevel.Prof);

    pred.combat.setSpeed(Speed.Walking, 35);
    pred.combat.setSpeed(Speed.Swimming, 40);

    pred.combat.setRes(DamageType.Acid,           50);
    pred.combat.setRes(DamageType.Poison,         50);
    pred.combat.setRes(DamageType.Radiant,      -100);
    pred.combat.setRes(DamageType.Lightning,    -100);
    pred.combat.setRes(DamageType.Fire,         -100);

    pred.combat.setSense(Sense.Darkvision, 300);

    pred.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Nethersea Blurring.</em></strong> When standing on the
         nethersea brand, the Predator gains 80% dodge chance to any source of 
         damage (except Almighty) and can teleport 10ft as a bonus action or a 
         reaction to an attack that would hit it.
         </p>`
    ));

    pred.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>MultiAttack.</strong></em> The Predator makes three
        bite attacks.
         </p>`
    ));

    pred.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Bite.</strong></em> Melee Attack.  
        ${wrapRoll(pred.STR + pred.Prof)} to hit. ${wrapRoll([[1, D12], [pred.STR, D1]])}
        ${wrapDamageType(DamageType.Piercing)} damage.
         </p>`
    ));

    pred.sheet.cr = new CRValue(3);

    pred.sheet.size = CreatureSize.Medium;

    pred.sheet.subtitle = " Seaborn, Lawful Evil";
    pred.sheet.acDesc = " (Natural Armor)";
    pred.sheet.category = "seaborn";

    pred.finalize();
}