import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { IconTrash } from '@tabler/icons-react';
import Box from '@mui/material/Box';
import { Button, Divider, IconButton, Typography } from '@mui/material';

import { StepsProps } from './types';

const Wallet = ({ values, errors, handleChange, setFieldValue, setErrors }: StepsProps) => {
    const [connectWallet, setConnectWallet] = useState(false);

    const { openConnectModal } = useConnectModal();
    const { chain: network } = useNetwork();
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
        if (address && network && !values.wallets.some((item) => item.address === address)) {
            setFieldValue('wallets', [
                { address, network: { name: network?.name, chainId: network?.id } },
                ...values.wallets,
            ]);
        }
    }, [address, network]);

    return (
        <>
            <Box display="flex" flexDirection="column" gap={2}>
                <Box gap={2}>
                    {values.wallets.map((item, index) => (
                        <Box display="flex" my={1} gap={2} key={index}>
                            <IconButton onClick={(e) => handleDeleteWallet(index)}>
                                <IconTrash color="red" size="16" stroke={1.5} />
                            </IconButton>
                            <Box>
                                <Typography variant="subtitle2">Network</Typography>
                                <Typography color="GrayText" variant="body1">
                                    {item.network.name}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2">Address</Typography>
                                <Typography color="GrayText" variant="body1">
                                    {`${item.address.substring(0, 6)}...${item.address.substring(
                                        item.address.length - 4
                                    )}`}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Divider />

                <Box flexDirection="row" display="flex" gap={1}>
                    <Button fullWidth variant="outlined" onClick={handleAddWallet}>
                        Add Wallet
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
