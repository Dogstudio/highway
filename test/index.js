// Dependencies
const { expect } = require('chai');

// Helpers
const { Helpers } = require('../dist/highway.js');

// Helpers assertions
describe('Helpers', () => {
  describe('Helpers.getOrigin', () => {
    it('Should return `http://bar.com` from `http://bar.com/foo/bar` URL.', () => {
      // Fake URL
      const url = 'http://bar.com/foo/bar';

      // Assertion
      expect(Helpers.getOrigin(url)).to.be.equal('http://bar.com');
    });

    it('Should return `null` from `/foo/bar` URL.', () => {
      // Fake URL
      const url = '/foo/bar';

      // Assertion
      // eslint-disable-next-line
      expect(Helpers.getOrigin(url)).to.be.null;
    });
  });

  describe('Helpers.getPathname', () => {
    it('Should return `/foo` from `http://bar.com/foo` URL.', () => {
      // Fake URL
      const url = 'http://bar.com/foo';

      // Assertion
      expect(Helpers.getPathname(url)).to.be.equal('/foo');
    });

    it('Should return `null` from `http://bar.com` URL.', () => {
      // Fake URL
      const url = 'http://bar.com';

      // Assertion
      // eslint-disable-next-line
      expect(Helpers.getPathname(url)).to.be.null;
    });
  });

  describe('Helpers.getAnchor', () => {
    it('Should return `#anchor` from `http://bar.com/foo#anchor` URL.', () => {
      // Fake URL
      const url = 'http://bar.com/foo#anchor';

      // Assertion
      expect(Helpers.getAnchor(url)).to.be.equal('#anchor');
    });

    it('Should return `null` from `http://bar.com/foo` URL.', () => {
      // Fake URL
      const url = 'http://bar.com/foo';

      // Assertion
      // eslint-disable-next-line
      expect(Helpers.getAnchor(url)).to.be.null;
    });
  });

  describe('Helpers.getParams', () => {
    it('Should return an object of parameters from `http://bar.com/foo?bar=foo&foo=bar` URL.', () => {
      // Fake URL
      const url = 'http://bar.com/foo?bar=foo&foo=bar';

      // Assertion
      expect(Helpers.getParams(url)).to.be.instanceof(Object);
    });

    it('Should return `null` from `http://bar.com/foo` URL.', () => {
      // Fake URL
      const url = 'http://bar.com/foo';

      // Assertion
      // eslint-disable-next-line
      expect(Helpers.getParams(url)).to.be.null;
    });
  });

  describe('Helpers.getParams', () => {
    it('Should return `foo` for `bar` parameter from `http://bar.com/foo?bar=foo` URL.', () => {
      // Fake URL
      const url = 'http://bar.com/foo?bar=foo';

      // Assertion
      expect(Helpers.getParam(url, 'bar')).to.be.equal('foo');
    });

    it('Should return `null` for `foo` parameter from `http://bar.com/foo?bar=foo` URL.', () => {
      // Fake URL
      const url = 'http://bar.com/foo?bar=foo';

      // Assertion
      // eslint-disable-next-line
      expect(Helpers.getParam(url, 'foo')).to.be.null;
    });
  });

  describe('Helpers.getInfos', () => {
    it('Should return an object of infos from `http://bar.com/`', () => {
      // Fake URL
      const url = 'http://bar.com/';

      // Assertion
      expect(Helpers.getInfos(url)).to.be.instanceof(Object);
    });
  });
});
