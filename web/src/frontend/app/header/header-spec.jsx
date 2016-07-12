/* eslint-env mocha */
import { expect, React } from './../../test-helper';
import { shallow } from 'enzyme';
import { Header } from './header';

describe('Header', () => {
    const defaultData = {
        pathname: '/',
        loggInnData: {},
        handleLoggUtClick: () => {},
        handleLoggInnClick: () => {}
    };

    it('Skal rendre header-komponent', () => {
        const wrapper = shallow(<Header {...defaultData} />);
        const noscripts = wrapper.find('noscript');
        const loggInnKnapp = wrapper.find('.logginn-info .logginn-knapp');

        expect(noscripts.length).to.be.equal(1);
        expect(loggInnKnapp.length).to.be.equal(1);
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
});
