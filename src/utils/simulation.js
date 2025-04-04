const PullResult = {
    Limited: "Limited",
    Standard: "Standard",
    Lower: "Lower",
    None: "None",
}

export function simulations(inputs) {
    let successfull_simulations = 0;
    let pulls_map = new Map;

    for (let _ = 0; _ < inputs.simulations; _++) {
        let [result, pulls_left] = simulation(inputs);

        if (result) {
            successfull_simulations++;

            pulls_map.set(pulls_left, (pulls_map.get(pulls_left) || 0) + 1);
        }
    }

    return {
        successfull_simulations,
        pulls_map
    };
}

export function simulation(inputs) {
    let pulls_left = inputs.pulls;
    let achieved_targets = 0;

    for (let i = 0; i < inputs.targets.length; i++) {
        let target = inputs.targets[i];
        let settings = inputs.settings[i];

        if (target.copies == 0 || target.copies == null) {
            achieved_targets++;
            continue;
        }

        let data = {
            pity: target.pity,
            copies: 0,
            is_guaranteed: target.is_guaranteed,
            losses: target.losses,

            lower_pity: target.lower_pity,
            refund: inputs.refund_count,
        };

        if (settings.guaranteed_after == 0){
            data.is_guaranteed = true;
        }
        
        
        while (pulls_left > 0 && data.copies < target.copies) {
            let succ = pull(settings, data);


            switch (succ) {
                case PullResult.Limited: {
                    data.copies++;
                    data.losses = 0;
                    
                    data.pity = 0;
                    data.lower_pity++;


                    data.is_guaranteed = settings.guaranteed_after == 0;

                    break;
                }

                case PullResult.Standard: {
                    data.losses++;
                    data.pity = 0;
                    data.lower_pity++;


                    data.is_guaranteed = data.losses >= settings.guaranteed_after;

                    break;
                }

                case PullResult.Lower: {
                    data.lower_pity = 0;
                    data.pity++;

                    data.refund += target.maxed_lower ? settings.refund_on_lower_maxed : settings.refund_on_lower;
                    
                    break;
                }

                default: {
                    data.pity++;
                    data.lower_pity++;

                    break;
                }
            }

            if (data.refund > inputs.refund_cost && inputs.refund) {
                data.refund -= inputs.refund_cost;
                pulls_left++;
            }

            pulls_left--;
            
            if (data.copies >= target.copies) {
                achieved_targets++;
                break;
            }
        }
    }

    if (achieved_targets < inputs.targets.length) {
        return [false, 0];
    }

    return [true, pulls_left];
}


function pull(settings, data) {
    let rng1 = Math.random();
    let rate = settings.base_rate + 100 / (settings.hard_pity - settings.soft_pity) * Math.max(data.pity - settings.soft_pity, 0);

    if (rng1 <= rate || data.pity + 1 == settings.hard_pity) {
        if (data.is_guaranteed) {
            return PullResult.Limited;
        }

        let rng2 = Math.random();

        if (rng2 <= settings.limited_rate / settings.limited_options) {
            return PullResult.Limited;
        }

        return PullResult.Standard;
    }
    
    let rng3 = Math.random();

    if (rng3 <= settings.lower_base_rate || data.lower_pity + 1 == settings.lower_hard_pity) {
        return PullResult.Lower;
    }

    return PullResult.None;
}