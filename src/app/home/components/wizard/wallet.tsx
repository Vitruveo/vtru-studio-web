import React, { useEffect } from 'react';
import Img from 'next/image';

import { useAccount, useConnect, useWalletClient } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Box from '@mui/material/Box';
import { Button, Divider, Typography } from '@mui/material';

import { WalletProvider } from '@/app/home/components/apps/wallet';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { checkCreatorEmailExist } from '@/features/user/requests';

import CustomTextField from '../forms/theme-elements/CustomTextField';
import { StepsProps } from './types';
import BlankCard from '../shared/BlankCard';
import { debouncedUsernameValidation, validateEmailFormValue } from '../../contents/wizard/formschema';

const Wallet = ({ values, errors, handleChange, setFieldValue, setErrors }: StepsProps) => {
    const { connector: connectedWallet, isConnected, address } = useAccount();

    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

    useEffect(() => {
        console.log(address);
    }, [address]);

    return (
        <ConnectButton.Custom>
            {({ openConnectModal, openAccountModal, openChainModal, account, chain }) => {
                if (account && chain) {
                    return (
                        <Box display="flex" flexDirection="column" gap={2}>
                            {[
                                {
                                    walletId: account.address,
                                    displayName: account.displayName,
                                    iconUrl: chain.iconUrl,
                                    name: chain.name,
                                },
                            ].map((item) => (
                                <Box display="flex" flexDirection="column" gap={2} key={item.walletId}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Img alt="wallet" width={30} height={30} src={item.iconUrl || ''} />
                                            <Typography>
                                                {item.name} - {item.displayName}
                                            </Typography>
                                        </Box>

                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Button variant="outlined" size="small" onClick={openChainModal}>
                                                Other
                                            </Button>
                                            <Button variant="outlined" size="small" onClick={openAccountModal}>
                                                Account
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Divider />
                                </Box>
                            ))}
                            <Button fullWidth variant="outlined" onClick={openConnectModal}>
                                Connect Another Wallet
                            </Button>
                        </Box>
                    );
                }

                return (
                    <>
                        <Button fullWidth variant="outlined" onClick={openConnectModal}>
                            Connect Wallet
                        </Button>
                        {/* <Typography my={1} color="error">
                    {errors.wallet}
                  </Typography> */}
                    </>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default Wallet;
