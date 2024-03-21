import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { IconTrash } from '@tabler/icons-react';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import Box from '@mui/material/Box';
import { Button, Divider, IconButton, Radio, RadioGroup, Theme, Typography, useMediaQuery } from '@mui/material';

import { useI18n } from '@/app/hooks/useI18n';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { AccountSettingsProps } from './types';
import CustomTextField from '../components/forms/theme-elements/CustomTextField';

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

    const handleWalletDefaultChange = (val: string) => {
        setFieldValue('walletDefault', val);
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
