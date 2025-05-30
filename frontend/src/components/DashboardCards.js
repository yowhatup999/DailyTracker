// src/components/DashboardCards.js

export function overrideKey(type, id) {
    if (type === "supplement" || type === "custom") return `${type}-${id}`;
    return type;
}

export default function buildDashboardCards(entry, overrides) {
    const cards = [];

    const stepsValue = overrides["steps"]?.value ?? entry.schritte;
    cards.push({
        title: "Tägliche Schritte",
        value: `${stepsValue} Schritte`,
        description: "Schrittziel des Tages",
        highlight: "green",
        onClickData: { type: "steps", entryId: entry.id, value: stepsValue }
    });

    const waterValue = overrides["water"]?.value ?? entry.wasserMl;
    cards.push({
        title: "Wasserzufuhr",
        value: `${waterValue} ml`,
        description: "Wasser heute",
        highlight: "blue",
        onClickData: { type: "water", entryId: entry.id, value: waterValue }
    });

    entry.supplements?.forEach((supp) => {
        const key = overrideKey("supplement", supp.id);
        const override = overrides[key];
        const genommen = override?.genommen ?? supp.genommen;
        cards.push({
            title: supp.name,
            value: genommen ? "eingenommen" : "nicht genommen",
            description: `${supp.mengeMg} mg`,
            highlight: genommen ? "purple" : "red",
            onClickData: {
                type: "supplement",
                id: supp.id,
                name: supp.name,
                genommen: genommen
            }
        });
    });

    entry.customEntries?.forEach((custom) => {
        const key = overrideKey("custom", custom.id);
        const override = overrides[key];
        const value = override?.value ?? custom.value;
        cards.push({
            title: custom.name,
            value: `${value} ${custom.unit || ""}`.trim(),
            description: "Benutzerdefinierter Eintrag",
            highlight: "purple",
            onClickData: {
                type: "custom",
                id: custom.id,
                name: custom.name,
                value: value,
                unit: custom.unit
            }
        });
    });

    cards.push({
        isAddCard: true,
        isEmpty:
            (entry.supplements?.length ?? 0) + (entry.customEntries?.length ?? 0) === 0,
        onClickData: { type: "create-entry" },
    });

    return cards;
}