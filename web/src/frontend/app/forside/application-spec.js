/* eslint-env mocha */
import { expect, React } from './../../test-helper';
import { shallow } from 'enzyme';
import Forside from './forside';


describe('Forside test', () => {
    it('Skal vise en overskrift', () => {
        const wrapper = shallow(<Forside />);
        const overskrifter = wrapper.find('h1');
        
        expect(overskrifter.length).to.be.equal(0);
    });
});

