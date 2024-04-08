import {Activation, AdventurerClass, Condition, CreatureSize, DamageType, DSkill, DStat, Hidden, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                                                   from "../../../../../data/npcIndex";
import {D1, D10, D100, D12}                                                                                                      from "../../../../../rolling/Dice";
import {Action}                                                                                                                  from "../../../../action/Action";
import {wrapCondition, wrapDamageType, wrapRoll}                                                                                 from "../../../../action/Wrap";
import {Character}                                                                                                               from "../../../Character";

export function setupCluster()
{
    const c = new Character(NpcID.Cluster);

    const name = "Ubbo Sathla";

    c.core.name = name;
    c.core.imgPath = "mob_tokens/fiends/SathlaGlutton.png";
    c.core.finalize();

    c.dStats.initializeStats(27, 9, 30, 30, 9, 27);
    c.dStats.pb = 8;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Arcana,     Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Deception,  Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.History,    Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Nature,     Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Perception, Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Religion,   Hidden, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Stealth,    Hidden, ProficiencyLevel.Expert);
    c.dSkills.finalize();

    c.combat.addBioHpDice(D12.countHavingE(988, c.CON), D12);
    c.combat.addClassLevels(AdventurerClass.Barbarian, 1);
    c.combat.computeHP();

    c.combat.setSave(DStat.Int);
    c.combat.setSave(DStat.Con);
    c.combat.setSave(DStat.Cha);

    c.combat.setSpeed(Speed.Walking, 30);
    c.combat.setSpeed(Speed.Swimming, 30);

    c.combat.setRes(DamageType.Cold,         -100);
    c.combat.setRes(DamageType.Hellfire,     -100);
    c.combat.setRes(DamageType.Psychic,      -100);
    c.combat.setRes(DamageType.Fire,         50);
    c.combat.setRes(DamageType.Necrotic,     50);
    c.combat.setRes(DamageType.Force,        50);
    c.combat.setRes(DamageType.Physical,     100);
    c.combat.setRes(DamageType.Thunder,      100);
    c.combat.setRes(DamageType.Acid,         100);
    c.combat.setRes(DamageType.Poison,       100);

    c.combat.addConditionImmunity(Condition.Blinded);
    c.combat.addConditionImmunity(Condition.Charmed);
    c.combat.addConditionImmunity(Condition.Frightened);
    c.combat.addConditionImmunity(Condition.Deafened);
    c.combat.addConditionImmunity(Condition.Exhaustion);
    c.combat.addConditionImmunity(Condition.Paralyzed);
    c.combat.addConditionImmunity(Condition.Petrified);
    c.combat.addConditionImmunity(Condition.Poisoned);
    c.combat.addConditionImmunity(Condition.Prone);
    c.combat.addConditionImmunity(Condition.Stunned);
    c.combat.addConditionImmunity(Condition.Unconscious);

    c.combat.setSense(Sense.Darkvision, 150);

    c.combat.addAction(new Action(
        Activation.Special,
        c=>`<p><strong><em>Forgetting the mask.</em></strong> ${name} dons and 
        maintains a humanoid mask at all times to allow lesser creatures to 
        comprehend them. In the heat of combat, there is a 25% chance, at the 
        start of their turn, that they may 'forget' to maintain it until their
        next turn, allowing any creature who looks at it to gaze into unhinged,
        unknowable and utterly alien intelligence. Should this happen, any 
        creature who can see it or its pseudopod takes ${wrapRoll([[1, D100], [c.INT, D1]])}
        ${wrapDamageType(DamageType.Psychic)} damage (calculated seperately for
        each creature) as they struggle to keep their sanity. The chance 
        increases to 100% should they have taken more than 100 damage since the
        start of their last turn.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        c=>`<p><strong><em>Glimpsing the Shoggoth.</em></strong> When ${name} 
        drops to zero HP they begin to devolve into an eldritch abomination resembling an
        ever-growing protoplasmic mass with a myraid unformed eyes. In this form, 
        they have +50% HP and their volume expands on each direction by 30ft 
        every round for one day, swallowing anything that they come into contact
        with. Swallowed creatures take ${wrapRoll([[24, D12], [c.CON, D1]])} 
        ${wrapDamageType(DamageType.Corrosion)} (halved on a DC ${c.dc(DStat.Con) + c.Prof} CON save) 
        damage each round and must make a DC ${c.dc(DStat.Str) + c.Prof} STR save
        or be pulled 30 ft towards its core.<br/>
        After one day ${name} is reborn as their usual self, forgetting 
        everything that occured after they devolved.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        c=>`<p><strong><em>Abyssal Isomorphism.</em> (1 / LR)</strong> ${name} 
        splits into ${c.Prof} bodies, forming each at any point within 120ft of 
        itself. Each body assumes the guise of a person/creature its prey may or
        may not know. Regardless of its appearance, each of the bodies has the 
        stat-block of an Elder Oblex, with one major exception regarding their 
        HP.<br/>
        All but two bodies of these are dummies, they all have the Fragile 
        condition and at the start of their turn they ressurrect if they had 
        been destroyed. The other two are real but share ${name}'s HP - 
        damaging any one of them would reduce the total HP of the demon lord. 
        All damage taken by those two is reduced by 5 &times; the number of 
        dummies alive.<br/>
        Once split, ${name} can choose to coalesce back the bodies into their 
        own by using an action from any of the oblexes.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        c=>`<p><strong><em>Character Theft.</em> (${c.Prof} / SR) </strong> ${name} dives into the 
        mind of upto ${c.INT} creatures whose presence it is aware of within 300 ft of it 
        or in its layer. It looks into their memories as in the detect thoughts 
        spell. A surface level probe is enough to impersonate the victim and a 
        deep probe, if successful, is enough to impersonate anyone they know to
        a reasonable degree (enough to fool the victim).<br/>
        In case of a deep probe, ${name} can choose to be subtle or vicious. In 
        either case the victim must make a DC ${c.dc(DStat.Int)} WIS save. Upon 
        failure, in the former case they don't know their mind was probed into 
        while in the latter they take ${wrapRoll([8, D10])} ${wrapDamageType(DamageType.Psychic)} damage
        and suffer the memory-drain attack/save reduction of an Elder Oblex.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        c=>`<p><strong><em>Multiattack.</em></strong> ${name} makes three
        Pseudopod Lash or Noxious Suffocation attacks.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        c=>`<p><strong><em>Pseudopod Lash.</em></strong> Melee Attack. 
        ${name} extends a psuedopod upto 90 ft in length which can bend in any way. 
        Targets standing in its way must make a DC ${c.dc(DStat.Str)} DEX save 
        to dodge. Upon failure, they take ${wrapRoll([[4, D12], [c.STR, D1]])}
        ${wrapDamageType(DamageType.Bludgeoning)} damage and
        ${wrapRoll([[4, D12], [c.CON, D1]])} ${wrapDamageType(DamageType.Corrosion)}
        damage and must make a ${c.dc(DStat.Con)} CON save or suffer one of the 
        effects of Contagion until their next long rest.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        c=>`<p><strong><em>Noxious Suffocation.</em></strong> ${name} attempts a 
        grapple on all creatures within 10ft of it. Until they escape, victims 
        ${wrapRoll([[4, D12], [c.CON, D1]])} ${wrapDamageType(DamageType.Corrosion)}
        damage at the start of each of their turns and suffer one degree of 
        suffocation.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        c=>`<p><strong><em>Relentless Assault.</em></strong> ${name} makes another
        Pseudopod Lash attack dealing critical damage upon hit.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        c=>`<p><strong><em>Lava Flow.</em></strong> ${name} scatters and reforms 
        at a point within 120 ft of itself.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        c=>`<p>${name} gets three legendary actions using which it can perform 
        the following actions - <em>Lava Flow</em> (Cost 1), 
        <em>Psuedopod Lash</em> (Cost 1), <em>Noxious Suffocation</em> (Cost 2),
        <em>Character Theft</em> (Cost 3)</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LairAction,
        c=>`<p>At the end of initiative count 20, ${name} can take one of the 
        following lair actions, they can't take the same one twice a row.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LairAction,
        c=>`<p><strong>Green slime.</strong> ${c.SemiProf} Green Slimes appear on
        the ceiling at points of ${name}'s choosing. They disintegrate after 1 
        hour.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LairAction,
        c=>`<p><strong>Slippery slime.</strong> ${name} slimes a ${c.SemiProf * 10} ft
        side square on the ground. When the slime appears, each creature on it 
        must succeed on a DC 21 Dexterity saving throw or fall ${wrapCondition(Condition.Prone)}
        and slide 10 feet in a random direction determined by a d8 roll. When a
        creature enters the area for the first time on a turn or ends its turn 
        there, that creature must make the same save.

        The slime lasts for 1 hour or until it is burned away with fire. If the
        slime is set on fire, it burns away after 1 round. Any creature that 
        starts its turn in the burning slime takes ${wrapRoll([4, D10])} ${wrapDamageType(DamageType.Fire)}
        damage.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LairAction,
        c=>`<p><strong>Sticky slime.</strong> Same as Slippery Slime but victims 
        are ${wrapCondition(Condition.Restrained)} instead.</p>`
    ));

    c.combat.cr = 26;
    c.combat.finalize();

    c.sheet.size = CreatureSize.Huge;

    c.sheet.subtitle = " Fiend, Lawful Evil";
    c.sheet.acDesc = " (Natural Armor)";
    c.sheet.category = "fiends";
    // c.sheet.finalize();
}