// Polyfills
import 'babel-polyfill';

// Dependencies
import sinon from 'sinon';
import { expect } from 'chai';

// Highway
import Helpers from '../src/helpers';
import Renderer from '../src/renderer';

// DOM
import HTML from './page';

// DOM Parser
const PARSER = new window.DOMParser();

// DOM Elements
const DOM = PARSER.parseFromString(HTML, 'text/html');
const VIEW = DOM.querySelector('[router-view]');

// Update Document
global.document = DOM;

// Renderer
const RENDERER = new Renderer({
  page: DOM,
  view: VIEW
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

  it('Should call `onEnter` and `onEnterCompleted` on `init`', () => {
    RENDERER.onEnter = sinon.spy();
    RENDERER.onEnterCompleted = sinon.spy();

    RENDERER.init();

    expect(RENDERER.onEnter.calledOnce).to.equal(true);
    expect(RENDERER.onEnterCompleted.calledOnce).to.equal(true);
  });

  it('Should update the document on `remove`', () => {
    RENDERER.remove();

    const view = RENDERER.wrapper.querySelector('[router-view]');

    expect(RENDERER.wrapper).to.be.instanceof(Object);
    expect(view).to.be.null;
  });

  it('Should update the document on `add`', () => {
    RENDERER.add();

    const view = RENDERER.wrapper.querySelector('[router-view]');

    expect(RENDERER.wrapper).to.be.instanceof(Object);
    expect(view).to.be.instanceof(Object);
  });
});
