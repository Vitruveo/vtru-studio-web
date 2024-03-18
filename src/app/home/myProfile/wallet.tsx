import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import Box from '@mui/material/Box';
import { Button, Divider, Typography } from '@mui/material';

import { useI18n } from '@/app/hooks/useI18n';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { AccountSettingsProps } from './types';

const Wallet = ({ values, errors, setFieldValue }: AccountSettingsProps) => {
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const [connectWallet, setConnectWallet] = useState(false);

    const { openConnectModal } = useConnectModal();
    const { isConnected, address } = useAccount();
    const { disconnectAsync } = useDisconnect();

    const { language } = useI18n();

    const texts = {
        deleteButton: language['studio.myProfile.form.delete.button'],
        walletPlaceholder: language['studio.myProfile.form.wallet.placeholder'],
        walletPlaceholderAdded: language['studio.myProfile.form.wallet.placeholderAdded'],
        walletConnected: language['studio.myProfile.form.wallet.connected'],
        connectButton: language['studio.myProfile.form.connect.button'],
    } as { [key: string]: string };

    const handleAddWallet = async () => {
        if (isConnected) await disconnectAsync();
        setConnectWallet(true);
    };

    const handleDeleteWallet = async (index: number) => {
        setFieldValue(
            'wallets',
            values.wallets.filter((item, i) => i !== index)
        );
    };

    const handleFormatWallet = (addressF: string) => {
        return `${addressF.substring(0, 6)}...${addressF.substring(addressF.length - 4)}`;
    };

    useEffect(() => {
        if (openConnectModal && connectWallet) {
            openConnectModal();
            setConnectWallet(false);
        }
        return () => {
            disconnectAsync();
        };
    }, [connectWallet, openConnectModal]);

    useEffect(() => {
        if (address && !values.wallets.some((item) => item.address === address)) {
            setFieldValue('wallets', [{ address }, ...values.wallets]);
        } else if (address) {
            setToastr({
                type: 'warning',
                open: true,
                message: (
                    <div>
                        {texts.walletConnected}:<Typography>{handleFormatWallet(address)}</Typography>
                    </div>
                ),
            });
        }
    }, [address]);

    return (
        <>
            <Box maxWidth={450} display="flex" flexDirection="column">
                <Box gap={2}>
                    {values.wallets.map((item, index) => (
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            mb={2}
                            gap={1}
                            key={index}
                        >
                            <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
                                <Typography color="GrayText">{handleFormatWallet(item.address)}</Typography>
                                {values.wallets.length > 1 && (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        style={{ width: 122 }}
                                        onClick={() => handleDeleteWallet(index)}
                                    >
                                        {texts.deleteButton}
                                    </Button>
                                )}
                            </Box>
                            <Divider style={{ width: '100%' }} />
                        </Box>
                    ))}
                </Box>

                <Box marginTop={1} width="100%" display="flex" alignItems="center">
                    <Typography width="100%" color="GrayText">
                        {values.wallets?.length ? texts.walletPlaceholderAdded : texts.walletPlaceholder}
                    </Typography>
                    <Box marginLeft={1} flexDirection="row" display="flex" justifyContent="flex-end" gap={1}>
                        <Button size="small" style={{ width: 122 }} variant="contained" onClick={handleAddWallet}>
                            {texts.connectButton}
                        </Button>
                    </Box>
                </Box>

                <Typography color="error">{errors?.wallets as string}</Typography>
                <CustomizedSnackbar
                    type={toastr.type}
                    open={toastr.open}
                    message={toastr.message}
                    setOpentate={setToastr}
                />
            </Box>
        </>
    );
};

export default Wallet;
