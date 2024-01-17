import {Activation, Condition, CreatureSize, CRValue, DamageType, DSkill, DStat, Hidden, Prof, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                                                 from "../../../../../data/npcIndex";
import {D10, D6, D8, Dice}                                                                                                     from "../../../../../rolling/Dice";
import {Action}                                                                                                                from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                                              from "../../../../action/Wrap";
import {Character}                                                                                                             from "../../../Character";
import {CharacterVariant}                                                                                                      from "../../../CharacterVariant";


function denseToxinsAttackGenerator(hpThreshold: number,
                                    attackDice: Dice,
                                    attackDiceMultiplier: number,
                                    damageRange: number)
{
    return (c: Character) =>
        `<p><em><strong>Dense toxins.</strong></em> The urchin has a transparent
        outer shell exposing its viscera and a dense body filled with impurities
        that they release in self-defense. Whenever the urchin's HP falls below
        a multiple of ${hpThreshold}, it releases toxins that deals 
        ${wrapRoll([attackDiceMultiplier * c.CON, attackDice])} ${wrapDamageType(DamageType.Corrosion)} 
        damage to all non-seaborn creatures within ${damageRange} ft. If it's HP falls 
        through more than one multiple in a single hit the damage does not
        compound.`;
}

export function setupUrchins()
{
    const urchin = new Character(NpcID.Urchin);

    urchin.core.name = "Urchin";
    urchin.core.imgPath = "mob_tokens/seaborn/Urchin.png";

    urchin.dStats.initializeStats(20, 1, 24, 1, 1, 1);
    urchin.dStats.pb = Prof.get(3);

    urchin.dSKills.setSkillProficiency(DSkill.Athletics, Hidden, ProficiencyLevel.Expert);
    urchin.dSKills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Prof);
    urchin.dSKills.finalizeSkills();

    urchin.opinions.isOpinionated = false;

    urchin.combat.addBioHpDice(D8.countHavingE(250, urchin.CON), D8);
    urchin.combat.computeHP();

    urchin.combat.setSave(DStat.Str, ProficiencyLevel.Expert);
    urchin.combat.setSave(DStat.Con, ProficiencyLevel.Expert);

    urchin.combat.setSpeed(Speed.Walking, 5);
    urchin.combat.setSpeed(Speed.Swimming, 10);

    urchin.combat.setRes(DamageType.Hellfire,    -100);
    urchin.combat.setRes(DamageType.Lightning,   -100);
    urchin.combat.setRes(DamageType.Thunder,     -100);
    urchin.combat.setRes(DamageType.Piercing,    -100);
    urchin.combat.setRes(DamageType.Fire,        -100);
    urchin.combat.setRes(DamageType.Psychic,       50);
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
        movement speed only increases by 5ft on the Nethersea brand, instead of 
        the usual 15ft.</p>`
    ));

    urchin.combat.addAction(new Action(
        Activation.Special,
        denseToxinsAttackGenerator(50, D10, 1, 20)
    ), "DenseToxins");

    urchin.sheet.cr       = new CRValue(5);
    urchin.sheet.size     = CreatureSize.Medium;
    urchin.sheet.subtitle = " Seaborn, Neutral";
    urchin.sheet.acDesc   = " (Natural Armor)";
    urchin.sheet.category = "seaborn";

    urchin.finalize();


    const urchinN = new CharacterVariant(NpcID.UrchinN, NpcID.Urchin);

    urchinN.core.name    = "Nourished Urchin";
    urchinN.core.imgPath = "mob_tokens/seaborn/UrchinN.png";

    urchinN.dStats.initializeStats(25, 1, 30, 1, 1, 1);
    urchinN.dStats.pb = Prof.get(5);

    urchinN.combat.addBioHpDice(D8.countHavingE(400, urchinN.CON), D8);
    urchinN.combat.computeHP();

    urchinN.combat.addAction(new Action(
        Activation.Special,
        denseToxinsAttackGenerator(40, D6, 2, 60)
    ), "DenseToxins");

    urchinN.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Spiky Caprice.</strong></em> A creature that attempts to 
        attack the urchin from a 5ft range takes ${wrapRoll(D10)} piercing damage.
        This damage is ignored if the hit was a critical hit.
         </p>`
    ));

    urchinN.sheet.cr    = new CRValue(9);
    urchinN.sheet.size  = CreatureSize.Large;
    urchinN.sheet.theme = "danger_1";

    urchinN.finalize();
}