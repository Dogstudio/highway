// Polyfills
import 'babel-polyfill';

// Dependencies
import sinon from 'sinon';
import { expect } from 'chai';

// Highway
import Highway from '../src/index';

// DOM
import Home from './dom/home';
import Page from './dom/page';

// Update Document
global.document = Home.page;

// Assertions
describe('Highway.Transition', () => {
  it('Should be an instance of `Transition`', () => {
    expect(Home.Transition).to.be.instanceof(Highway.Transition);
    expect(Page.Transition).to.be.instanceof(Highway.Transition);
  });

  it('Should call `in` on `show`', () => {
    Page.Transition.in = sinon.spy();
    Page.Transition.show().then(() => {
      expect(Page.Transition.in.calledOnce).to.equal(true);
    });
  });

  it('Should call `out` on `hide`', () => {
    Home.Transition.out = sinon.spy();
    Home.Transition.hide().then(() => {
      expect(Home.Transition.out.calledOnce).to.equal(true);
    });
  });
});
