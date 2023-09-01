import {getEnumIterator}                                                                            from "../../common/common";
import {Graph}                                                                                      from "./Graph";
import {SidePanel}                                                                                  from "./SidePanel";
import {UpgradeEdge}                                                                                from "./UpgradeEdge";
import {UpgradeVertex}                                                                              from "./UpgradeVertex";
import {AtomicUpgradeDescGenerators, AtomicUpgradeVertexType, UpgradeRarityLevels, UpgradeToAtomic} from "./UpgradeVertexConfig";


/**
 * Graph showing the updates.
 */
export class UpgradeGraph
    extends Graph<UpgradeVertex, UpgradeEdge>
{
    /**
     * CTOR.
     */
    public constructor(id: string)
    {
        super(id);
    }

    public resetGraph() {
        for (const vertex of this.vertices.values()) {
            vertex.resetActivation();
        }
        this.refreshRenderedElement();
    }

    protected doRefreshRenderedElement($element: JQuery): void
    {
        for (const vertex of this.vertices.values()) {
            vertex.refreshRenderedElement();
        }
        for (const startVToEdge of this.edges.values()) {
            for (const edge of startVToEdge.values()) {
                edge.refreshRenderedElement();
            }
        }
    }

    public generateActiveVertexEffectsDOMString()
    {
        const netEffects: Map<AtomicUpgradeVertexType, number> = new Map();
        for (const atomicType of
            getEnumIterator(AtomicUpgradeVertexType) as Iterable<AtomicUpgradeVertexType>)
        {
            netEffects.set(atomicType, 0);
        }

        let activeNodes     = 0;
        let totalNodes      = 0;
        let activations     = 0;
        let totalActivation = 0;

        for (const vertex of this.vertices.values()) {
            if (!vertex.renderable) {
                continue;
            }
            totalNodes++;
            activations += vertex.activation;
            totalActivation += vertex.maxActivation;
            if (!vertex.isActive) {
                continue;
            }
            activeNodes++;
            for (const atomicType of UpgradeToAtomic.get(vertex.type)) {
                netEffects.set(
                    atomicType,
                    netEffects.get(atomicType) +
                    UpgradeRarityLevels.get(vertex.type).get(vertex.rarity)
                );
            }
        }

        const effectStrings: string[] = [];
        for (const [atomicType, value] of netEffects.entries()) {
            effectStrings.push(AtomicUpgradeDescGenerators.get(atomicType)(value));
        }

        return `
            <div class="upgrade_details theme--safe">
                <div class="grunge_panel">
                    <div class="grunge_panel__icon"></div>
                    <div class="grunge_panel__subtitle">Status</div>
                    <div class="grunge_panel__title">Cognitive Resequencing</div>
                </div>
                <div class="theme_subheader">
                    Progress
                </div>
                <div class="theme_map">
                    <div class="theme_map__row">
                        <div class="theme_map__row__key">Nodes activated</div>
                        <div class="theme_map__row__value">${activeNodes} / ${totalNodes}</div>
                    </div>                    
                    <div class="theme_map__row">
                        <div class="theme_map__row__key">Reclamation level</div>
                        <div class="theme_map__row__value">${activations} / ${totalActivation}</div>
                    </div>                    
                </div>
                <div class="theme_subheader">
                    Cummulative Effects
                </div>
                <div class="theme_map upgrade_effects">
                    ${effectStrings.join("")}
                </div>
            </div>`;
    }

    protected get StyleSubclass(): string
    {
        return "skill";
    }
}

function setupUpgradeGraphLogic(graph)
{
    const $upgradeGraphArea = $("#skill_graph_area");
    const sidePanel = new SidePanel($("#side_banner"));

    sidePanel.swapContent(graph.generateActiveVertexEffectsDOMString());

    $(document).on("keyup", function (e) {
        if ($upgradeGraphArea.is(":hidden")) {
            return;
        }
        if (e.key != "Escape") {
            return;
        }
        sidePanel.toggle(false);
    });

    $upgradeGraphArea.on("click", ".skill_vertex.connected:not(.active)", function () {
        let vertex: UpgradeVertex = graph.lookupVertexById($(this).attr("id"));
        vertex.increaseActivation();
        sidePanel.swapContent(graph.generateActiveVertexEffectsDOMString());
    });
}

export function setupUpgradeGraph($element: JQuery, graph: UpgradeGraph)
{
    if ($element.length == 0) {
        return;
    }
    $element.append(graph.generateDOMString());
    setupUpgradeGraphLogic(graph);
}
