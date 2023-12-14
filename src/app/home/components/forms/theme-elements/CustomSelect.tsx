import { Select, SelectProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomSelect = styled((props: SelectProps) => <Select {...props} />)(() => ({}));

export default CustomSelect;
