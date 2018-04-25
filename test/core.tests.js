// Polyfills
import 'babel-polyfill';
import 'isomorphic-fetch';

// Dependencies
import sinon from 'sinon';
import chai from 'chai';

// Interface
const { expect } = chai;

// Highway
import Highway from '../src/index';

// DOM
import Home from './dom/home';

// Update Document
global.document = Home.page;

// Assertions
describe('Highway.Core', () => {
  const a = document.createElement('a');
  const b = document.createElement('a');

  a.href = '/foo';
  b.href = '/foo#anchor';

  document.body.appendChild(a);
  document.body.appendChild(b);

  it('Should be an instance of `Highway.Core`', () => {
    const Core = new Highway.Core();

    expect(Core).to.be.instanceof(Highway.Core);
  });

  it('Should bind/unbind `click` event on links', () => {
    const Core = new Highway.Core();

    sinon.spy(a, 'addEventListener');
    sinon.spy(b, 'removeEventListener');

    Core.bind();
    Core.unbind();

    expect(a.addEventListener.calledOnce).to.be.true;
    expect(b.removeEventListener.calledOnce).to.be.true;
  });

  it('Should call `click` method on `click` event', () => {
    sinon.spy(a, 'click');
    sinon.spy(b, 'click');

    a.click();
    b.click();

    expect(a.click.calledOnce).to.be.true;
    expect(b.click.calledOnce).to.be.true;
  });

  it('Should call `pushState` method on `click` event', () => {
    const Core = new Highway.Core();

    Core.pushState = sinon.spy();
    Core.state = { pathname: '' };

    a.click();

    expect(Core.pushState.calledOnce).to.be.true;
  });

  it('Should call `beforeFetch` method on `popState`', () => {
    const Core = new Highway.Core();

    Core.beforeFetch = sinon.spy();

    Core.state = { pathname: '' };
    Core.popState();

    expect(Core.beforeFetch.calledOnce).to.be.true;
  });

  it('Should call `beforeFetch` method on `pushState`', () => {
    const Core = new Highway.Core();

    Core.beforeFetch = sinon.spy();
    Core.pushState({ target: { href: '/foo' }});

    expect(Core.beforeFetch.calledOnce).to.be.true;
  });

  it('Should call `unbind` method on `beforeFetch`', () => {
    const Core = new Highway.Core();

    Core.unbind = sinon.spy();
    Core.state = { url: 'http://bar.com/foo' };
    Core.beforeFetch();

    expect(Core.unbind.calledOnce).to.be.true;
  });
});
