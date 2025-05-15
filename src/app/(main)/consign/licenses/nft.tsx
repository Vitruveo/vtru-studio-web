import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControlLabel,
    IconButton,
    MenuItem,
    Radio,
    RadioGroup,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useAccount, useConnectorClient } from 'wagmi';
import CustomSelect from '@/app/(main)/components/forms/theme-elements/CustomSelect';
import CustomTextField from '@/app/(main)/components/forms/theme-elements/CustomTextField';
import CustomCheckbox from '@/app/(main)/components/forms/theme-elements/CustomCheckbox';
import Card from './common/card';
import { LicenseProps } from './types';
import { useI18n } from '@/app/hooks/useI18n';
import { formatCurrency } from '@/utils/formatCurrency';
import { useDispatch, useSelector } from '@/store/hooks';
import { checkLicenseEditableThunk, signerUpdateLicensePriceThunk, updatePriceThuk } from '@/features/asset/thunks';
import UpdatePriceModal from './UpdatedPriceModal';
import { useToastr } from '@/app/hooks/useToastr';

// TODO: AVAILABLE LICENSE SÓ VAI SER USADA QUANDO ELASTIC EDITIONS FOR SELECIONADO
// NOTE: AVAILABLE LICENSE DESATIVADO POR ENQUANTO
export const maxPrice = 10000;
export const minPrice = 10;

function Nft({ allValues, handleChange, setFieldValue }: LicenseProps) {
    const dispatch = useDispatch();
    const toastr = useToastr();

    const [helperText, setHelperText] = useState('');
    const [currentDescription, setCurrentDescription] = useState('nft.editionOption');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [canEdit, setCanEdit] = useState(false);

    const values = allValues.nft || {};

    const hasConsign = useSelector((state) => !!state.asset.contractExplorer);
    const hasMinted = useSelector((state) => !!state.asset.mintExplorer);
    const assetId = useSelector((state) => state.asset._id);
    const wallets = useSelector((state) => state.user.wallets);

    const { data: client } = useConnectorClient();
    const { address } = useAccount();

    useEffect(() => {
        const fecthCanEdit = async () => {
            const response = await dispatch(checkLicenseEditableThunk({ assetId }));
            setCanEdit(response);
        };
        fecthCanEdit();
    }, []);

    useEffect(() => {
        if (values.single.editionPrice < minPrice) {
            setHelperText(`Minimum price is ${formatCurrency({ value: minPrice })}`);
        }
        if (values.single.editionPrice > maxPrice) {
            setHelperText(`Maximum price is ${formatCurrency({ value: maxPrice })}`);
        }
        if (values.single.editionPrice >= minPrice && values.single.editionPrice <= maxPrice) {
            setHelperText('');
        }
    }, [values.single.editionPrice]);

    const { language } = useI18n();

    const texts = {
        license: language['studio.consignArtwork.licenses.license'],
        nftDescription: language['studio.consignArtwork.licenses.nft.description'],
        nftEnable: language['studio.consignArtwork.licenses.nft.enable'],
        elasticEditionsTitle: language['studio.consignArtwork.licenses.nft.elasticEditions.title'],
        editionPriceTitle: language['studio.consignArtwork.licenses.nft.elasticEditions.editionPrice.title'],
        numberOfEditionsTitle: language['studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions.title'],
        totalPriceTitle: language['studio.consignArtwork.licenses.nft.elasticEditions.totalPrice.title'],
        editionDiscountTitle: language['studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount.title'],
        editionPrice: language['studio.consignArtwork.licenses.nft.elasticEditions.editionPrice'],
        numberOfEditions: language['studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions'],
        totalPrice: language['studio.consignArtwork.licenses.nft.elasticEditions.totalPrice'],
        editionDiscount: language['studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount'],
        singleEditionTitle: language['studio.consignArtwork.licenses.nft.singleEdition.title'],
        singleEditionPrice: language['studio.consignArtwork.licenses.nft.singleEdition.editionPrice'],
        singleEditionPriceTitle: language['studio.consignArtwork.licenses.nft.singleEdition.editionPrice.title'],
        unlimitedEditionsTitle: language['studio.consignArtwork.licenses.nft.unlimitedEditions.title'],
        unlimitedEditionsPrice: language['studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice'],
        unlimitedEditionsPriceTitle:
            language['studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice.title'],
        selectEditionTitle: language['studio.consignArtwork.licenses.nft.selectEdition.title'],
        selectEditionElasticEditions: language['studio.consignArtwork.licenses.nft.selectEdition.elasticEditions'],
        selectEditionSingleEdition: language['studio.consignArtwork.licenses.nft.selectEdition.singleEdition'],
        selectEditionUnlimitedEditions: language['studio.consignArtwork.licenses.nft.selectEdition.unlimitedEditions'],
        licenseCCBY: language['studio.consignArtwork.licenses.nft.ccby'],
        licenseCCBYSA: language['studio.consignArtwork.licenses.nft.ccbysa'],
        licenseCCBYNC: language['studio.consignArtwork.licenses.nft.ccbync'],
        licenseCCBYNCSA: language['studio.consignArtwork.licenses.nft.ccbyncsa'],
        licenseCCBYND: language['studio.consignArtwork.licenses.nft.ccbynd'],
        licenseCCBYNCND: language['studio.consignArtwork.licenses.nft.ccbyncnd'],
        licenseCC0: language['studio.consignArtwork.licenses.nft.cc0'],
    } as { [key: string]: string };

    const licenses = [
        {
            license: 'CC BY',
            about: texts.licenseCCBY,
            infoLink: 'https://creativecommons.org/licenses/by/4.0/',
        },
        {
            license: 'CC BY-SA',
            about: texts.licenseCCBYSA,
            infoLink: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
        {
            license: 'CC BY-NC',
            about: texts.licenseCCBYNC,
            infoLink: 'https://creativecommons.org/licenses/by-nc/4.0/',
        },
        {
            license: 'CC BY-NC-SA',
            about: texts.licenseCCBYNCSA,
            infoLink: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
        },
        {
            license: 'CC BY-ND',
            about: texts.licenseCCBYND,
            infoLink: 'https://creativecommons.org/licenses/by-nd/4.0/',
        },
        {
            license: 'CC BY-NC-ND',
            about: texts.licenseCCBYNCND,
            infoLink: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
        },
        {
            license: 'CC0',
            about: texts.licenseCC0,
            infoLink: 'https://creativecommons.org/publicdomain/zero/1.0/',
        },
        // {
        //     license: 'Vitruveo',
        //     about: '',
        // },
    ];

    const currentLicense = licenses.find((item) => item.license === values.license);

    const aboutLicenses = currentLicense?.infoLink || 'https://creativecommons.org/share-your-work/cclicenses/';

    const editionTitles = {
        elastic: texts.elasticEditionsTitle,
        single: texts.singleEditionTitle,
        unlimited: texts.unlimitedEditionsTitle,
    };

    const currentDescriptionTitle =
        values?.editionOption && currentDescription === 'nft.editionOption'
            ? editionTitles[values.editionOption as keyof typeof editionTitles]
            : values?.added
              ? texts.selectEditionTitle
              : `DIGITAL COLLECTIBLE-ART-1 ${texts.license}`;

    const handleAdded = (added: boolean) => {
        if (added == false) setFieldValue('nft.editionOption', '');
        setFieldValue('nft.added', added);
    };

    const handleCustomChange = (field: string, value: string) => {
        if (field === 'nft.editionOption') return;
        setCurrentDescription(field);
        setFieldValue(field, value);
    };

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmitUpdatePrice = async () => {
        setLoading(true);
        const verify = await dispatch(
            signerUpdateLicensePriceThunk({ assetKey: assetId, price: values.single.editionPrice, client: client! })
        );
        if (!verify) {
            toastr.display({ type: 'error', message: 'Error signing message' });
            setLoading(false);
            return;
        }

        if (!wallets.some((wallet) => wallet.address === address)) {
            // wallet not found

            setLoading(false);
            toastr.display({ type: 'error', message: 'Wallet not found in your account' });
            return;
        }

        const response = await dispatch(updatePriceThuk({ price: values.single.editionPrice, assetId }));
        setLoading(false);
        if (response) {
            setOpen(true);
            setIsEditing(false);
        } else toastr.display({ type: 'error', message: 'Error updating price' });
    };

    const handleChangeAutoStake = () => {
        setFieldValue('nft.autoStake', !values.autoStake);
    };

    const renderMessage = () => {
        if (!address) return 'Connect Wallet to Edit';

        return 'Edit';
    };

    return (
        <Box width={700} display="flex" justifyContent="space-between" marginTop={2}>
            <Card
                disabled
                title="COLLECTIBLE-ART-1"
                added={values?.added}
                setAdded={handleAdded}
                width={320}
                height={400}
            >
                {!values?.added ? (
                    <Box p={1.5}>
                        <Typography
                            style={{ wordWrap: 'break-word' }}
                            color="grey"
                            fontWeight="500"
                            variant="subtitle1"
                            component="label"
                            fontSize="1rem"
                        >
                            {texts.nftDescription}
                        </Typography>
                    </Box>
                ) : (
                    <Box p={1.5} width="100%">
                        <Box alignItems="center" justifyContent="space-between" display="flex" marginTop={1}>
                            <Box marginRight={1} width={100}>
                                <Typography>{texts.license}</Typography>
                            </Box>
                            <Box alignItems="center" justifyContent="space-between" display="flex" width={300}>
                                <CustomSelect
                                    sx={{ backgroundColor: '#fff' }}
                                    inputProps={{
                                        sx: {
                                            backgroundColor: '#fff',
                                        },
                                    }}
                                    name="nft.license"
                                    value={values.license}
                                    onChange={(v: SelectChangeEvent<unknown>) =>
                                        handleCustomChange('nft.license', v.target.value as string)
                                    }
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                    disabled={hasConsign}
                                >
                                    {licenses?.map((option) => (
                                        <MenuItem key={option.license} value={option.license}>
                                            {option.license}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                                <IconButton
                                    title={aboutLicenses}
                                    sx={{ padding: 0, marginLeft: 1 }}
                                    onClick={() => window.open(aboutLicenses, '_blank')}
                                >
                                    <InfoIcon color="primary" />
                                </IconButton>
                            </Box>
                        </Box>
                        <RadioGroup
                            aria-label="options"
                            name="nft.editionOption"
                            value={values.editionOption}
                            onChange={(v) => handleCustomChange('nft.editionOption', v.target.value)}
                        >
                            {values.editionOption === 'elastic' && (
                                <Box marginLeft={4}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box marginRight={1}>
                                            <Typography
                                                title={texts.editionPriceTitle}
                                                whiteSpace="nowrap"
                                                textOverflow="ellipsis"
                                                fontSize="0.8rem"
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    width: 130,
                                                }}
                                            >
                                                {texts.editionPriceTitle}
                                            </Typography>
                                        </Box>
                                        <CustomTextField
                                            name="nft.elastic.editionPrice"
                                            type="number"
                                            InputProps={{
                                                sx: {
                                                    backgroundColor: '#fff',
                                                    width: 90,
                                                },
                                            }}
                                            value={values.elastic.editionPrice}
                                            inputProps={{ maxLength: 185, style: { textAlign: 'right' } }}
                                            onChange={handleChange}
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Box
                                        marginTop={1}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Box marginRight={1}>
                                            <Typography
                                                title={texts.numberOfEditionsTitle}
                                                fontSize="0.8rem"
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    width: 130,
                                                }}
                                            >
                                                {texts.numberOfEditionsTitle}
                                            </Typography>
                                        </Box>
                                        <CustomTextField
                                            name="nft.availableLicenses"
                                            type="number"
                                            InputProps={{
                                                sx: {
                                                    backgroundColor: '#fff',
                                                    width: 90,
                                                },
                                            }}
                                            value={values.availableLicenses}
                                            inputProps={{ maxLength: 185, style: { textAlign: 'right' } }}
                                            onChange={handleChange}
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Box
                                        marginTop={1}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            fontSize="0.8rem"
                                            sx={{ whiteSpace: 'nowrap', width: 100, marginRight: 3 }}
                                        >
                                            {texts.totalPriceTitle}
                                        </Typography>
                                        <Typography
                                            textAlign="right"
                                            color="gray"
                                            fontSize="0.8rem"
                                            sx={{ whiteSpace: 'nowrap', width: 100, marginRight: 3 }}
                                        >
                                            ${values.elastic.editionPrice * values.availableLicenses}
                                        </Typography>
                                    </Box>
                                    <Box
                                        marginTop={1}
                                        marginBottom={1}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            fontSize="0.8rem"
                                            sx={{ whiteSpace: 'nowrap', width: 100, marginRight: 3 }}
                                        >
                                            {texts.editionDiscountTitle}
                                        </Typography>

                                        <Box display="flex" gap={1} alignItems="center" justifyContent="space-between">
                                            <Box>
                                                <CustomCheckbox
                                                    sx={{ padding: 0 }}
                                                    name="nft.elastic.editionDiscount"
                                                    checked={values.elastic.editionDiscount}
                                                    onChange={handleChange}
                                                />
                                            </Box>
                                            <Box marginRight={3}>
                                                <Typography
                                                    textAlign="right"
                                                    color="gray"
                                                    fontSize="0.8rem"
                                                    sx={{ whiteSpace: 'nowrap', width: 50 }}
                                                >
                                                    {Math.min(values.availableLicenses / 10, 10).toFixed(2) + '%'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                            <FormControlLabel value="single" control={<Radio />} label={texts.singleEditionTitle} />
                            {values.editionOption === 'single' && (
                                <Box
                                    marginLeft={4}
                                    display="flex"
                                    alignItems={helperText ? 'flex-start' : 'center'}
                                    justifyContent="space-between"
                                >
                                    <Box marginRight={1}>
                                        <Typography
                                            fontSize="0.8rem"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                width: 130,
                                            }}
                                        >
                                            {texts.singleEditionPriceTitle}
                                        </Typography>
                                    </Box>
                                    <CustomTextField
                                        name="nft.single.editionPrice"
                                        type="number"
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: 'center' },
                                            },
                                            sx: {
                                                backgroundColor: '#fff',
                                                width: 90,
                                            },
                                        }}
                                        required
                                        value={values.single.editionPrice}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        helperText={helperText}
                                        error={!!helperText}
                                        disabled={hasConsign && !isEditing}
                                    />
                                </Box>
                            )}
                            {/* <FormControlLabel
                                value="elastic"
                                control={<Radio disabled />}
                                label={texts.elasticEditionsTitle}
                            />
                            <FormControlLabel
                                value="unlimited"
                                control={<Radio disabled />}
                                label={texts.unlimitedEditionsTitle}
                            /> */}

                            {values.editionOption === 'unlimited' && (
                                <Box marginLeft={4} display="flex" alignItems="center" justifyContent="space-between">
                                    <Box marginRight={1}>
                                        <Typography
                                            title={texts.unlimitedEditionsPriceTitle}
                                            fontSize="0.8rem"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                width: 130,
                                            }}
                                        >
                                            {texts.unlimitedEditionsPriceTitle}
                                        </Typography>
                                    </Box>
                                    <CustomTextField
                                        name="nft.unlimited.editionPrice"
                                        type="number"
                                        InputProps={{
                                            sx: {
                                                backgroundColor: '#fff',
                                                width: 90,
                                            },
                                        }}
                                        value={values.unlimited.editionPrice}
                                        inputProps={{ maxLength: 185, style: { textAlign: 'right' } }}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    />
                                </Box>
                            )}
                        </RadioGroup>
                        {/* <Box marginTop={1} marginBottom={1} display="flex" gap={1}>
                            <CustomCheckbox
                                sx={{ padding: 0 }}
                                name="nft.autoStake"
                                checked={values.autoStake}
                                onChange={handleChangeAutoStake}
                            />
                            <Typography
                                fontSize="0.8rem"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    width: 170,
                                }}
                            >
                                Auto-stake for VERSE (95%)
                            </Typography>
                        </Box> */}
                    </Box>
                )}
                <Box>
                    {hasConsign &&
                        (!isEditing ? (
                            <Button
                                disabled={!canEdit || !address || hasMinted}
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleToggleEdit}
                            >
                                {renderMessage()}
                            </Button>
                        ) : (
                            <Box display="flex" gap={2}>
                                <Button variant="outlined" color="error" fullWidth onClick={handleToggleEdit}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={loading || !!helperText}
                                    fullWidth
                                    onClick={handleSubmitUpdatePrice}
                                >
                                    Confirm
                                </Button>
                            </Box>
                        ))}
                </Box>
            </Card>
            <Box marginTop={2} width={300}>
                <Typography color="gray" fontSize="1.1rem" fontWeight="bold">
                    {currentDescriptionTitle}
                </Typography>

                {currentDescription === 'nft.editionOption' ? (
                    values.editionOption === 'elastic' ? (
                        <Box marginTop={2}>
                            <Box>
                                <Typography textAlign="left" display="inline" color="GrayText" fontSize="0.9rem">
                                    {texts.editionPrice}
                                </Typography>
                            </Box>
                            <Box marginTop={2}>
                                <Typography display="inline" color="GrayText" fontSize="0.9rem">
                                    {texts.numberOfEditions}
                                </Typography>
                            </Box>
                            <Box marginTop={2}>
                                <Typography textAlign="left" display="inline" color="GrayText" fontSize="0.9rem">
                                    {texts.totalPrice}
                                </Typography>
                            </Box>
                            <Box marginTop={2}>
                                <Typography textAlign="left" display="inline" color="GrayText" fontSize="0.9rem">
                                    {texts.editionDiscount}
                                </Typography>
                            </Box>
                        </Box>
                    ) : values.editionOption === 'single' ? (
                        <Box marginTop={2}>
                            <Typography textAlign="left" display="inline" color="GrayText" fontSize="0.9rem">
                                {texts.singleEditionPrice}
                            </Typography>
                        </Box>
                    ) : (
                        <Box marginTop={2}>
                            <Typography textAlign="left" display="inline" color="GrayText" fontSize="0.9rem">
                                {texts.unlimitedEditionsPrice}
                            </Typography>
                        </Box>
                    )
                ) : values.added ? (
                    <Box marginTop={2}>
                        <Box>
                            <Typography display="inline" fontWeight="bold" color="GrayText" fontSize="0.9rem">
                                {texts.elasticEditionsTitle}{' '}
                            </Typography>
                            <Typography display="inline" color="GrayText" fontSize="0.9rem">
                                {texts.selectEditionElasticEditions}
                            </Typography>
                        </Box>
                        <Box marginTop={2}>
                            <Typography display="inline" fontWeight="bold" color="GrayText" fontSize="0.9rem">
                                {texts.singleEditionTitle}{' '}
                            </Typography>
                            <Typography display="inline" color="GrayText" fontSize="0.9rem">
                                {texts.selectEditionSingleEdition}
                            </Typography>
                        </Box>
                        <Box marginTop={2}>
                            <Typography display="inline" fontWeight="bold" color="GrayText" fontSize="0.9rem">
                                {texts.unlimitedEditionsTitle}{' '}
                            </Typography>
                            <Typography display="inline" color="GrayText" fontSize="0.9rem">
                                {texts.selectEditionUnlimitedEditions}
                            </Typography>
                        </Box>
                        <Box marginTop={2}>
                            <Typography display="inline" fontWeight="bold" color="GrayText" fontSize="0.9rem">
                                {currentLicense?.license}{' '}
                            </Typography>
                            <Typography display="inline" color="GrayText" fontSize="0.9rem">
                                {currentLicense?.about}
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <Typography marginTop={2} color="GrayText" fontSize="0.9rem">
                        {texts.nftEnable}
                    </Typography>
                )}
            </Box>

            <UpdatePriceModal isOpen={open} handleClose={() => setOpen(false)} />
        </Box>
    );
}

export default Nft;
