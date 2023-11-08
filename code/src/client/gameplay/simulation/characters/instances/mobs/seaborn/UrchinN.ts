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
    const urchinN = new Character(NpcID.UrchinN);

    urchinN.core.name = "Nourished Urchin";
    urchinN.core.imgPath = "mob_tokens/seaborn/UrchinN.png";

    urchinN.dStats.initializeStats(25, 1, 30, 1, 1, 1);
    urchinN.dStats.pb = Prof.get(5);

    urchinN.dSKills.setSkillProficiency(DSkill.Athletics, Hidden, ProficiencyLevel.Expert);
    urchinN.dSKills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Expert);
    urchinN.dSKills.finalizeSkills();

    urchinN.opinions.isOpinionated = false;

    urchinN.combat.addBioHpDice(D8.countHavingE(400, urchinN.CON), D8);
    urchinN.combat.computeHP();

    urchinN.combat.setSave(DStat.Str, ProficiencyLevel.Expert);
    urchinN.combat.setSave(DStat.Con, ProficiencyLevel.Expert);

    urchinN.combat.setSpeed(Speed.Walking, 5);
    urchinN.combat.setSpeed(Speed.Swimming, 10);

    urchinN.combat.setRes(DamageType.Hellfire,    -100);
    urchinN.combat.setRes(DamageType.Lightning,   -100);
    urchinN.combat.setRes(DamageType.Thunder,     -100);
    urchinN.combat.setRes(DamageType.Fire,         100);
    urchinN.combat.setRes(DamageType.Psychic,      100);
    urchinN.combat.setRes(DamageType.Slashing,     100);
    urchinN.combat.setRes(DamageType.Bludgeoning,  100);
    urchinN.combat.setRes(DamageType.Acid,         100);
    urchinN.combat.setRes(DamageType.Cold,         100);
    urchinN.combat.setRes(DamageType.Poison,       100);

    urchinN.combat.addConditionImmunity(Condition.Charmed);
    urchinN.combat.addConditionImmunity(Condition.Frightened);

    urchinN.combat.setSense(Sense.TremorSense, 120);

    urchinN.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Fossilized Existence.</strong></em> The sea urchin will 
        never take damage due to water pressure and moves exceedingly slowly on
        hundreds of tiny tube feet. The sea urchin may never dash, and its 
        movement speed only increases by 5ft on the Nethersea brand, instead of the usual 15ft.</p>`
    ));

    urchinN.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Dense toxins.</strong></em> The nourished sea urchin has 
        a transparent outer shell exposing its viscera and a dense body filled 
        with impurities that they release in self-defense. Whenever the urchin's
        HP falls below a multiple of 40, it releases toxins that deals 
        ${wrapRoll([urchinN.CON, D12])} ${wrapDamageType(DamageType.Corrosion)} 
        damage and ${wrapRoll([urchinN.CON, D12])} ${wrapDamageType(DamageType.Psychic)}
        to all non-seaborn creatures within 30 ft. If it's HP falls through more
        than one multiple in a single hit the damage does not compound.
         </p>`
    ));

    urchinN.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Spiky Caprice.</strong></em> A creature that attempts to 
        attack the urchin from a 5ft range takes ${wrapRoll(D10)} piercing damage.
        This damage is ignored if the hit was a critical hit.
         </p>`
    ));

    urchinN.sheet.cr = new CRValue(9);

    urchinN.sheet.size = CreatureSize.Medium;

    urchinN.sheet.subtitle = " Seaborn, Neutral";
    urchinN.sheet.acDesc = " (Natural Armor)";
    // urchinN.sheet.category = "seaborn";

    urchinN.finalize();
}