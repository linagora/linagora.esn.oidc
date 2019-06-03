const request = require('supertest');
const { expect } = require('chai');

describe('The example API', function() {
  let user, app, helpers;
  const password = 'secret';

  beforeEach(function(done) {
    helpers = this.helpers;
    app = helpers.modules.current.app;

    helpers.api.applyDomainDeployment('linagora_IT', function(err, models) {
      if (err) {
        return done(err);
      }
      user = models.users[0];

      done();
    });
  });

  describe('GET /example', function() {
    it('should return 401 if not logged in', function(done) {
      helpers.api.requireLogin(app, 'get', '/seed/api/example', done);
    });

    it('should return a message', function(done) {
      helpers.api.loginAsUser(app, user.emails[0], password, function(err, requestAsMember) {
        if (err) {
          return done(err);
        }
        const req = requestAsMember(request(app).get('/seed/api/example'));

        req.expect(200).end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.body).to.deep.equal({ message: 'controller example' });

          done();
        });
      });
    });
  });
});
