export async function get_templates() {
    // @ts-ignore
    const modules = import.meta.glob("./templates/*.json");
    const templates = [];
    let i = 0;

    for (const path in modules) {
        templates[i] = await modules[path]();
        i++;
    }

    return templates;
}

export function extract_template(app_state) {
    return  {
        version: "1.0",
        names: app_state.names,
        refund_cost: app_state.refund_cost,
        settings: app_state.settings
    }
}

export function is_tempalte_outdated(template) {
    return template.version != "1.0";
}

export function update_template(template) {
    if (template.version == null) { return null; }
    if (template.version == "1.0") { return template; }

    return null;
}