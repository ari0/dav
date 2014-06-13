'use strict';

var Request = require('./request'),
    dav = require('./dav'),
    parser = require('../parser'),
    template = require('../template');

function PropFind(url, properties, depth) {

    Request.call(this, {
        method  : 'PROPFIND',
        url     : url,
        headers : {
            'Content-Type' : 'application/xml; charset=utf8',
            'Depth'        : depth,
        },
        body    : generateBody(properties)
    });

}

module.exports = PropFind;

PropFind.prototype = Object.create(Request.prototype);

function generateBody(properties) {

    var body = '<?xml version="1.0"?><d:propfind xmlns:d="DAV:" xmlns:cs="http://calendarserver.org/ns/"><d:prop>\n';

    for(var ii in properties) {
        body+="  <" + properties[ii] + " />\n";
    }

    body+='</d:prop></d:propfind>';
    return body;

}


/**
 * Options:
 *   (String) url - endpoint to request.
 *   (String) username - username (perhaps email) for calendar user.
 *   (String) password - plaintext password for calendar user.
 *   (Array.<Object>) props - list of props to request.
 *   (String) depth - optional value for Depth header.
 *   (Object) sandbox - optional request sandbox.
 */
/*
module.exports = function(options) {
  var requestData = template.propfind({ props: options.props });

  function transformRequest(xhr) {
    dav.setRequestHeaders(xhr, options);
  }

  function transformResponse(xhr) {
    var multistatus = parser.multistatus(xhr.responseText);
    dav.verifyMultistatus(multistatus);
    var responses = multistatus.map(function(response) {
      return {
        href: response.href,
        props: dav.getProps(response.propstats)  // propstatus => props
      };
    });

    if (!options.mergeResponses) {
      return responses;
    }

    // Merge the props.
    var merged = dav.mergeProps(
      responses.map(function(response) {
        return response.props;
      })
    );

    return { props: merged, href: responses[0].href };
  }

  return new Request({
    method: 'PROPFIND',
    url: options.url,
    user: options.username,
    password: options.password,
    requestData: requestData,
    sandbox: options.sandbox,
    transformRequest: transformRequest,
    transformResponse: transformResponse
  });
};
*/
