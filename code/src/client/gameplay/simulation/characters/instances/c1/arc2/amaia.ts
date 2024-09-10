import {Activation, AdventurerClass, Condition, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                                                           from "../../../../../data/npcIndex";
import {D1, D6, D8}                                                                                                      from "../../../../../rolling/Dice";
import {Action}                                                                                                          from "../../../../action/Action";
import {wrapCondition, wrapDamageType, wrapRoll}                                                                         from "../../../../action/Wrap";
import {Character}                                                                                                       from "../../../Character";

export function setupAmaia()
{
    const c = new Character(NpcId.Amaia);

    c.core.name = "Amaia";
    c.core.imgPath = "character_tokens/C1/Arc2/amaia.png";
    c.core.finalize();

    c.card.setCampaignArc(1, 2);
    c.card.addCardTag('Deceased (Merged)');
    c.card.addCardTag('F111 (43)');
    c.card.addCardTag('From | Materia / Water');
    c.card.addCardTag(`Race | Human / Seaborn`);
    c.card.addCardTag(`Aberrant-fused`);
    c.card.addCardTag(`Core of We Many`);
    c.card.addCardTag('CR | 20, ?');

    c.card.summary = () => `
    First sighted in the plane of Ruin enjoying a feast hosted by the Demon 
    Lord Grazzt, not much is known of this woman except that she resides in a 
    conjunction of the planes of Water and Devotion and is a highly feared figure
    in the Church of the Deep. It remains to be seen what role she plays in the
    rise of the Seaborn, yet for some reason she seems awfully anxious to get a 
    hold of a ${Character.get(NpcId.Jordi).createLink("certain unassuming sea-elf")}.
    <div class="effect_tag">Incomplete</div>`;

    c.core.finalize();

    c.dStats.initializeStats(8, 18, 14, 16, 22, 22);
    c.dStats.pb = 6;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Perception,   ProficiencyLevel.Prof);
    c.dSkills.setSkillProficiency(DSkill.Insight,      ProficiencyLevel.Prof);
    c.dSkills.setSkillProficiency(DSkill.Persuasion,   ProficiencyLevel.Prof);
    c.dSkills.setSkillProficiency(DSkill.Intimidation, ProficiencyLevel.Prof);
    c.dSkills.setSkillProficiency(DSkill.Deception,    ProficiencyLevel.Prof);
    c.dSkills.setSkillProficiency(DSkill.Religion,     ProficiencyLevel.Prof);

    c.opinions.isOpinionated = false;
    c.opinions.finalize();

    c.combat.addClassLevels(AdventurerClass.Warlock, 12);
    c.combat.addClassLevels(AdventurerClass.Cleric,   8);
    c.combat.setLightArmor(15);
    c.combat.computeHP();

    c.combat.setSpeed(Speed.Walking,  40);
    c.combat.setSpeed(Speed.Swimming, 60);

    c.combat.setRes(DamageType.Necrotic,     50);
    c.combat.setRes(DamageType.Psychic,      50);
    c.combat.setRes(DamageType.Fire,         50);
    c.combat.setRes(DamageType.Poison,       100);
    c.combat.setRes(DamageType.Acid,         100);
    c.combat.setRes(DamageType.Cold,         100);
    c.combat.setRes(DamageType.Physical,     100);

    c.combat.addConditionImmunity(Condition.Blinded);
    c.combat.addConditionImmunity(Condition.Charmed);
    c.combat.addConditionImmunity(Condition.Restrained);
    c.combat.addConditionImmunity(Condition.Frightened);

    c.combat.setSense(Sense.BlindSight, 60);
    c.combat.setSense(Sense.DevilSight, 300);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Amphibious.</strong></em> 
        Amaia can breathe air and water.
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Destructive Wrath.</strong></em> 
        When below ${Math.round(c.hp / 2)} HP, Amaia deals the maximum possible 
        damage when dealing lightning or thunder damage. Her Max HP can never 
        drop below this value.
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Nethersea Grasp.</strong></em> 
        Unless she specifically wills otherwise, aberrant tentacles cultivated 
        from the Primordial Soup rise from within Amaia's body and expand to cover
        a sphere 20 ft in radius. Amaia does not need to reside at the center of
        this sphere. This area is difficult terrain to all but her and all other
        creatures that start their turn in that area take ${wrapRoll([4, D6])} 
        ${wrapDamageType(DamageType.Cold)} damage and those that end their turn 
        in that area must make a DC ${c.dc(DStat.Cha) + 5} DEX save or take
        ${wrapRoll([4, D6])} ${wrapDamageType(DamageType.Corrosion)} damage and
        a ${c.dc(DStat.Cha) + 5} STR save or be ${wrapCondition(Condition.Restrained)}.
        Depending on her will, the sphere can either be invisible or be covered
        in magical darkness. Regardless, it inflicts the blinded condition to 
        all creatures within the sphere.
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Spellcasting.</strong></em> 
        Amaia is a 20th-level (hybrid) spellcaster and can cast using either her
        Wisdom or her Charisma (To Hit: ${wrapRoll(c.CHA+c.Prof+7)}), Save DC: ${c.dc(DStat.Cha) + 5} for both stats). 
        She has access to the following spells -
        </p>
        <ul>
            <li><b>1<sup>st</sup> Level.</b> Command, Silvery Barbs</li>
            <li><b>2<sup>nd</sup> Level.</b> Levitate, Misty Step, Ray of Enfeeblement</li>
            <li><b>3<sup>rd</sup> Level.</b> Enemies Abound, Hypnotic Pattern</li>
            <li><b>4<sup>th</sup> Level.</b> Control Water, Polymorph</li>
            <li><b>5<sup>th</sup> Level. (3 slots)</b> Hold Monster, Synaptic Static</li>
            <li><b>6<sup>th</sup> Level.</b> Globe of Invulnerability, Mental Prison (1 / LR)</li>
        </ul>
        `
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Legendary Resistance (4 / Day).</strong></em> 
        Whenever Amaia fails a saving throw, she can choose to succeed instead.
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Touch of We Many.</strong></em>
        Ranged spell attack. ${wrapRoll(c.CHA + c.Prof + 7)} to hit, 60 ft casting range + 300 ft attack range, four targets. 
        <em>Hit:</em> ${wrapRoll([[2, D8], [c.CHA, D1]])} ${wrapDamageType(DamageType.Lightning)} damage.
        The targets who take a hit must make a DC ${c.dc(DStat.Cha) + 5} CON saving throw or
        be pushed/pulled (her choice) 20 ft from/towards the source of the lightning and have their movement speed reduced by 20 ft.
        If they fail the save by 10 or more, they are also ${wrapCondition(Condition.Paralyzed)}. Targets who are within 60 ft
        of Amaia after this attack then must DC ${c.dc(DStat.Cha) + 5} DEX saving throw or be grappled and take ${wrapRoll([4, D8])}
        ${wrapDamageType(DamageType.Necrotic)} damage. Amaia regains health equal to half the ${wrapDamageType(DamageType.Necrotic)} damage dealt. 
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Abyssal Tempest.</strong></em> 
        Spell. Freezing, acidic rain and sleet swirl in a cylinder of 40ft radius around a point within 120 ft of Amaia until the start of her next turn.
        When a creature enters the spell's area for the first time on a turn or starts its turn there, it must make ${c.dc(DStat.Cha) + 5} DEX and CON saving throws.
        On a failed DEX save, it falls ${wrapCondition(Condition.Prone)} and takes ${wrapRoll([2, D8])} ${wrapDamageType(DamageType.Bludgeoning)} damage and
        ${wrapRoll([4, D8])} ${wrapDamageType(DamageType.Cold)} damage. On a failed CON save, it breaks concentration / rage or 
        any other effect equivalent to concentration and takes ${wrapRoll([6, D8])} ${wrapDamageType(DamageType.Thunder)} damage.</p>`
    ));


    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><em><strong>Summoning the soup.</strong></em> When standing on the ground or swimming in water, Amaia can use her bonus action to summon the Nethersea Brand.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><em><strong>Sustenance from the soup.</strong></em> When standing on the Nethersea Brand, Amaia can use her bonus action to heal back to 50% health
        (${Math.round(c.hp / 2)}) if she is below that amount.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><em><strong>Nethersea Tentacles (Guardian Coil).</strong></em> 
        Whenever Amaia would take damage from an attack, she can have one of the nethersea tentacles absorb it instead. The damage of the attack is reduced
        by ${wrapRoll([8, D8])} (cannot reduce below 0) and the tentacle then can deal lightning damage to any creature within 60 ft of Amaia equal to the
        damage reduction.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p>Amaia has 4 legendary actions which she can use to do any of the following -</p>
        <ul>
            <li><b>Spellcasting.</b> Cost (Half the slot used, rounded down). Amaia casts any of her spells (can also be used as a reaction).</li>        
            <li><b>A fleeting touch.</b> Cost 1. Amaia makes a single attack of <b>Touch of We Many</b>.</li>        
            <li><b>Embrace of the Depths.</b> Cost 2. Amaia resets her Nethersea Tentacles, potentially freeing her reaction.</li>        
        </ul>`
    ));

    c.combat.cr = 21;
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;

    c.sheet.altName = "Amaia (1<sup>st</sup> Phase of the EndSpeaker)";
    c.sheet.subtitle = " Human/Seaborn, Neutral";
    c.sheet.acDesc = " (Robe of the Archmagi)";
    c.sheet.category = "human";

    c.sheet.finalize();
}
