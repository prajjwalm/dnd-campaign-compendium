import {Activation, CreatureSize, CRValue, DamageType, DSkill, DStat, Hidden, Prof, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                                      from "../../../../../data/npcIndex";
import {D10, D8}                                                                                                    from "../../../../../rolling/Dice";
import {Action}                                                                                                     from "../../../../action/Action";
import {wrapRoll}                                                                                                   from "../../../../action/Wrap";
import {Character}                                                                                                  from "../../../Character";
import {CharacterVariant}                                                                                           from "../../../CharacterVariant";


export function setupBrandGuiders()
{
    const bg = new Character(NpcID.BrandGuider);

    bg.core.name = "BrandGuider";
    bg.core.imgPath = "mob_tokens/seaborn/BrandGuider.png";

    bg.dStats.initializeStats(21, 12, 14, 19, 18, 16);
    bg.dStats.pb = Prof.get(4);

    bg.dSKills.setSkillProficiency(DSkill.Athletics, Hidden, ProficiencyLevel.Expert);
    bg.dSKills.setSkillProficiency(DSkill.Religion, Hidden);
    bg.dSKills.setSkillProficiency(DSkill.Arcana, Hidden, ProficiencyLevel.Expert);
    bg.dSKills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Expert);
    bg.dSKills.finalizeSkills();

    bg.opinions.isOpinionated = false;

    const hpDice = D8.countHavingE(190, bg.CON);
    bg.combat.addBioHpDice(hpDice, D8);
    bg.combat.computeHP();

    bg.combat.setMediumArmor(15);

    bg.combat.setSave(DStat.Int, ProficiencyLevel.Prof);
    bg.combat.setSave(DStat.Wis, ProficiencyLevel.Prof);
    bg.combat.setSave(DStat.Cha, ProficiencyLevel.Prof);

    bg.combat.setSpeed(Speed.Walking, 30);
    bg.combat.setSpeed(Speed.Swimming, 30);

    bg.combat.setRes(DamageType.Poison,         50);
    bg.combat.setRes(DamageType.Acid,          100);
    bg.combat.setRes(DamageType.Cold,          100);
    bg.combat.setRes(DamageType.Psychic,      -100);
    bg.combat.setRes(DamageType.Fire,         -100);
    bg.combat.setRes(DamageType.Lightning,    -100);

    bg.combat.setSense(Sense.Darkvision, 120);

    bg.combat.addAction(new Action(
        Activation.Special,
        c => `<p><strong><em>Beacon.</em></strong> 
        Upon falling below ${Math.floor(c.hp * 0.5)} HP, BrandGuiders gain +20ft
        movement speed and generate the nethersea brand at each tile they pass.
        </p>`
    ));

    bg.combat.addAction(new Action(
        Activation.Special,
        c => `<p><strong><em>Nethersea Armor.</em></strong> BrandGuiders gain a 
        +${(c.ac - 10)*2} bonus to AC when standing on the NetherseaBrand.</p>`
    ));

    bg.combat.addAction(new Action(
        Activation.Special,
        c => `<p><strong><em>Spellcasting.</em></strong> While standing on the 
        Nethersea brand, brandguiders can cast the following spells as much as 
        they want, each spell is cast as if on 4th level (${wrapRoll(c.mod(DStat.Int))} 
        to hit, Save DC ${c.dc(DStat.Int)})-<br/>
        <em>Ice Knife</em>, <em>Sleet Storm</em>, <em>Control Water</em>, <em>Wall of water</em>, <em>Ice Storm</em>, <em>Counterspell</em>.</p> 
        `
    ));

    bg.combat.addAction(new Action(
        Activation.BonusAction,
        c => `<p><strong><em>Hunger of We Many.</em></strong> The BrandGuider 
        chooses ${c.Prof} spots within 150 ft of itself. At each of those, ${10 * c.SemiProf}ft 
        radius spheres with effects similar to those created by the spell 
        Hunger of Hadar appear.</p>`
    ));


    bg.sheet.cr = new CRValue(7);
    bg.sheet.size = CreatureSize.Medium;
    bg.sheet.subtitle = " Seaborn, Lawful Neutral";
    bg.sheet.acDesc   = " (Chitin)";
    bg.sheet.category = "seaborn";

    bg.finalize();



    const bgN = new CharacterVariant(NpcID.BrandGuiderN, NpcID.BrandGuider);

    bgN.core.name = "Nourished BrandGuider";
    bgN.core.imgPath = "mob_tokens/seaborn/BrandGuiderN.png";

    bgN.dStats.initializeStats(24, 12, 21, 24, 20, 19);
    bgN.dStats.pb = Prof.get(6);

    bgN.combat.addBioHpDice(hpDice, D10);
    bgN.combat.computeHP();

    bgN.combat.setHeavyArmor(22);

    bgN.sheet.cr    = new CRValue(15);
    bgN.sheet.size  = CreatureSize.Large;
    bgN.sheet.theme = "danger_1";

    bgN.finalize();
}