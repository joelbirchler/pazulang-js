var λ = require('./fn.js'),
    core = require('./core.js');

var tokenize = function(s) {
    // Simple tokenizer outputs an array of tokens
    // FIXME: handle quotes
    return s
        .replace(/\(/g, " ( ")
        .replace(/\)/g, " ) ")
        .trim()
        .split(/\s+/);
};

var treeize = function(tokens) {
    // Build tree structure from parenthesize

    if (!tokens.length) { throw "Unexpected end of expression."; }

    var token = tokens.shift();

    if (token == '(') {
        var list = [];
        while (tokens[0] != ')') {
            list.push(treeize(tokens));
        }
        tokens.shift();
        return list;
    } else if (token == ')') {
        throw "Unexpected ')' found."
    } else {
        return atomize(token);
    }

    return tokens;
};


var atomize = function(token) {
    var numAttempt = parseFloat(token);

    if (!isNaN(numAttempt)) {
        return {type:'number', value: numAttempt};
    } else {
        return {type:'identifier', value: token};
    }
};

var read = function(s) {
    return treeize(tokenize(s));
};

var Context = function(dict, parent) {
    this.dict = dict;
    this.parent = parent;

    this.find = function(identifier) {
        return (identifier in this.dict) ? this.dict[identifier] : (this.parent && this.parent.find(identifier));
    };
};


var eval = function(expression, context) {
    if (!context) { context = new Context(core); }

    // list
    if (expression instanceof Array) {
        var list = expression.map(function(x) { /* TODO: Can this lambda be removed?  */
            return eval(x, context);
        });

        var atom = λ.first(list);
        if (atom instanceof Function) {
            return atom.call(undefined, λ.rest(list));
        } else {
            return list;
        }

    } else if (expression.type === 'identifier') {
        return context.find(expression.value);

    } else {
        return expression.value;
    }
};

var print = console.log.bind(console);

module.exports = {
    readEval: function(s) {
        return eval(read(s));
    },
    readEvalPrint: function(s) {
        return print(eval(read(s))); // TODO: We need a λ.compose
    }
};

// TODO: When run directly, let's fire up a repl.

// https://www.hackerschool.com/blog/21-little-lisp-interpreter
// http://norvig.com/lispy.html
