import {Activation, CreatureSize, CRValue, DamageType, DSkill, DStat, Hidden, Prof, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                                      from "../../../../../data/npcIndex";
import {D1, D12, D6, D8}                                                                                            from "../../../../../rolling/Dice";
import {Action}                                                                                                     from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                                   from "../../../../action/Wrap";
import {Character}                                                                                                  from "../../../Character";
import {CharacterVariant}                                                                                           from "../../../CharacterVariant";

export function setupShriekers()
{
    const shrieker = new Character(NpcID.Shrieker);

    shrieker.core.name = "Shrieker";
    shrieker.core.imgPath = "mob_tokens/seaborn/Shrieker.png";

    shrieker.dStats.initializeStats(14, 14, 18, 7, 11, 15);
    shrieker.dStats.pb = Prof.get(3);

    shrieker.dSKills.setSkillProficiency(DSkill.Athletics, Hidden, ProficiencyLevel.Expert);
    shrieker.dSKills.setSkillProficiency(DSkill.Performance, Hidden, ProficiencyLevel.Expert);
    shrieker.dSKills.finalizeSkills();

    shrieker.opinions.isOpinionated = false;

    shrieker.combat.addBioHpDice(D6.countHavingE(120, shrieker.CON), D6);
    shrieker.combat.computeHP();

    shrieker.combat.setSave(DStat.Wis);
    shrieker.combat.setSave(DStat.Cha);

    shrieker.combat.setSpeed(Speed.Walking,  30);
    shrieker.combat.setSpeed(Speed.Swimming, 40);

    shrieker.combat.setRes(DamageType.Hellfire,    -100);
    shrieker.combat.setRes(DamageType.Psychic,      50);
    shrieker.combat.setRes(DamageType.Cold,         50);
    shrieker.combat.setRes(DamageType.Lightning,    50);
    shrieker.combat.setRes(DamageType.Physical,     50);
    shrieker.combat.setRes(DamageType.Thunder,      50);
    shrieker.combat.setRes(DamageType.Acid,         100);
    shrieker.combat.setRes(DamageType.Poison,       100);

    shrieker.combat.setSense(Sense.TrueSight, 300);

    shrieker.combat.addAction(new Action(
        Activation.Special,
        (c) => `<p><em><strong>Sated Humming.</strong></em> The shrieker roams around, 
        apparently aimless (but with a tendency to move towards other seaborn), 
        at half speed, until it takes damage...<br/>
        While in this state, it restores ${wrapRoll([c.CON, D12])} HP per 
        round to all seaborn that get within 20 ft of it at any point of time.</p>`
    ));

    shrieker.combat.addAction(new Action(
        Activation.Special,
        (c) => `<p><em><strong>Frenzied Shrieking.</strong></em> The shrieker dashes 
        (apparantly) randomly (but with a tendancy to move towards the highest 
        concentration of non-seaborn it can detect). While in 
        this state it deals ${wrapRoll([[2 * c.CON, D12], [c.CON, D1]])} 
        ${wrapDamageType(DamageType.Neural)} damage per round (halved on a DC 
        ${c.dc(DStat.Cha) + c.Prof} WIS save) to all non-seaborn that get within
        60 ft of it at any point of time. At the end of each of 
        its turns it takes 50 true damage.</p>`
    ));

    shrieker.sheet.cr = new CRValue(8);

    shrieker.sheet.size = CreatureSize.Medium;

    shrieker.sheet.subtitle = " Seaborn, Chaotic Evil";
    shrieker.sheet.acDesc = " (Natural Armor)";
    shrieker.sheet.category = "seaborn";

    shrieker.finalize();

    const shriekerN = new CharacterVariant(NpcID.ShriekerN, NpcID.Shrieker);

    shriekerN.core.name = "Nourished Shrieker";
    shriekerN.core.imgPath = "mob_tokens/seaborn/ShriekerN.png";

    shriekerN.dStats.initializeStats(23, 16, 24, 11, 17, 21);
    shriekerN.dStats.pb = Prof.get(5);

    shriekerN.combat.addBioHpDice(D8.countHavingE(300, shriekerN.CON), D8);
    shriekerN.combat.computeHP();

    shriekerN.combat.setSpeed(Speed.Walking, 40);
    shriekerN.combat.setSpeed(Speed.Swimming, 60);

    shriekerN.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p>The nourished shrieker has 1 legendary action and can use it to dash.</p>`
    ));

    shriekerN.sheet.cr = new CRValue(13);
    shriekerN.sheet.size = CreatureSize.Large;
    shriekerN.sheet.theme = "danger_1";

    shriekerN.finalize();
}