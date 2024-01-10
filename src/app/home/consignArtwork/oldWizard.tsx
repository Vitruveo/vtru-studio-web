// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Box, Button, Stack } from '@mui/material';
// import { nanoid } from '@reduxjs/toolkit';

// import PageContainer from '@/app/home/components/container/PageContainer';
// import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
// import HorizontalStepper from '@/app/home/components/wizard/horizontalStepper';
// import FinalStep from '@/app/home/components/wizard/finalStep';
// import FirstStep, { validateErrorsCreatorAccount } from '@/app/home/components/wizard/firstStep';
// import SecondStep, { validateErrorsAssetUpload } from '@/app/home/components/wizard/secondStep';
// import ThirdStep, { validateErrorsAssetMetadata } from '@/app/home/components/wizard/thirdStep';
// import FourthStep, { validateErrorsCreatorMetadata } from '@/app/home/components/wizard/fourthStep';
// import FifthStep, { validateErrorsLisence } from '@/app/home/components/wizard/fifthStep';
// import SixthStep, { validateErrorsContract } from '@/app/home/components/wizard/sixthStep';

// import { Formats, StepsFormValues } from '../components/wizard/types';
// import { stepsSchemaValidation } from './formschema';
// import { assetMetadataDefinitions, assetMetadataDomains, creatorMetadataDefinitions, licenses } from './mock';

// import { userSelector } from '@/features/user';
// import { saveStepWizardThunk, sendRequestUploadThunk } from '@/features/user/thunks';
// import { useDispatch } from '@/store/hooks';
// import { assetStorageThunk, assetUpdateStepThunk } from '@/features/asset/thunks';
// import SeventhStep from '../components/wizard/seventhStep';
// import { assetSelector } from '@/features/asset';
// import { userActionsCreators } from '@/features/user/slice';

// const steps = [
//     {
//         key: 'Creator: account',
//         render: FirstStep,
//         title: (
//             <span>
//                 Creator <br /> account
//             </span>
//         ),
//     },
//     {
//         key: 'Assets Upload',
//         render: SecondStep,
//         title: (
//             <span>
//                 Asset <br /> upload{' '}
//             </span>
//         ),
//     },
//     {
//         key: 'Asset Metadata',
//         render: ThirdStep,
//         title: (
//             <span>
//                 Asset <br /> metadata{' '}
//             </span>
//         ),
//     },

//     {
//         key: 'Creator Metadata',
//         render: FourthStep,
//         title: (
//             <span>
//                 Creator <br /> metadata{' '}
//             </span>
//         ),
//     },

//     {
//         key: 'License',
//         render: FifthStep,
//         title: 'License',
//     },

//     {
//         key: 'Contract',
//         render: SixthStep,
//         title: 'Contract',
//     },

//     {
//         key: 'Publish',
//         render: SeventhStep,
//         title: 'Publish',
//     },
// ];

// export default function Wizard() {
//     const [activeStep, setActiveStep] = useState(0);
//     const dispatch = useDispatch();

//     const { username, emails, wallets, requestAssetUpload } = useSelector(
//         userSelector(['username', 'emails', 'wallets', 'requestAssetUpload'])
//     );

//     const {
//         status,
//         assetMetadata,
//         creatorMetadata,
//         licenses: licensesState,
//         contract,
//     } = useSelector(assetSelector(['assetMetadata', 'creatorMetadata', 'licenses', 'contract', 'status']));

//     const { handleSubmit, handleChange, validateForm, setFieldValue, setFieldError, setErrors, values, errors } =
//         useFormik<StepsFormValues>({
//             initialValues: {
//                 username: username,
//                 profile: undefined,
//                 emails: emails,
//                 wallets: wallets,
//                 asset: {
//                     file: undefined,
//                     formats: {
//                         display: { file: undefined, customFile: undefined, transactionId: undefined },
//                         exhibition: { file: undefined, customFile: undefined, transactionId: undefined },
//                         preview: { file: undefined, customFile: undefined, transactionId: undefined },
//                     },
//                 },
//                 contract: contract || false,
//                 assetMetadata: {
//                     assetMetadataDomains,
//                     assetMetadataDefinitions: assetMetadata?.assetMetadataDefinitions.length
//                         ? assetMetadata.assetMetadataDefinitions
//                         : assetMetadataDefinitions,
//                 },
//                 creatorMetadata: {
//                     creatorMetadataDefinitions: creatorMetadata?.creatorMetadataDefinitions.length
//                         ? creatorMetadata.creatorMetadataDefinitions
//                         : creatorMetadataDefinitions,
//                 },
//                 licenses: licensesState?.length ? licensesState : licenses,
//                 status: status || 'draft',
//                 completedSteps: {},
//                 definition: '',
//             },
//             validationSchema: stepsSchemaValidation,
//             onSubmit: async (formValues) => {},
//         });

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const handleReset = () => {
//         setActiveStep(0);
//     };

//     const handleStep = async (value: number) => {
//         await validateForm();
//         dispatch(saveStepWizardThunk({ step: activeStep, values }));
//         setActiveStep(value);
//     };

//     const handleNext = async () => {
//         await validateForm();
//         dispatch(saveStepWizardThunk({ step: activeStep, values }));
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     useEffect(() => {
//         const requestUploadAsset = async () => {
//             const files = Object.entries(values.asset.formats)
//                 .filter(([__, { file }]) => file)
//                 .map(([key, item]) => ({ key, file: item.file }));

//             const codes = Array.from({ length: 3 }).map(() => nanoid());

//             files.forEach(async (item, index) => {
//                 await dispatch(
//                     userActionsCreators.requestAssetUpload({
//                         key: item.key,
//                         status: 'requested',
//                         transactionId: codes[index],
//                     })
//                 );
//             });

//             files.forEach((item, index) => {
//                 dispatch(
//                     sendRequestUploadThunk({
//                         mimetype: item.file!.type,
//                         originalName: item.file!.name,
//                         transactionId: codes[index],
//                     })
//                 );

//                 setFieldValue(`asset.formats.${item.key}.transactionId`, codes[index]);
//             });
//         };

//         if (activeStep === 2 && values.asset.file) requestUploadAsset();
//     }, [activeStep]);

//     useEffect(() => {
//         const requestAssetUploadNotUsed = Object.values(requestAssetUpload)?.every(
//             (item) => item.transactionId && item.url && item.status === 'ready'
//         );
//         if (!requestAssetUploadNotUsed) return;

//         const requestUploadReady = Object.values(requestAssetUpload);

//         const uploadAsset = async () => {
//             const responseUpload = await Promise.all(
//                 requestUploadReady.map(async (item) => {
//                     const url = item.url;
//                     dispatch(
//                         userActionsCreators.requestAssetUpload({
//                             transactionId: item.transactionId,
//                             status: 'uploading',
//                         })
//                     );

//                     const formatByTransaction = Object.entries(values.asset.formats).find(
//                         ([_, format]) => format.transactionId === item.transactionId
//                     );

//                     if (!formatByTransaction) return;

//                     const [key, value] = formatByTransaction;

//                     await dispatch(
//                         assetStorageThunk({
//                             file: value.file!,
//                             url,
//                         })
//                     );

//                     return {
//                         [key]: {
//                             path: item.path,
//                             name: value.file!.name,
//                         },
//                     };
//                 })
//             );

//             await dispatch(
//                 assetUpdateStepThunk({
//                     values: {
//                         ...values,
//                         formats: responseUpload.reduce((acc, cur) => ({ ...acc, ...cur }), {} as Formats),
//                     },
//                     stepName: 'assetUpload',
//                 })
//             );
//         };

//         if (requestUploadReady.length) uploadAsset();
//     }, [requestAssetUpload]);

//     const forceValidate = async () => {
//         try {
//             await stepsSchemaValidation.validate(values, { abortEarly: false });
//         } catch (err) {
//             const yupErrors: Record<string, string> = {};
//             (err as Yup.ValidationError).inner.forEach((error) => {
//                 if (error.path && !yupErrors[error.path]) {
//                     yupErrors[error.path] = error.message;
//                 }
//             });
//             setErrors(yupErrors);
//         }
//         1;
//     };

//     useEffect(() => {
//         forceValidate();
//     }, []);

//     useEffect(() => {
//         const payloadValidate = { values, errors, setFieldValue };
//         validateErrorsCreatorAccount(payloadValidate);
//         validateErrorsAssetUpload(payloadValidate);
//         validateErrorsAssetMetadata(payloadValidate);
//         validateErrorsCreatorMetadata(payloadValidate);
//         validateErrorsLisence(payloadValidate);
//         validateErrorsContract(payloadValidate);
//     }, [errors]);

//     return (
//         <PageContainer title="Wizard" description="this is Wizard">
//             <Breadcrumb title="Consign Artwork" />
//             {status === 'published' ? (
//                 <Box width="100%" justifyContent="center" display="flex">
//                     <SeventhStep
//                         values={values}
//                         errors={errors}
//                         setFieldError={setFieldError}
//                         setErrors={setErrors}
//                         setFieldValue={setFieldValue}
//                         handleChange={handleChange}
//                         handleSubmit={handleSubmit}
//                     />
//                 </Box>
//             ) : (
//                 <HorizontalStepper
//                     steps={steps}
//                     handleReset={handleReset}
//                     handleStep={handleStep}
//                     activeStep={activeStep}
//                     completedSteps={values.completedSteps}
//                 >
//                     <Box>
//                         {steps.map(
//                             (item, index) =>
//                                 activeStep === index && (
//                                     <React.Fragment key={index}>
//                                         <item.render
//                                             key={index}
//                                             values={values}
//                                             errors={errors}
//                                             setFieldError={setFieldError}
//                                             setErrors={setErrors}
//                                             setFieldValue={setFieldValue}
//                                             handleChange={handleChange}
//                                             handleSubmit={handleSubmit}
//                                         />
//                                         <Stack direction="row" justifyContent="center" gap={5}>
//                                             {index !== 0 && (
//                                                 <Button
//                                                     fullWidth
//                                                     color="primary"
//                                                     variant="outlined"
//                                                     onClick={handleBack}
//                                                 >
//                                                     Previous
//                                                 </Button>
//                                             )}
//                                             {index !== steps.length - 1 && (
//                                                 <Button
//                                                     fullWidth
//                                                     color="primary"
//                                                     variant="contained"
//                                                     onClick={handleNext}
//                                                 >
//                                                     Next
//                                                 </Button>
//                                             )}
//                                         </Stack>
//                                     </React.Fragment>
//                                 )
//                         )}
//                     </Box>
//                 </HorizontalStepper>
//             )}
//         </PageContainer>
//     );
// }
