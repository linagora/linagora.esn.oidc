const { STRATEGY_NAME } = require('../../../lib/constants');

module.exports = (dependencies, lib, router) => {
  const passport = dependencies('passport').get();
  const logger = dependencies('logger');

  router.get('/callback',
    passport.authenticate(STRATEGY_NAME, { failureRedirect: '/error' }),
    (req, res) => {
      logger.info('OIDC - Redirecting from OIDC callback');
      res.redirect('/');
    });
};
