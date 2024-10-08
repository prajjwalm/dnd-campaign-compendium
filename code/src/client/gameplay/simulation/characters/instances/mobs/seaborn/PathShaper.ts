import {Activation, CreatureSize, DamageType, DSkill, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                               from "../../../../../data/npcIndex";
import {D1, D12, D4, D8}                                                                     from "../../../../../rolling/Dice";
import {Action}          from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                                    from "../../../../action/Wrap";
import {Character}                                                                                   from "../../../Character";


export function setupPathShaper()
{
    const c = new Character(NpcId.PathShaper);

    c.core.name = "PathShaper";
    c.core.imgPath = "mob_tokens/seaborn/PathShaper.png";
    c.core.finalize();

    c.dStats.initializeStats(24, 24, 24, 24, 18, 14);
    c.dStats.pb = 7;
    c.dStats.finalize();

    c.dSkills.setSkillProficiency(DSkill.Perception, ProficiencyLevel.Expert);
    c.dSkills.setSkillProficiency(DSkill.Athletics, );
    c.dSkills.setSkillProficiency(DSkill.Stealth, );
    c.dSkills.finalize();

    const hpDice = D12.countHavingE(360, c.CON);
    c.combat.addBioHpDice(hpDice, D12);
    c.combat.computeHP();

    c.combat.setLightArmor(11);

    c.combat.setSave(DStat.Dex, ProficiencyLevel.Prof);
    c.combat.setSave(DStat.Wis, ProficiencyLevel.Prof);
    c.combat.setSave(DStat.Cha, ProficiencyLevel.Prof);

    c.combat.setSpeed(Speed.Walking, 50);
    c.combat.setSpeed(Speed.Swimming, 70);

    c.combat.setRes(DamageType.Poison,         50);
    c.combat.setRes(DamageType.Force,          50);
    c.combat.setRes(DamageType.Physical,       50);
    c.combat.setRes(DamageType.Cold,           50);
    c.combat.setRes(DamageType.Acid,          100);
    c.combat.setRes(DamageType.Psychic,      -100);

    c.combat.setSense(Sense.Darkvision, 300);

    c.combat.addAction(new Action(
        Activation.Special,
        c => `<p><strong><em>Shaping the Path.</em></strong> 
        At the start of its turn the PathShaper must split into ${wrapRoll([[1, D4], [1, D1]])} lingering 
        fragments (affected by light level).
        Each fragment inherits its HP and can attack and move independently.<br/>
        At the start of its next turn, it chooses one of the fragments to be the 
        true path. That lingering fragment then becomes the PathShaper, while 
        the others fade away. The PathShaper's HP now is that fragment's HP. 
        Also, any damage dealt by this fragment is now applied. 
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        c => `<p><strong><em>Mapping Dead Ends.</em></strong> 
        Everytime the PathShaper or one of its lingering fragments or its 
        fractals make a successful silent rend attack, they 
        spawn a new fractal. These fractals have 20 HP, ${c.ac - 5} AC and the
        same saves as the PathShaper. They can make two rend attacks similar to the
        PathShaper, but their attacks deal just the basic slashing damage and
        not the accompanying elevated forms of damage. The fractals act right 
        before the lingering PathShaper's turn and disappear at the end of their
        turn if the light level is not extinguished.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        c => `<p><strong><em>Legendary Resistance.</em> (3 / Day)</strong> 
        If the PathShaper fails a saving throw, it can choose to succeed 
        instead.
        </p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        c => `<p><strong><em>Silent Rend.</em></strong> The PathShaper makes one 
        strike with its claws, which remain attuned to Paranoia's silent song. 
        To hit - ${wrapRoll(c.DEX + c.Prof)}, damage ${wrapRoll([[2, D8], [c.DEX, D1]])}
        ${wrapDamageType(DamageType.Slashing)} damage plus ${wrapRoll([6, D8])} ${wrapDamageType(DamageType.Neural)}
        damage.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        c => `<p><strong><em>Vampiric Bite.</em></strong> The PathShaper makes one 
        bite attack, empowered with a very small fragment of the powers of the 
        Original. 
        To hit - ${wrapRoll(c.DEX + c.Prof)}, damage ${wrapRoll([[2, D8], [c.CON, D1]])}
        ${wrapDamageType(DamageType.Slashing)} damage plus ${wrapRoll([2, D8])} ${wrapDamageType(DamageType.Necrotic)}
        damage. It regains HP equal to the necrotic damage dealt.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        c => `<p><strong><em>Nether Spit.</em></strong> The PathShaper spits
        out the vilest acid from the bed of the nethersea. Targets in a 60 ft line
        must make a DC ${8 + c.Prof + c.CON} DEX save or take ${wrapRoll([8, D8])} 
        ${wrapDamageType(DamageType.Corrosion)} damage.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        c => `<p><strong><em>Glitch.</em></strong> The PathShaper teleports upto
        60ft in any direction.</p>`
    ));

    c.combat.cr = 18;
    c.combat.finalize();

    c.sheet.size = CreatureSize.Huge;
    c.sheet.subtitle = " Seaborn, Lawful Neutral";
    c.sheet.acDesc   = " (Natural Leather)";
    c.sheet.category = "seaborn_boss";
    c.sheet.finalize();
}