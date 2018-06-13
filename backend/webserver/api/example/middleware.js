'use strict';

//arguments: dependencies, lib
module.exports = function() {
  return {
    canGet
  };

  // arguments: req, res, next
  function canGet(req, res, next) {
    next();
  }
};
