'use strict';

var assert = require('chai').assert,
    data = require('../data'),
    nock = require('nock'),
    nockUtils = require('./nock_utils'),
    request = require('../../../lib/request'),
    transport = require('../../../lib/transport');

suite('request.propfind', function() {
  var xhr;

  setup(function() {
    xhr = new transport.Basic({ user: 'admin', password: 'admin' });
  });

  teardown(function() {
    nock.cleanAll();
  });

  test('should return request.Request', function() {
    assert.instanceOf(
      request.propfind({
        url: 'http://127.0.0.1:1337/',
        props: [ { name: 'catdog', namespace: 'DAV' } ],
        depth: '0'
      }),
      request.Request
    );
  });

  test('should set depth header', function() {
    var mock = nock('http://127.0.0.1:1337')
      .matchHeader('Depth', '0')  // Will only get intercepted if Depth => 0.
      .intercept('/', 'PROPFIND')
      .reply(200);

    var req = request.propfind({
      url: 'http://127.0.0.1:1337/',
      props: [ { name: 'catdog', namespace: 'DAV' } ],
      depth: '0'
    });

    return nockUtils.verifyNock(xhr.send(req), mock);
  });

  test('should add specified properties to propfind body', function() {
    var mock = nockUtils.extend(nock('http://127.0.0.1:1337'));
    mock.matchRequestBody('/', 'PROPFIND', function(body) {
      return body.indexOf('<d:catdog />') !== -1;
    });

    var req = request.propfind({
      url: 'http://127.0.0.1:1337/',
      props: [ { name: 'catdog', namespace: 'd' } ],
      depth: '0'
    });

    return nockUtils.verifyNock(xhr.send(req), mock);
  });

  test('should resolve with appropriate data structure', function() {
    nock('http://127.0.0.1:1337')
      .intercept('/', 'PROPFIND')
      .reply(200, data.propfind);

    var req = request.propfind({
      url: 'http://127.0.0.1:1337/',
      props: [
        { name: 'displayname', namespace: 'd' },
        { name: 'getctag', namespace: 'cs' },
        { name: 'supported-calendar-component-set', namespace: 'c' }
      ],
      depth: 1
    });

    return xhr.send(req).then(function(responses) {
      assert.isArray(responses);
      responses.forEach(function(response) {
        assert.typeOf(response.href, 'string');
        assert.operator(response.href.length, '>', 0);
        assert.ok('props' in response);
        assert.typeOf(response.props, 'object');
        if ('displayname' in response.props) {
          assert.typeOf(response.props.displayname, 'string');
          assert.operator(response.props.displayname.length, '>', 0);
        }
        if ('components' in response.props) {
          assert.isArray(response.props.components);
          assert.include(response.props.components, 'VEVENT');
        }
      });
    });
  });
});
