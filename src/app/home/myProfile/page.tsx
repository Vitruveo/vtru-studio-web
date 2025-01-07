'use client';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Avatar, Box, Button, CardContent, Grid, Typography, Tabs, Tab, Divider } from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import BlankCard from '../components/shared/BlankCard';
import AccountSettings from './accountSettings';

import { Stack } from '@mui/system';
import {
    changeAvatarThunk,
    generalStorageAvatarThunk,
    saveStepWizardThunk,
    sendRequestUploadThunk,
} from '@/features/user/thunks';
import { userSelector } from '@/features/user';
import { AccountSettingsFormValues } from './types';
import CustomTextField from '../components/forms/theme-elements/CustomTextField';
import { debouncedUsernameValidation } from '../consignArtwork/formschema';
import PageContainerFooter from '../components/container/PageContainerFooter';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { useI18n } from '@/app/hooks/useI18n';
import { useAvatar } from './useAvatar';
import { useToastr } from '@/app/hooks/useToastr';
import { BASE_URL_SEARCH } from '@/constants/search';
import ProfileTabs from './tabs/index';
import { ProfileSchemaValidation } from './tabs/formschema';
import ConfirmModal from './confirmModal';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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

export default function ProfileSettings() {
    const toast = useToastr();
    const router = useRouter();
    const dispatch = useDispatch();
    const { language } = useI18n();
    const { avatarSrc } = useAvatar();
    const [resetAvatar, setResetAvatar] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [changeAvatarFile, setChangeAvatarFile] = useState<File>();
    const [show, setShow] = useState(false);

    const { isCompletedProfile, goToConsignArtwork } = useSelector((state) => state.consignArtwork);

    const {
        _id,
        username,
        displayName,
        personalDetails,
        artworkRecognition,
        emailDefault,
        walletDefault,
        emails,
        wallets,
        myWebsite,
        links,
        truLevel,
        socials,
        requestAvatarUpload,
    } = useSelector(
        userSelector([
            '_id',
            'username',
            'displayName',
            'truLevel',
            'socials',
            'personalDetails',
            'artworkRecognition',
            'emailDefault',
            'walletDefault',
            'emails',
            'wallets',
            'myWebsite',
            'links',
            'requestAvatarUpload',
        ])
    );

    useEffect(() => {
        if (requestAvatarUpload.status === 'ready') {
            dispatch(
                generalStorageAvatarThunk({
                    file: changeAvatarFile!,
                    path: requestAvatarUpload.path!,
                    url: requestAvatarUpload.url!,
                    transactionId: requestAvatarUpload.transactionId,
                })
            );

            toast.display({ message: texts.saveMessage, type: 'success' });

            setTimeout(() => {
                router.push('/home');
            }, 500);
        }
    }, [requestAvatarUpload.status]);

    useEffect(() => {
        if (!isCompletedProfile && goToConsignArtwork) {
            const fields = {
                username: {
                    translation: texts.usernameTitle,
                    isValid: !!values.username,
                },
                emails: {
                    translation: texts.emailsTitle,
                    isValid: !!values.emails.length,
                },

                wallets: {
                    translation: texts.walletsTitle,
                    isValid: !!values.wallets.length,
                },
            };

            const invalidFields = Object.entries(fields).filter(([key, value]) => !value.isValid);

            dispatch(consignArtworkActionsCreators.changeGoToConsignArtwork(false));

            if (invalidFields.length) {
                toast.display({
                    type: 'warning',
                    message: (
                        <Box>
                            {`${texts.accessConsignMessage}`}
                            <Box>
                                Fill in the fields:{' '}
                                {`${invalidFields.map(([key, value]) => value.translation).join(', ')}`}
                            </Box>
                        </Box>
                    ),
                });
            }
        }
    }, [isCompletedProfile, goToConsignArtwork]);

    const initSocials = useMemo(() => socials, []);

    const initialValues = useMemo(
        () => ({
            emailDefault: !emailDefault || !emailDefault.length ? emails[0]?.email : emailDefault,
            walletDefault: !walletDefault || !walletDefault.length ? wallets[0]?.address || '' : walletDefault,
            username,
            displayName,
            personalDetails: personalDetails,
            artworkRecognition: artworkRecognition,
            myWebsite,
            emails: emails.filter((email) => email.checkedAt),
            wallets,
            links,
        }),
        []
    );

    const texts = {
        title: language['studio.myProfile.title'],
        subtitle: language['studio.myProfile.subtitle'],
        home: language['studio.myProfile.home'],
        emailsTitle: language['studio.myProfile.form.emails.title'],
        walletsTitle: language['studio.myProfile.form.wallets.title'],
        usernameTitle: language['studio.myProfile.form.username.title'],
        usernamePlaceholder: language['studio.myProfile.form.username.placeholder'],
        saveMessage: language['studio.myProfile.saveMessage'],
        usernameRequiredError: language['studio.myProfile.form.usernameRequired.error'],
        accessConsignMessage: language['studio.myProfile.accessConsignMessage'],
        profileTitle: language['studio.myProfile.form.profile.title'],
        profileResetButton: language['studio.myProfile.form.profile.reset.button'],
        profileUploadButton: language['studio.myProfile.form.profile.upload.button'],
        profileDescription: language['studio.myProfile.form.profile.description'],
    } as { [key: string]: string };

    const BCrumb = [
        {
            to: '/home',
            title: texts.home,
        },
        {
            title: texts.title,
        },
    ];

    const { handleSubmit, handleChange, setFieldValue, setFieldError, setErrors, values, errors } =
        useFormik<AccountSettingsFormValues>({
            initialValues,
            validationSchema: ProfileSchemaValidation,
            onSubmit: onSubmit,
        });

    async function onSubmit(formValues: AccountSettingsFormValues) {
        if (!show && truLevel && truLevel.currentLevel > 0) {
            if (
                resetAvatar ||
                Object.entries(initSocials || {}).filter(
                    ([key, value]) => socials[key as keyof typeof socials].avatar !== value.avatar
                ).length ||
                !formValues.myWebsite
            ) {
                setShow(true);
                return;
            }
        }
        if (!formValues.username || formValues.username?.length === 0) {
            setUsernameError(texts.usernameRequiredError);
            return;
        }

        if (errors.username || usernameError) return;

        dispatch(saveStepWizardThunk({ step: 0, values, resetAvatar }));
        dispatch(
            consignArtworkActionsCreators.checkIsCompletedProfile({
                username: values.username,
                emails: values.emails,
                wallets: values.wallets,
            })
        );

        if (resetAvatar) {
            dispatch(changeAvatarThunk({ fileId: '' }));
            toast.display({ message: texts.saveMessage, type: 'success' });

            setTimeout(() => {
                router.push('/home');
            }, 500);
        } else if (changeAvatarFile) {
            dispatch(
                sendRequestUploadThunk({
                    mimetype: changeAvatarFile!.type,
                    originalName: changeAvatarFile!.name,
                })
            );
        } else {
            toast.display({ message: texts.saveMessage, type: 'success' });

            setTimeout(() => {
                router.push('/home');
            }, 500);
        }
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (handleChange) handleChange(e);
        if (e.target.value === username) return;
        debouncedUsernameValidation(e.target.value, setUsernameError);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (resetAvatar) setResetAvatar(false);

        const file = event.target.files?.[0];

        if (file) {
            if (!file?.type.includes('image')) {
                toast.display({ type: 'warning', message: 'File is not an image. ' });
                return;
            }
            const fileSize = file.size / 1024;
            if (fileSize > 800) {
                toast.display({ type: 'warning', message: 'File size is too big. Max size 800kb' });
            } else {
                setChangeAvatarFile(file);
            }
        }
    };

    const handleOnClickReset = () => {
        setResetAvatar(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleYesClick = () => {
        handleSubmit();
    };

    const handleNoClick = () => {
        setShow(false);
    };

    const isNewAvatar = resetAvatar
        ? '/images/profile/profileDefault.png'
        : changeAvatarFile instanceof File
          ? URL.createObjectURL(changeAvatarFile)
          : avatarSrc;

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter submitDisabled={false} backPathRouter="/home" title={texts.title}>
                <Box margin="auto 0" marginBottom={10} display="relative">
                    <Breadcrumb title={texts.title} items={BCrumb} />

                    <Box my={3}>
                        <Typography variant="h5" fontWeight="normal" color="GrayText">
                            {texts.subtitle}
                        </Typography>
                    </Box>

                    <Grid maxHeight={470} item xs={12} lg={12}>
                        <ProfileTabs
                            values={values}
                            errors={errors}
                            texts={texts}
                            setFieldValue={setFieldValue}
                            setFieldError={setFieldError}
                            setErrors={setErrors}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            identity={{
                                isNewAvatar,
                                usernameError,
                                handleFileChange,
                                handleOnClickReset,
                                handleUsernameChange,
                            }}
                        />
                        <ConfirmModal
                            show={show}
                            handleClose={handleClose}
                            yesClick={handleYesClick}
                            noClick={handleNoClick}
                        />
                    </Grid>
                </Box>
            </PageContainerFooter>
        </form>
    );
}
