import React, { useState, useRef, useMemo } from 'react';
import ReactPlayer from 'react-player';
import { Box, Button, Slider } from '@mui/material';

export interface RangeTime {
    start: number;
    end: number;
}
interface VideoFrameSelectorProps {
    mediaConfig: {
        width: number;
        height: number;
    };
    onChange: (file: File, position: RangeTime) => void;
    file?: File;
}

const VideoFrameSelector = ({ mediaConfig, onChange, file }: VideoFrameSelectorProps) => {
    const [range, setRange] = useState([0, 5]);
    const playerRef = useRef<ReactPlayer | null>(null);
    const [duration, setDuration] = useState<number>(0);
    const [played, setPlayed] = useState<number>(0);

    const url = useMemo(() => URL.createObjectURL(file as Blob), [file]);

    const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
        if (playedSeconds > range[1]) {
            if (playerRef.current) {
                playerRef.current.seekTo(range[0]);
            }
        }
        setPlayed(playedSeconds);
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
        onChange(file!, { start: range[0], end: range[1] });
    };

    const handleRangeChange = (event: Event, newValue: number | number[]) => {
        setRange(newValue as number[]);
        if (playerRef.current) {
            playerRef.current.seekTo((newValue as number[])[0]);
        }
    };

    return (
        <Box display="flex" justifyContent="right" alignItems="flex-end" flexDirection="column">
            <ReactPlayer
                ref={playerRef}
                url={url}
                playing
                onProgress={handleProgress}
                onSeek={handleSeek}
                onPause={handlePause}
                onDuration={handleDuration}
            />
            <Slider
                value={range}
                max={duration}
                onChange={handleRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
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
