import validateCryptoAddress from '@/utils/validateCriptoAdress';
import { Box, IconButton, OutlinedInput, Typography } from '@mui/material';
import { IconPlus, IconTrash, IconWallet, IconWalletOff } from '@tabler/icons-react';
import { useRef } from 'react';

const PortfolioItem = () => {
    const wallets = ['0x1234567890', '0x0987654321'];
    const inputRef = useRef<HTMLInputElement>(null);

    const handleAddWallet = (wallet?: string) => {
        console.log(wallet);
    };

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2}>
            <Box display={'flex'} width={'100%'}>
                <OutlinedInput
                    id="outlined-portofolio"
                    placeholder={'Wallet Adress'}
                    size="small"
                    type="search"
                    color="primary"
                    notched
                    fullWidth
                    inputRef={inputRef}
                />
                <IconButton
                    color="primary"
                    onClick={() => {
                        handleAddWallet(inputRef.current?.value);
                        inputRef.current!.value = '';
                    }}
                >
                    <IconPlus size={15} />
                </IconButton>
            </Box>

            <Box>
                {wallets.map((wallet, index) => {
                    return (
                        <Box mt={1} key={index} display="flex" alignItems="center" justifyContent="space-between">
                            <Box display={'flex'} alignItems={'center'} gap={0.4}>
                                {validateCryptoAddress(wallet) ? (
                                    <>
                                        <IconWallet size={18} />
                                        <Typography variant="inherit">
                                            {wallet.slice(0, 6)}...{wallet.slice(-6)}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <IconWalletOff color="red" size={18} />
                                        <Typography variant="inherit" color="red">
                                            {wallet.length > 10 ? `${wallet.slice(0, 10)}...` : wallet}
                                        </Typography>
                                    </>
                                )}
                            </Box>
                            <IconTrash cursor="pointer" color="red" width={20} onClick={() => {}} />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default PortfolioItem;
