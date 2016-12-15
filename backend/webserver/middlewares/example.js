'use strict';

//arguments: dependencies, lib
module.exports = function() {

  // arguments: req, res, next, clientId
  function example(req, res) {
    return res.status(200).json({ message: 'middleware example' });
  }

  return {
    example
  };
};
