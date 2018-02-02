// Chai methods
const expect = require('chai').expect;

// Router
let Router = require('../src/core.js');
    Router = new Router();

// Router assertions
describe('Router', () => {
  // Path assertion
  describe('Router.path', () => {
    it ('Should return `/foo/bar` from `http://bar.com/foo/bar` URL.', () => {
      // Fake URL
      Router.url = 'http://bar.com/foo/bar';

      // Assertion
      expect(Router.path).to.be.equal('/foo/bar');
    });
  });

  // Base URL assertion
  describe('Router.baseurl', () => {
    it ('Should return `http://bar.com` from `http://bar.com/foo/bar` URL.', () => {
      // Fake URL
      Router.url = 'http://bar.com/foo/bar';

      // Assertion
      expect(Router.baseurl).to.be.equal('http://bar.com');
    });
  });

  // Params URL assertion
  describe('Router.params', () => {
    it ('Should return value `bar` of `foo` parameter from `http://bar.com/?foo=bar` URL (simple).', () => {
      // Fake URL
      Router.url = 'http://bar.com/?foo=bar';

      // Assertion
      expect(Router.params['foo']).to.be.equal('bar');
    });

    it ('Should return value `foo` of `bar` parameter from `http://bar.com/?foo=bar&bar=foo` URL (multiple).', () => {
      // Fake URL
      Router.url = 'http://bar.com/?foo=bar&bar=foo';

      // Assertion
      expect(Router.params['bar']).to.be.equal('foo');
    });

    it ('Should return value `bar` of `foo` parameter from `https://bar.com/foo/bar/?foo=bar&bar=foo` URL (complex).', () => {
      // Fake URL
      Router.url = 'https://bar.com/foo/bar/?foo=bar&bar=foo';

      // Assertion
      expect(Router.params['foo']).to.be.equal('bar');
    });
  });

  // Anchor URL assertion
  describe('Router.anchor', () => {
    it ('Should return `#anchor` from `http://bar.com/#anchor` URL (simple).', () => {
      // Fake URL
      Router.url = 'http://bar.com/#anchor';

      // Assertion
      expect(Router.anchor).to.be.equal('#anchor');
    });

    it ('Should return `#anchor` from `https://bar.com/foo/bar/?foo=bar&bar=foo#anchor` URL (complex).', () => {
      // Fake URL
      Router.url = 'https://bar.com/foo/bar/?foo=bar&bar=foo#anchor';

      // Assertion
      expect(Router.anchor).to.be.equal('#anchor');
    });
  });

  // Anchor check assertion
  describe('Router.hasAnchor', () => {
    it ('Should return `true` from `http://bar.com/#anchor` URL (positive).', () => {
      // Fake URL
      Router.url = 'http://bar.com/#anchor';

      // Assertion
      expect(Router.hasAnchor()).to.be.true;
    });

    it ('Should return `false` from `https://bar.com/` URL (negative).', () => {
      // Fake URL
      Router.url = 'https://bar.com/';

      // Assertion
      expect(Router.hasAnchor()).to.be.false;
    });
  });

  // Parameters check assertion
  describe('Router.hasParams', () => {
    it ('Should return `true` from `http://bar.com/?foo=bar` URL (positive).', () => {
      // Fake URL
      Router.url = 'http://bar.com/?foo=bar';

      // Assertion
      expect(Router.hasParams()).to.be.true;
    });

    it ('Should return `false` from `https://bar.com/` URL (negative).', () => {
      // Fake URL
      Router.url = 'https://bar.com/';

      // Assertion
      expect(Router.hasParams()).to.be.false;
    });
  });

  // Single parameter check assertion
  describe('Router.hasParam', () => {
    it ('Should return `true` for `foo` parameter from `http://bar.com/?foo=bar` URL (positive).', () => {
      // Fake URL
      Router.url = 'http://bar.com/?foo=bar';

      // Assertion
      expect(Router.hasParam('foo')).to.be.true;
    });

    it ('Should return `false` for `bar` parameter from `https://bar.com/?foo=bar` URL (negative).', () => {
      // Fake URL
      Router.url = 'http://bar.com/?foo=bar';

      // Assertion
      expect(Router.hasParam('bar')).to.be.false;
    });

    it ('Should return `false` if no parameter given.', () => {
      // Fake URL
      Router.url = 'http://bar.com/?foo=bar';

      // Assertion
      expect(Router.hasParam()).to.be.false;
    });
  });
});
