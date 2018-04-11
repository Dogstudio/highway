// Polyfills
import 'babel-polyfill';

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
  const link = document.querySelector('a');

  it('Should be an instance of `Highway.Core`', () => {
    expect(Core).to.be.instanceof(Highway.Core);
  });

  it('Should bind/unbind `click` event on link and call `click` method', () => {
    sinon.spy(link, 'click');
    sinon.spy(link, 'addEventListener');
    sinon.spy(link, 'removeEventListener');

    Core.bind();
    Core.unbind();

    link.click();

    expect(link.click.calledOnce).to.be.true;
    expect(link.addEventListener.calledOnce).to.be.true;
    expect(link.removeEventListener.calledOnce).to.be.true;
  });
});
