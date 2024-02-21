import React, { useState, useRef, useMemo } from 'react';
import ReactPlayer from 'react-player';
import { Box, Button } from '@mui/material';

interface VideoFrameSelectorProps {
    mediaConfig: {
        width: number;
        height: number;
    };
    onChange: (file: File, position: number) => void;
    file?: File;
}

const VideoFrameSelector = ({ mediaConfig, onChange, file }: VideoFrameSelectorProps) => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const [duration, setDuration] = useState<number>(0);
    const [played, setPlayed] = useState<number>(0);

    const url = useMemo(() => URL.createObjectURL(file as Blob), [file]);

    const handleProgress = (state: { played: number }) => {
        const position = state.played * duration;
        setPlayed(position);
    };

    const handleSeek = (newPosition: number) => {
        setPlayed(newPosition);
    };

    const handlePause = () => {
        if (playerRef.current) {
            const position = playerRef.current.getCurrentTime();
            setPlayed(position);
        }
    };

    const handleDuration = (dur: number) => {
        setDuration(dur);
    };

    const changePosition = () => {
        onChange(file!, played);
    };

    return (
        <Box display="flex" justifyContent="right" alignItems="flex-end" flexDirection="column">
            <ReactPlayer
                ref={playerRef}
                url={url}
                controls
                onProgress={handleProgress}
                onSeek={handleSeek}
                onPause={handlePause}
                onDuration={handleDuration}
            />
            <Box marginTop={2}>
                <Button onClick={changePosition} size="small" variant="contained">
                    create preview
                </Button>
            </Box>
        </Box>
    );
};

export default VideoFrameSelector;
