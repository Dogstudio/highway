// Polyfills
import 'babel-polyfill';

// Dependencies
import { expect } from 'chai';

// Highway
import Highway from '../dist/highway';

// DOM Parser
const PARSER = new window.DOMParser();

// Assertions
describe('Highway.Helpers', () => {
  it('Should return URL origin or `null`', () => {
    const a = '/foo';
    const b = 'http://bar.com/foo';

    expect(Highway.Helpers.getOrigin(a)).to.be.null;
    expect(Highway.Helpers.getOrigin(b)).to.be.equal('http://bar.com');
  });

  it('Should return URL pathname or `null`', () => {
    const a = 'http://bar.com';
    const b = 'http://bar.com/foo';

    expect(Highway.Helpers.getPathname(a)).to.be.null;
    expect(Highway.Helpers.getPathname(b)).to.be.equal('/foo');
  });

  it('Should return URL anchor or `null`', () => {
    const a = 'http://bar.com/foo';
    const b = 'http://bar.com/foo#anchor';

    expect(Highway.Helpers.getAnchor(a)).to.be.null;
    expect(Highway.Helpers.getAnchor(b)).to.be.equal('#anchor');
  });

  it('Should return URL parameters or `null`', () => {
    const a = 'http://bar.com/foo';
    const b = 'http://bar.com/foo?bar=foo';

    expect(Highway.Helpers.getParams(a)).to.be.null;
    expect(Highway.Helpers.getParams(b)).to.be.instanceof(Object);
  });

  it('Should always return page DOM', () => {
    const a = '<div></div>';
    const b = document.createElement('div');

    expect(Highway.Helpers.getDOM(a)).to.be.instanceof(Object);
    expect(Highway.Helpers.getDOM(b)).to.be.instanceof(Object);
  });

  it('Should return [router-view] DOM or `null`', () => {
    const a = PARSER.parseFromString('<div></div>', 'text/html');
    const b = PARSER.parseFromString('<div router-view></div>', 'text/html');

    expect(Highway.Helpers.getView(a)).to.be.null;
    expect(Highway.Helpers.getView(b)).to.be.instanceof(Object);
  });

  it('Should return page slug or empty string or `null`', () => {
    const a = document.createElement('div');
    const b = document.createElement('div');
    const c = document.createElement('div');

    b.setAttribute('router-view', '');
    c.setAttribute('router-view', 'home');

    expect(Highway.Helpers.getSlug(a)).to.be.null;
    expect(Highway.Helpers.getSlug(b)).to.be.empty;
    expect(Highway.Helpers.getSlug(c)).to.be.equal('home');
  });

  it('Should always return a renderer', () => {
    const a = {};
    const b = { 'foo': {} };

    expect(Highway.Helpers.getRenderer('foo', a)).to.be.instanceof(Object);
    expect(Highway.Helpers.getRenderer('foo', b)).to.be.instanceof(Object);
  });

  it('Should return a transition or `null`', () => {
    const a = undefined;
    const b = null;
    const c = {};
    const d = { 'foo': 'bar' };
    const e = { 'default': 'foo' };
    const f = { 'default': 'foo', 'foo': 'bar' };

    expect(Highway.Helpers.getTransition('foo', a)).to.be.null;
    expect(Highway.Helpers.getTransition('foo', b)).to.be.null;
    expect(Highway.Helpers.getTransition('foo', c)).to.be.null;
    expect(Highway.Helpers.getTransition('foo', d)).to.be.equal('bar');
    expect(Highway.Helpers.getTransition('foo', e)).to.be.equal('foo');
    expect(Highway.Helpers.getTransition('foo', f)).to.be.equal('bar');
  });
});
