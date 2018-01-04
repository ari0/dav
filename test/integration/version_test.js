import { expect } from 'chai';

import * as dav from '../../dist_test/dav';
import { version } from '../../package';

suite('version', function() {
  test('should be the same as package.json', function() {
    expect(dav.version).to.equal(version);
  });
});
