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
  it('Should be an instance of `Highway.Core`', () => {
    expect(Core).to.be.instanceof(Highway.Core);
  });

  it('Should `bind` and `unbind` the `click` event on links', () => {
    const a = document.createElement('a');

    document.body.appendChild(a);

    sinon.spy(a, 'addEventListener');
    sinon.spy(a, 'removeEventListener');

    Core.bind();

    expect(a.addEventListener.calledOnce).to.be.true;

    Core.unbind();

    expect(a.removeEventListener.calledOnce).to.be.true;
  });
});
