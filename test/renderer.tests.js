// Polyfills
import '@babel/polyfill';

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
import Page from './dom/page';

// Update Document
global.document = Home.page;

// Assertions
describe('Highway.Renderer', () => {
  it('Should be an instance of `Highway.Renderer`', () => {
    expect(Home).to.be.instanceof(Highway.Renderer);
    expect(Page).to.be.instanceof(Highway.Renderer);
  });

  it('Should call `onEnter` and `onEnterCompleted` on `setup`', () => {
    Home.onEnter = sinon.spy();
    Home.onEnterCompleted = sinon.spy();

    Home.setup();

    expect(Home.onEnter.calledOnce).to.equal(true);
    expect(Home.onEnterCompleted.calledOnce).to.equal(true);
  });

  it('Should remove `[router-view]` from the document on `remove`', () => {
    Home.root = document.createElement('div');
    Home.root.innerHTML = '<p></p>';
    Home.remove();

    expect(Home.root.innerHTML).to.be.empty;
  });

  it('Should add `[router-view]` to the document on `add`', () => {
    Home.root = document.createElement('div');
    Home.root.innerHTML = '<p></p>';
    Page.add();

    expect(Home.root.innerHTML).to.not.be.empty;
  });

  it('Should update the document on `update`', () => {
    Page.update();

    expect(document.title).to.equal('Page');
  });

  it('Should call `add`, `update`, `onEnter` and `onEnterCompleted` on `show`', () => {
    Page.add = sinon.spy();
    Page.update = sinon.spy();
    Page.onEnter = sinon.spy();
    Page.onEnterCompleted = sinon.spy();

    Page.show().then(() => {
      expect(Page.add.calledOnce).to.equal(true);
      expect(Page.update.calledOnce).to.equal(true);
      expect(Page.onEnter.calledOnce).to.equal(true);
      expect(Page.onEnterCompleted.calledOnce).to.equal(true);
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
