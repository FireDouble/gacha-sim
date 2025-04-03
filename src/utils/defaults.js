export function get_default_targets() {
    return [
        {
            copies: null,
            pity: null,
            is_guaranteed: false,
            losses: null,
        },
        {
            copies: null,
            pity: null,
            is_guaranteed: false,
            losses: null,
        }
    ];
}

export function get_empty_app_state() {
    return {
        assets_dir: "",
        tooltips: {
            pulls: "",
            simulations: "",
            pity: "",
            copies: "",
            refund: "",
        },

        results: {
            odds: null,
            body: null,
            array: null,
        },

        pulls: null,
        simulations: 10000,
        refund_count: null,
        refund: true,

        refund_name: "",

        refund_cost: 0,
        targets: [],
        settings: [],
    }
}