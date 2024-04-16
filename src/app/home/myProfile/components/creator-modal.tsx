import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Stack,
} from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { Formik, FieldArray } from 'formik';
import CustomSelect from '../../components/forms/theme-elements/CustomSelect';
import { Creator } from '../types';
import { creatorSchema } from '../schemas/creator-schema';
import creatorJSON from '../schemas/creators.json';

interface CreatorJSONEnumProperty {
    enum: string[];
}

// NOTE: TIPANDO SÓ AS PROPRIEDADES NECESSÁRIAS
interface CreatorJSON {
    creators: {
        schema: {
            items: {
                properties: {
                    nationality: CreatorJSONEnumProperty;
                    residence: CreatorJSONEnumProperty;
                    ethnicity: CreatorJSONEnumProperty;
                    gender: CreatorJSONEnumProperty;
                };
            };
        };
    };
}

// NOTE: ESSE ROLE É PARA CONTROLAR O ROLE DO INPUT DE ROLE E NÃO O ARRAY
export interface CreatorForm extends Creator {
    role: string;
}

export interface CreatorModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (values: CreatorForm) => void;
    isEditing?: boolean;
    onEdit?: (values: CreatorForm) => void;
    initialFormValues?: CreatorForm;
}

const initialValues: CreatorForm = {
    name: '',
    roles: [],
    bio: '',
    profileUrl: '',
    ethnicity: '',
    gender: '',
    nationality: '',
    residence: '',
    role: '',
};

const data: CreatorJSON = creatorJSON;

export const CreatorModal = ({ open, onClose, onAdd, isEditing, onEdit, initialFormValues }: CreatorModalProps) => {

    return (
        <Formik initialValues={initialFormValues ?? initialValues} enableReinitialize onSubmit={() => {}} validationSchema={creatorSchema}>
            {({ values, handleChange, validateForm, errors, resetForm }) => (
                <Dialog open={open} onClose={onClose}>
                    <DialogTitle>Add New Creator</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To add a new creator to this website, please fill the empty fields below.
                        </DialogContentText>
                        <Box mt={2}>
                            <CustomTextField
                                autoFocus
                                margin="dense"
                                name="name"
                                label="Creator Name"
                                fullWidth
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                value={values.name}
                            />
                            <FieldArray name="roles">
                                {({ insert, remove }) => (
                                    <Stack>
                                        <Box display="flex" gap={2} alignItems="baseline">
                                            <CustomTextField
                                                margin="dense"
                                                name="role"
                                                label="Role"
                                                fullWidth
                                                onChange={handleChange}
                                                value={values.role}
                                                error={!!errors.roles}
                                                helperText={errors.roles}
                                            />
                                            <Button
                                                variant="contained"
                                                size="large"
                                                onClick={() => {
                                                    if (values.role.trim() != '') {
                                                        insert(values.roles.length, values.role);
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </Box>
                                        <Box display="flex" flexWrap="wrap" gap={1}>
                                            {values.roles.map((role, index) => (
                                                <Chip key={index} label={role} onDelete={() => remove(index)} />
                                            ))}
                                        </Box>
                                    </Stack>
                                )}
                            </FieldArray>
                            <CustomTextField
                                error={!!errors.bio}
                                helperText={errors.bio}
                                margin="dense"
                                name="bio"
                                label="Bio"
                                fullWidth
                                onChange={handleChange}
                                value={values.bio}
                            />
                            <CustomTextField
                                error={!!errors.profileUrl}
                                helperText={errors.profileUrl}
                                margin="dense"
                                name="profileUrl"
                                label="Profile URL"
                                fullWidth
                                onChange={handleChange}
                                value={values.profileUrl}
                            />
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Ethnicity</InputLabel>
                                <CustomSelect
                                    error={!!errors.ethnicity}
                                    helperText={errors.ethnicity}
                                    name="ethnicity"
                                    label="Ethnicity"
                                    value={values.ethnicity}
                                    onChange={handleChange}
                                >
                                    {data.creators.schema.items.properties.ethnicity.enum.map((item, index) => (
                                        <MenuItem value={item} key={index}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Gender</InputLabel>
                                <CustomSelect
                                    error={!!errors.gender}
                                    helperText={errors.gender}
                                    name="gender"
                                    label="Gender"
                                    value={values.gender}
                                    onChange={handleChange}
                                >
                                    {data.creators.schema.items.properties.gender.enum.map((item, index) => (
                                        <MenuItem value={item} key={index}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Nationality</InputLabel>
                                <CustomSelect
                                    error={!!errors.nationality}
                                    helperText={errors.nationality}
                                    name="nationality"
                                    label="Nationality"
                                    value={values.nationality}
                                    onChange={handleChange}
                                >
                                    {data.creators.schema.items.properties.nationality.enum.map((item, index) => (
                                        <MenuItem value={item} key={index}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Residence</InputLabel>
                                <CustomSelect
                                    error={!!errors.residence}
                                    helperText={errors.residence}
                                    name="residence"
                                    label="Residence"
                                    value={values.residence}
                                    onChange={handleChange}
                                >
                                    {data.creators.schema.items.properties.residence.enum.map((item, index) => (
                                        <MenuItem value={item} key={index}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="error"
                            onClick={() => {
                                onClose();
                                resetForm();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                validateForm().then((e) => {
                                    if (Object.keys(e).length === 0) {
                                        isEditing ? onEdit?.(values) : onAdd(values);
                                        resetForm();
                                        onClose();
                                    }
                                });
                            }}
                        >
                            {isEditing ? 'Edit' : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Formik>
    );
};
