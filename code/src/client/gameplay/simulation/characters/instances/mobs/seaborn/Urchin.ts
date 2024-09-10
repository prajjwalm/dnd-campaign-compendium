import {Activation, Condition, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                                          from "../../../../../data/npcIndex";
import {D10, D6, D8, Dice}                                                                              from "../../../../../rolling/Dice";
import {Action}                                                                                                 from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                               from "../../../../action/Wrap";
import {Character}                                                                                              from "../../../Character";
import {CharacterVariant}                                                                                       from "../../../CharacterVariant";


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
    const c = new Character(NpcId.Urchin);

    c.core.name = "Urchin";
    c.core.imgPath = "mob_tokens/seaborn/Urchin.png";
    c.core.finalize();

    c.dStats.initializeStats(20, 1, 24, 1, 1, 1);
    c.dStats.pb = 3;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Athletics, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Perception, ProficiencyLevel.Prof);
    c.dSkills.finalize();

    c.combat.addBioHpDice(D8.countHavingE(250, c.CON), D8);
    c.combat.computeHP();

    c.combat.setSave(DStat.Str, ProficiencyLevel.Expert);
    c.combat.setSave(DStat.Con, ProficiencyLevel.Expert);

    c.combat.setSpeed(Speed.Walking, 5);
    c.combat.setSpeed(Speed.Swimming, 10);

    c.combat.setRes(DamageType.Hellfire,    -100);
    c.combat.setRes(DamageType.Lightning,   -100);
    c.combat.setRes(DamageType.Thunder,     -100);
    c.combat.setRes(DamageType.Piercing,    -100);
    c.combat.setRes(DamageType.Fire,        -100);
    c.combat.setRes(DamageType.Psychic,       50);
    c.combat.setRes(DamageType.Slashing,     100);
    c.combat.setRes(DamageType.Bludgeoning,  100);
    c.combat.setRes(DamageType.Acid,         100);
    c.combat.setRes(DamageType.Cold,         100);
    c.combat.setRes(DamageType.Poison,       100);

    c.combat.addConditionImmunity(Condition.Charmed);
    c.combat.addConditionImmunity(Condition.Frightened);

    c.combat.setSense(Sense.TremorSense, 120);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Fossilized Existence.</strong></em> The sea urchin will 
        never take damage due to water pressure and moves exceedingly slowly on
        hundreds of tiny tube feet. The sea urchin may never dash, and its 
        movement speed only increases by 5ft on the Nethersea brand, instead of 
        the usual 15ft.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        denseToxinsAttackGenerator(50, D10, 1, 20)
    ), "DenseToxins");

    c.combat.cr = 5
    c.combat.finalize();

    c.sheet.size     = CreatureSize.Medium;
    c.sheet.subtitle = " Seaborn, Neutral";
    c.sheet.acDesc   = " (Natural Armor)";
    c.sheet.category = "seaborn";

    c.sheet.finalize();


    const n = new CharacterVariant(NpcId.UrchinN, NpcId.Urchin);

    n.core.name    = "Nourished Urchin";
    n.core.imgPath = "mob_tokens/seaborn/UrchinN.png";
    n.core.finalize();

    n.dStats.initializeStats(25, 1, 30, 1, 1, 1);
    n.dStats.pb = 5;
    n.dStats.finalize();

    n.combat.addBioHpDice(D8.countHavingE(400, n.CON), D8);
    n.combat.computeHP();

    n.combat.addAction(new Action(
        Activation.Special,
        denseToxinsAttackGenerator(40, D6, 2, 60)
    ), "DenseToxins");

    n.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Spiky Caprice.</strong></em> A creature that attempts to 
        attack the urchin from a 5ft range takes ${wrapRoll(D10)} piercing damage.
        This damage is ignored if the hit was a critical hit.
         </p>`
    ));

    n.combat.cr = 9;
    n.combat.finalize();

    n.sheet.size  = CreatureSize.Large;
    n.sheet.danger = 1;

    n.sheet.finalize();
}