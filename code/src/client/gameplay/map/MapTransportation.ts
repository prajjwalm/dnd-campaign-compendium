/**
 * The various means of transport connecting different points on the map.
 */
export enum MapTransportation
{
    Foot,
    Horse,
    Automobile,
    Train,
    Helicopter,
    Jet,
    Space,
    Cognition,
}

/**
 * How each mode of transportation would be rendered on the page.
 */
export const TransportationToDOMString: Map<MapTransportation, string> =
    new Map([
        [MapTransportation.Foot,        `<i class="fa-solid fa-shoe-prints"></i>`],
        [MapTransportation.Horse,       `<i class="fa-duotone fa-horse-saddle"></i>`],
        [MapTransportation.Automobile,  `<i class="fa-solid fa-truck-field"></i>`],
        [MapTransportation.Jet,         `<i class="fa-solid fa-jet-fighter"></i>`],
        [MapTransportation.Space,       `<i class="fa-solid fa-shuttle-space"></i>`],
        [MapTransportation.Cognition,   `<i class="fa-solid fa-brain"></i>`],
    ]);
