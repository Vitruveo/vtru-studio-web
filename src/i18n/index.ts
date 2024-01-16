import en_US from './en_US';
import pt_BR from './pt_BR';
import es_ES from './es_ES';
import fa_IR from './fa_IR';

const i18n = {
    pt_BR: { ...en_US, ...pt_BR },
    es_ES: { ...en_US, ...es_ES },
    en_US: { ...en_US },
    fa_IR: { ...en_US, ...fa_IR },
    default: { ...en_US },
};

export default i18n;
