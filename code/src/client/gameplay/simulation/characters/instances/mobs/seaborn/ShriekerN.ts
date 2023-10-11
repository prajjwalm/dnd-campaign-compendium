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
import {NpcID}                    from "../../../../../data/npcIndex";
import {D1, D12, D8}              from "../../../../../rolling/Dice";
import {Action}                   from "../../../../action/Action";
import {wrapDamageType, wrapRoll} from "../../../../action/Wrap";
import {Character}                from "../../../Character";

export function setupShriekerN()
{
    const shriekerN = new Character(NpcID.ShriekerN);

    shriekerN.core.name = "Nourished Shrieker";
    shriekerN.core.imgPath = "mob_tokens/seaborn/ShriekerN.png";

    shriekerN.dStats.initializeStats(23, 16, 24, 11, 17, 21);
    shriekerN.dStats.pb = Prof.get(5);

    shriekerN.dSKills.setSkillProficiency(DSkill.Athletics, Hidden, ProficiencyLevel.Expert);
    shriekerN.dSKills.setSkillProficiency(DSkill.Performance, Hidden, ProficiencyLevel.Expert);
    shriekerN.dSKills.finalizeSkills();

    shriekerN.opinions.isOpinionated = false;

    shriekerN.combat.addBioHpDice(D8.countHavingE(250, shriekerN.CON), D8);
    shriekerN.combat.computeHP();

    shriekerN.combat.setSave(DStat.Wis);
    shriekerN.combat.setSave(DStat.Cha);

    shriekerN.combat.setSpeed(Speed.Walking, 40);
    shriekerN.combat.setSpeed(Speed.Swimming, 60);

    shriekerN.combat.setRes(DamageType.Hellfire,    -100);
    shriekerN.combat.setRes(DamageType.Lightning,   -100);
    shriekerN.combat.setRes(DamageType.Psychic,      50);
    shriekerN.combat.setRes(DamageType.Cold,         50);
    shriekerN.combat.setRes(DamageType.Physical,     50);
    shriekerN.combat.setRes(DamageType.Acid,         100);
    shriekerN.combat.setRes(DamageType.Poison,       100);

    shriekerN.combat.setSense(Sense.BlindSight, 300);

    shriekerN.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Sated Humming.</strong></em> The shrieker roams around, 
        apparently aimless (but with a tendency to move towards other seaborn), at a 
        walking/swimming speed of 20 ft, until it takes damage...<br/>
        While in this state, it restores ${wrapRoll([shriekerN.CON, D12])} HP per 
        round to all seaborn that get within 20 ft of it at any point of time.</p>`
    ));

    shriekerN.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Frenzied Shrieking.</strong></em> The shrieker dashes 
        (apparantly) randomly (but with a tendancy to move towards the highest 
        concentration of non-seaborn it can detect). While in 
        this state it deals ${wrapRoll([[2 * shriekerN.CON, D12], [shriekerN.CON, D1]])} 
        ${wrapDamageType(DamageType.Neural)} damage per round (halved on a DC 
        ${shriekerN.dc(DStat.Cha) + shriekerN.Prof} WIS save) to all non-seaborn
        that get within 60 ft of it at any point of time. At the end of each of 
        its turns it takes 50 true damage.</p>`
    ));

    shriekerN.sheet.cr = new CRValue(13);

    shriekerN.sheet.size = CreatureSize.Medium;

    shriekerN.sheet.subtitle = " Seaborn, Chaotic Evil";
    shriekerN.sheet.acDesc = " (Natural Armor)";
    shriekerN.sheet.category = "seaborn";

    shriekerN.finalize();
}