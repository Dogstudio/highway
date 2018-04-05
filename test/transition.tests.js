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

// Transition
const Transition = new Highway.Transition(Home.page);

// Assertions
describe('Highway.Transition', () => {
  it('Should be an instance of `Transition`', () => {
    expect(Transition).to.be.instanceof(Highway.Transition);
  });

  it('Should call `in` on `show`', () => {
    Transition.in = sinon.spy();
    Transition.show().then(() => {
      expect(Transition.in.calledOnce).to.equal(true);
    });
  });

  it('Should call `out` on `hide`', () => {
    Transition.out = sinon.spy();
    Transition.hide().then(() => {
      expect(Transition.out.calledOnce).to.equal(true);
    });
  });
});
