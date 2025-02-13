import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FooterForm, FooterFormProps } from '../footerForm';

type Props = {
    maxHeight?: string;
    description?: string;
    children: JSX.Element | JSX.Element[];
    title?: string;
    submitText?: string;
    secondaryText?: string;
    display?: boolean;
} & FooterFormProps;

const PageContainerFooter = ({
    title,
    maxHeight,
    description,
    submitText,
    children,
    stepStatus,
    stepNumber,
    backOnclick,
    backPathRouter,
    saveOnClick,
    submitDisabled,
    secondaryText,
    hasBackButton,
    hasSubmitButton = true,
    display,
}: Props) => (
    <FooterForm
        maxHeight={maxHeight}
        stepStatus={stepStatus}
        stepNumber={stepNumber}
        submitText={submitText}
        backPathRouter={backPathRouter}
        submitDisabled={submitDisabled}
        backOnclick={backOnclick}
        saveOnClick={saveOnClick}
        secondaryText={secondaryText}
        hasBackButton={hasBackButton}
        hasSubmitButton={hasSubmitButton}
        display={display}
    >
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                </Helmet>
                {children}
            </div>
        </HelmetProvider>
    </FooterForm>
);

export default PageContainerFooter;
