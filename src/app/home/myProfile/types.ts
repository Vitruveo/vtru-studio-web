import { FormikErrors } from 'formik';
import { FormikDefaultProps } from '@/app/common/types';
import { CareerAchievements, Link, PersonalDetails } from '@/features/user/types';

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
    links: Link[];
    walletDefault: string;
    personalDetails?: PersonalDetails;
    careerAchievements?: CareerAchievements;
}

export type AccountSettingsFormErros = FormikErrors<AccountSettingsFormValues>;

export interface AccountSettingsProps extends FormikDefaultProps<AccountSettingsFormValues> {
    values: AccountSettingsFormValues;
    errors: AccountSettingsFormErros;
    setErrors: (errors: AccountSettingsFormErros) => void;
}
