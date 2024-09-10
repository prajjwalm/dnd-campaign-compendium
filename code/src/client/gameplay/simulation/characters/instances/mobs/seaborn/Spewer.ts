import {Activation, CreatureSize, DamageType, DStat, ProficiencyLevel, Sense, Speed} from "../../../../../data/constants";
import {NpcId}                                                                       from "../../../../../data/npcIndex";
import {D1, D4, D8}                                                                  from "../../../../../rolling/Dice";
import {Action}                                                                      from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                                    from "../../../../action/Wrap";
import {Character}                                                                   from "../../../Character";
import {CharacterVariant}                                                            from "../../../CharacterVariant";


export function setupSpewers()
{
    const c = new Character(NpcId.Spewer);

    c.core.name = "Spewer";
    c.core.imgPath = "mob_tokens/seaborn/Spewer.png";
    c.core.finalize();

    c.dStats.initializeStats(17, 8, 21, 11, 9, 12);
    c.dStats.pb = 3;
    c.dStats.finalize();

    c.dSkills.finalize();

    const predHpDice = D8.countHavingE(40, c.CON);
    c.combat.addBioHpDice(predHpDice, D8);
    c.combat.computeHP();

    c.combat.setHeavyArmor(17);

    c.combat.setSave(DStat.Cha, ProficiencyLevel.Prof);
    c.combat.setSave(DStat.Con, ProficiencyLevel.Prof);

    c.combat.setSpeed(Speed.Walking, 20);
    c.combat.setSpeed(Speed.Swimming, 30);

    c.combat.setRes(DamageType.Poison,        100);
    c.combat.setRes(DamageType.Acid,         -100);
    c.combat.setRes(DamageType.Thunder,      -100);
    c.combat.setRes(DamageType.Fire,         -100);
    c.combat.setRes(DamageType.Lightning,    -100);

    c.combat.setSense(Sense.TremorSense, 5280);

    c.combat.addAction(new Action(
        Activation.Special,
        c => `<p><strong><em>Spiked Shell.</em></strong> 
        The spewer resides inside a dangerously spiked shell which grants 
        it additional +5 AC against ranged attacks. Instead, if any creature attempts a 
        melee attack against it and misses they take ${wrapRoll([c.ac - 10, D4])} 
        ${wrapDamageType(DamageType.Piercing)} damage. Furthermore, when it 
        retreats completely within its shell it gains +${c.ac - 10} AC, immunity
        from ${wrapDamageType(DamageType.Fire)}, ${wrapDamageType(DamageType.Lightning)}, 
        ${wrapDamageType(DamageType.Slashing)} and ${wrapDamageType(DamageType.Bludgeoning)}
        damages, but it cannot move or take most of its actions.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Action,
        c => `<strong><em>Nethersea Injection.</em></strong> The spewer deals 
        ${wrapRoll([[c.SemiProf, D8], [c.CON, D1]])}
        ${wrapDamageType(DamageType.Poison)} damage to ${c.Prof} non-seaborn 
        targets within a 1-mile range who are standing on the nethersea brand.
        Targets must make a DC ${c.dc(DStat.Con)} CON save, upon failure they 
        gain 1 level of <em>Menace: Cerluean Transfiguration</em>, if it doesn't
        already exceed ${c.Prof}. Upon success, they do not gain the said Menace
        and take half damage. (This roll may be made at adv/dis based on other 
        traits the target has.)`
    ));

    c.combat.addAction(new Action(
        Activation.BonusAction,
        _ => `<strong><em>Take Refuge.</em></strong> The spewer retreats into its shell.`
    ));

    c.combat.addAction(new Action(
        Activation.LegendaryAction,
        _ => `<strong><em>Emerge.</em></strong> The spewer has only one legendary action which it will always 
        take at the end of the turn of the creature preceding its own. It uses 
        this legendary action to emerge from its shell.`
    ));

    c.combat.cr = 3
    c.combat.finalize();

    c.sheet.size = CreatureSize.Medium;
    c.sheet.subtitle = " Seaborn, True Neutral";
    c.sheet.acDesc   = " (Shell)";
    c.sheet.category = "seaborn";

    c.sheet.finalize();

    const n = new CharacterVariant(NpcId.SpewerN, NpcId.Spewer);

    n.core.name = "Nourished Spewer";
    n.core.imgPath = "mob_tokens/seaborn/SpewerN.png";
    n.core.finalize();

    n.dStats.initializeStats(19, 6, 24, 14, 11, 16);
    n.dStats.pb = 5;
    n.dStats.finalize();

    n.combat.addBioHpDice(predHpDice, D8);
    n.combat.computeHP();

    n.combat.setHeavyArmor(20);

    n.combat.cr = 10
    n.combat.finalize();

    n.sheet.danger = 1;
    n.sheet.finalize();
}