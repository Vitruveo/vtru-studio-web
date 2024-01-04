import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

import { AccountSettingsProps } from '../../contents/profile-settings/types';

const Wallet = ({ values, errors, setFieldValue }: AccountSettingsProps) => {
    const [connectWallet, setConnectWallet] = useState(false);

    const { openConnectModal } = useConnectModal();
    const { isConnected, address } = useAccount();
    const { disconnectAsync } = useDisconnect();

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
            <Box maxWidth={450} display="flex" flexDirection="column" gap={2}>
                <Box gap={2}>
                    {values.wallets.map((item, index) => (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={2}
                            gap={1}
                            key={index}
                        >
                            <Typography color="GrayText">
                                {`${item.address.substring(0, 6)}...${item.address.substring(item.address.length - 4)}`}
                            </Typography>

                            <Button
                                size="small"
                                style={{ width: 105 }}
                                variant="contained"
                                onClick={() => handleDeleteWallet(index)}
                            >
                                Delete
                            </Button>
                        </Box>
                    ))}
                </Box>

                <Box flexDirection="row" display="flex" gap={1}>
                    <Button style={{ width: 200 }} variant="outlined" onClick={handleAddWallet}>
                        Connect new wallet
                    </Button>
                </Box>
                <Typography my={1} color="error">
                    {errors?.wallets as string}
                </Typography>
            </Box>
        </>
    );
};

export default Wallet;
