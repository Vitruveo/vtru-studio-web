export const connectMetaMaskAccount = async (providerWithInfo: EIP6963ProviderDetail) => {
    const accounts = await providerWithInfo.provider.request({ method: 'eth_requestAccounts' });
    if (accounts?.[0]) {
        return accounts[0];
    }
    return null;
};
