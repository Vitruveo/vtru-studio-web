import CustomCheckbox from '@/app/(main)/components/forms/theme-elements/CustomCheckbox';
import { useI18n } from '@/app/hooks/useI18n';
import { Box, FormControlLabel } from '@mui/material';
import { WidgetProps } from '@rjsf/utils';

interface CustomCheckboxWidgetProps extends WidgetProps {
    langBasePath: string;
}

export const CustomCheckboxWidget = (props: CustomCheckboxWidgetProps) => {
    const { id, options, value, langBasePath, name, onChange } = props;

    const { language } = useI18n();

    const handleChange = (item: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        let newValue;

        if (isChecked) {
            newValue = [...(value || []), item];
        } else {
            newValue = (value || []).filter((v: string) => v !== item);
        }

        onChange(newValue);
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
                            <CustomCheckbox
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                color="primary"
                                value={option.value}
                                checked={(value || []).includes(option.value)}
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
