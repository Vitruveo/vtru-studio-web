import React, { useEffect, useState } from 'react';
import { IconButton, Radio, RadioGroup, Theme, Typography, useMediaQuery, Box } from '@mui/material';
import { useAccount, useDisconnect, useAccountEffect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { IconTrash } from '@tabler/icons-react';
import { LoadingButton } from '@mui/lab';
import { AxiosError } from 'axios';
import { useI18n } from '@/app/hooks/useI18n';
import { useToastr } from '@/app/hooks/useToastr';
import { useDispatch } from '@/store/hooks';
import { requestConnectWalletThunk, verifyConnectWalletThunk } from '@/features/user/thunks';
import { AccountSettingsProps } from './types';

const Wallet = ({ values, setFieldValue }: AccountSettingsProps) => {
    const toast = useToastr();
    const { language } = useI18n();
    const dispatch = useDispatch();
    const { connectors, disconnectAsync } = useDisconnect();
    const { isConnected, address } = useAccount();
    const { openConnectModal } = useConnectModal();

    const [addedNewWallet, setAddedNewWallet] = useState(false);

    // useAccountEffect({
    //     async onConnect() {
    //         await handleWalletDisconnection();
    //     },
    // });

    // useEffect(() => {
    //     if (isConnected) {
    //         handleWalletDisconnection();
    //     }
    // }, []);

    useEffect(() => {
        if (address && isConnected && addedNewWallet) {
            handleSignWallet({ address });
        }
    }, [address, isConnected]);

    const handleWalletDisconnection = async () => {
        for await (const connector of connectors) {
            await connector.disconnect();
            await disconnectAsync({
                connector,
            });
        }
    };

    const texts = {
        deleteButton: language['studio.myProfile.form.delete.button'],
        walletPlaceholder: language['studio.myProfile.form.wallet.placeholder'],
        walletPlaceholderAdded: language['studio.myProfile.form.wallet.placeholderAdded'],
        walletConnected: language['studio.myProfile.form.wallet.connected'],
        connectButton: language['studio.myProfile.form.connect.button'],
    } as { [key: string]: string };

    const onConnectWalletClick = async () => {
        if (isConnected) {
            await handleWalletDisconnection();
        }
        setAddedNewWallet(true);
        openConnectModal?.();
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

    const handleWalletDefaultChange = (val: string) => {
        setFieldValue('walletDefault', val);
    };

    const handleSignWallet = async (data: { address: `0x${string}` }) => {
        try {
            const { signature } = await dispatch(requestConnectWalletThunk({ wallet: data.address }));
            await dispatch(verifyConnectWalletThunk({ signature, wallet: data.address }));

            const walletExists = values.wallets.find((wallet) => wallet.address === data.address);

            if (walletExists) {
                toast.display({ message: 'Wallet already exists', type: 'error' });
            } else {
                setFieldValue('wallets', [{ address }, ...values.wallets]); // set address to wallets
                toast.display({ message: 'Wallet connected', type: 'success' });
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.display({ message: error.response?.data.message, type: 'error' });
            } else {
                toast.display({ message: 'Error on connect wallet', type: 'error' });
            }
        } finally {
            await handleWalletDisconnection();
            setAddedNewWallet(false);
        }
    };

    const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

    const checkDefaultWallet =
        !values.walletDefault || !values.walletDefault.length ? values.wallets[0]?.address : values.walletDefault;

    return (
        <>
            <Box maxWidth={!xl ? 300 : 400} display="flex" flexDirection="column" my={1}>
                <Box display="flex" justifyContent="flex-start" mb={2}>
                    <Typography variant="subtitle1" fontWeight={600} style={{ width: '70%' }}>
                        Wallets
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={600} style={{ width: '20%', textAlign: 'center' }}>
                        Default
                    </Typography>
                    <Box width="10%" />
                </Box>
                <RadioGroup
                    defaultValue={checkDefaultWallet}
                    aria-label="options"
                    name="emailDefault"
                    onChange={(v) => handleWalletDefaultChange(v.target.value)}
                >
                    {values.wallets.slice().map((item, index) => (
                        <Box key={item.address} display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
                            <Typography variant="body1" style={{ width: '70%' }}>
                                {handleFormatWallet(item.address)}
                            </Typography>
                            <Box display="flex" justifyContent="center" alignItems="center" width="20%">
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ margin: 0, padding: 0 }}
                                >
                                    <Radio sx={{ padding: 0 }} value={item.address} />
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center" width="10%">
                                <IconButton
                                    disabled={item.address === checkDefaultWallet}
                                    sx={{ padding: 0, margin: 0 }}
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteWallet(index);
                                    }}
                                >
                                    <IconTrash
                                        color={item.address === checkDefaultWallet ? '#A9A9A9' : 'red'}
                                        size="16"
                                        stroke={1.5}
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </RadioGroup>
                <Box mt={1} width="100%" display="flex" alignItems="center" justifyContent="space-between">
                    <Typography width="70%" color="GrayText">
                        {values.wallets?.length ? texts.walletPlaceholderAdded : texts.walletPlaceholder}
                    </Typography>
                    <Box width="30%" display="flex" justifyContent="center">
                        <LoadingButton
                            size="small"
                            style={{ width: '85%', marginLeft: '10%' }}
                            variant="contained"
                            onClick={onConnectWalletClick}
                            loading={isConnected && addedNewWallet}
                            disabled={isConnected && addedNewWallet}
                        >
                            {isConnected ? 'Disconnect' : 'Add'}
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Wallet;
