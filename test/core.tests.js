// Polyfills
import 'babel-polyfill';
import 'isomorphic-fetch';

// Dependencies
import sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

// Plugins
chai.use(chaiAsPromised);

// Interface
const { expect } = chai;

// Highway
import Highway from '../src/index';

// DOM
import Home from './dom/home';

// Update Document
global.document = Home.page;

// Core instance
const Core = new Highway.Core();

// Assertions
describe('Highway.Core', () => {
  const a = document.createElement('a');
  const b = document.createElement('a');

  a.href = 'http://bar.com/foo';
  b.href = 'http://bar.com/foo#anchor';

  document.body.appendChild(a);
  document.body.appendChild(b);

  it('Should be an instance of `Highway.Core`', () => {
    expect(Core).to.be.instanceof(Highway.Core);
  });

  it('Should bind/unbind `click` event on links', () => {
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
});
