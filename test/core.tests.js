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

  it('Should `bind` the `click` event on links', () => {
    const a = document.createElement('a');

    document.body.appendChild(a);

    sinon.spy(a, 'addEventListener');

    Core.bind();

    expect(a.addEventListener.calledOnce).to.be.true;
  });

  it('Should `unbind` the `click` event on links', () => {
    const a = document.createElement('a');

    document.body.appendChild(a);

    sinon.spy(a, 'removeEventListener');

    Core.bind();
    Core.unbind();

    expect(a.removeEventListener.calledOnce).to.be.true;
  });

  it('Should call `click` method on `click` event on links', () => {
    const a = document.createElement('a');
    const b = document.createElement('a');

    document.body.appendChild(a);
    document.body.appendChild(b);

    Core.click = sinon.spy();
    Core.bind();

    a.href = 'http://bar.com/foo';
    b.href = 'http://bar.com/foo#anchor';

    a.click();
    b.click();

    expect(Core.click.called).to.be.true;
  });
});
