import {Activation, AdventurerClass, Condition, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                                                           from "../../../../../data/npcIndex";
import {D1, D12}                                                                                                         from "../../../../../rolling/Dice";
import {Action}                                                                                                          from "../../../../action/Action";
import {AttackAbstraction, BuffT1, BuffT2, BuffT3, BuffT4, DebuffT2}                                                     from "../../../../action/AttackAbstraction";
import {wrapDamageType, wrapRoll}                                                                                        from "../../../../action/Wrap";
import {CombatTreeNode}                                                                                                  from "../../../aspects/CombatTreeNode";
import {ECombatTreeNodeType}                                                                                             from "../../../aspects/ECombatTreeNodeType";
import {Character}                                                                                                       from "../../../Character";


export function setupFathomKing()
{
    const c = new Character(NpcId.FathomKing);

    c.core.name = "FathomKing";
    c.core.imgPath = "mob_tokens/seaborn/FathomKing.png";
    c.core.finalize();

    c.dStats.initializeStats(27, 20, 24, 11, 13, 18);
    c.dStats.pb = 7;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Athletics,  ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Perception, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Insight);
    c.dSkills.setSkillProficiency(DSkill.Survival);
    c.dSkills.setSkillProficiency(DSkill.Intimidation);
    c.dSkills.setSkillProficiency(DSkill.Performance);
    c.dSkills.finalize();

    c.combat.addClassLevels(AdventurerClass.Barbarian, 15);
    c.combat.addClassLevels(AdventurerClass.Rogue,      5);
    c.combat.bonusHP = 40;
    c.combat.computeHP();

    c.combat.setSave(DStat.Str, ProficiencyLevel.Prof);
    c.combat.setSave(DStat.Con, ProficiencyLevel.Prof);

    c.combat.setSpeed(Speed.Walking, 50);
    c.combat.setSpeed(Speed.Swimming, 40);

    c.combat.setRes(DamageType.Lightning, 50);
    c.combat.setRes(DamageType.Physical,  50);
    c.combat.setRes(DamageType.Cold,      50);

    c.combat.addConditionImmunity(Condition.Frightened);
    c.combat.addConditionImmunity(Condition.Charmed);

    c.combat.setSense(Sense.BlindSight, 10);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Resurgent Tides.</em> (B4)</strong> The FathomKing revives
         the first two times he dies, unlocking greater powers every time he does
         so.</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, BuffT4
        ))
    );

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Silence of the depths.</em> (B3)</strong> In his second
         phase, the FathomKing radiates a zone of silence in a 300 ft radius 
         around him.</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, BuffT3
        ))
    );

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Glory of Humanity.</em> (D2)</strong> In his third
         phase, the FathomKing deals 10 extra damage with each attack but takes 
         10 extra damage from each attack. In addition, his to-hit rolls increase 
         by 5, but his AC decreases by 5.</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, DebuffT2
        ))
    );

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Wrath of Tidal Storms.</em> (B3)</strong> When the FathomKing 
        makes a melee attack, the force of the sea accompanies, the target must 
        make a DC ${c.dc(DStat.Str)} STR save or fall prone. In the second phase,
        his cleaves send out a wave of corrupted water in a 60 ft line. Targets 
        in that range who would be hit by the attack take ${wrapRoll([4, D12])} 
        ${wrapDamageType(DamageType.Neural)} damage. In his third phase, his 
        melee attack reach increases to 20ft cones and all his melee attacks deal an 
        extra ${wrapRoll([3, D12])} ${wrapDamageType(DamageType.Electroclasmic)} damage.</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, BuffT3
        ))
    );

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Swashbuckler's Dance.</em> (B4)</strong> Up to three times per turn, 
        when the FathomKing is attacked by weapon attacks, and he is not grappled,
        prone, unarmed, or otherwise restrained, he will reduce the damage taken by 
        ${wrapRoll([[2, D12], [c.STR + c.pb + c.DEX + c.CHA, D1]])}. He can parry a maximum of
        ${Math.floor((c.pb * (c.DEX + c.STR)) / 10) * 10} damage this way. If a
        parry reduces an attack's damage to zero this way, then he does not lose
        stance (his parry buffer). He regains stance equal to half his current HP at 
        the start of his each of his turns.</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, BuffT4
        ))
    );

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Danger sense.</em> (B1)</strong> The FathomKing has 
        advantage on DEX saving throws against effects that he can see while
        not blinded, deafened, or incapacitated.</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, BuffT1
        ))
    );

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Relentless Rage.</em> (B3)</strong> Whenever the FathomKing 
        drops to 0 HP, he must attempt a DC 5 CON saving throw. If he succeeds, he
        drops to 1 HP instead. The DC of this save increases by 5 every time it
        is invoked.</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, BuffT3
        ))
    );

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><strong><em>Legendary Resistance.</em> (B2)</strong> Four times per 
         day the FathomKing can choose to succeed a saving throw he fails.</p>`
    ));
    c.combat.root.n(Activation.Special).addChild(
        new CombatTreeNode(ECombatTreeNodeType.Leaf, null, new AttackAbstraction(
            [], null, null, BuffT2
        ))
    );

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Naval Piroette.</em></strong> The FathomKing makes two 
         light flourish attacks followed by one heavy overhead cleave. Reach 10 ft.
         If the third attack is made at advantage or if there is no other enemy within 5 ft,
         it deals an extra ${wrapRoll([5, D12])} damage. To Hit: ${wrapRoll(c.STR + c.CHA + c.pb + 3)} ${wrapRoll(c.STR + c.pb - 2)}.
         Damage: ${wrapRoll([[1, D12], [c.STR + 7, D1]])} ${wrapRoll([[1, D12], [c.STR + 17, D1]])}.</p>`
    ));
    c.combat.root.n(Activation.Action).addChild(
        new CombatTreeNode(
            ECombatTreeNodeType.Leaf,
            null,
            new AttackAbstraction(
                [[9,              D12, DamageType.Slashing],
                 [3 * c.STR + 30, D1,  DamageType.Slashing]],
                c.STR + c.pb
            )
        )
    );

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Tidal Slash.</em> (2<sup>nd</sup> phase onwards)</strong> The FathomKing empowers his 
         blade with the primordial soup, then makes one large slashing attack in a 60 ft cone.
         Targets in range must make a ${c.dc(DStat.Con)} DEX save or  
         ${wrapRoll([[9, D12], [c.STR + 7, D1]])} ${wrapDamageType(DamageType.Neural)} damage.</p>`
    ));
    c.combat.root.n(Activation.Action).addChild(
        new CombatTreeNode(
            ECombatTreeNodeType.Leaf,
            null,
            new AttackAbstraction(
                [[9,              D12, DamageType.Neural],
                 [c.STR + 17,     D1,  DamageType.Neural]],
                c.STR + c.pb
            )
        )
    );

    c.combat.addAction(new Action(
        Activation.Action,
        `<p><strong><em>Into the Locker.</em> (Can only be taken at the
         start of the turn in Phase 1 and 2)</strong> The FathomKing beheads a
         creature he has restrained. To Hit: ${wrapRoll(c.STR + c.pb - 2)} and if 
         the hit rolls a NAT 20, the creature is immediately beheaded, otherwise 
         it takes damage equal to ${wrapRoll([[7, D12], [c.STR + 17, D1]])}.
         Again, if the damage brings it to zero HP, it is immediately beheaded.</p>`
    ));
    c.combat.root.n(Activation.Action).addChild(
        new CombatTreeNode(
            ECombatTreeNodeType.Leaf,
            null,
            new AttackAbstraction(
                [[7,         D12, DamageType.Slashing],
                 [c.STR + 17, D1,  DamageType.Slashing]],
                c.STR + c.pb - 2,
                null,
                BuffT2
            )
        )
    );

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Glock Master.</em> (2<sup>nd</sup> phase onwards) </strong> 
         The FathomKing makes four ranged attacks with a sea-rifle. Range 50ft.
         To Hit: ${wrapRoll(c.DEX + c.pb)} Damage: ${wrapRoll([[1, D12], [c.DEX + 13, D1]])}
         ${wrapDamageType(DamageType.Piercing)}.</p>`
    ));
    c.combat.root.n(Activation.Action).addChild(
        new CombatTreeNode(
            ECombatTreeNodeType.Leaf,
            null,
            new AttackAbstraction(
                [[4,              D12, DamageType.Piercing],
                 [4 * c.DEX + 44, D1,  DamageType.Piercing]],
                c.DEX + c.pb - 4
            )
        )
    );

    c.combat.addAction(new Action(
        Activation.BonusAction,
        `<p><strong><em>Nether Grasp.</em></strong> The FathomKing grapples a foe
        within 90ft range, attempting an Athletics roll with advantage. When aiming 
        at targets outside his melee reach, i.e. 10ft, tentacle-like seaborn 
        appendages emerge out of his arm and rapidly move towards their target, 
        then retract back like a grappling hook. Targets may make a DC ${c.dc(DStat.Con)} DEX save
        to avoid being grappled, and they have advantage on the save if they are 
        further than 30ft away. A target who is caught is immediately pulled to melee reach, knocked 
        prone and held restrained. A restrained target takes ${1 + c.STR + c.CON} 
        ${wrapDamageType(DamageType.Void)} damage at the start of each of the 
        FathomKing's turns.</p>`
    ));
    c.combat.root.n(Activation.Action).addChild(
        new CombatTreeNode(
            ECombatTreeNodeType.Leaf,
            null,
            new AttackAbstraction([], null, null, BuffT3)
        )
    );

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Uncanny Dodge.</em></strong> When an attacker that the FathomKing
        can see hits him with an attack, he can use his reaction to halve the 
        attack’s damage against him.</p>`
    ));
    c.combat.root.n(Activation.Reaction).addChild(
        new CombatTreeNode(
            ECombatTreeNodeType.Leaf,
            null,
            new AttackAbstraction([], null, null, BuffT3)
        )
    );

    c.combat.addAction(new Action(
        Activation.Reaction,
        `<p><strong><em>Riposte.</em></strong> When an attacker that the FathomKing
        can see hits him with an attack and misses, or is deflected, the FathomKing
        can make an attack in turn. To Hit: ${wrapRoll(c.STR + c.CHA + c.pb - 2)}.
        Damage: ${wrapRoll([[1, D12], [c.STR + 17, D1]])}. The attack deals an additional
        ${wrapRoll([5, D12])} damage if there is no other creature within 5 ft 
        or the attack was taken on a deflection.</p>`
    ));
    c.combat.root.n(Activation.Reaction).addChild(
        new CombatTreeNode(
            ECombatTreeNodeType.Leaf,
            null,
            new AttackAbstraction(
                [[4,          D12, DamageType.Slashing],
                 [c.STR + 17, D1,  DamageType.Slashing]],
                c.STR + c.pb - 2)
        )
    );

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        `<p>The FathomKing has 4 legendary actions, and he can consume 1 of those
            to either move his walking speed, make a melee flourish or ranged attack, or 
            consume 2 legendary actions to attempt to grapple a target within
            his melee reach.</p>`
    ));
    c.combat.root.n(Activation.LegendaryAction).addChild(
        new CombatTreeNode(
            ECombatTreeNodeType.Leaf,
            null,
            new AttackAbstraction(
                [[1,          D12, DamageType.Slashing],
                 [c.STR + 17, D1,  DamageType.Slashing]],
                c.STR + c.pb - 2,),
            2
        )
    );
    c.combat.addAcBonus(2);

    c.combat.cr = 20;
    c.combat.finalize();

    c.sheet.size     = CreatureSize.Large;
    c.sheet.subtitle = " Human / Seaborn, Neutral Evil";
    c.sheet.acDesc   = " (Natural Armor / NetherSea Shield)";
    c.sheet.category = "seaborn_boss";
    c.sheet.finalize();
}