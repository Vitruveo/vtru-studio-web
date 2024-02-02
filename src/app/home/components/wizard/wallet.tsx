import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import Box from '@mui/material/Box';
import { Button, Divider, Typography } from '@mui/material';

import { AccountSettingsProps } from '../../myProfile/types';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import { useI18n } from '@/app/hooks/useI18n';

const Wallet = ({ values, errors, setFieldValue }: AccountSettingsProps) => {
    const [connectWallet, setConnectWallet] = useState(false);

    const { openConnectModal } = useConnectModal();
    const { isConnected, address } = useAccount();
    const { disconnectAsync } = useDisconnect();

    const { language } = useI18n();

    const texts = {
        deleteButton: language['studio.myProfile.form.delete.button'],
        walletPlaceholder: language['studio.myProfile.form.wallet.placeholder'],
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
                                <Typography color="GrayText">
                                    {`${item.address.substring(0, 6)}...${item.address.substring(
                                        item.address.length - 4
                                    )}`}
                                </Typography>
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
                        {texts.walletPlaceholder}
                    </Typography>
                    <Box marginLeft={1} flexDirection="row" display="flex" justifyContent="flex-end" gap={1}>
                        <Button size="small" style={{ width: 122 }} variant="contained" onClick={handleAddWallet}>
                            {texts.connectButton}
                        </Button>
                    </Box>
                </Box>

                <Typography color="error">{errors?.wallets as string}</Typography>
            </Box>
        </>
    );
};

export default Wallet;
