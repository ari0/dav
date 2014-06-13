'use strict';

var Request = require('./request'),
    dav = require('./dav'),
    parser = require('../parser'),
    template = require('../template');

/**
 * Options:
 *   (String) url - endpoint to request.
 *   (String) username - username (perhaps email) for calendar user.
 *   (String) password - plaintext password for calendar user.
 *   (Array.<Object>) props - list of props to request.
 *   (Array.<Object>) filters - list of filters to send with request.
 *   (String) depth - optional value for Depth header.
 *   (Object) sandbox - optional request sandbox.
 *   (String) timezone - VTIMEZONE calendar object.
 *   (Function) transformResponse - hook to optionally override default
 *       xhr response handling.
 */
module.exports = function(options) {
  var requestData = template.calendarQuery({
    props: options.props,
    filters: options.filters,
    timezone: options.timezone
  });

  function transformRequest(xhr) {
    dav.setRequestHeaders(xhr, options);
  }

  function transformResponse(xhr) {
    var multistatus = parser.multistatus(xhr.responseText);
    dav.verifyMultistatus(multistatus);
    return multistatus.map(function(response) {
      return { href: response.href, props: dav.getProps(response.propstats) };
    });
  }

  return new Request({
    method: 'REPORT',
    url: options.url,
    user: options.username,
    password: options.password,
    requestData: requestData,
    sandbox: options.sandbox,
    transformRequest: transformRequest,
    transformResponse: options.transformResponse || transformResponse
  });
};
