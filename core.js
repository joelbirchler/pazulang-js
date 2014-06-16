var λ = require('./fn.js');

module.exports = {
    '*': λ.reduce.bind(undefined, function(memo, x) { return memo * x; }),
    '+': λ.reduce.bind(undefined, function(memo, x) { return memo + x; }),
    '-': λ.reduce.bind(undefined, function(memo, x) { return memo - x; }),
    'first': λ.first,
    'rest': λ.rest
};
