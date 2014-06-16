var pazu = require('./pazu.js'),
    λ = require('./fn.js'),
    clc = require('cli-color');

var count = { pass: 0, fail: 0 };

var fail = function(/* messages, ... */) {
    console.log(clc.red.bold('✘ ' + λ.toArray(arguments).join(' ')));
    count.fail++;
};

var pass = function(/* messages, ... */) {
    console.log(clc.green('✓ ') + λ.toArray(arguments).join(' '));
    count.pass++;
};

var test = function(expression, expectedResult) {
    var result = pazu.readEval(expression);
    var log = (result === expectedResult) ? pass : fail;
    log(expression + ' => '  + result);
};


test('(* 10 (+ 1 2 3))', 60);
test('(- 3 2 1)', 0);
test('(= 42 42 42)', true);
test('(cat "This should work " "like we expect." " Ok?")', "This should work like we expect. Ok?");
test('((-> x (+ 1 x)) 5)', 6);
test('(def add1 (-> x (+ 1 x))(add1 5)', 6);

console.log(count.pass + ' passed, ' + count.fail + ' failed.');
