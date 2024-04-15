import React, { useState, useRef, useEffect } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { WalletProvider } from '@/app/home/components/apps/wallet';
import { AccountSettingsProps, Creator } from './types';
import Wallet from './wallet';
import AddEmails from './addEmails';
import { AccountDataList, AccountDataListButton, AccountDataListItem } from './components/account-data-list';
import { CreatorModal, CreatorForm } from './components/creator-modal';

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
    const [open, setOpen] = useState(false);

    // FIX: EDIT MODAL NÃO ATUALIZA OS DADOS NA TELA
    const [editCurrentModalValues, setEditCurrentModalValues] = useState<CreatorForm | undefined>(undefined);

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

    const onAddCreator = (form: CreatorForm) => {
        setFieldValue('creators', [...values.creators, form]);
    };

    useEffect(() => {
        if (editCurrentModalValues) {
            openModal()
        }
    }, [editCurrentModalValues])

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
                    bottom={
                        <>
                            <Typography width="70%" color="GrayText">
                                Creator information is publicly visible.
                            </Typography>
                            <AccountDataListButton variant="contained" onClick={openModal}>
                                Add
                            </AccountDataListButton>
                        </>
                    }
                    title="Creators"
                    defaultValue={values.defaultCreator.name}
                >
                    {values.creators.map((creator, index) => (
                        <AccountDataListItem
                            label={creator.name}
                            key={index}
                            onTextClick={() => {
                                setEditCurrentModalValues({ ...creator, role: '' });
                                openModal();
                            }}
                            onRadioClick={() => setFieldValue('defaultCreator', creator)}
                            checked={values.defaultCreator.name === creator.name}
                            onDelete={() => deleteCreator(index)}
                        />
                    ))}
                </AccountDataList>
                <CreatorModal
                    open={open}
                    onClose={closeModal}
                    onAdd={onAddCreator}
                    initialFormValues={editCurrentModalValues}
                />
            </Box>
        </Stack>
    );
};

export default AccountSettings;
