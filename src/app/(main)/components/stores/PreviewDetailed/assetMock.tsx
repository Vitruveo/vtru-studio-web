import { Box, Typography, Badge } from '@mui/material';
import { IconPhotoScan } from '@tabler/icons-react';

interface Props {
    showBadge?: boolean;
    showDetails?: boolean;
}

const AssetMock = ({ showBadge = false, showDetails = false }: Props) => {
    return (
        <Badge
            badgeContent={
                showBadge && (
                    <Box bgcolor={'gray'} paddingInline={0.6} sx={{ borderRadius: 100 }}>
                        <Typography fontSize={'0.7rem'} color="white">
                            10
                        </Typography>
                    </Box>
                )
            }
        >
            <Box width={'100%'} height={showDetails ? '120px' : '55px'} bgcolor={'#eeeeee'}>
                <Box display={'flex'} height="55px" bgcolor={'#919191'} justifyContent={'center'} alignItems={'center'}>
                    <IconPhotoScan color={'white'} />
                </Box>

                {showDetails && (
                    <Box display={'flex'} flexDirection={'column'} marginInline={2} marginBlock={1}>
                        <Typography fontSize={'0.8rem'} sx={{ lineHeight: 1.5 }}>
                            Title
                        </Typography>
                        <Typography fontSize={'0.6rem'} sx={{ lineHeight: 1.5 }}>
                            Creator
                        </Typography>
                        <Typography fontSize={'0.6rem'} sx={{ lineHeight: 1.5 }}>
                            $ 000
                        </Typography>
                    </Box>
                )}
            </Box>
        </Badge>
    );
};

export default AssetMock;
