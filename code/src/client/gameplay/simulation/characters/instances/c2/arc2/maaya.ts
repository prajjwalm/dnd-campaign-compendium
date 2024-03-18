import {Activation, CreatureSize, DamageType, DSkill, DStat, Hidden, ProficiencyLevel, Sense, Speed,} from "../../../../../data/constants";
import {NpcID}                                                                                        from "../../../../../data/npcIndex";
import {D1, D12, D6}                                                                                  from "../../../../../rolling/Dice";
import {Action}                                                                                       from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                     from "../../../../action/Wrap";
import {Character}                                                                                    from "../../../Character";

export function setupMaaya()
{
    const c = new Character(NpcID.Maaya);

    c.core.name = "Maaya";
    c.core.imgPath = "character_tokens/C2/Arc2/Maaya.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(18, 14, 24, 13, 19, 24);
    c.dStats.pb = 6;
    c.dStats.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("F21");
    c.card.addCardTag("CR 21");
    c.card.addCardTag("From | Terra (Atlava)");
    c.card.addCardTag("Race | Ocean Elf");
    c.card.finalize();

    c.dSkills.setSkillProficiency(DSkill.Athletics,   Hidden);
    c.dSkills.setSkillProficiency(DSkill.Perception,  Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Insight,     Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Performance, Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Religion,    Hidden);
    c.dSkills.setSkillProficiency(DSkill.Persuasion,  Hidden);

    c.dSkills.finalize();

    c.combat.setSpeed(Speed.Walking,  30);
    c.combat.setSpeed(Speed.Flying,   20);
    c.combat.setSpeed(Speed.Swimming, 55);

    c.combat.setSave(DStat.Str);
    c.combat.setSave(DStat.Wis);
    c.combat.setSave(DStat.Cha);

    c.combat.addBioHpDice(D12.countHavingE(450, c.CON), D12);
    c.combat.computeHP();

    c.combat.setSense(Sense.BlindSight, 300);

    c.combat.setRes(DamageType.Hellfire,  -100);
    c.combat.setRes(DamageType.Thunder,   -100);
    c.combat.setRes(DamageType.Force,       50);
    c.combat.setRes(DamageType.Physical,    50);
    c.combat.setRes(DamageType.Fire,        50);
    c.combat.setRes(DamageType.Radiant,     50);
    c.combat.setRes(DamageType.Necrotic,    50);
    c.combat.setRes(DamageType.Lightning,  100);
    c.combat.setRes(DamageType.Acid,       100);
    c.combat.setRes(DamageType.Cold,       100);
    c.combat.setRes(DamageType.Poison,     100);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Child of the Deep Oceans.</em></strong> Having descended
        from a race of elves inhabiting the depths of the oceans in the plane of
        water, Maaya can breathe underwater. Moreover, she will never take
        damage due to water pressure and while underwater she is immune to
        exhaustion and has a much faster movement speed.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Silence of the Siren.</em></strong> Maaya continues to 
         hum a silent song which causes disruptive interference with investiture.
         Any creature within 60 / 90 ft of her has their max HP reduced 
         by 60 / 180. Any HP exceeding the current max HP is lost. This 
         reduction cannot take them below their uninvested HP. Upon leaving that
         range, their max HP restores, but not their HP. Furthermore, creatures
         in the range of her song are inflicted with Slow and need to consume at
         least twice as many spell slots than usual to cast spells. This ability
         doesn't function if she is stunned.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>A voice drowning deep in the sea.</em></strong> If 
         anyone attempts to heal Maaya, she instead suffers from 
         ${wrapRoll([[6, D6], [6, D1]])} ${wrapDamageType(DamageType.Void)} 
         damage. An attempt to cast revify on her when she is down instantly 
         obliterates her soul.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Tidal Sunderrance (Humanoid).</em></strong> Maaya 
         charges her scythe with the Hadean waters of the Nethersea and 
         makes 3 / 5 wave-like attacks which travel in a line upto a distance 
         equal to her silent song's range. 
         To hit. 
         ${wrapRoll(c.STR + c.CHA + c.Prof)}, targets hit take 
         ${wrapRoll([[2, D6], [c.CHA, D1]])} ${wrapDamageType(DamageType.Cold)} damage,
         ${wrapRoll([[2, D6], [c.CHA, D1]])} ${wrapDamageType(DamageType.Necrotic)} damage and
         ${wrapRoll([[2, D6], [c.STR, D1]])} ${wrapDamageType(DamageType.Slashing)} damage.
         (Each attack uses the same to hit roll and deals the same amount of damage.)</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Tidal Evanescence (Seaborn).</em></strong> The illusion 
         fills vacuoles with concentrated acid and makes 3 / 5 ranged attacks to
         targets within her silent song's range.
         To hit.
         ${wrapRoll(c.CON + c.CHA + c.Prof)}, targets hit take 
         ${wrapRoll([[6, D6], [c.CHA + c.CON, D1]])} ${wrapDamageType(DamageType.Corrosion)} damage.
         </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Sustenance from the reaper.</em></strong> 
         Every time Maaya deals damage, she regains 3/6% of her HP. 
         (${Math.floor(c.hp * 0.03)} / ${Math.floor(c.hp * 0.06)}). 
         Furthermore, she regains 18 / 36% (${Math.floor(c.hp * 0.18)} / ${Math.floor(c.hp * 0.36)})
         of her HP whenever a foe dies in the range of her silent song. The soul
         of such a foe is lost forever.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Illusions and Paranoia.</em></strong> 
         If Maaya were to be inflicted with a status effect, other than wither, 
         she can choose to re-direct it to any other creature in the range of 
         her silence, but only if the said creature hasn't healed her in since 
         the end of her last turn. If this came alongside any damage taken, the 
         new target takes the damage too.</p>`
    ));

    c.combat.setMediumArmor(17);
    c.combat.cr = 21;
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Seaborn (Sea Elf), Chaotic Evil";
    c.sheet.acDesc = "(Carapace)";
    c.sheet.category = "seaborn";
    c.sheet.finalize();
}
