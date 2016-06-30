/* eslint-env mocha */
import { expect, React } from './../test-helper';
import { shallow } from 'enzyme';
import Application from './application';


describe('Eksempel test', () => {
    it('Skal vise en overskrift', () => {
        const wrapper = shallow(<Application />);
        const overskrifter = wrapper.find('h1');


        expect(overskrifter.length).to.be.equal(0);
    });
});

