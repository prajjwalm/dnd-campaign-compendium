import {Activation, AdventurerClass, Condition, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed, statMod} from "../../../../../data/constants";
import {NpcId}                                                                                                                    from "../../../../../data/npcIndex";
import {D1, D10, D12, D4, D6, D8}                                                                                                 from "../../../../../rolling/Dice";
import {Action}                                                                                                                           from "../../../../action/Action";
import {wrapCondition, wrapDamageType, wrapRoll}                                                                                          from "../../../../action/Wrap";
import {Character}                                                                                                                        from "../../../Character";

export function setupEphremis()
{
    const Ephremis = new Character(NpcId.Ephremis);

    Ephremis.core.name = "Ephremis";
    Ephremis.core.imgPath = "mob_tokens/seaborn/Ephremis.png";
    Ephremis.core.finalize();

    Ephremis.dStats.initializeStats(30, 24, 29, 21, 18, 28);
    Ephremis.dStats.pb = 7;
    Ephremis.dStats.finalize();

    Ephremis.dSkills.setSkillProficiency(DSkill.Stealth, ProficiencyLevel.Prof);
    Ephremis.dSkills.setSkillProficiency(DSkill.Athletics, ProficiencyLevel.Prof);
    Ephremis.dSkills.setSkillProficiency(DSkill.Perception, ProficiencyLevel.Prof);
    Ephremis.dSkills.setSkillProficiency(DSkill.Performance, ProficiencyLevel.Prof);
    Ephremis.dSkills.finalizeSkills();

    Ephremis.opinions.isOpinionated = false;
    Ephremis.opinions.finalize();

    Ephremis.combat.addBioHpDice(D10.countHavingE(480, statMod(29)), D10);
    Ephremis.combat.addClassLevels(AdventurerClass.Barbarian, 1);
    Ephremis.combat.computeHP();

    Ephremis.combat.setSave(DStat.Str, ProficiencyLevel.Prof);
    Ephremis.combat.setSave(DStat.Con, ProficiencyLevel.Prof);
    Ephremis.combat.setSave(DStat.Int, ProficiencyLevel.Prof);
    Ephremis.combat.setSave(DStat.Cha, ProficiencyLevel.Prof);

    Ephremis.combat.setSpeed(Speed.Walking, 30);
    Ephremis.combat.setSpeed(Speed.Swimming, 80);

    Ephremis.combat.setRes(DamageType.Hellfire,    -100);
    Ephremis.combat.setRes(DamageType.Lightning,   -100);
    Ephremis.combat.setRes(DamageType.Thunder,     -100);
    Ephremis.combat.setRes(DamageType.Necrotic,     50);
    Ephremis.combat.setRes(DamageType.Psychic,      50);
    Ephremis.combat.setRes(DamageType.Radiant,      50);
    Ephremis.combat.setRes(DamageType.Slashing,     50);
    Ephremis.combat.setRes(DamageType.Piercing,     50);
    Ephremis.combat.setRes(DamageType.Bludgeoning,  50);
    Ephremis.combat.setRes(DamageType.Poison,       50);
    Ephremis.combat.setRes(DamageType.Acid,         200);
    Ephremis.combat.setRes(DamageType.Cold,         200);
    Ephremis.combat.setRes(DamageType.Fire,         100);
    Ephremis.combat.setRes(DamageType.Physical,     100);

    Ephremis.combat.addConditionImmunity(Condition.Charmed);
    Ephremis.combat.addConditionImmunity(Condition.Grappled);
    Ephremis.combat.addConditionImmunity(Condition.Paralyzed);
    Ephremis.combat.addConditionImmunity(Condition.Restrained);
    Ephremis.combat.addConditionImmunity(Condition.Stunned);

    Ephremis.combat.setSense(Sense.BlindSight, 120);

    Ephremis.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Amphibious.</strong></em> Ephremis can breathe air and 
         water.</p>`
    ));

    Ephremis.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Legendary Resistance (3/Day).</strong></em> If Ephremis 
         fails a saving throw, it can choose to succeed instead.</p>`
    ));

    Ephremis.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Spell-Resistant Carapace.</strong></em> Ephremis has 
         advantage on saving throws against spells below 6th level, and any 
         creature that makes a spell attack of below 6th level against Ephremis
         has disadvantage on the attack roll. In addition, Ephremis has resistance
         to the damage of spells 6th level or lower.
         </p>`
    ));

    Ephremis.combat.addAction(new Action(
        Activation.Special,
        `<p><strong>Call of the firstborn.</strong> Four times, for every four 
         turns it lives, Ephremis gets a new trait, assuming it has dealt at
         least 40 damage in those 4 turns. If it survives the 17th turn and is 
         in its final form, it summons the Tsunami of Primordial Life, dying and
         absorbing all life within a 100mile radius. The four traits are -</p>
        <ol>
            <li>
                <strong>Assimilation.</strong> Ephremis spawns the nethersea 
                brand wherever they walk, and now can cast <em>Hunger of We
                Many</em> as an action.
            </li>
            <li>
                <strong>Survival.</strong> Ephremis now regenerates 
                ${5 * Ephremis.CON} HP while connected to the sea or 
                the nethersea brand at initiative count 20 every round. They can
                now use the <em>Nethersea Growth</em> legendary action. In addition,
                they now add their proficiency bonus to death saving throws.
            </li>
            <li>
                <strong>Migration.</strong> Ephremis' movement speed increases by 
                50%. They gain a flying speed equal to their walking speed. They
                can now cast <em>Nethersea Step</em> as a bonus action 
                or a 1 cost legendary action .
            </li>
            <li>
                <strong>Reproduction.</strong> Ephremis creates ${wrapRoll(D4)} copies of 
                itself from the primordial soup. All but one, counting the original,
                would teleport far away at the start of the next round. At the end 
                of that round, if the remaining one is still alive, it's game over.
            </li>
        </ol>`
    ));

    Ephremis.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Paralysing Rhetoric</em></strong> Ephremis unleashes a torrent
         of verbal abuse or oratory infused with malevolent, aberrant investiture 
         - all those who hear him must make a DC ${Ephremis.dc(DStat.Cha)} INT / WIS / CHA save
         (their choice) or be paralyzed. They can repeat this save at the start 
         of each of their turns. On a success they are immune to this for one day.</p>`
    ));

    Ephremis.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Claw. (2 attacks)</strong> Melee Weapon Attack:</em> 
         ${wrapRoll(Ephremis.STR + Ephremis.Prof)} to hit, reach 10 ft., one 
         target. <em>Hit:</em> ${wrapRoll([[3, D8], [Ephremis.STR, D1]])} 
         ${wrapDamageType(DamageType.Slashing)} damage (magical) plus ${wrapRoll([3, D8])} 
         ${wrapDamageType(DamageType.Void)} damage, and if the target is a
         creature, it must make a DC ${Ephremis.dc(DStat.Str)} STR save. On 
         failure, it is pushed 5ft away, if it fails by 10 or more it is also 
         knocked ${wrapCondition(Condition.Prone)}.</p>`
    ));

    Ephremis.combat.addAction(new Action(
        Activation.Action,
        `<p><em><strong>Hunger of we many.</strong>
         </em><strong> (Recharge 5: ${wrapRoll(D6)}) [Requires the Assimilation Trait]</strong> Ephremis 
         launches ${Ephremis.CON} Corrosive Vacuoles which lock on to a target 
         within 30 ft of itself. At initiative count 20, each corrosive vacuole 
         ${wrapRoll(D12)} ${wrapDamageType(DamageType.Necrotic)} damage. <br />
         If the target is surrounded by 4 or more vacuoles and stands on the 
         nethersea brand and is below 50 HP, then 4 vacuoles merge together to 
         form a single large one which swallows the target and merges into the 
         brand.<br />
         While swallowed, the creature takes ${wrapRoll([12, D6])} 
         ${wrapDamageType(DamageType.Corrosion)} damage at the start of each of 
         Ephremis' turns. If it deals 40 damage to the vacuoles, it appears on a
         random location upon the brand.</p>`
    ));

    Ephremis.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><em><strong>Whispers of we many. </strong>Ranged Spell Attack:</em>
         ${wrapRoll(Ephremis.CHA + Ephremis.Prof)} to hit, reach 20 ft., one 
         creature. <em>Hit:</em> ${wrapRoll([[3, D6], [Ephremis.CHA, D1]])}
         ${wrapDamageType(DamageType.Neural)} damage.</p>`
    ));

    Ephremis.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Nethersea Step. </em>
         [Requires the Migration Trait] </strong>Ephremis deals 
         ${wrapRoll([[1, D8], [Ephremis.CON, D1]])}
         ${wrapDamageType(DamageType.Corrosion)} damage and teleports to an unoccupied 
         spot within ${Ephremis.INT * 15}ft of itself which it can see or where 
         the Nethersea brand has spread.</p>`
    ));

    Ephremis.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p>Ephremis can take 3 legendary actions, choosing from the options 
         below. Only one legendary action option can be used at a time and only 
         at the end of another creature's turn. Ephremis regains spent legendary
         actions at the start of its turn.</p>`
    ));

    Ephremis.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><em><strong>Slash.</strong></em> Ephremis makes one slash attack.</p>`
    ));

    Ephremis.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><em><strong>Move.</strong></em> Ephremis moves up to half its speed. 
         After the Migration trait is unlocked it can move its full speed or use
         Nethersea step.</p>`
    ));

    Ephremis.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p><strong><em>Nethersea Growth (Costs 2 Actions).</em> 
         [Requires the Survival Trait]</strong> Each creature within 10 feet of
         Ephremis must make a DC ${Ephremis.dc(DStat.Cha)} Dexterity saving 
         throw, taking ${wrapRoll([3, D8])} slashing damage on a failed save, or
         half as much damage on a successful one. Until the start of its next 
         turn, Ephremis gains a +2 bonus to AC. The room enters the blemished 
         stage, if it isn't already blemished, infected, corrupted or 
         sunken.</p>`
    ));

    Ephremis.combat.cr = 25
    Ephremis.combat.finalize();

    Ephremis.sheet.size = CreatureSize.Large;

    Ephremis.sheet.subtitle = " Seaborn, Neutral Evil";
    Ephremis.sheet.acDesc = " (Con/Dex)";
    Ephremis.sheet.category = "seaborn_boss";

    Ephremis.sheet.finalize();
}