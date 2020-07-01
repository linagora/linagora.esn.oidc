module.exports = {
  MODULE_NAME: 'linagora.esn.oidc',
  CONFIG_KEY: 'openid-connect',
  STRATEGY_NAME: 'passport-oidc',
  CLIENT_ID: 'openpaas-esn',
  DEFAULT_PASSPORT_CONFIG: {
    issuer_url: 'http://localhost:8888/auth/realms/master',
    authorization_url: 'http://localhost:8888/auth/realms/master/protocol/openid-connect/auth',
    token_url: 'http://localhost:8888/auth/realms/master/protocol/openid-connect/token',
    user_info_url: 'http://localhost:8888/auth/realms/master/protocol/openid-connect/userinfo',
    end_session_endpoint: 'http://localhost:8888/auth/realms/master/protocol/openid-connect/logout',
    client_id: 'openpaas-esn'
  },
  PASSPORT_PARAMETERS: {
    callback_url: '/linagora.esn.oidc/callback',
    scope: 'openid profile email'
  }
};
