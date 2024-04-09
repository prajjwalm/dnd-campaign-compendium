import {Activation, CreatureSize, DamageType, DSkill, DStat, Hidden, ProficiencyLevel, Sense, Speed,} from "../../../../../data/constants";
import {NpcID}                                                                                        from "../../../../../data/npcIndex";
import {D1, D12, D6}                                                                                  from "../../../../../rolling/Dice";
import {Action}                                                                                          from "../../../../action/Action";
import {AttackAbstraction, BuffT1, BuffT2, BuffT3, BuffT4, BuffT5, BuffT6, DebuffT2, DebuffT3, DebuffT4} from "../../../../action/AttackAbstraction";
import {wrapDamageType, wrapRoll}                                                                        from "../../../../action/Wrap";
import {CombatTreeNode}                                                                               from "../../../aspects/CombatTreeNode";
import {ECombatTreeNodeType}                                                                          from "../../../aspects/ECombatTreeNodeType";
import {Character}                                                                                    from "../../../Character";

export function setupMaaya()
{
    const c = new Character(NpcID.Maaya);

    c.core.name = "Maaya";
    c.core.imgPath = "character_tokens/C2/Arc2/Maaya.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(18, 14, 24, 13, 19, 24);
    c.dStats.pb = 7;
    c.dStats.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("F21");
    c.card.addCardTag("CR 21");
    c.card.addCardTag("Race | Ocean Elf &times; Seaborn");
    c.card.addCardTag("From | Water &times; Devotion");
    c.card.addCardTag("Daughter of the sea");
    c.card.summary = () => `
    An elf of submarine origins, she was found by a group of adventurers sitting
    in the corner of a profane tomb that had been desecrated several times over
    and abandoned in the long past. She would talk telepathically only, while
    humming to herself a strange rhythm which seemed to nullify the investiture
    in the region. Several parts of her body had been morphed into a seaborn 
    nature.
    <div class="effect_tag">Incomplete</div>
    `;
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

    c.combat.addBioHpDice(D12.countHavingE(350, c.CON), D12);
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
        `<p><strong><em>Cursed Encore.</em> (B5)</strong> The first time she touches 0 HP, 
        she instantly regains all her HP and becomes invulnerable to all damage 
        and immune to all effects until the start of her next-to-next turn. If she
        was in her human form prior to this, she now turns seaborn. If revify is
        cast on her cocooned self, she instead is obliterated instantly.</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, BuffT5
        ))
    );

    // language=HTML
    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Silence of the Siren.</em> (B6)</strong> Maaya continues to 
         hum a silent song which causes disruptive interference with investiture.
         Any creature within 60 / 90 ft of her has their max HP reduced 
         by 60 / 180. Any HP exceeding the current max HP is lost. This 
         reduction cannot take them below their uninvested HP. Upon leaving that
         range, their max HP restores, but not their HP. Furthermore, creatures
         in the range of her song are inflicted with Slow and need to consume at
         least twice as many spell slots than usual to cast spells. This ability
         doesn't function if she is stunned.</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, BuffT6
        ))
    );

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>A voice drowning deep in the sea.</em> (D4)</strong> If 
         anyone attempts to heal Maaya, she instead suffers from 
         ${wrapRoll([[6, D6], [6, D1]])} ${wrapDamageType(DamageType.Void)} 
         damage. An attempt to cast revify on her when she is down instantly 
         obliterates her soul.</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, DebuffT4
        ))
    );

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Tidal Sunderrance (Humanoid).</em> (B1)</strong> Maaya 
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
    c.combat.root.n(Activation.Action).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [
                [2, D6, DamageType.Cold],
                [2, D6, DamageType.Necrotic],
                [2, D6, DamageType.Piercing],
                [c.CHA, D1, DamageType.Cold],
                [c.CHA, D1, DamageType.Necrotic],
                [c.STR, D1, DamageType.Piercing],
            ],
            c.STR + c.CHA + c.Prof,
            null,
            BuffT1
        ), 5)
    );

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
    c.combat.root.n(Activation.Action).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [
                [6, D6, DamageType.Corrosion],
            ],
            c.STR + c.CHA + c.Prof,
            null
        ), 5)
    );

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Sustenance from the reaper.</em> (B2)</strong> 
         Every time Maaya deals damage, she regains 3/6% of her HP. 
         (${Math.floor(c.hp * 0.03)} / ${Math.floor(c.hp * 0.06)}). 
         Furthermore, she regains 18 / 36% (${Math.floor(c.hp * 0.18)} / ${Math.floor(c.hp * 0.36)})
         of her HP whenever a foe dies in the range of her silent song. The soul
         of such a foe is lost forever.</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, BuffT2
        ))
    );

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Illusions and Paranoia.</em> (B3)</strong> 
         Maaya casts Mirror image on self. An AoE attack dispels the illusions.
         They also disappear if she is stunned or healed.</p>`
    ));
    c.combat.root.n(Activation.BonusAction).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, BuffT3
        ))
    );

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Incessant flow.</em> (B2)</strong> 
         If Maaya were to be inflicted with a status effect, other than wither, 
         she can choose to re-direct it to any other creature in the range of 
         her silence, but only if the said creature hasn't healed her in since 
         the end of her last turn. If this came alongside any damage taken, the 
         new target takes the damage too.</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, BuffT2
        ))
    );

    c.combat.setLightArmor(14);
    c.combat.cr = 21;
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Seaborn (Sea Elf), Chaotic Evil";
    c.sheet.acDesc = "(Jelly-Membrane)";
    c.sheet.category = "seaborn";
    // c.sheet.finalize();
}
