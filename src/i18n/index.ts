import en_US from './en_US';
import pt_BR from './pt_BR';

const i18n = {
    pt_BR: { ...en_US, ...pt_BR },
    es_ES: { ...en_US },
    en_US: { ...en_US },
    default: { ...en_US },
};

export default i18n;
