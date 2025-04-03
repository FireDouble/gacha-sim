export function strip_map(map) {
    const entries = [...map.entries()]

    const top_value = entries.sort((a, b) => b[1] - a[1])[0][0];
    const index = entries.sort((a, b) => b[0] - a[0]).findIndex(([num]) => num === top_value);
    const result = entries.sort((a, b) => b[0] - a[0]).slice(Math.max(0, index - 7), index + 8);

    result.sort((a, b) => b[0] - a[0]);

    return result;
}
