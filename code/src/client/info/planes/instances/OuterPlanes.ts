import {EShard}              from "../../shards/EShard";
import {EConventionalPlanes} from "../EConventionalPlanes";
import {OuterPlane}          from "../OuterPlane";



export const PlaneAmbition = new OuterPlane(
    "Velvet Prisons",
    EShard.Ambition,
    EConventionalPlanes.Carceri,
);

export const PlaneAutonomy = new OuterPlane(
    "Aggressive Flames",
    EShard.Autonomy,
    EConventionalPlanes.Gehenna,
);

export const PlaneCultivation = new OuterPlane(
    "Dew-laden Jungles",
    EShard.Cultivation,
    EConventionalPlanes.Beastlands,
);

export const PlaneDominion = new OuterPlane(
    "Nine Hells",
    EShard.Dominion,
    EConventionalPlanes.Baator
);

export const PlaneDevotion = new OuterPlane(
    "Intertwining Helices",
    EShard.Devotion,
    EConventionalPlanes.Bytopia,
);

PlaneDevotion.attributes.planarEffects = `
<p><b>Final Emotions.</b> Travel via the cognitive realm is extremely
dangerous in the plane of Devotion. While splintering the Shard of Devotion, 
Odium also managed to corrupt it to a very high degree, exploiting the wrath the
Vessel felt upon Her death. As such most of the investiture of Devotion manifests
as a storm in the cognitive realm. Other than wrath, She felt a degree of... 
sadness and relief - relief at no longer having to carry the burden of upholding
faith in all the multiverse, sadness for all those She would leave helpless. 
These emotions manifest to those to attempt to cross realms via the myriad 
mini-perpendicularities all over the place, inviting them to give up their 
struggles and attain peace...</p>

<p><b>Seons.</b> The part of Devotion that stayed true in Her final moments, and
wasn't corrupted by Odium, splintered into several orbs-of-light like entities
known as Seons. Seons occur in pairs, and end up attaching themselves to devotee
and deity in cases where a very strong levels of devotion are exhibited. Paired 
Seons are linked in the Spiritual realm (and thus form a means of FTL transfer
of information) and allow the said devotee and deity to telepathically connect as
long as they both are in the same realm. A Seon is not 'bonded', like spren, to 
those it stays with, but merely accompanies them out of love and respect - that 
is, out of Devotion. Seons rarely grant the person they're with any powers (other
than their latent investiture - which is the equivalent of 1-4 HP), but large
accumulation of those do grant the deities some unique powers.</p>

<p><b>Double Stranded.</b> The plane of Devotion comprises two intertwining strands -
one mostly inhabited by the 'devotees', beings who have displayed extraordinary 
faith, devotion, or loyalty to a person, 'God', or even a cause. The other 
inhabited by the 'Gods', creatures greatly invested by the splinters of Devotion
who have been objects of said faith. In some cases, a person or creature who was
once / is still alive receives the investiture and finds themselves elevated to
Godhood. In some other cases, the investiture (Seons) itself coalesces around the 
personification of the object of faith creating the God out of nothing - similar
to spren. An example of this might be the personification of a country, 
defending which countless lives have been sacrificed.</p>

<ul>
    <li><b>The strand of heaven.</b> Almost entirely deserted, this strand is 
    inhabited by Deities of all levels of stature and all types of personalities.
    This strand is highly unsuitable for civilization due to its divinely morphic
    nature - reality in this strand <em>will</em> shape itself as the resident 
    'God' wishes.</li>
    <li><b>The strand of earth.</b> Very similar to the material plane, except 
    in structure and high accumulation of investiture. Devotees residing here
    have more or less managed to set up the scattered rudiments of civilization
    in isolated pockets barely aware of each other.</li>
</ul>
`;

PlaneDevotion.attributes.economy = ``;

export const PlaneHonor = new OuterPlane(
    "Invariant Storm",
    EShard.Honor,
    EConventionalPlanes.Mechanus,
);

export const PlaneInnovation = new OuterPlane(
    "Dead Wastes",
    EShard.Innovation,
    EConventionalPlanes.Hades,
);

export const PlaneMercy = new OuterPlane(
    "Unblemished Heights",
    EShard.Mercy,
    EConventionalPlanes.MtCelestia
);

export const PlaneOdium = new OuterPlane(
    "Eternal Desolation",
    EShard.Odium,
    EConventionalPlanes.Acheron
);

export const PlanePreservation = new OuterPlane(
    "Infinite Gardens",
    EShard.Preservation,
    EConventionalPlanes.Elysium,
);

export const PlanePrudence = new OuterPlane(
    "Quiet Perfection",
    EShard.Prudence,
    EConventionalPlanes.Arcadia,
);

export const PlaneRuin = new OuterPlane(
    "Fractal Corridors",
    EShard.Ruin,
    EConventionalPlanes.Abyss,
);

export const PlaneValor = new OuterPlane(
    "Spear",
    EShard.Valor,
    EConventionalPlanes.Ysgard,
);

export const PlaneVirtuosity = new OuterPlane(
    "Vibrant Lines",
    EShard.Virtuousity,
    EConventionalPlanes.Arborea,
);

export const PlaneWhimsy = new OuterPlane(
    "Uncharted Dreamscapes",
    EShard.Whimsy,
    EConventionalPlanes.Limbo,
);


