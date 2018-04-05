// Polyfills
import 'babel-polyfill';

// Dependencies
import sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

// Interface
const { expect } = chai;

// Highway
import Highway from '../src/index';

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
const RENDERER = new Highway.Renderer({
  page: DOM,
  view: VIEW
});

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
    const a = undefined;
    const b = null;
    const c = {};
    const d = { 'foo': {} };

    expect(Highway.Helpers.getRenderer('foo', a)).to.be.instanceof(Object);
    expect(Highway.Helpers.getRenderer('foo', b)).to.be.instanceof(Object);
    expect(Highway.Helpers.getRenderer('foo', c)).to.be.instanceof(Object);
    expect(Highway.Helpers.getRenderer('foo', d)).to.be.instanceof(Object);
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

describe('Highway.Renderer', () => {
  it('Should be an instance of `Renderer`', () => {
    expect(RENDERER).to.be.instanceof(Highway.Renderer);
  });

  it('Should call `onEnter` and `onEnterCompleted` on `init`', () => {
    RENDERER.onEnter = sinon.spy();
    RENDERER.onEnterCompleted = sinon.spy();

    RENDERER.init();

    expect(RENDERER.onEnter.calledOnce).to.equal(true);
    expect(RENDERER.onEnterCompleted.calledOnce).to.equal(true);
  });

  it('Should remove `[router-view]` from the document on `remove`', () => {
    RENDERER.remove();

    const a = RENDERER.wrapper;
    const b = RENDERER.wrapper.querySelector('[router-view]');

    expect(a).to.be.instanceof(Object);
    expect(b).to.be.null;
  });

  it('Should add `[router-view]` to the document on `add`', () => {
    RENDERER.add();

    const a = RENDERER.wrapper;
    const b = RENDERER.wrapper.querySelector('[router-view]');

    expect(a).to.be.instanceof(Object);
    expect(b).to.be.instanceof(Object);
  });

  it('Should update the document on `update`', () => {
    RENDERER.update();

    const a = document.title;
    const b = document.body.className;
    const c = document.documentElement.className;

    expect(a).to.equal('Highway');
    expect(b).to.be.empty;
    expect(c).to.be.empty;
  });

  it('Should call `add`, `update`, `onEnter` and `onEnterCompleted` on `show`', () => {
    RENDERER.add = sinon.spy();
    RENDERER.update = sinon.spy();
    RENDERER.onEnter = sinon.spy();
    RENDERER.onEnterCompleted = sinon.spy();

    RENDERER.show().then(() => {
      expect(RENDERER.add.calledOnce).to.equal(true);
      expect(RENDERER.update.calledOnce).to.equal(true);
      expect(RENDERER.onEnter.calledOnce).to.equal(true);
      expect(RENDERER.onEnterCompleted.calledOnce).to.equal(true);
    });
  });

  it('Should call `remove`, `onLeave` and `onLeaveCompleted` on `hide`', () => {
    RENDERER.remove = sinon.spy();
    RENDERER.onLeave = sinon.spy();
    RENDERER.onLeaveCompleted = sinon.spy();

    RENDERER.hide().then(() => {
      expect(RENDERER.remove.calledOnce).to.equal(true);
      expect(RENDERER.onLeave.calledOnce).to.equal(true);
      expect(RENDERER.onLeaveCompleted.calledOnce).to.equal(true);
    });
  });
});
