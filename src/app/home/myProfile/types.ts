import { FormikErrors } from 'formik';
import { FormikDefaultProps } from '@/app/common/types';

interface Wallet {
    address: string;
    archived: boolean;
}

export interface EmailFormValues {
    email: string;
    checkedAt: Date | null;
    sentCode: boolean;
}

export interface AccountSettingsFormValues {
    username: string;
    emails: EmailFormValues[];
    emailDefault: string;
    wallets: Wallet[];
    walletDefault: string;
    creators: Creator[];
}

export interface Creator {
    name: string;
    roles: string[];
    bio: string;
    profileUrl: string;
    nationality: string;
    residence: string;
    ethnicity: string;
    gender: string;
}

type AccountSettingsFormErros = FormikErrors<AccountSettingsFormValues>;

export interface AccountSettingsProps extends FormikDefaultProps<AccountSettingsFormValues> {
    values: AccountSettingsFormValues;
    errors: AccountSettingsFormErros;
    setErrors: (errors: AccountSettingsFormErros) => void;
}
