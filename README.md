davinci.js
==========

Javascript CalDAV client library for node.js and the browser.


[![Build Status](https://travis-ci.org/gaye/davinci.js.png?branch=master)](https://travis-ci.org/gaye/davinci.js)
[![Coverage Status](https://img.shields.io/coveralls/gaye/davinci.js.svg)](https://coveralls.io/r/gaye/davinci.js)

### API

#### davinci.createAccount = function(options) {};

Perform an initial download of a caldav account's data. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled with a [davinci.Account](https://github.com/gaye/davinci.js/blob/master/lib/model/account.js) object.

```
Options:
  (String) username - username (perhaps email) for calendar user.
  (String) password - plaintext password for calendar user.
  (String) server - some url for server (needn't be base url).
  (Object) sandbox - optional request sandbox.
  (String) timezone - VTIMEZONE calendar object.
```

#### davinci.createCalendarObject = function(calendar, options) {};

Create a calendar object on the parameter calendar. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled when the calendar has been created.

```
@param {davinci.Calendar} calendar the calendar to put the object on.

Options:
  (String) filename - name for the calendar ics file.
  (String) data - rfc 5545 VCALENDAR object.
  (Object) sandbox - optional request sandbox.
```

#### davinci.updateCalendarObject = function(calendarObject) {};

Persist updates to the parameter calendar object to the server. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled when the calendar has been updated.

```
@param {davinci.CalendarObject} calendarObject updated calendar object.

Options:
  (Object) sandbox - optional request sandbox.
```

#### davinci.deleteCalendarObject = function(calendarObject) {};

Delete the parameter calendar object on the server. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled when the calendar has been deleted.

```
@param {davinci.CalendarObject} calendarObject target calendar object.

Options:
  (Object) sandbox - optional request sandbox.
```

### davinci.syncCalendar = function(calendar) {};

Fetch changes from the remote server to the parameter calendar. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled with an updated [davinci.Calendar](https://github.com/gaye/davinci.js/blob/master/lib/model/calendar.js) object once sync is complete.

```
@param {davinci.Calendar} calendar the calendar to fetch changes for.

Options:
  (Object) sandbox - optional request sandbox.
  (String) timezone - VTIMEZONE calendar object.
```

#### davinci.createSandbox = function() {};

Create a request sandbox. Add requests to the sandbox like so:

```js
var sandbox = davinci.createSandbox();
davinci.createAccount({
  username: 'Yoshi',
  password: 'babybowsersoscaryomg',
  server: 'https://caldav.yoshisstory.com',
  sandbox: sandbox  // <- Insert sandbox here!
}).then(function(calendars) {
  // etc, etc.
});
```
And abort sandboxed requests as a group with `sandbox.abort()`.

### Advanced Usage

If you would like access to either

+ the lower-level request api or
+ xhr response objects without the added semantics of the parse and model layers

davinci exposes `calendarQuery`, `delete`, `discovery`, `propfind`, and `put` on `davinci.request`. Each of these methods accepts (as an option) a `transformResponse` function which will be called with an xhr object once its readyState is 4. `Request.send()` will resolve with whatever `transformResponse` returns.

### Directory Structure

```
lib/                         # Source code
lib/model/                   # Semantic data structures hydrated from dav data
lib/parser/                  # Abstractions for parsing server dav responses
lib/request/                 # Abstractions for issuing dav client requests
lib/template/                # Facilities for generating xml request bodies
test/                        # Test code
test/integration/            # End-to-end tests run against a dav server
test/integration/server/     # Code to bootstrap dav server
test/unit/                   # Unit tests
test/unit/data/              # Fixture data for unit tests
test/unit/parser/            # Test cases for parsing server dav responses
test/unit/request/           # Test cases for issuing dav client requests
test/unit/template/          # Test cases for xml templating helpers
```

### Related Material

+ [RFC 4791](http://tools.ietf.org/html/rfc4791)
+ [RFC 5545](http://tools.ietf.org/html/rfc5545)
