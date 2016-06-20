/* eslint-env mocha */
import { expect, React } from '../../../test-helper';
import { shallow } from 'enzyme';
import Infoboks from './infoboks';

describe('Infoboks', () => {
    it('skal bruke riktig type og vise innhold', () => {
        const element = shallow(<Infoboks type="advarsel">INNHOLD</Infoboks>);

        expect(element.text()).to.equal('INNHOLD');
        expect(element.find('.hode-advarsel').length).to.be.at.least(1);
    });

    it('skal vise tittel om den finnes', () => {
        const element = shallow(<Infoboks type="advarsel" tittel="TITTEL123">INNHOLD</Infoboks>);

        expect(element.text()).to.contain('TITTEL123');
    });

    it('skal vise liten boks om ikke tittel', () => {
        const element = shallow(<Infoboks type="advarsel">INNHOLD</Infoboks>);

        expect(element.find('.infoboks-adskilt-vertikalt').length).to.be.at.least(1);
    });
});
