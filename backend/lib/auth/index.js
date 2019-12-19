const util = require('util');
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
  const configHelper = dependencies('helpers').config;
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
    Promise.all([getConfiguration(), getBaseUrl(req.user)])
      .then(result => {
        const [config, baseUrl] = result;
        const redirectUrl = config.endSessionEndpoint ? `${config.endSessionEndpoint}?redirect_uri=${encodeURIComponent(baseUrl)}` : '/';

        logger.debug(`OIDC - Logout redirects to ${redirectUrl}`);
        req.logout();
        res.redirect(redirectUrl);
      })
      .catch(err => {
        logger.warn('OIDC - Error while building logout URL', err);
        req.logout();
        res.redirect('/');
      });
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
        scope: config.scope,
        endSessionEndpoint: config.end_session_endpoint
      }));
  }

  function getBaseUrl(user) {
    return util.promisify(configHelper.getBaseUrl)(user);
  }
};
