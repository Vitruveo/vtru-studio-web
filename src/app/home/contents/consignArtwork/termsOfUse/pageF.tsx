// 'use client';
// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// import { FormikErrors, useFormik } from 'formik';
// import { Box, Container, Typography, Button } from '@mui/material';

// import { TermsOfUseFormValues } from './types';

// import { TermsOfUseSchemaValidation } from './formschema';
// import { assetSelector } from '@/features/asset';

// const currentStep = 6;

// const validateErrorsContract = ({
//     values,
//     errors,
//     setFieldValue,
// }: {
//     values: TermsOfUseFormValues;
//     errors: FormikErrors<TermsOfUseFormValues>;
//     setFieldValue: (
//         field: string,
//         value: any,
//         shouldValidate?: boolean | undefined
//     ) => Promise<void> | Promise<FormikErrors<TermsOfUseFormValues>>;
// }) => {
//     const fields: Array<keyof TermsOfUseFormValues> = ['contract'];

//     // if (!fields.some((field) => errors[field])) {
//     //     values.completedSteps[currentStep] = {
//     //         step: currentStep,
//     //         errors: false,
//     //     };
//     //     setFieldValue('completedSteps', { ...values.completedSteps });
//     // } else {
//     //     values.completedSteps[currentStep] = {
//     //         step: currentStep,
//     //         errors: true,
//     //     };
//     //     setFieldValue('completedSteps', { ...values.completedSteps });
//     // }
// };

// export default function ContractScreen() {
//     const [scrolledToBottom, setScrolledToBottom] = useState(false);
//     const scrollContainerRef = useRef<HTMLDivElement | null>(null);

//     const { contract } = useSelector(assetSelector(['contract']));

//     const { values, errors, setFieldValue } = useFormik<TermsOfUseFormValues>({
//         initialValues: {
//             contract: contract || false,
//         },
//         validationSchema: TermsOfUseSchemaValidation,
//         onSubmit: async (formValues) => {},
//     });

//     const handleScroll = useCallback(() => {
//         const tolerance = 1;
//         const scrollContainer = scrollContainerRef.current;

//         if (
//             scrollContainer &&
//             Math.abs(scrollContainer.scrollTop + scrollContainer.clientHeight - scrollContainer.scrollHeight) <
//                 tolerance
//         ) {
//             setScrolledToBottom(true);
//         } else {
//             setScrolledToBottom(false);
//         }
//     }, []);

//     const handleChangeContract = () => {
//         setFieldValue('contract', !values.contract);
//     };

//     useEffect(() => {}, [values.contract, errors]);

//     return (
//         <Container>
//             <Box
//                 mt={4}
//                 ref={scrollContainerRef}
//                 onScroll={handleScroll}
//                 maxHeight={380}
//                 padding={2}
//                 style={{
//                     textAlign: 'justify',
//                     overflowY: 'auto',
//                     border: '1px solid #ccc',
//                 }}
//             >
//                 <Typography variant="h4" gutterBottom>
//                     Contract
//                 </Typography>
//                 <Typography paragraph>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque aliquam consequat urna, sed
//                     dignissim risus vestibulum sed. Nam ut urna quis erat facilisis consectetur quis a augue. Nam non
//                     posuere risus. Donec congue nunc tempor nisi egestas, eget laoreet mauris accumsan. Aenean sed lorem
//                     lacus. Nullam quis hendrerit sapien. Praesent placerat interdum diam, eu condimentum odio pretium a.
//                 </Typography>

//                 <Typography paragraph>
//                     Phasellus pellentesque non massa quis imperdiet. Maecenas vel odio metus. Donec tincidunt enim vitae
//                     libero euismod fermentum. Sed nec semper libero, in feugiat purus. Morbi viverra nisl erat, vitae
//                     maximus elit finibus ut. Donec elementum velit dui, sit amet porttitor ex tempus vel. Etiam vitae
//                     magna mattis, laoreet nisi vitae, aliquam ligula. Class aptent taciti sociosqu ad litora torquent
//                     per conubia nostra, per inceptos himenaeos. Duis gravida placerat varius. Nullam lacinia libero
//                     rhoncus sem blandit mollis. Praesent tempus tristique diam, sit amet gravida est mattis sit amet.
//                     Mauris maximus diam lobortis sem placerat, at bibendum erat imperdiet. Phasellus quam orci, bibendum
//                     sit amet risus quis, accumsan sagittis nibh.
//                 </Typography>

//                 <Typography paragraph>
//                     Etiam pellentesque tempus purus, quis blandit dolor mollis euismod. Suspendisse maximus ipsum
//                     tristique turpis tincidunt, ut dignissim dui vulputate. Aliquam tempor pretium rhoncus. Ut tempus
//                     molestie vehicula. Nulla lacus massa, suscipit dignissim pharetra sed, fringilla vel quam. Interdum
//                     et malesuada fames ac ante ipsum primis in faucibus. Curabitur rhoncus felis sit amet scelerisque
//                     pretium. Fusce porttitor nec justo vitae aliquet. Nunc posuere, neque vitae scelerisque maximus,
//                     metus nibh tempor augue, non rhoncus purus nulla et lacus. Cras efficitur dolor vel sem ornare, non
//                     tempor dolor posuere.
//                 </Typography>

//                 <Typography paragraph>
//                     Sed id ultricies nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
//                     inceptos himenaeos. Sed a aliquet tortor. Sed non consequat libero. Integer mattis lectus tellus, id
//                     vehicula lacus viverra sed. Phasellus ac dolor gravida, porta felis quis, cursus sapien. Mauris
//                     ullamcorper volutpat ex. Praesent et eros ut quam pellentesque ultrices sit amet vitae odio. Quisque
//                     molestie massa a urna maximus mollis.
//                 </Typography>
//                 <Typography paragraph>
//                     Phasellus ligula est, dictum laoreet consectetur rhoncus, laoreet sit amet felis. Vivamus at felis
//                     id sem fermentum cursus vehicula a dolor. Nulla erat ex, imperdiet vitae feugiat quis, blandit in
//                     diam. Suspendisse tincidunt, eros eu consectetur condimentum, purus sapien laoreet tellus, in
//                     facilisis enim ante in mauris. Vivamus scelerisque lacinia tellus eget porta. Curabitur fringilla,
//                     risus in aliquet suscipit, neque neque laoreet libero, in dignissim nulla orci volutpat magna.
//                     Phasellus feugiat sapien id sapien vehicula egestas. Duis tempus enim id dolor efficitur rutrum.
//                     Nulla volutpat odio mauris, ac condimentum risus finibus nec. Pellentesque ut sem tincidunt, porta
//                     felis ut, maximus nisl. Morbi a augue non metus consequat vehicula ac sit amet odio. Aliquam lorem
//                     nunc, porttitor nec euismod nec, finibus ac tortor. Cras in finibus sem. Morbi pulvinar eros
//                     bibendum varius sollicitudin.
//                 </Typography>
//             </Box>
//             <Typography my={1} color="error">
//                 {errors.contract}
//             </Typography>
//             <Box textAlign="right" mt={4} mb={2}>
//                 <Button
//                     variant="contained"
//                     color={values.contract ? 'success' : 'primary'}
//                     onClick={handleChangeContract}
//                     disabled={!scrolledToBottom && !values.contract}
//                 >
//                     {values.contract ? 'Contract accepted' : scrolledToBottom ? 'Accept Contract' : 'Scroll to the End'}
//                 </Button>
//             </Box>
//         </Container>
//     );
// }
