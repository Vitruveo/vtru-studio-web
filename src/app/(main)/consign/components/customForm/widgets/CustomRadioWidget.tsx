import CustomRadio from '@/app/(main)/components/forms/theme-elements/CustomRadio';
import { useI18n } from '@/app/hooks/useI18n';
import { Box, FormControlLabel } from '@mui/material';
import { WidgetProps } from '@rjsf/utils';

interface CustomRadioWidgetProps extends WidgetProps {
    langBasePath: string;
}

export const CustomRadioWidget = (props: CustomRadioWidgetProps) => {
    const { id, options, value, langBasePath, name, blurHandler, onChange } = props;

    const { language } = useI18n();

    const handleChange = (item: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(item);
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
        props.onFocus(props.id, e.target.value);
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement, Element>) => {
        props.onBlur(props.id, e.target.value);
    };

    return (
        <div id={id}>
            {(options.enumOptions || []).map((option, i) => (
                <Box key={i}>
                    <FormControlLabel
                        control={
                            <CustomRadio
                                disabled={props.disabled}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                color="primary"
                                value={option.value}
                                checked={value == option.value}
                                onChange={handleChange(option.value)}
                            />
                        }
                        label={`${language[`${langBasePath}.${name}.enum.${option.value.toLowerCase()}`] as string}`}
                    />
                </Box>
            ))}
        </div>
    );
};
