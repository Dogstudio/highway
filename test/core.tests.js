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

// Fake link
const link = document.createElement('a');

// Assertions
describe('Highway.Core', () => {
  it('Should be an instance of `Highway.Core`', () => {
    expect(Core).to.be.instanceof(Highway.Core);
  });

  it('Should `bind` and `unbind` the `click` event on links', () => {
    document.body.appendChild(link);

    sinon.spy(link, 'addEventListener');
    sinon.spy(link, 'removeEventListener');

    Core.bind();

    expect(link.addEventListener.calledOnce).to.be.true;

    Core.unbind();

    expect(link.removeEventListener.calledOnce).to.be.true;

    document.body.removeChild(link);
  });

  it('Should call `click` method on `click` event on links', () => {
    document.body.appendChild(link);

    Core.click = sinon.spy();
    Core.bind();

    link.href = 'http://bar.com/foo';
    link.click();

    expect(Core.click.calledOnce).to.be.true;

    document.body.removeChild(link);
  });
});
