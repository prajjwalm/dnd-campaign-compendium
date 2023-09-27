/**
 * Only includes the player characters for the active campaign. Used for
 * sections dealing with the active campaign.
 */
export enum PcIndex {
    ID_AURELIA,
    ID_CYRION,
    ID_HELIOS,
}

export const PcTokenNames: Map<PcIndex, string> = new Map([
    [PcIndex.ID_AURELIA, "Aurelia"],
    [PcIndex.ID_CYRION, "Cyrion"],
    [PcIndex.ID_HELIOS, "Helios"],
]);

export const PcCharismaMods: Map<PcIndex, number> = new Map([
    [PcIndex.ID_AURELIA, -1],
    [PcIndex.ID_CYRION, -1],
    [PcIndex.ID_HELIOS, 5],
]);

export const PARTY_INSIGHT = 19;
