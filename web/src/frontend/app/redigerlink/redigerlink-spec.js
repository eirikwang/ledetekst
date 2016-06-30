import { expect, React } from './../../test-helper';
import { RedigerLink } from './redigerlink'
import { shallow } from 'enzyme';

describe('Link til rediger-vindu', () => {
    it('Hente en tekst for nb', () => {
        const nokkel = 'situasjoner-page.ung-og-uten-erfaring-lenketekst';
        const spraak = 'nb';
        const wrapper = shallow(<RedigerLink nokkel={nokkel} spraak={spraak} />);
        const linker = wrapper.find('a');
        console.log(linker.text());
        expect(linker).to.be.equal('nb');
    });
});