import { expect, React } from './../../test-helper';
import { RedigerLink } from './redigerlink';
import { shallow } from 'enzyme';

describe('Link til rediger-vindu', () => { // eslint-disable-line no-undef
    it('Hente en tekst for nb', () => { // eslint-disable-line no-undef
        const nokkel = 'situasjoner-page.ung-og-uten-erfaring-lenketekst';
        const spraak = 'nb';
        const wrapper = shallow(<RedigerLink nokkel={nokkel} spraak={spraak} />);
        const linker = wrapper.find('Link');

        expect(linker.prop('children')).to.be.equal('nb');
    });

    it('URL skal bli sammensatt av nøkkel og språk', () => { // eslint-disable-line no-undef
        const nokkel = 'situasjoner-page.ung-og-uten-erfaring-lenketekst';
        const spraak = 'nb';
        const testUrl = `rediger?nokkel=${nokkel}&spraak=${spraak}`;
        const wrapper = shallow(<RedigerLink nokkel={nokkel} spraak={spraak} />);
        const linker = wrapper.find('Link');

        expect(linker.prop('to')).to.be.equal(testUrl);
    });
});
