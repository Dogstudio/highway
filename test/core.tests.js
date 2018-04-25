// Polyfills
import 'babel-polyfill';
import 'isomorphic-fetch';

// Dependencies
import sinon from 'sinon';
import chai from 'chai';
import fetchMock from 'fetch-mock';
import chaiFetchMock from 'chai-fetch-mock';

// Plugins
chai.use(chaiFetchMock);

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

  a.href = '/foo';
  b.href = '/foo#anchor';

  document.body.appendChild(a);
  document.body.appendChild(b);

  before(() => fetchMock.get('/foo', 'bar'));

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

  it('Should call `click` and `pushState` method on `click` event', () => {
    Core.state = {};
    Core.state.pathname = '';

    Core.pushState = sinon.spy();

    sinon.spy(a, 'click');
    sinon.spy(b, 'click');

    a.click();

    Core.state.pathname = '/foo';

    b.click();

    expect(Core.pushState.called).to.be.true;
    expect(a.click.calledOnce).to.be.true;
    expect(b.click.calledOnce).to.be.true;
  });

  it('Should call `beforeFetch` method on `popState`', () => {
    Core.beforeFetch = sinon.spy();

    Core.state = { pathname: '' };
    Core.popState();

    expect(Core.beforeFetch.calledOnce).to.be.true;
  });


  it('Should fetch an URL properly', () => {
    Core.state = { url: '/foo' };

    Core.fetch().then((response) => {
      expect(response).to.equal('bar');
      expect(fetchMock).route('/foo').to.have.been.called;
    });
  });

  after(() => fetchMock.restore());
});
