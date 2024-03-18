import {Activation, CreatureSize, DamageType, DStat, ProficiencyLevel} from "../../../../../data/constants";
import {NpcID}                                                         from "../../../../../data/npcIndex";
import {D100, D12, D8}                                                 from "../../../../../rolling/Dice";
import {Action}                                                        from "../../../../action/Action";
import {wrapDamageType, wrapRoll}                                      from "../../../../action/Wrap";
import {Character}                                                     from "../../../Character";

export function setupNetherseaBrand()
{
    const c = new Character(NpcID.NSBrand);

    c.core.name = "Nethersea Brand";
    c.core.imgPath = "mob_tokens/seaborn/NetherseaBrand.png";
    c.core.finalize();

    c.dStats.initializeStats(30, 1, 30, 30, 30, 30);
    c.dStats.pb = 10;
    c.dStats.finalize();

    c.combat.addBioHpDice(D100.countHavingE(1_000_000, c.CON), D100);
    c.combat.computeHP();

    c.combat.setSave(DStat.Str, ProficiencyLevel.Expert);
    c.combat.setSave(DStat.Con, ProficiencyLevel.Expert);
    c.combat.setSave(DStat.Int, ProficiencyLevel.Expert);
    c.combat.setSave(DStat.Wis, ProficiencyLevel.Expert);
    c.combat.setSave(DStat.Cha, ProficiencyLevel.Expert);

    c.combat.setRes(DamageType.All, 100);

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Domain of the Sea.</strong></em> <strong>[Land Specific Ability]</strong> 
        Already occpying almost the entire ocean-floor of the plane of water and extending in vast
        patches over numerous other planes, the nethersea brand marks
        an area as belonging to the sea, and to all the terrors that arise from it.
        What seaborn invade, the nethersea brand occupies. Where the nethersea brand
        spreads, the ocean, ever-rising, follows.<br/>
        While on land, any seaborn standing on the brand basks in its refuge and
        draws nourishment from it. Any seaborn gets at least +30 Temp HP, ${wrapRoll([3, D8])} 
        regeneration / round, +15 ft movement and 600 ft tremorsense (only within the brand).
        More powerful seaborn may gain other abilities.</p>`
    ));

    c.combat.addAction(new Action(
        Activation.Special,
        `<p><em><strong>Near Invulnerability.</strong></em> While it does occasionally
        wither and retreat by itself at times (particularly following failed invasions).
        Forcing it to retreat is nearly impossible. And destroying it entirely might even
        not be possible for Ruin. It is invulnerable to all except Almighty damage and 
        while taking that damage will cause local patches to burn or retreat, the whole
        regenerates HP infinitely fast (even local patches are destroyed only because it
        takes time for the investiture to reach them).</p>`
    ));

    c.combat.addAction(new Action(
        Activation.LairAction,
        `<p><em><strong>Predatory Expansion.</strong></em> <strong>[Land Specific Ability]</strong> While on land, every round at
        initiative count 20, 10 and 0, the nethersea brand may attempt to expand in all neighbouring horizontal tiles 
        it prefers. If there are no such tiles, it may attempt to expand in all neighbouring
        sloped / vertical tiles. It can not expand from in an area if someone is standing 
        upon it there, instead it attempts to suck investiture out of them, till they die - dealing them 
        ${wrapRoll([2, D12])} ${wrapDamageType(DamageType.Neural)} 
        damage every round they remain standing.</p>`
    ));

    c.combat.cr = 30

    c.combat.addAcBonus(35);
    c.combat.finalize();

    c.sheet.size = CreatureSize.Cosmic;
    c.sheet.subtitle = " Seaborn, Unaligned";
    c.sheet.acDesc = "";
    c.sheet.category = "seaborn";
    c.sheet.finalize();
}