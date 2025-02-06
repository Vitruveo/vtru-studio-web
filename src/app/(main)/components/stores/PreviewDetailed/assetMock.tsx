import { Box, Typography, Badge } from '@mui/material';
import { IconPhotoScan } from '@tabler/icons-react';

interface Props {
    showBadge?: boolean;
    showDetails?: boolean;
    color: string;
}

const AssetMock = ({ showBadge = false, showDetails = false, color }: Props) => {
    return (
        <Badge
            badgeContent={
                showBadge && (
                    <Box bgcolor={'gray'} paddingInline={0.6} sx={{ borderRadius: 100, backgroundColor: color }}>
                        <Typography fontSize={'0.7rem'} color="white">
                            10
                        </Typography>
                    </Box>
                )
            }
        >
            <Box width={'100%'} height={showDetails ? '170px' : '95px'} bgcolor={'#eeeeee'}>
                <Box
                    display={'flex'}
                    height={showDetails ? '55%' : '100%'}
                    bgcolor={'#919191'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <IconPhotoScan color={'white'} />
                </Box>

                {showDetails && (
                    <Box display={'flex'} flexDirection={'column'} marginInline={2} marginBlock={1}>
                        <Typography fontSize={'0.8rem'} sx={{ lineHeight: 1.5 }}>
                            Title
                        </Typography>
                        <Typography fontSize={'0.6rem'} sx={{ lineHeight: 1.5, color: color }}>
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
