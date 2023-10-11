import {
    Activation,
    Condition,
    CreatureSize,
    CRValue,
    DamageType,
    DSkill,
    DStat,
    Hidden,
    Prof,
    ProficiencyLevel,
    Sense,
    Speed,
    StatValue
} from "../../../../../data/constants";
import {
    NpcID
} from "../../../../../data/npcIndex";
import {
    D1, D10,
    D12, D20,
    D4,
    D6,
    D8
} from "../../../../../rolling/Dice";
import {
    Action
} from "../../../../action/Action";
import {
    wrapCondition,
    wrapDamageType,
    wrapRoll,
    wrapSense
} from "../../../../action/Wrap";
import {
    Character
} from "../../../Character";

export function setupUrchinN()
{
    const urchin = new Character(NpcID.UrchinN);

    urchin.core.name = "Nourished Urchin";
    urchin.core.imgPath = "mob_tokens/seaborn/UrchinN.png";

    urchin.dStats.initializeStats(25, 1, 30, 1, 1, 1);
    urchin.dStats.pb = Prof.get(5);

    urchin.dSKills.setSkillProficiency(DSkill.Athletics, Hidden, ProficiencyLevel.Expert);
    urchin.dSKills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Expert);
    urchin.dSKills.finalizeSkills();

    urchin.opinions.isOpinionated = false;

    urchin.combat.addBioHpDice(D8.countHavingE(400, urchin.CON), D8);
    urchin.combat.computeHP();

    urchin.combat.setSave(DStat.Str, ProficiencyLevel.Expert);
    urchin.combat.setSave(DStat.Con, ProficiencyLevel.Expert);

    urchin.combat.setSpeed(Speed.Walking, 5);
    urchin.combat.setSpeed(Speed.Swimming, 10);

    urchin.combat.setRes(DamageType.Hellfire,    -100);
    urchin.combat.setRes(DamageType.Lightning,   -100);
    urchin.combat.setRes(DamageType.Thunder,     -100);
    urchin.combat.setRes(DamageType.Fire,         100);
    urchin.combat.setRes(DamageType.Psychic,      100);
    urchin.combat.setRes(DamageType.Slashing,     100);
    urchin.combat.setRes(DamageType.Bludgeoning,  100);
    urchin.combat.setRes(DamageType.Acid,         100);
    urchin.combat.setRes(DamageType.Cold,         100);
    urchin.combat.setRes(DamageType.Poison,       100);

    urchin.combat.addConditionImmunity(Condition.Charmed);
    urchin.combat.addConditionImmunity(Condition.Frightened);

    urchin.combat.setSense(Sense.TremorSense, 120);

    urchin.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Fossilized Existence.</strong></em> The sea urchin will 
        never take damage due to water pressure and moves exceedingly slowly on
        hundreds of tiny tube feet. The sea urchin may never dash, and its 
        movement speed only increases by 5ft on the Nethersea brand, instead of the usual 15ft.</p>`
    ));

    urchin.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Dense toxins.</strong></em> The nourished sea urchin has 
        a transparent outer shell exposing its viscera and a dense body filled 
        with impurities that they release in self-defense. Whenever the urchin's
        HP falls below a multiple of 40, it releases toxins that deals 
        ${wrapRoll([urchin.CON, D12])} ${wrapDamageType(DamageType.Corrosion)} 
        damage and ${wrapRoll([urchin.CON, D12])} ${wrapDamageType(DamageType.Neural)}
        to all non-seaborn creatures within 60 ft. If it's HP falls through more 
        than one multiple in a single hit the damage does not compound.
         </p>`
    ));

    urchin.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Spiky Caprice.</strong></em> A creature that attempts to 
        attack the urchin from a 5ft range takes ${wrapRoll(D10)} piercing damage.
        This damage is ignored if the hit was a critical hit.
         </p>`
    ));

    urchin.sheet.cr = new CRValue(9);

    urchin.sheet.size = CreatureSize.Medium;

    urchin.sheet.subtitle = " Seaborn, Neutral";
    urchin.sheet.acDesc = " (Natural Armor)";
    urchin.sheet.category = "seaborn";

    urchin.finalize();
}