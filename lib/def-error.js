'use strict';

const DEFAULT_STORE = 'default';
const EXC_KEYS = ['extend'];

let stores = {
    [DEFAULT_STORE]: {}
};

const setOpts = function(opts){
    Object.keys(opts).forEach(k => {
        if (!EXC_KEYS.includes(k)) {
            this[k] = opts[k];
        }
    });
};

const extend = opts => class DefError extends (opts && typeof opts === 'object' ? (opts.extend || Error) : Error) {
    constructor(name, msg, opts){
        super(...arguments);
        this.name = name;
        this.message = msg;
        this[Symbol(name)] = name;
        if (opts && Object.keys(opts).length > 0) {
            setOpts.bind(this, opts)();
        }
    }
};

module.exports = function(name, opts = {}) {
    let store = typeof opts === 'string' ? opts : (opts ? (opts.store || DEFAULT_STORE) : DEFAULT_STORE);

    stores[store] = stores[store] || {};
    stores[store][name] = stores[store][name] || class extends extend(opts)  {
        constructor(msg, extraOpts){
            msg = msg && typeof msg === 'object' ? (() => {
                extraOpts = msg;
                return msg.msg;
            })() : msg;

            let errOpts = Object.assign(
                (opts && opts.store ? opts.errorData : opts),
                extraOpts
            );

            super(name, msg, errOpts);
        }
    };

    return stores[store][name];
};
