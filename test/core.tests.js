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
    const b = document.createElement('a');

    document.body.appendChild(a);
    document.body.appendChild(b);

    sinon.spy(a, 'addEventListener');
    sinon.spy(b, 'removeEventListener');

    Core.bind();
    Core.unbind();

    expect(a.addEventListener.calledOnce).to.be.true;
    expect(b.removeEventListener.calledOnce).to.be.true;
  });

  it('Should call `click` method on `click` event on links', () => {
    const a = document.createElement('a');
    const b = document.createElement('a');

    document.body.appendChild(a);
    document.body.appendChild(b);

    sinon.spy(a, 'click');
    sinon.spy(b, 'click');

    Core.bind();

    a.href = 'http://bar.com/foo';
    b.href = 'http://bar.com/foo#anchor';

    a.click();
    b.click();

    expect(a.click.calledOnce).to.be.true;
    expect(b.click.calledOnce).to.be.true;
  });
});
