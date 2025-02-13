import CustomCheckbox from '@/app/(main)/components/forms/theme-elements/CustomCheckbox';
import { Box, BoxProps, Typography } from '@mui/material';

interface CardProps extends BoxProps {
    title: string;
    added: boolean;
    disabled?: boolean;
    setAdded: (added: boolean) => void;
    children?: React.ReactNode;
}

function Card({ children, title, added, disabled, setAdded, ...res }: CardProps) {
    const handleCheckOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        setAdded(!added);
    };

    return (
        <Box border="2px solid" padding={2} borderRadius={2} borderColor="#D5D5D5" bgcolor="#EFEFEF" {...res}>
            <Box alignItems="center" display="flex">
                <Box>
                    <CustomCheckbox width={25} height={25} checked={added} onChange={handleCheckOnchange} />
                </Box>
                <Box>
                    <Typography fontSize="1.2rem" fontWeight="bold">
                        {title}
                    </Typography>
                </Box>
            </Box>
            {children}
        </Box>
    );
}

export default Card;
