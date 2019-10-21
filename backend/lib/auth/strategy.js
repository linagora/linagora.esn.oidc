const { promisify } = require('util');
const { parseOneAddress } = require('email-addresses');
const OidcStrategy = require('passport-openidconnect').Strategy;

module.exports = dependencies => {
  const coreUser = dependencies('user');
  const coreDomain = dependencies('domain');
  const logger = dependencies('logger');

  return options => {
    logger.info('OIDC - Creating OIDC Passport strategy with', options);

    return new OidcStrategy(options, verify);
  };

  function verify(issuer, sub, profile, accessToken, refreshToken, done) {
    logger.debug('OIDC - Got response from OIDC server, checking user in OpenPaaS', issuer, sub, profile, accessToken, refreshToken);

    const email = profile._json.email;

    if (!email) {
      logger.error('OIDC - "email" is required in scope, check OIDC configuration');

      return done(null, false);
    }

    // TODO: Some OIDC implementations are putting domain in the clientId
    // For example uuid-uuid-uuid@domain.tld
    const domainName = parseOneAddress(email).domain;

    getDomainByName(domainName)
      .then(domainId => buildUserProfile(domainId, profile))
      .then(profile => findOrCreate(email, profile))
      .then(user => {
        if (!user) {
          logger.error('OIDC - Can not find or create user from OIDC one');

          return done(null, false);
        }

        done(null, user);
      })
      .catch(err => {
        logger.error('OIDC - Error while searching user', err);
        done(null, false);
      });
  }

  function buildUserProfile(domainId, oidcProfile) {
    return Promise.resolve({
      username: oidcProfile._json.email,
      domainId,
      displayName: oidcProfile.displayName
    });
  }

  function findOrCreate(email, profile) {
    const findByEmail = promisify(coreUser.findByEmail);
    const updateUser = promisify(coreUser.update);
    const provisionUser = promisify(coreUser.provisionUser);

  return findByEmail(email)
    .then(user => {
      const userProfile = coreUser.translate(user, profile);

      return (user ? updateUser : provisionUser)(userProfile);
    });
  }

  function getDomainByName(domainName) {
    return coreDomain.getByName(domainName)
      .then(domain => (domain && domain.id))
      .then(domainId => {
        if (!domainId) {
          throw new Error('OIDC - Can not find the domain with name', domainName);
        }

        return domainId;
      });
  }
};
