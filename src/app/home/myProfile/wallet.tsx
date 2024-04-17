import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { IconTrash } from '@tabler/icons-react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import * as wagmiCore from '@wagmi/core';
import { Button, IconButton, Radio, RadioGroup, Theme, Typography, useMediaQuery, Box } from '@mui/material';

import { AccountSettingsProps } from './types';
import { useDispatch } from '@/store/hooks';
import { useI18n } from '@/app/hooks/useI18n';
import { requestConnectWalletThunk, verifyConnectWalletThunk } from '@/features/user/thunks';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { config } from '@/app/home/components/apps/wallet';

const Wallet = ({ values, errors, setFieldValue }: AccountSettingsProps) => {
    const dispatch = useDispatch();

    const [connectWallet, setConnectWallet] = useState(false);
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

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

    const handleDisconeectWallet = async () => {
        try {
            await wagmiCore.disconnect(config);
        } catch (error) {
            console.log('error on disconnect: ', error);
        }
    };

    const handleAddWallet = async () => {
        if (isConnected) handleDisconeectWallet();
        setConnectWallet(true);
        if (openConnectModal) openConnectModal();
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

            // set address to wallets
            setFieldValue('wallets', [{ address }, ...values.wallets]);
            // to disconnect wallet
            setConnectWallet(false);
        } catch (error) {
            console.error('error on signature: ', error);
            // to disconnect wallet
            setConnectWallet(false);
        }
    };

    useEffect(() => {
        if (isConnected && !connectWallet) handleDisconeectWallet();
    }, [isConnected, connectWallet, disconnectAsync]);

    useEffect(() => {
        if (address && connectWallet) handleSignWallet({ address });
    }, [address, connectWallet]);

    const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

    const checkDefaultWallet =
        !values.walletDefault || !values.walletDefault.length ? values.wallets[0]?.address : values.walletDefault;

    return (
        <>
            <pre>{JSON.stringify({ isConnected, address })}</pre>
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
                        <Button
                            size="small"
                            style={{ width: '85%', marginLeft: '10%' }}
                            variant="contained"
                            onClick={handleAddWallet}
                        >
                            {texts.connectButton}
                        </Button>
                    </Box>
                </Box>
            </Box>
            <CustomizedSnackbar
                type={toastr.type}
                open={toastr.open}
                message={toastr.message}
                setOpentate={setToastr}
            />
        </>
    );
};

export default Wallet;
