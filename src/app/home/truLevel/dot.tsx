import React from 'react';

interface DotProps {
    isCompleted: boolean;
}

const Dot: React.FC<DotProps> = ({ isCompleted }) => {
    const dotStyle: React.CSSProperties = {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: isCompleted ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return <div style={dotStyle}></div>;
};

export default Dot;
