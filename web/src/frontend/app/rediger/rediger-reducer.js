import { STATUS } from './../felles/konstanter';
import { HENT_LEDETEKST, FAA_LEDETEKST, PUT_LEDETEKST } from './rediger-actions';

const DEFAULT_STATE = {
    status: STATUS.ikkelastet,
    nokkel: '',
    spraak: ''
}