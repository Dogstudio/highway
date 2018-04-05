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

// Assertions
describe('Highway.Renderer', () => {
  it('Should be an instance of `Renderer`', () => {
    expect(Home).to.be.instanceof(Highway.Renderer);
  });

  it('Should call `onEnter` and `onEnterCompleted` on `init`', () => {
    Home.onEnter = sinon.spy();
    Home.onEnterCompleted = sinon.spy();

    Home.init();

    expect(Home.onEnter.calledOnce).to.equal(true);
    expect(Home.onEnterCompleted.calledOnce).to.equal(true);
  });

  it('Should remove `[router-view]` from the document on `remove`', () => {
    Home.remove();

    const a = Home.wrapper;
    const b = Home.wrapper.querySelector('[router-view]');

    expect(a).to.be.instanceof(Object);
    expect(b).to.be.null;
  });

  it('Should add `[router-view]` to the document on `add`', () => {
    Home.add();

    const a = Home.wrapper;
    const b = Home.wrapper.querySelector('[router-view]');

    expect(a).to.be.instanceof(Object);
    expect(b).to.be.instanceof(Object);
  });

  it('Should update the document on `update`', () => {
    Home.update();

    const a = document.title;
    const b = document.body.className;
    const c = document.documentElement.className;

    expect(a).to.equal('Home');
    expect(b).to.equal('bar');
    expect(c).to.equal('foo');
  });

  it('Should call `add`, `update`, `onEnter` and `onEnterCompleted` on `show`', () => {
    Home.add = sinon.spy();
    Home.update = sinon.spy();
    Home.onEnter = sinon.spy();
    Home.onEnterCompleted = sinon.spy();

    Home.show().then(() => {
      expect(Home.add.calledOnce).to.equal(true);
      expect(Home.update.calledOnce).to.equal(true);
      expect(Home.onEnter.calledOnce).to.equal(true);
      expect(Home.onEnterCompleted.calledOnce).to.equal(true);
    });
  });

  it('Should call `remove`, `onLeave` and `onLeaveCompleted` on `hide`', () => {
    Home.remove = sinon.spy();
    Home.onLeave = sinon.spy();
    Home.onLeaveCompleted = sinon.spy();

    Home.hide().then(() => {
      expect(Home.remove.calledOnce).to.equal(true);
      expect(Home.onLeave.calledOnce).to.equal(true);
      expect(Home.onLeaveCompleted.calledOnce).to.equal(true);
    });
  });
});
