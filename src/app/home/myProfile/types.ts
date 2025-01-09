import { FormikErrors } from 'formik';
import { FormikDefaultProps } from '@/app/common/types';
import { ArtworkRecognition, Link, PersonalDetails, RequestUpload } from '@/features/user/types';

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
    displayName?: string;
    emails: EmailFormValues[];
    emailDefault: string;
    wallets: Wallet[];
    links: Link[];
    myWebsite?: string;
    walletDefault: string;
    personalDetails?: PersonalDetails;
    artworkRecognition?: ArtworkRecognition;
    requestsUpload?: { [key: string]: RequestUpload };
    deleteKeys?: string[];
}

export type AccountSettingsFormErros = FormikErrors<AccountSettingsFormValues>;

export interface AccountSettingsProps extends FormikDefaultProps<AccountSettingsFormValues> {
    values: AccountSettingsFormValues;
    type?: 'emails' | 'wallets';
    errors: AccountSettingsFormErros;
    setErrors: (errors: AccountSettingsFormErros) => void;
}
