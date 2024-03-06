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
        if (Array.isArray(newValue)) {
            const [start, end] = newValue;
            const rangeLength = end - start;

            if (rangeLength <= 5) {
                setRange(newValue);
                if (playerRef.current) {
                    playerRef.current.seekTo(start);
                }
            } else {
                // If the new range is more than 5 seconds, adjust it to keep the length at 5 seconds
                const adjustedRange = range[1] < end ? [end - 5, end] : [start, start + 5];
                setRange(adjustedRange);
                if (playerRef.current) {
                    playerRef.current.seekTo(adjustedRange[0]);
                }
            }
        }
    };

    const handleClick = (event: React.MouseEvent) => {
        const rect = (event.target as Element).getBoundingClientRect();
        const x = event.clientX - rect.left; // x position within the element.
        const width = rect.width;
        const clickPosition = (x / width) * duration; // calculate click position in your data

        if (clickPosition < range[0] || clickPosition > range[1]) {
            const newStart = clickPosition < duration - 5 ? clickPosition : duration - 5;
            setRange([newStart, newStart + 5]);
            if (playerRef.current) {
                playerRef.current.seekTo(newStart);
            }
        }
    };

    return (
        <Box display="flex" justifyContent="right" alignItems="flex-end" flexDirection="column">
            <ReactPlayer
                ref={playerRef}
                url={url}
                muted
                playing
                onProgress={handleProgress}
                onSeek={handleSeek}
                onPause={handlePause}
                onDuration={handleDuration}
            />
            <Slider
                value={range}
                max={duration}
                sx={{
                    '& .MuiSlider-thumb': {
                        height: 13,
                        width: 13,
                    },
                }}
                onChange={handleRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="start-slider"
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
