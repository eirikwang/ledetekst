/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import { expect, sinon, React } from './../../test-helper';
import { shallow } from 'enzyme';
import { Header } from './header';

describe('Header', () => {
    const defaultData = {
        pathname: '/',
        loggInnData: {},
        handleLoggUtClick: () => {},
        handleLoggInnClick: () => { console.log('kalt loggInn-funksjon'); }
    };

    it('Skal rendre header-komponent', () => {
        const wrapper = shallow(<Header {...defaultData} />);
        const noscripts = wrapper.find('noscript');
        const loggInnKnapp = wrapper.find('.logginn-info .logginn-knapp');

        expect(noscripts.length).to.be.equal(1);
        expect(loggInnKnapp.length).to.be.equal(1);
    });

    it('Skal kalle klikk-funksjon ved loggInn', () => {
        const mockOnClick = sinon.spy();
        const data = { ...defaultData, handleLoggInnClick: mockOnClick };
        const wrapper = shallow(<Header {...data} />);
        const loggInnKnapp = wrapper.find('.logginn-info .logginn-knapp');
        loggInnKnapp.simulate('click');

        expect(mockOnClick.calledOnce).to.be.true;
    });

    it('Skal kalle klikk-funksjon ved loggUt', () => {
        const mockOnClick = sinon.spy();
        const data = { ...defaultData, loggInnData: { navn: 'Test Testesen' }, handleLoggUtClick: mockOnClick };
        const wrapper = shallow(<Header {...data} />);
        const loggUtKnapp = wrapper.find('.logginn-info .loggut-knapp');
        loggUtKnapp.simulate('click');

        expect(mockOnClick.calledOnce).to.be.true;
    });

    it('Skal rendre navn ved loggInn', () => {
        const data = { ...defaultData, loggInnData: { navn: 'Test Testesen' } };
        const wrapper = shallow(<Header {...data} />);
        const noscripts = wrapper.find('noscript');
        const span = wrapper.find('.logginn-info .typo-undertekst');

        expect(noscripts.length).to.be.equal(1);
        expect(span.length).to.be.equal(1);
        expect(span.html()).to.have.string('Test Testesen');
    });

    it('Skal rendre app-link hvis man er på oversiktssiden', () => {
        const data = { ...defaultData, pathname: '/tekster/veiledningarbeidssoker' };
        const wrapper = shallow(<Header {...data} />);
        const link = wrapper.find('Link');

        expect(link.length).to.be.equal(1);
    });

    it('Skal ikke rendre app-link eller logginn-info på login-siden', () => {
        const data = { ...defaultData, pathname: '/login' };
        const wrapper = shallow(<Header {...data} />);
        const noscripts = wrapper.find('noscript');

        expect(noscripts.length).to.be.equal(2);
    });
});
