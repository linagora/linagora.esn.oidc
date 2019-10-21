module.exports = dependencies => {
  const auth = require('./auth')(dependencies);

  function init() {
    auth.init();
  }

  return {
    init
  };
};
