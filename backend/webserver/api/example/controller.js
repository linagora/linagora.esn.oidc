'use strict';

// arguments: dependencies, lib
module.exports = function() {
  return {
    get
  };

  function get(req, res) {
    return res.status(200).json({ message: 'controller example' });
  }
};
