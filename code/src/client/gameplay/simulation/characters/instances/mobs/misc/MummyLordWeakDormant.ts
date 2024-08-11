import {Activation, Condition, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcID}                                                                                                  from "../../../../../data/npcIndex";
import {D1, D10, D6, D8}                                                                                        from "../../../../../rolling/Dice";
import {Action}                                                                                                 from "../../../../action/Action";
import {wrapRoll}                                                                                               from "../../../../action/Wrap";
import {Character}                                                                                              from "../../../Character";

export function setupMummyLord()
{
    const c = new Character(NpcID.MummyLordWeakDormant);

    c.core.name = "Witch King (Mummy; Dormant+Weakened)";
    c.core.imgPath = "mob_tokens/misc/witchking.png";
    c.core.finalize();

    c.dStats.initializeStats(16, 14, 15, 17, 10, 16);
    c.dStats.pb = 3;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Arcana, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.History, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Perception, );
    c.dSkills.setSkillProficiency(DSkill.Religion, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Stealth,    );
    c.dSkills.finalize();

    c.combat.addBioHpDice(D10.countHavingE(42, c.CON), D10);
    c.combat.computeHP();

    c.combat.setSave(DStat.Int);
    c.combat.setSave(DStat.Wis);
    c.combat.setSave(DStat.Con);
    c.combat.setSave(DStat.Cha);
    c.combat.setSave(DStat.Str);

    c.combat.setSpeed(Speed.Walking, 20);

    c.combat.setRes(DamageType.Psychic,      -100);
    c.combat.setRes(DamageType.Fire,         -100);
    c.combat.setRes(DamageType.Radiant,      -100);
    c.combat.setRes(DamageType.Physical,     50);
    c.combat.setRes(DamageType.Necrotic,     100);
    c.combat.setRes(DamageType.Poison,       100);

    c.combat.addConditionImmunity(Condition.Blinded);
    c.combat.addConditionImmunity(Condition.Charmed);
    c.combat.addConditionImmunity(Condition.Frightened);
    c.combat.addConditionImmunity(Condition.Exhaustion);
    c.combat.addConditionImmunity(Condition.Paralyzed);
    c.combat.addConditionImmunity(Condition.Poisoned);

    c.combat.setSense(Sense.Darkvision, 60);

    c.combat.addAction(new Action(
        Activation.Special,
        c=>`<p><strong><em>Magic Resistance.</em></strong> The mummy lord has 
            advantage on saving throws against spells and other magical effects.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        c=>`<p><strong><em>Rejuvenation.</em></strong> When the mummy lord
        drops to zero HP they begin to devolve and scatter. They can then choose 
        to either teleport away as a gust of wind, or revive in one minute.<br/>
        Should the mummy lord be banished by uttering their true name, they would 
        become dormant for a century. They can only be truly killed if their 
        heart is destroyed.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        c=>`<p><strong><em>Witch King's beats.</em></strong> The heart of the Witch King 
            beats again. Like everything else pertaining to them, the mere rhythm 
            of the heartbeat is melodious and ominous in equal measure, and commands
            and intense level of investiture flux. The heart has 666 HP and immune to 
            all but Hellfire and Almighty damage, to which it is extremely vulnerable.
            The heart turns the area within 10 miles of it into the mummy lord's lair
            and optionally commands magical effects in it. Should a powerful necromancer
            possess the Witch King's undead heart, they will be able to take command of 
            their powers.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        c=>`<p><strong><em>Spellcasting.</em></strong> The Witch King was a mythical 
            spellcaster, however their mummified echo can only summon an infinitesimal 
            fragment of their powers. They can cast the following spells (To Hit: ${wrapRoll(c.INT + c.Prof)}
            DC: ${c.dc(DStat.Int)}) at will -</p>
            <ul>
                <li><i>Cantrips</i>. Sacred Flame, Thumaturgy.</li>
                <li><i>1<sup>st</sup> Level</i>. Command, Guiding Bolt.</li>
                <li><i>2<sup>nd</sup> Level</i>. Hold Person, Silence, Spriritual Weapon.</li>
            </ul>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        c=>`<p><strong><em>Multiattack.</em></strong> The mummy can use its Dreadful Glare 
            and makes one attack with its rotting fist.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        c=>`<p><strong><em>Rotting Fist.</em></strong> <em>Melee Weapon Attack</em>. 
            ${wrapRoll(c.STR + c.Prof)} to hit, reach 10ft, one target. Hit: 
            ${wrapRoll([[1, D6], [c.STR, D1]])} bludgeoning damage followed by 
            ${wrapRoll([2, D6])} necrotic damage. This necrotic damage cannot drop
            the target's HP below 1. In addition, the target must succeed on a 
            DC ${c.dc(DStat.Con)} CON/WIS/CHA save (their choice) or be affected
            with mummy rot. The cursed target cannot recover hit points, looses 
            MAX HP equal to the damage taken and suffer one of the illnesses of 
            <b>Contagion</b> for one hour. Any effect that cures illness removes
            all of these debuffs.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        c=>`<p><strong><em>Dreadful Glare.</em></strong> The mummy lord targets 
            one creature it can see within 60 feet of it. If the target can see 
            the mummy lord, it must succeed on a DC ${c.dc(DStat.Cha)} Wisdom 
            saving throw against this magic or become frightened until the end 
            of the mummy's next turn. If the target fails the saving throw by 5
            or more, it is also paralyzed for the same duration. A target that 
            succeeds on the saving throw is immune to the Dreadful Glare for the
            next 24 hours.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        c=>`<p><strong><em>Sorrowful Embrace.</em></strong> <em>Melee Weapon Attack</em>. 
            ${wrapRoll(c.DEX + c.Prof)} to hit, reach 5ft, one target. On a hit,
            the target is grappled. Until the grapple ends, the target is frightened
            and takes ${wrapRoll([4, D8])} psychic damage at the end of their turn. 
            The mummy lord can grapple only one creature at a time. The grappled creature
            is considered to be 'worn' by the mummy lord, and all related effects apply 
            (e.g. it too step-teleports alongside the mummy lord).</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Reaction,
        c=>`<p><strong><em>Fated Embrace.</em></strong> When the mummy lord takes damage,
            it can pass half the damage dealt to a creature it has grappled.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        c=>`<p>The mummy lord can take 3 legendary actions, choosing from the options 
            below. Only one legendary action option can be used at a time and only
            at the end of another creature's turn. The mummy lord regains spent 
            legendary actions at the start of its turn.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        c=>`<p><strong>Attack.</strong> The mummy lord makes one attack
            with its rotting fist or uses its Dreadful Glare.`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        c=>`<p><strong>Blinding Dust.</strong> Blinding dust and sand 
        swirls magically around the mummy lord. Each creature within 5 feet of 
        the mummy lord must succeed on a DC 16 Constitution saving throw or be 
        blinded until the end of the creature's next turn.`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        c=>`<p><strong>Blasphemous Word (<em>Kargereich</em>) [Cost 2].</strong> 
            The mummy lord utters a blasphemous word. Each creature that is not
            undead, aberrant or a construct within 10 feet of the mummy lord 
            that can hear the magical utterance must succeed on a DC ${c.dc(DStat.Wis)} 
            Constitution saving throw or be stunned until the end of the mummy 
            lord's next turn.`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        c=>`<p><strong>Channel Negative Energy [Cost 2].</strong> 
            The mummy lord magically unleashes negative energy. Creatures within
            60 feet of the mummy lord, including ones behind barriers and around
            corners, can't regain hit points until the end of the mummy lord's
            next turn.`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        c=>`<p><strong>Whirlwind of Sand [Cost 2].</strong> 
            The mummy lord magically transforms into a whirlwind of sand, moves 
            up to 60 feet, and reverts to its normal form. While in whirlwind 
            form, the mummy lord is immune to all damage, and it can't be 
            grappled, petrified, knocked prone, restrained, or stunned. Equipment
            worn or carried by the mummy lord remain in its possession.`
    ));

    c.combat.addAction(new Action(
        Activation.LairAction,
        c=>`<p>On initiative count 20 (losing initiative ties), the mummy lord 
            takes a lair action to cause one of the following effects; the mummy
             lord can’t use the same effect two rounds in a row.</p>
            <ul>
                <li>Each undead creature in the lair can pinpoint the location of
            each living creature within 120 feet of it until initiative count 20
            on the next round.</li>
                <li>Each undead in the lair has advantage on saving throws against 
            effects that turn undead until initiative count 20 on the next round.</li>
                <li>Until initiative count 20 on the next round, any non-undead creature that tries to cast a spell of 4th level or lower in the mummy lord’s lair is wracked with pain. The creature can choose another action, but if it tries to cast the spell, it must make a DC 16 Constitution saving throw. On a failed save, it takes (1d6) necrotic damage per level of the spell, and the spell has no effect and is wasted.</li>
            </ul>`
    ));

    c.combat.cr = 6;
    c.combat.finalize();
    c.sheet.size = CreatureSize.Large;

    c.sheet.subtitle = " Undead, Lawful Evil";

    c.combat.addAcBonus(2);
    c.sheet.acDesc = " (Natural Armor)";
    c.sheet.category = "fiends";
    c.sheet.finalize();
}