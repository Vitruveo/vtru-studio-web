import React from 'react';

interface ProgressBarProps {
    totalPoints: number;
    currentPoints: number;
}

const progressBarContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '5px',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
};

const whiteBarStyle: React.CSSProperties = {
    flex: 1,
    backgroundColor: '#FFFFFF',
};

const filledBarStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    mixBlendMode: 'darken',
    height: '100%',
    transition: 'width 0.3s ease',
};

const ProgressBar: React.FC<ProgressBarProps> = ({ totalPoints, currentPoints }) => {
    const filledPercentage = Math.min((currentPoints / totalPoints) * 100, 100);
    return (
        <div style={progressBarContainerStyle}>
            <div
                style={{
                    ...filledBarStyle,
                    width: `${filledPercentage}%`,
                }}
            />
            <div style={whiteBarStyle} />
        </div>
    );
};

export default ProgressBar;
