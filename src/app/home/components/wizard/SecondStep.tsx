import { useEffect, useState } from 'react';
import Img from 'next/image';
import { useDropzone } from 'react-dropzone';
import { IconTrash } from '@tabler/icons-react';

import { Box, Button, Divider, FormControl, LinearProgress, Typography } from '@mui/material';
import { StepsFormValues, StepsProps } from './types';

import { sendRequestUploadThunk } from '@/features/user/thunks';
import { useDispatch } from '@/store/hooks';

const currentStep = 2;

const SecondStep = ({ values, errors, handleChange, handleSubmit, setFieldValue }: StepsProps) => {
  const dispatch = useDispatch();

  const [isUpload, setIsUpload] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = (acceptedFiles: File[]) => {
    setFieldValue('file', acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (isUpload && progress < 100) {
      setTimeout(() => {
        setProgress((prevState) => prevState + 10);
      }, 1_000);
    }
  }, [isUpload, progress]);

  const formatBytesToMB = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleDeleteFile = () => {
    setFieldValue('file', null);
  };

  useEffect(() => {
    const fields: Array<keyof StepsFormValues> = ['file'];

    if (!fields.some((field) => errors[field])) {
      values.completedSteps[currentStep] = { step: currentStep, errors: false };
      setFieldValue('completedSteps', { ...values.completedSteps });
    } else {
      values.completedSteps[currentStep] = { step: currentStep, errors: true };
      setFieldValue('completedSteps', { ...values.completedSteps });
    }
  }, [values.wallet, errors]);

  const handleRequestUpload = ({ mimetype, originalName }: { mimetype: string; originalName: string }) => {
    dispatch(sendRequestUploadThunk({ mimetype, originalName }));
  };

  return (
    <Box display="flex" justifyContent="center" my={3}>
      <Box width={600} display="flex" flexDirection="column" gap={4} p={2}>
        <FormControl fullWidth error={false}>
          <Typography variant="subtitle1" fontWeight={600} component="label">
            Asset
          </Typography>
          <Box
            border="1px dashed"
            padding={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
            {...getRootProps()}>
            <input id="file" {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p>
                Drag and drop files here or click to select files. Please note that only JPG, GIF, PNG, or MP4 file
                types are accepted.
              </p>
            )}
          </Box>
          <Typography my={1} color="error">
            {errors.file}
          </Typography>
        </FormControl>

        {values.file && !errors.file && (
          <Box display="flex" flexDirection="column" gap={2}>
            <>
              <Box key={values.file?.name} display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1}>
                  <IconTrash color="red" onClick={handleDeleteFile} size="16" stroke={1.5} />
                  <Img width={40} height={40} src={values.file ? URL.createObjectURL(values.file) : ''} alt="" />
                  <Typography>{values.file?.name}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <Typography>{formatBytesToMB(values.file?.size || 0)}</Typography>
                  {progress < 100 && (
                    <Button
                      disabled={progress > 0}
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        handleRequestUpload({ mimetype: values.file!.type, originalName: values.file!.name })
                      }>
                      send now
                    </Button>
                  )}
                  {progress === 100 && <Typography color="success.main">completed</Typography>}
                </Box>
              </Box>
              {isUpload && (
                <Box>
                  <LinearProgress value={progress} variant="determinate" color="primary" />{' '}
                  <Typography display="flex" justifyContent="flex-end" variant="subtitle2">
                    {progress}%
                  </Typography>
                </Box>
              )}

              <Divider />
            </>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SecondStep;