import { useState } from 'react';
import { FormikErrors } from 'formik';
import { Tabs, Tab, Box, CardContent, Divider } from '@mui/material';
import {
    IconUserCircle,
    IconBroadcast,
    IconBriefcase,
    IconId,
    IconAward,
    IconMail,
    IconWallet,
} from '@tabler/icons-react';
import BlankCard from '../../components/shared/BlankCard';
import Identity, { IdentityProps } from './identity';
import { AccountSettingsFormErros, AccountSettingsFormValues } from '../types';
import { FormikDefaultProps } from '@/app/common/types';
import DigitalPresence from './digitalPresence';
import PersonalDetails from './personalDetails';
import ArtworkRecognition from './artworkRecognition';
import Emails from './emails';
import Wallets from './wallets';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

export interface ProfileTabsGeneralProps extends FormikDefaultProps<AccountSettingsFormValues> {
    texts: { [key: string]: string };
    values: AccountSettingsFormValues;
    errors: FormikErrors<AccountSettingsFormValues>;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
    ) => Promise<FormikErrors<AccountSettingsFormValues>> | Promise<void>;
    setErrors: (errors: AccountSettingsFormErros) => void;
}

interface ProfileTabsProps extends ProfileTabsGeneralProps {
    identity: Omit<IdentityProps, keyof ProfileTabsGeneralProps>;
}

const ProfileTabs = ({
    values,
    texts,
    errors,
    identity,
    handleChange,
    handleSubmit,
    setFieldError,
    setFieldValue,
    setErrors,
    ...props
}: ProfileTabsProps) => {
    const [value, setValue] = useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <BlankCard>
            <Box sx={{ maxWidth: { xs: 400, sm: 900 } }}>
                <Tabs value={value} onChange={handleChangeTab} scrollButtons="auto" aria-label="basic tabs example">
                    <Tab iconPosition="start" icon={<IconUserCircle size="22" />} label="Identity" {...a11yProps(0)} />
                    <Tab iconPosition="start" icon={<IconMail size="22" />} label="Emails" {...a11yProps(1)} />
                    <Tab iconPosition="start" icon={<IconWallet size="22" />} label="Wallets" {...a11yProps(2)} />
                    <Tab
                        iconPosition="start"
                        icon={<IconBroadcast size="22" />}
                        label="Digital Presence"
                        {...a11yProps(1)}
                    />
                    <Tab iconPosition="start" icon={<IconId size="22" />} label="Personal Details" {...a11yProps(3)} />
                    <Tab
                        iconPosition="start"
                        icon={<IconAward size="22" />}
                        label="Artwork recognition"
                        {...a11yProps(4)}
                    />
                </Tabs>
            </Box>
            <Divider />
            <CardContent>
                <TabPanel value={value} index={0}>
                    <Identity
                        values={values}
                        texts={texts}
                        errors={errors}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setFieldError={setFieldError}
                        setFieldValue={setFieldValue}
                        setErrors={setErrors}
                        {...identity}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Emails
                        values={values}
                        texts={texts}
                        errors={errors}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setFieldError={setFieldError}
                        setFieldValue={setFieldValue}
                        setErrors={setErrors}
                        {...identity}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Wallets
                        values={values}
                        texts={texts}
                        errors={errors}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setFieldError={setFieldError}
                        setFieldValue={setFieldValue}
                        setErrors={setErrors}
                        {...identity}
                    />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <DigitalPresence
                        values={values}
                        texts={texts}
                        errors={errors}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setFieldError={setFieldError}
                        setFieldValue={setFieldValue}
                        setErrors={setErrors}
                    />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <PersonalDetails
                        values={values}
                        texts={texts}
                        errors={errors}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setFieldError={setFieldError}
                        setFieldValue={setFieldValue}
                        setErrors={setErrors}
                    />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <ArtworkRecognition
                        values={values}
                        texts={texts}
                        errors={errors}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setFieldError={setFieldError}
                        setFieldValue={setFieldValue}
                        setErrors={setErrors}
                    />
                </TabPanel>
            </CardContent>
        </BlankCard>
    );
};

export default ProfileTabs;
