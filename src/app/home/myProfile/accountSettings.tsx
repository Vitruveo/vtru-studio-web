import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { WalletProvider } from '@/app/home/components/apps/wallet';
import { AccountSettingsProps, Creator } from './types';
import Wallet from './wallet';
import AddEmails from './addEmails';
import { AccountDataList, AccountDataListButton, AccountDataListItemProps } from './components/account-data-list';
import { AddCreatorModal } from './components/add-creator-modal';

// TODO: ALTERAR OS OUTROS COMPONENTES PARA USAR O COMPONENTE ACCOUNTDATALIST

const AccountSettings = ({
    values,
    errors,
    handleChange,
    handleSubmit,
    setErrors,
    setFieldValue,
    setFieldError,
}: AccountSettingsProps) => {
    const [open, setOpen] = React.useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const deleteCreator = (index: number) => {
        const newCreators = values.creators.filter((_, i) => i !== index);
        setFieldValue('creators', newCreators);
    };

    const formatCreatorsList = (creators: Creator[]): AccountDataListItemProps[] => {
        return creators.map((creator, index) => ({
            label: creator.name,
            value: creator.name,
            isDisabled: false,
            onDelete: () => deleteCreator(index),
        }));
    };

    const onAddCreator = () => {
        setFieldValue('creators', [...values.creators, values.currentCreator]);
    };

    return (
        <Stack sx={{ width: '100%' }}>
            <Box display="flex" flexDirection="column" gap={1}>
                <AddEmails emails={values.emails} emailDefault={values.emailDefault} setFieldValue={setFieldValue} />
                <Box display="flex" flexDirection="column">
                    <WalletProvider>
                        <Wallet
                            values={values}
                            errors={errors}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                            setErrors={setErrors}
                            setFieldError={setFieldError}
                        />
                    </WalletProvider>
                </Box>
                <AccountDataList
                    title="Creators"
                    defaultValue={''}
                    items={formatCreatorsList(values.creators)}
                    onItemSelect={() => {}}
                >
                    <Typography width="70%" color="GrayText">
                        Creator information is publicly visible.
                    </Typography>
                    <AccountDataListButton variant="contained" onClick={openModal}>
                        Add
                    </AccountDataListButton>
                </AccountDataList>
                <AddCreatorModal
                    open={open}
                    onClose={closeModal}
                    handleChange={handleChange}
                    creatorsLength={values.creators.length}
                    onAdd={onAddCreator}
                />
            </Box>
        </Stack>
    );
};

export default AccountSettings;
