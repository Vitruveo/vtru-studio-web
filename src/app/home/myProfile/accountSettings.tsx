import React from 'react';
import {
    Stack,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
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

    const onCreatorAdd = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const formatCreatorsList = (creators: Creator[]) : AccountDataListItemProps[] => {
        return creators.map((creator) => ({
            label: creator.name,
            value: creator.name,
            isDisabled: false,
            onDelete: () => console.log('delete'),
        }))
    }

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
                <AccountDataList title="Creators" defaultValue={''} items={formatCreatorsList(values.creators)} onItemSelect={() => {}}>
                    <div style={{ width: '70%' }} />
                    <AccountDataListButton variant="contained" onClick={onCreatorAdd}>
                        Add
                    </AccountDataListButton>
                </AccountDataList>
                <AddCreatorModal
                    open={open}
                    onClose={onClose}
                    handleChange={handleChange}
                    creatorsLength={values.creators.length}
                    onAdd={() => console.log(values)}
                />
            </Box>
        </Stack>
    );
};

export default AccountSettings;
