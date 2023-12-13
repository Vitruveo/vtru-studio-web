import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconTrash } from '@tabler/icons-react';

import { Box, Button, Divider, FormControl, LinearProgress, Typography } from '@mui/material';
import { sendRequestUploadThunk } from '@/features/user/thunks';
import { useDispatch } from '@/store/hooks';

const SecondStep = () => {
  const dispatch = useDispatch();

  const [assets, setAssets] = useState<File[]>([]);
  const onDrop = (acceptedFiles: File[]) => {
    setAssets((prevState) => [acceptedFiles[0], ...prevState]);
  };

  const [isUpload, setIsUpload] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const handleRequestUpload = ({ mimetype, originalName }: { mimetype: string; originalName: string }) => {
    dispatch(sendRequestUploadThunk({ mimetype, originalName }));
  };

  return (
    <Box display="flex" justifyContent="center" my={3}>
      <Box width={600} display="flex" flexDirection="column" gap={4} p={2}>
        <FormControl fullWidth error={false}>
          <Typography variant="subtitle1" fontWeight={600} component="label">
            Assets
          </Typography>
          <Box
            border="1px dashed"
            padding={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
            {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p>Drag and drop some files here or click to select files</p>
            )}
          </Box>
        </FormControl>

        <Box display="flex" flexDirection="column" gap={2}>
          {assets.map((item) => (
            <>
              <Box key={item.name} display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1}>
                  <IconTrash color="red" onClick={() => {}} size="16" stroke={1.5} />
                  <img width={40} height={40} src={URL.createObjectURL(item)} alt="" />
                  <Typography>{item.name}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <Typography>{formatBytesToMB(item.size)}</Typography>
                  {progress < 100 && (
                    <Button
                      disabled={progress > 0}
                      variant="outlined"
                      size="small"
                      onClick={() => handleRequestUpload({ mimetype: item.type, originalName: item.name })}>
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
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SecondStep;
