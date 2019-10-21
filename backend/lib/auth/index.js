const {
  CONFIG_KEY,
  STRATEGY_NAME,
  DEFAULT_PASSPORT_CONFIG,
  PASSPORT_PARAMETERS
} = require('../constants');

module.exports = dependencies => {
  const logger = dependencies('logger');
  const coreAuth = dependencies('auth');
  const esnConfig = dependencies('esn-config');
  const passport = dependencies('passport').get();
  const strategy = require('./strategy')(dependencies);

  return {
    init,
    reconfigureOnChange
  };

  function init() {
    logger.info('OIDC - Initializing OIDC authentication');

    coreAuth.handlers.addLoginHandler(loginHandler);
    coreAuth.handlers.addLogoutHandler(logoutHandler);

    return configurePassport();
  }

  function reconfigureOnChange() {
    esnConfig('oidc').onChange(() => {
      logger.info('OIDC - Configuration changed, reconfiguring...');
      passport.unuse(STRATEGY_NAME);

      configurePassport();
    });
  }

  function configurePassport() {
    return getConfiguration()
      .then(configuration => passport.use(STRATEGY_NAME, strategy(configuration)))
      .catch(err => logger.error('OIDC - Error while initializing OIDC strategy', err));
  }

  function loginHandler(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    passport.authenticate(STRATEGY_NAME, { failureRedirect: '/' })(req, res, next);
  }

  // do not remove next parameter otherwise composable-middleware won't call it
  function logoutHandler(req, res, next) { // eslint-disable-line no-unused-vars
    req.logout();
    // TODO: Call the OIDC logout endpoint
    res.redirect('/');
  }

  function getConfiguration() {
    return esnConfig(CONFIG_KEY)
      .get()
      .then(config => ({ ...DEFAULT_PASSPORT_CONFIG, ...config, ...PASSPORT_PARAMETERS }))
      .then(config => ({
        issuer: config.issuer_url,
        clientID: config.client_id,
        clientSecret: config.client_secret,
        authorizationURL: config.authorization_url,
        tokenURL: config.token_url,
        userInfoURL: config.user_info_url,
        callbackURL: config.callback_url,
        scope: config.scope
      }));
  }
};
