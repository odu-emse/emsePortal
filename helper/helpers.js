let register = (Handlebars) => {
    let helpers = {
        round: (num) => {
            if (!isNaN(num)) {
                console.log('expected a number');
            }
            return Math.round(num * 100) / 100
        },
        if_eq: (a, b, opts) => {
            if (a == b) {
                return opts.fn(this);
            } else {
                return opts.inverse(this);
            }
        }
    }

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (let prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

}

module.exports.register = register;
module.exports.helpers = register(null);