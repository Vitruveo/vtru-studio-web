import { WalletButton, ConnectButton } from '@rainbow-me/rainbowkit';
import Box from '@mui/material/Box';
import { Button, Divider, FormControl, Grid, IconButton, Stack, Typography } from '@mui/material';

import CustomTextField from '../forms/theme-elements/CustomTextField';
import { useState } from 'react';
import { AddCircle } from '@mui/icons-material';
import { IconTrash } from '@tabler/icons-react';
import { useDispatch } from '@/store/hooks';
import {
  addCreatorEmailThunk,
  checkCreatorEmailExistThunk,
  checkCreatorUsernameExistThunk,
} from '@/features/user/thunks';
import { CreatorEmailExistApiRes, CreatorUsernameExistApiRes } from '@/features/user/types';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { useSelector } from 'react-redux';
import { userSelector } from '@/features/user';

const FirstStep = () => {
  const dispatch = useDispatch();

  const { _id } = useSelector(userSelector(['_id']));
  const emailsCreator = useSelector(userSelector(['emails']));

  const [toastr, setToastr] = useState<CustomizedSnackbarState>({ type: 'success', open: false, message: '' });

  const [username, setUsername] = useState('');
  const [usernameExist, setUsernameExist] = useState<boolean | null>(null);

  const [inputEmail, setInputEmail] = useState('');
  const [emailExist, setEmailExist] = useState<boolean | null>(null);
  const [emails, setEmails] = useState<{ verificated: boolean; email: string; sentCode: boolean }[]>(
    emailsCreator.emails.map((item) => ({
      email: item.email,
      sentCode: false,
      verificated: item.checkedAt ? true : false,
    })),
  );

  const [wallets, setWallets] = useState(1);

  const handleAddEmails = async () => {
    if (!inputEmail.trim()) {
      setEmailExist(false);
      return;
    }

    const checkedEmailExist = await dispatch(checkCreatorEmailExistThunk({ email: inputEmail.trim() }));

    if ((checkedEmailExist.payload as CreatorEmailExistApiRes).data!) {
      setEmailExist(true);

      return;
    }

    await dispatch(addCreatorEmailThunk({ email: inputEmail.trim(), id: _id }));

    setEmails((prevState) => [...prevState, { verificated: false, email: inputEmail.trim(), sentCode: false }]);
    setEmailExist(false);
    setInputEmail('');
  };

  const handleEmailClearError = () => {
    if (!inputEmail.trim()) {
      setEmailExist(false);
      return;
    }
  };

  const handleRemoveEmail = (email: string) => {
    setEmails((prevState) => prevState.filter((item) => item.email !== email));
  };

  const handleBlurUsernameExist = async () => {
    if (!username.trim()) {
      setUsernameExist(false);
      return;
    }
    const checkedUsernameExist = await dispatch(checkCreatorUsernameExistThunk({ username }));
    setUsernameExist((checkedUsernameExist.payload as CreatorUsernameExistApiRes).data!);
  };

  const handleSendCodeEmail = (email: string) => {
    setToastr({ open: true, type: 'success', message: 'verification code sent to email' });
  };

  return (
    <Stack sx={{ width: '100%' }}>
      <Box minWidth={600} display="flex" flexDirection="column" my={3} gap={4} p={2}>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} component="label">
            Username
          </Typography>
          <CustomTextField
            placeholder="type a username..."
            size="small"
            id="email"
            error={usernameExist || false}
            variant="outlined"
            fullWidth
            onBlur={handleBlurUsernameExist}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            helperText={usernameExist && 'username already exist'}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} component="label">
            Emails
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <CustomTextField
              onChange={(e) => setInputEmail(e.target.value)}
              value={inputEmail}
              size="small"
              id="email"
              error={emailExist || false}
              helperText={emailExist && 'email already exist'}
              variant="outlined"
              onBlur={handleEmailClearError}
              fullWidth
              placeholder="type a email..."
            />
            <Button onClick={handleAddEmails}>
              <AddCircle />
            </Button>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {emails
            .sort((a, b) => (a.verificated < b.verificated ? 1 : -1))
            .map((item) => (
              <Box key={item.email}>
                <Box display="flex" alignItems="center" justifyContent="space-between" paddingY={1}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton onClick={() => handleRemoveEmail(item.email)}>
                      <IconTrash color="red" size="16" stroke={1.5} />
                    </IconButton>

                    <Typography>{item.email}</Typography>
                  </Box>

                  {item.verificated ? (
                    <Typography color="success.main">Verified email</Typography>
                  ) : item.sentCode ? (
                    <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="flex-end">
                      <CustomTextField
                        // error={true}
                        size="small"
                        id="verificationCode"
                        variant="outlined"
                        placeholder="type a code..."
                        // helperText="invalid code"
                      />
                      <Typography variant="caption" color="primary">
                        Resend code
                      </Typography>
                    </Box>
                  ) : (
                    <Button onClick={() => handleSendCodeEmail(item.email)}>Verify now</Button>
                  )}
                </Box>
                <Divider />
              </Box>
            ))}
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1" fontWeight={600} component="label">
            Wallets
          </Typography>
          {Array.from({ length: wallets }).map((_, index) => (
            <ConnectButton.Custom key={index}>
              {({
                openConnectModal,
                openAccountModal,
                openChainModal,
                account,

                chain,
              }) => {
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
                              <img src={item.iconUrl} />
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

                      <Button variant="outlined" onClick={() => {}} disabled>
                        Connect more Wallet
                      </Button>
                    </Box>
                  );
                }

                return (
                  <Button variant="outlined" onClick={openConnectModal}>
                    Connect Wallet
                  </Button>
                );
              }}
            </ConnectButton.Custom>
          ))}
        </Box>
      </Box>

      <CustomizedSnackbar type={toastr.type} open={toastr.open} message={toastr.message} setOpentate={setToastr} />
    </Stack>
  );
};

export default FirstStep;
