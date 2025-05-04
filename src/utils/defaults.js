export function get_default_targets(len) {
    let t = [];
    for (let i = 0; i < len; i++) {
        t[i] = {
            copies: null,
            pity: null,
            is_guaranteed: false,
            losses: null,
        }
    }

    return t;
}

export function get_empty_app_state() {
    return {
        pulls: null,
        simulations: 10000,
        refund_count: null,
        refund: true,
        results: {
            odds: null,
            body: null,
            array: null,
        },

        custom: false,

        assets_dir: "",
        tooltips: {
            pulls: "",
            simulations: "",
            refund: "",
            use_refund: "",

            pity: "",
            copies: "",
            lower_pity: "",
            lower_pity_maxed: "",
            guarantee: "",
            losses: "",
        },

        refund_cost: 0,
        targets: [],
        settings: [],
    }
}