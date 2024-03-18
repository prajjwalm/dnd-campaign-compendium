import {Activation, CreatureSize, DamageType, DSkill, DStat, Hidden, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                       from "../../../../../data/npcIndex";
import {D10, D8}                                                                                     from "../../../../../rolling/Dice";
import {Action}                                                                                      from "../../../../action/Action";
import {wrapRoll}                                                                                    from "../../../../action/Wrap";
import {Character}                                                                                   from "../../../Character";
import {CharacterVariant}                                                                            from "../../../CharacterVariant";


export function setupBrandGuiders()
{
    const c = new Character(NpcID.BrandGuider);

    c.core.name = "BrandGuider";
    c.core.imgPath = "mob_tokens/seaborn/BrandGuider.png";
    c.core.finalize();

    c.dStats.initializeStats(21, 12, 14, 19, 18, 16);
    c.dStats.pb = 4;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Athletics, Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Religion, Hidden);
    c.dSkills.setSkillProficiency(DSkill.Arcana, Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Expert);
    c.dSkills.finalize();

    const hpDice = D8.countHavingE(190, c.CON);
    c.combat.addBioHpDice(hpDice, D8);
    c.combat.computeHP();

    c.combat.setMediumArmor(15);

    c.combat.setSave(DStat.Int, ProficiencyLevel.Prof);
    c.combat.setSave(DStat.Wis, ProficiencyLevel.Prof);
    c.combat.setSave(DStat.Cha, ProficiencyLevel.Prof);

    c.combat.setSpeed(Speed.Walking, 30);
    c.combat.setSpeed(Speed.Swimming, 30);

    c.combat.setRes(DamageType.Poison,         50);
    c.combat.setRes(DamageType.Acid,          100);
    c.combat.setRes(DamageType.Cold,          100);
    c.combat.setRes(DamageType.Psychic,      -100);
    c.combat.setRes(DamageType.Fire,         -100);
    c.combat.setRes(DamageType.Lightning,    -100);

    c.combat.setSense(Sense.Darkvision, 120);

    c.combat.addAction(new Action(
        Activation.Special,
        c => `<p><strong><em>Beacon.</em></strong> 
        Upon falling below ${Math.floor(c.hp * 0.5)} HP, BrandGuiders gain +20ft
        movement speed and generate the nethersea brand at each tile they pass.
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        c => `<p><strong><em>Nethersea Armor.</em></strong> BrandGuiders gain a 
        +${(c.ac - 10)*2} bonus to AC when standing on the NetherseaBrand.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        c => `<p><strong><em>Spellcasting.</em></strong> While standing on the 
        Nethersea brand, brandguiders can cast the following spells as much as 
        they want, each spell is cast as if on 4th level (${wrapRoll(c.mod(DStat.Int))} 
        to hit, Save DC ${c.dc(DStat.Int)})-<br/>
        <em>Ice Knife</em>, <em>Sleet Storm</em>, <em>Control Water</em>, <em>Wall of water</em>, <em>Ice Storm</em>, <em>Counterspell</em>.</p> 
        `
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        c => `<p><strong><em>Hunger of We Many.</em></strong> The BrandGuider 
        chooses ${c.Prof} spots within 150 ft of itself. At each of those, ${10 * c.SemiProf}ft 
        radius spheres with effects similar to those created by the spell 
        Hunger of Hadar appear.</p>`
    ));


    c.combat.cr = 7
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Seaborn, Lawful Neutral";
    c.sheet.acDesc   = " (Chitin)";
    c.sheet.category = "seaborn";
    c.sheet.finalize();



    const c2 = new CharacterVariant(NpcID.BrandGuiderN, NpcID.BrandGuider);

    c2.core.name = "Nourished BrandGuider";
    c2.core.imgPath = "mob_tokens/seaborn/BrandGuiderN.png";
    c2.core.finalize();

    c2.dStats.initializeStats(24, 12, 21, 24, 20, 19);
    c2.dStats.pb = 6;
    c2.dStats.finalize();

    c2.combat.addBioHpDice(hpDice, D10);
    c2.combat.computeHP();

    c2.combat.setHeavyArmor(22);

    c2.combat.cr = 15
    c2.combat.finalize();

    c2.sheet.size  = CreatureSize.Large;
    c2.sheet.theme = "danger_1";

    c2.sheet.finalize();
}