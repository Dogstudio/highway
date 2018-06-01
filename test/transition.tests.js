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

// Assertions
describe('Highway.Transition', () => {
  it('Should be an instance of `Highway.Transition`', () => {
    const Transition = new Highway.Transition(Home.page);

    expect(Transition).to.be.instanceof(Highway.Transition);
  });

  it('Should call `in` on `show`', () => {
    const Transition = new Highway.Transition(Home.page);

    Transition.in = sinon.spy();
    Transition.show().then(() => {
      expect(Transition.in.calledOnce).to.equal(true);
    });
  });

  it('Should call `out` on `hide`', () => {
    const Transition = new Highway.Transition(Home.page);

    Transition.out = sinon.spy();
    Transition.hide().then(() => {
      expect(Transition.out.calledOnce).to.equal(true);
    });
  });
});
