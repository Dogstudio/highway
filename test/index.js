// Polyfills
import 'babel-polyfill';

// Dependencies
import { expect } from 'chai';

// Highway
import Helpers from '../src/helpers';
import Renderer from '../src/renderer';

// Constants
const PARSER = new window.DOMParser();
const RENDERER = new Renderer({
  page: document.createElement('div'),
  view: document.createElement('div')
});

// Assertions
describe('Highway.Helpers', () => {
  it('Should return URL origin or `null`', () => {
    const a = '/foo';
    const b = 'http://bar.com/foo';

    expect(Helpers.getOrigin(a)).to.be.null;
    expect(Helpers.getOrigin(b)).to.be.equal('http://bar.com');
  });

  it('Should return URL pathname or `null`', () => {
    const a = 'http://bar.com';
    const b = 'http://bar.com/foo';

    expect(Helpers.getPathname(a)).to.be.null;
    expect(Helpers.getPathname(b)).to.be.equal('/foo');
  });

  it('Should return URL anchor or `null`', () => {
    const a = 'http://bar.com/foo';
    const b = 'http://bar.com/foo#anchor';

    expect(Helpers.getAnchor(a)).to.be.null;
    expect(Helpers.getAnchor(b)).to.be.equal('#anchor');
  });

  it('Should return URL parameters or `null`', () => {
    const a = 'http://bar.com/foo';
    const b = 'http://bar.com/foo?bar=foo';

    expect(Helpers.getParams(a)).to.be.null;
    expect(Helpers.getParams(b)).to.be.instanceof(Object);
  });

  it('Should always return page DOM', () => {
    const a = '<div></div>';
    const b = document.createElement('div');

    expect(Helpers.getDOM(a)).to.be.instanceof(Object);
    expect(Helpers.getDOM(b)).to.be.instanceof(Object);
  });

  it('Should return [router-view] DOM or `null`', () => {
    const a = PARSER.parseFromString('<div></div>', 'text/html');
    const b = PARSER.parseFromString('<div router-view></div>', 'text/html');

    expect(Helpers.getView(a)).to.be.null;
    expect(Helpers.getView(b)).to.be.instanceof(Object);
  });

  it('Should return page slug or empty string or `null`', () => {
    const a = document.createElement('div');
    const b = document.createElement('div');
    const c = document.createElement('div');

    b.setAttribute('router-view', '');
    c.setAttribute('router-view', 'home');

    expect(Helpers.getSlug(a)).to.be.null;
    expect(Helpers.getSlug(b)).to.be.empty;
    expect(Helpers.getSlug(c)).to.be.equal('home');
  });

  it('Should always return a renderer', () => {
    const a = undefined;
    const b = null;
    const c = {};
    const d = { 'foo': {} };

    expect(Helpers.getRenderer('foo', a)).to.be.instanceof(Object);
    expect(Helpers.getRenderer('foo', b)).to.be.instanceof(Object);
    expect(Helpers.getRenderer('foo', c)).to.be.instanceof(Object);
    expect(Helpers.getRenderer('foo', d)).to.be.instanceof(Object);
  });

  it('Should return a transition or `null`', () => {
    const a = undefined;
    const b = null;
    const c = {};
    const d = { 'foo': 'bar' };
    const e = { 'default': 'foo' };
    const f = { 'default': 'foo', 'foo': 'bar' };

    expect(Helpers.getTransition('foo', a)).to.be.null;
    expect(Helpers.getTransition('foo', b)).to.be.null;
    expect(Helpers.getTransition('foo', c)).to.be.null;
    expect(Helpers.getTransition('foo', d)).to.be.equal('bar');
    expect(Helpers.getTransition('foo', e)).to.be.equal('foo');
    expect(Helpers.getTransition('foo', f)).to.be.equal('bar');
  });
});

describe('Highway.Renderer', () => {
  it('Should be an instance of `Renderer`', () => {
    expect(RENDERER).to.be.instanceof(Renderer);
  });

  it('Should process methods be `undefined` by default', () => {
    expect(RENDERER.onEnter).to.be.undefined;
    expect(RENDERER.onLeave).to.be.undefined;
    expect(RENDERER.onEnterCompleted).to.be.undefined;
    expect(RENDERER.onLeaveCompleted).to.be.undefined;
  });
});
