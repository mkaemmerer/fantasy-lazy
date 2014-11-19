var daggy       = require('daggy'),
    combinators = require('fantasy-combinators'),
    Lazy        = daggy.tagged('run');

Lazy.of = function(x) {
  return new Lazy(combinators.constant(x));
};

Lazy.prototype.map = function(f) {
  var self = this;
  return new Lazy(function(){
    return f(self.run());
  });
};

Lazy.prototype.ap = function(x) {
  var self = this;
  return new Lazy(function(){
    return self.run()(x.run());
  });
};

Lazy.prototype.chain = function(f) {
  var self = this;
  return new Lazy(function() {
    var x = self.run(),
        t = f(x).run();
    return t;
  });
};


if (typeof module != 'undefined')
  module.exports = Lazy;
