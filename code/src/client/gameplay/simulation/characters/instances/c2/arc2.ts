import {Activation, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../data/constants";
import {NpcId}                                                                               from "../../../../data/npcIndex";
import {D1, D12, D6}                                                                         from "../../../../rolling/Dice";
import {Action}                                                                              from "../../../action/Action";
import {AttackAbstraction, BuffT1, BuffT2, BuffT3, BuffT5, BuffT6, DebuffT4}                 from "../../../action/AttackAbstraction";
import {wrapDamageType, wrapRoll}                                                            from "../../../action/Wrap";
import {CombatTreeNode}                                                                      from "../../aspects/CombatTreeNode";
import {ECombatTreeNodeType}                                                                 from "../../aspects/ECombatTreeNodeType";
import {Character}                                                                           from "../../Character";

export function setupRuzaki()
{
    // Prepare the character object.
    const c = new Character(NpcId.Ruzaki);

    c.core.name = "Ruzaki";
    c.core.imgPath = "character_tokens/C2/Arc2/Ruzaki.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("M58");
    c.card.addCardTag("Race | Human");
    c.card.addCardTag("From | Innovation / Honor (Ashyn)");
    c.card.addCardTag("HoD Genetic Engineering, RyneTech Labs");
    c.card.addCardTag("CR | 0");
    c.card.summary = () => `
    A scientist working on some revolutionary theories in an abandoned corner of
    the multiverse - namely a small bunker in the dead and burnt planet of Ashyn.
    Was once in charge of the ground level implementation of Project Diablo, a 
    revolutionary project from the plane of Innovation aimed at creating new 
    Gods for humanity, before he was fired and exiled following a certain tragedy.
    Something which may or may not be related to 
    ${Character.get(NpcId.Hina).createLink("a certain child he referred to as #41")}
    loosing her entire Lebenslust at the mere sight of him.`;

    c.card.finalize();
}

export function setupElliot()
{
    // Prepare the character object.
    const c = new Character(NpcId.Elliot);

    c.core.name = "The Sand Soldier";
    c.core.imgPath = "character_tokens/C2/Arc2/Elliot.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("M37");
    c.card.addCardTag("Race | Human &times; Air Genasi");
    c.card.addCardTag("From | Honor (Ashyn)");
    c.card.addCardTag("CR | 17");

    c.card.summary = () => `
    A mysterious criminal of unknown origins wandering in the planet of Ashyn in
    the plane of Honor. Has acquired a certain notoriety as being the prime 
    suspect for the deaths of countless mercenaries. Was involved in some covert
    dealings with ${Character.get(NpcId.Ruzaki).createLink()} when they were 
    interrupted by a group of adventurers and a shardbearer assault.
    <div class="effect_tag">Incomplete</div>`;

    c.card.finalize();
}

export function setupShuo()
{
    // Prepare the character object.
    const c = new Character(NpcId.Shuo);

    c.core.name = "Shuo";
    c.core.imgPath = "character_tokens/C2/Arc2/Shuo.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("M");
    c.card.addCardTag("From | Honor");
    c.card.addCardTag("Race | Titan <span class='verbose'>&times; Black/Gold Dragon</span>");
    c.card.addCardTag(`<span>Primordial | Outsider <span class='verbose'>(1<sup>st</sup> Fragment of Sui)</span></span>`);
    c.card.addCardTag(`The First Martial Artist`);
    c.card.addCardTag("CR | 24");
    c.card.summary = () => `
    The progenitor of martial arts and the Grandmaster and Guardian of the fortress
    of Yomen in the planet Ashyn, Shuo left his identity as the first and strongest
    fragemnt of Sui behind as soon as he possibly could. Yet, despite his attempts
    to live a normal life, he forever remained a being of the Heavens, a monstrosity
    that could never acquire friends among his mortal companions. A hermit that 
    could never be matched by any of his students. And so it was that the first 
    fragment was slaughtered, pierced by Cultivation right before it could be 
    merged back into Sui.`;

    c.card.finalize();
}

export function setupGnosis()
{
    // Prepare the character object.
    const c = new Character(NpcId.Gnosis);

    c.core.name = "Sir Gnosis Edelweiss";
    c.core.imgPath = "character_tokens/C2/Arc2/Gnosis.png";
    c.core.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("M41")
    c.card.addCardTag("Race | Human(?)");
    c.card.addCardTag("From | Devotion (Nix)");
    c.card.addCardTag("CR | 13");

    c.card.summary = () => `
    The last surviving heir to the noble family governing the town of Nix. Was
    performing some business in Terra when the town, along with his family, was
    massacred by an unknown criminal. Odium wants him dead for some reason.
    <div class="effect_tag">Incomplete</div>`;

    c.card.finalize();
}

export function setupCellinia()
{
    // Prepare the character object.
    const c = new Character(NpcId.Cellinia);

    c.core.name = "Cellinia Fiorre";
    c.core.imgPath = "character_tokens/C2/Arc2/CelBlueLarge.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(19, 30, 16, 21, 8, 14);
    c.dStats.pb = 9;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Insight, ProficiencyLevel.Expert, 5);
    c.dSkills.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("F29");
    // c.card.addCardTag("From | Devotion <span class='verbose'> / Innovation</span>");
    c.card.addCardTag("Race | Lupine Shifter <span class='verbose'> (Cyberpunk) </span>");
    // c.card.addCardTag("OS | <span class='verbose'>Militech Epogee</span> Sandevistan Mk 7");
    // c.card.addCardTag("<span class='verbose'>Project Diablo |</span> #01");
    // c.card.addCardTag("Mutagen | Greater Red");
    // c.card.addCardTag("School of the Wolf");
    // c.card.addCardTag("Class | Blood Hunter");
    // c.card.addCardTag("CR | 29");

    c.card.summary = () => `
    The last remaining survivor of a certain breed of Lycans in the city of
    Sarausa. Now a bureaucrat working in the logistics department of the State of Lateran, 
    she's responsible for ensuring express deliveries in the outer fringes of 
    the Saints' domain. Notably a risky job, since it involves regularly braving
    travels via the warped cognitive realm of the plane. As an honorary saint, 
    she's one of the few non-aasimar who're permitted to enter the capital.<br/>

    But occasionally, and oft at the behest of her teacher / adoptive father,
    #01 takes on contracts pertaining to her real guild...`;

    c.card.primaryImageTitle = "Logistics";
    c.card.addAlternateImage("???", "character_tokens/C2/Arc2/CelRedLarge.png");
    c.card.finalize();
}

export function setupMaaya()
{
    const c = new Character(NpcId.Maaya);

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

    c.dSkills.setSkillProficiency(DSkill.Athletics,   );
    c.dSkills.setSkillProficiency(DSkill.Perception, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Insight, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Performance, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Religion,    );
    c.dSkills.setSkillProficiency(DSkill.Persuasion,  );

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


export function setupDamatzi()
{
    // Prepare the character object.
    const c = new Character(NpcId.Damatzi);

    c.core.name = "Damatzi";
    c.core.imgPath = "character_tokens/C2/Arc2/Damatzi.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(24, 12, 30, 14, 18, 27);
    c.dStats.pb = 10;
    c.dStats.finalize();

    // todo, also cskills.
    c.dSkills.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("F?");
    c.card.addCardTag("From | Ruin");
    c.card.addCardTag("Race | Plasmoid");
    c.card.addCardTag("Fragment of Ubbo Sathla");
    c.card.addCardTag("CR | 20");

    c.card.summary = () => `
    To all a soft-spoken trader wandering in the town of Rocamarea from far off 
    lands who seems to be lost. No one is sure what sort of travels landed them 
    here in the first place. Seaborn keep a distance from them.

    But now you've seen under the mask. You know them to be a fragment of 
    something that should've remained deep within the Abyssal Castle, shapeless
    and protoplasmic. She claims to be in search of her 'brother'. You probably
    don't want to be nearby when they finally meet.`;

    c.card.finalize();
}


export function setupAulus()
{
    // Prepare the character object.
    const c = new Character(NpcId.Aulus);

    c.core.name = "Aulus";
    c.core.imgPath = "character_tokens/C2/Arc2/Aulus.png";
    c.core.finalize();

    // Setup D&D stats.
    c.dStats.initializeStats(10, 14, 16, 11, 20, 15);
    c.dStats.pb = 5;
    c.dStats.finalize();

    c.dSkills.finalize();

    c.opinions.isOpinionated = true;
    c.opinions.finalize();

    c.card.setCampaignArc(2, 2);
    c.card.addCardTag("Deceased");
    c.card.addCardTag("M45");
    c.card.addCardTag("From | Devotion &times; Water");
    c.card.addCardTag("Race | Half <span class='verbose'>Sea </span>Elf");
    c.card.addCardTag("CR | 14");

    c.card.summary = () => `
    Head Bishop Aulus of the Church of the Deep. Officially an Apostle reporting
    to the EndSpeaker who ensures faith is not lost in their core civilian 
    settlement. Had been stationed in the town of Rocamarea long enough to be 
    the defacto leader of the town.

    Typically a jovial person, at least on the surface, seaborn and surface 
    dwellers used to co-exist in peace under his command. Was a master of blade
    and had taught Thorns pretty much`;

    c.card.finalize();
}

export function setupC2A2()
{
    setupRuzaki();
    setupElliot();
    setupShuo();
    setupGnosis();
    setupCellinia();
    setupMaaya();
    setupAulus();
    setupDamatzi();
}
