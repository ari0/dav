dav [![Build Status](https://travis-ci.org/gaye/dav.png?branch=master)](https://travis-ci.org/gaye/dav) [![Coverage Status](https://img.shields.io/coveralls/gaye/dav.svg)](https://coveralls.io/r/gaye/dav)
=========

caldav and carddav client for nodejs and the browser.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [API](#api)
  - [accounts](#accounts)
    - [dav.createAccount(options)](#davcreateaccountoptions)
  - [calendars](#calendars)
    - [dav.createCalendarObject(calendar, options)](#davcreatecalendarobjectcalendar-options)
    - [dav.updateCalendarObject(calendarObject, options)](#davupdatecalendarobjectcalendarobject-options)
    - [dav.deleteCalendarObject(calendarObject, options)](#davdeletecalendarobjectcalendarobject-options)
    - [dav.syncCalendar(calendar, options)](#davsynccalendarcalendar-options)
  - [contacts](#contacts)
    - [dav.createCard(addressBook, options)](#davcreatecardaddressbook-options)
    - [dav.updateCard(card, options)](#davupdatecardcard-options)
    - [dav.deleteCard(card, options)](#davdeletecardcard-options)
    - [dav.syncAddressBook(addressBook, options)](#davsyncaddressbookaddressbook-options)
  - [sandbox](#sandbox)
    - [dav.createSandbox()](#davcreatesandbox)
  - [transport](#transport)
    - [dav.transport.Basic(credentials)](#davtransportbasiccredentials)
      - [dav.transport.Basic#send(request, options)](#davtransportbasic#sendrequest-options)
    - [dav.transport.OAuth2(credentials)](#davtransportoauth2credentials)
      - [dav.transport.OAuth2#send(request, options)](#davtransportoauth2#sendrequest-options)
  - [request](#request)
    - [dav.request.addressBookQuery(options)](#davrequestaddressbookqueryoptions)
    - [dav.request.basic(options)](#davrequestbasicoptions)
    - [dav.request.calendarQuery(options)](#davrequestcalendarqueryoptions)
    - [dav.request.discovery(options)](#davrequestdiscoveryoptions)
    - [dav.request.propfind(options)](#davrequestpropfindoptions)
    - [dav.request.syncCollection(options)](#davrequestsynccollectionoptions)
  - [Client](#client)
    - [dav.Client(xhr, options)](#davclientxhr-options)
      - [dav.Client#send(req, options)](#davclient#sendreq-options)
  - [Example Usage](#example-usage)
    - [Using the lower-level api](#using-the-lower-level-api)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## API

### accounts

#### dav.createAccount(options)

Perform an initial download of a caldav or carddav account's data. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled with a [dav.Account](https://github.com/gaye/dav/blob/master/lib/model/account.js) object.

```
Options:

  (String) accountType - one of 'caldav' or 'carddav'. Defaults to 'caldav'.
  (Array.<Object>) filters - list of caldav filters to send with request.
  (Object) sandbox - optional request sandbox.
  (String) server - some url for server (needn't be base url).
  (String) timezone - VTIMEZONE calendar object.
  (dav.Transport) xhr - request sender.
```

### calendars

#### dav.createCalendarObject(calendar, options)

Create a calendar object on the parameter calendar. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled when the calendar has been created.

```
@param {dav.Calendar} calendar the calendar to put the object on.

Options:

  (String) data - rfc 5545 VCALENDAR object.
  (String) filename - name for the calendar ics file.
  (Object) sandbox - optional request sandbox.
  (dav.Transport) xhr - request sender.
```

#### dav.updateCalendarObject(calendarObject, options)

Persist updates to the parameter calendar object to the server. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled when the calendar has been updated.

```
@param {dav.CalendarObject} calendarObject updated calendar object.

Options:

  (Object) sandbox - optional request sandbox.
  (dav.Transport) xhr - request sender.
```

#### dav.deleteCalendarObject(calendarObject, options)

Delete the parameter calendar object on the server. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled when the calendar has been deleted.

```
@param {dav.CalendarObject} calendarObject target calendar object.

Options:

  (Object) sandbox - optional request sandbox.
  (dav.Transport) xhr - request sender.
```

#### dav.syncCalendar(calendar, options)

Fetch changes from the remote server to the parameter calendar. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled with an updated [dav.Calendar](https://github.com/gaye/dav/blob/master/lib/model/calendar.js) object once sync is complete.

```
@param {dav.Calendar} calendar the calendar to fetch changes for.

Options:

  (Array.<Object>) filters - list of caldav filters to send with request.
  (Object) sandbox - optional request sandbox.
  (String) syncMethod - either 'basic' or 'webdav'. If unspecified, will
      try to do webdav sync and failover to basic sync if rfc 6578 is not
      supported by the server.
  (String) timezone - VTIMEZONE calendar object.
  (dav.Transport) xhr - request sender.
```

### contacts

#### dav.createCard(addressBook, options)

Create a vcard object on the parameter address book. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled when the vcard has been created.

```
@param {dav.AddressBook} addressBook the address book to put the object on.

Options:

  (String) data - VCARD object.
  (String) filename - name for the vcard vcf file.
  (Object) sandbox - optional request sandbox.
  (dav.Transport) xhr - request sender.
```

#### dav.updateCard(card, options)

Persist updates to the parameter vcard object to the server. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled when the vcard has been updated.

```
@param {dav.VCard} card updated vcard object.

Options:

  (Object) sandbox - optional request sandbox.
  (dav.Transport) xhr - request sender.
```

#### dav.deleteCard(card, options)

Delete the parameter vcard object on the server. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled when the vcard has been deleted.

```
@param {dav.VCard} card target vcard object.

Options:

  (Object) sandbox - optional request sandbox.
  (dav.Transport) xhr - request sender.
```

#### dav.syncAddressBook(addressBook, options)

Fetch changes from the remote server to the parameter address books. Returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will be fulfilled with an updated [dav.AddressBook](https://github.com/gaye/dav/blob/master/lib/model/address_book.js) object once sync is complete.

```
@param {dav.AddressBook} addressBook the address book to fetch changes for.

Options:

  (Object) sandbox - optional request sandbox.
  (String) syncMethod - either 'basic' or 'webdav'. If unspecified, will
      try to do webdav sync and failover to basic sync if rfc 6578 is not
      supported by the server.
  (dav.Transport) xhr - request sender.
```

### sandbox

#### dav.createSandbox()

Create a request sandbox. Add requests to the sandbox like so:

```js
var sandbox = dav.createSandbox();
dav.createAccount({
  username: 'Yoshi',
  password: 'babybowsersoscaryomg',
  server: 'https://caldav.yoshisstory.com',
  sandbox: sandbox  // <- Insert sandbox here!
}).then(function(calendars) {
  // etc, etc.
});
```
And abort sandboxed requests as a group with `sandbox.abort()`.

### transport

#### dav.transport.Basic(credentials)

Create a new `dav.transport.Basic` object. This sends dav requests using http basic authentication.

```
@param {dav.Credentials} credentials user authorization.
```

##### dav.transport.Basic#send(request, options)

```
@param {dav.Request} request object with request info.
@return {Promise} a promise that will be resolved with an xhr request after its readyState is 4 or the result of applying an optional request `transformResponse` function to the xhr object after its readyState is 4.

Options:

  (Object) sandbox - optional request sandbox.
```

#### dav.transport.OAuth2(credentials)

Create a new `dav.transport.OAuth2` object. This sends dav requests authorized via rfc 6749 oauth2.

```
@param {dav.Credentials} credentials user authorization.
```

##### dav.transport.OAuth2#send(request, options)

```
@param {dav.Request} request object with request info.
@return {Promise} a promise that will be resolved with an xhr request after its readyState is 4 or the result of applying an optional request `transformResponse` function to the xhr object after its readyState is 4.

Options:

  (Object) sandbox - optional request sandbox.
```

### request

#### dav.request.addressBookQuery(options)

```
Options:

  (String) depth - optional value for Depth header.
  (Array.<Object>) props - list of props to request.
  (String) url - endpoint to request.
```

#### dav.request.basic(options)

```
Options:

  (String) data - put request body.
  (String) method - http method.
  (String) etag - cached calendar object etag.
  (String) url - endpoint to request.
```

#### dav.request.calendarQuery(options)

```
Options:

  (String) depth - optional value for Depth header.
  (Array.<Object>) filters - list of filters to send with request.
  (Array.<Object>) props - list of props to request.
  (String) timezone - VTIMEZONE calendar object.
  (String) url - endpoint to request.
```

#### dav.request.discovery(options)

```
Options:

  (String) bootstrap - one of 'caldav' or 'carddav'. Defaults to 'caldav'.
  (String) server - url for calendar server.
```

#### dav.request.propfind(options)

```
Options:

  (String) depth - optional value for Depth header.
  (Array.<Object>) props - list of props to request.
  (String) url - endpoint to request.
```

#### dav.request.syncCollection(options)

```
Options:

  (String) depth - option value for Depth header.
  (Array.<Object>) props - list of props to request.
  (Number) syncLevel - indicates scope of the sync report request.
  (String) syncToken - synchronization token provided by the server.
  (String) url - endpoint to request.
```

### Client

#### dav.Client(xhr, options)

Create a new `dav.Client` object. The client interface allows consumers to set their credentials and transport once and then make authorized requests without passing them to each request. Each of the other, public API methods should be available on `dav.Client` objects.

```
@param {dav.Transport} xhr - request sender.

Options:

  (String) baseUrl - root url to resolve relative request urls with.
```

##### dav.Client#send(req, options)

Send a request using this client's transport (and perhaps baseUrl).

```
@param {dav.request.Request} req - dav request.
@return {Promise} a promise that will be resolved with an xhr request after its readyState is 4 or the result of applying an optional request `transformResponse` function to the xhr object after its readyState is 4.

Options:

  (Object) sandbox - optional request sandbox.
  (String) url - relative url for request.
```

### Example Usage

```js
var dav = require('dav');

var xhr = new dav.transport.Basic(
  new dav.Credentials({
    username: 'xxx',
    password: 'xxx'
  })
);

dav.createAccount({ server: 'http://dav.example.com', xhr: xhr })
.then(function(account) {
  // account instanceof dav.Account
  account.calendars.forEach(function(calendar) {
    console.log('Found calendar named ' + calendar.displayName);
    // etc.
  });
});

// Or, using the dav.Client interface:

var client = new dav.Client(xhr);
// No transport arg
client.createAccount({
  server: 'http://dav.example.com,
  accountType: 'carddav'
})
.then(function(account) {
  account.addressBooks.forEach(function(addressBook) {
    console.log('Found address book name ' + addressBook.displayName);
    // etc.
  });
});
```

#### Using the lower-level api

```
var dav = require('dav');

var client = new dav.Client(
  new dav.transport.Basic(
    new dav.Credentials({
      username: 'xxx',
      password: 'xxx'
    })
  ),
  {
    baseUrl: 'https://mail.mozilla.com'
  }
);

var req = dav.request.basic({
  method: 'PUT',
  data: 'BEGIN:VCALENDAR\nEND:VCALENDAR',
  etag: '12345'
});

client.send(req, { url: '/calendars/123.ics' })
.then(function(response) {
  // response instanceof XMLHttpRequest
});
```

Or perhaps without the client:

```
var dav = require('dav');

var xhr = new dav.transport.Basic(
  new dav.Credentials({
    username: 'xxx',
    password: 'xxx'
  })
);

var req = dav.request.basic({
  method: 'PUT',
  data: 'BEGIN:VCALENDAR\nEND:VCALENDAR',
  etag: '12345',
  url: 'https://mail.mozilla.com/calendars/123.ics'
});

xhr.send(req)
.then(function(response) {
  // response instanceof XMLHttpRequest
});
```

For more example usages, check out the [suite of integration tests](https://github.com/gaye/dav/tree/master/test/integration).
