exports.first = function(list) {
    return list[0];
};

exports.rest = function(list) {
    return list.slice(1);
};

exports.reduce = function(fn, list) {
    return list.reduce(fn);
};

exports.toArray = function(notArray) {
    return Array.prototype.slice.call(notArray, 0);
}
