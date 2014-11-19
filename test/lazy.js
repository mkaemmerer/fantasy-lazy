var λ           = require('fantasy-check/src/adapters/nodeunit'),
    applicative = require('fantasy-check/src/laws/applicative'),
    functor     = require('fantasy-check/src/laws/functor'),
    monad       = require('fantasy-check/src/laws/monad'),
    combinators = require('fantasy-combinators'),
    Identity    = require('fantasy-identities'),
    Lazy        = require('../fantasy-lazy'),
    constant    = combinators.constant,
    identity    = combinators.identity;

function run(a) {
  return Identity.of(a.run());
}

exports.lazy = {
  // Applicative Functor tests
  'All (Applicative)':          applicative.laws(λ)(Lazy, run),
  'Identity (Applicative)':     applicative.identity(λ)(Lazy, run),
  'Composition (Applicative)':  applicative.composition(λ)(Lazy, run),
  'Homomorphism (Applicative)': applicative.homomorphism(λ)(Lazy, run),
  'Interchange (Applicative)':  applicative.interchange(λ)(Lazy, run),

  // Functor tests
  'All (Functor)':         functor.laws(λ)(Lazy.of, run),
  'Identity (Functor)':    functor.identity(λ)(Lazy.of, run),
  'Composition (Functor)': functor.composition(λ)(Lazy.of, run),

  // Monad tests
  'All (Monad)':            monad.laws(λ)(Lazy, run),
  'Left Identity (Monad)':  monad.leftIdentity(λ)(Lazy, run),
  'Right Identity (Monad)': monad.rightIdentity(λ)(Lazy, run),
  'Associativity (Monad)':  monad.associativity(λ)(Lazy, run),
};
