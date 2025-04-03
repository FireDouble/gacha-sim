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