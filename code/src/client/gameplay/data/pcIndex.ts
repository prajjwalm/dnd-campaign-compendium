/**
 * Only includes the player characters for the active campaign. Used for
 * sections dealing with the active campaign.
 */
export enum PcIndex {
    ID_AURELIA,
    ID_CYRION,
    ID_HELIOS,
    ID_JULIUS,
    ID_KERE,
    // ID_PANZER,
}

export const PcTokenNames: Map<PcIndex, string> = new Map([
    [PcIndex.ID_AURELIA, "Aurelia"],
    [PcIndex.ID_CYRION, "Cyrion"],
    [PcIndex.ID_HELIOS, "Helios"],
    // [PcIndex.ID_PANZER, "Panzer"],
    [PcIndex.ID_JULIUS, "Julius"],
    [PcIndex.ID_KERE, "Kere"],
]);

export const PcCharismaMods: Map<PcIndex, number> = new Map([
    [PcIndex.ID_AURELIA, -1],
    [PcIndex.ID_CYRION, -1],
    [PcIndex.ID_HELIOS, 5],
    // [PcIndex.ID_PANZER, 3],
    [PcIndex.ID_JULIUS, 5],
    [PcIndex.ID_KERE, 4],
]);

export const PARTY_INSIGHT = 19;
