'use client';
import { useSelector } from '@/store/hooks';
import { Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Props = {
    className?: string;
    children: JSX.Element | JSX.Element[];
    sx?: any;
};

const BlankCard = ({ children, className, sx }: Props) => {
    const customizer = useSelector((state) => state.customizer);

    const theme = useTheme();
    const borderColor = theme.palette.divider;

    return (
        <Card
            sx={{
                p: 0,
                border: `1px solid ${borderColor}`,
                position: 'relative',
                sx,
            }}
            className={className}
            variant="outlined"
        >
            {children}
        </Card>
    );
};

export default BlankCard;
