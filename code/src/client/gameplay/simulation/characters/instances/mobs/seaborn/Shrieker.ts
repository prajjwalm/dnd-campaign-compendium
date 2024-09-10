import {Activation, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                               from "../../../../../data/npcIndex";
import {D1, D12, D6, D8}                                                                     from "../../../../../rolling/Dice";
import {Action}                                                                                      from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                    from "../../../../action/Wrap";
import {Character}                                                                                   from "../../../Character";
import {CharacterVariant}                                                                            from "../../../CharacterVariant";

export function setupShriekers()
{
    const c = new Character(NpcId.Shrieker);

    c.core.name = "Shrieker";
    c.core.imgPath = "mob_tokens/seaborn/Shrieker.png";
    c.core.finalize();

    c.dStats.initializeStats(14, 14, 18, 7, 11, 15);
    c.dStats.pb = 3;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Athletics, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Performance, ProficiencyLevel.Expert);
    c.dSkills.finalize();

    c.combat.addBioHpDice(D6.countHavingE(120, c.CON), D6);
    c.combat.computeHP();

    c.combat.setSave(DStat.Wis);
    c.combat.setSave(DStat.Cha);

    c.combat.setSpeed(Speed.Walking,  30);
    c.combat.setSpeed(Speed.Swimming, 40);

    c.combat.setRes(DamageType.Hellfire,    -100);
    c.combat.setRes(DamageType.Psychic,      50);
    c.combat.setRes(DamageType.Cold,         50);
    c.combat.setRes(DamageType.Lightning,    50);
    c.combat.setRes(DamageType.Physical,     50);
    c.combat.setRes(DamageType.Thunder,      50);
    c.combat.setRes(DamageType.Acid,         100);
    c.combat.setRes(DamageType.Poison,       100);

    c.combat.setSense(Sense.TrueSight, 300);

    c.combat.addAction(new Action(
        Activation.Special,
        (c) => `<p><em><strong>Frenzied Shrieking.</strong></em> The shrieker dashes 
        (apparantly) randomly (but with a tendancy to move towards the highest 
        concentration of non-seaborn it can detect). While in 
        this state it deals ${wrapRoll([[c.CON, D12], [c.CON, D1]])} 
        ${wrapDamageType(DamageType.Neural)} damage per round (halved on a DC 
        ${c.dc(DStat.Cha) + c.Prof} WIS save) to all non-seaborn that get within
        30 ft of it at any point of time. At the end of each of 
        its turns it takes 50 true damage.</p>`
    ), "shriek");

    c.combat.cr = 8;
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;

    c.sheet.subtitle = " Seaborn, Chaotic Evil";
    c.sheet.acDesc = " (Natural Armor)";
    c.sheet.category = "seaborn";

    c.sheet.finalize();

    const n = new CharacterVariant(NpcId.ShriekerN, NpcId.Shrieker);

    n.core.name = "Nourished Shrieker";
    n.core.imgPath = "mob_tokens/seaborn/ShriekerN.png";
    n.core.finalize();

    n.dStats.initializeStats(23, 16, 24, 11, 17, 21);
    n.dStats.pb = 5;
    n.dStats.finalize();

    n.combat.addBioHpDice(D8.countHavingE(300, n.CON), D8);
    n.combat.computeHP();

    n.combat.setSpeed(Speed.Walking, 40);
    n.combat.setSpeed(Speed.Swimming, 60);

    n.combat.addAction(new Action(
        Activation.Special,
        (c) => `<p><em><strong>Sated Humming.</strong></em> The shrieker roams around, 
        apparently aimless (but with a tendency to move towards other seaborn), 
        at half speed, until it takes damage...<br/>
        While in this state, it restores ${wrapRoll([c.CON, D12])} HP per 
        round to all seaborn that get within 20 ft of it at any point of time.</p>`
    ));

    n.combat.addAction(new Action(
        Activation.Special,
        (c) => `<p><em><strong>Frenzied Shrieking.</strong></em> The shrieker dashes 
        (apparantly) randomly (but with a tendancy to move towards the highest 
        concentration of non-seaborn it can detect). While in 
        this state it deals ${wrapRoll([[2 * c.CON, D12], [c.CON, D1]])} 
        ${wrapDamageType(DamageType.Neural)} damage per round (halved on a DC 
        ${c.dc(DStat.Cha) + c.Prof} WIS save) to all non-seaborn that get within
        60 ft of it at any point of time. At the end of each of 
        its turns it takes 50 true damage.</p>`
    ), "shriek");

    n.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p>The nourished shrieker has 1 legendary action and can use it to dash.</p>`
    ));

    n.combat.cr = 13;
    n.combat.finalize();

    n.sheet.size = CreatureSize.Large;
    n.sheet.danger = 1;
    n.sheet.finalize();
}