import React from 'react';

interface SquareProps {
    count: number;
}

const squareStyle: React.CSSProperties = {
    width: '30px',
    height: '30px',
    backgroundColor: 'transparent',
    border: '3px solid #FFFFFF',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const dotStyle: React.CSSProperties = {
    width: '6px',
    height: '6px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #FFFFFF',
    borderRadius: '50%',
    position: 'absolute',
};

const Square: React.FC<SquareProps> = ({ count }) => {
    const positions: Record<string, React.CSSProperties> = {
        center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        topLeft: { top: '5%', left: '5%' },
        topRight: { top: '5%', right: '5%' },
        bottomLeft: { bottom: '5%', left: '5%' },
        bottomRight: { bottom: '5%', right: '5%' },
        midTopRight: { top: '10%', right: '10%' },
        midBottomLeft: { bottom: '10%', left: '10%' },
    };

    const dots = [];

    if (count === 1) {
        dots.push(<div key="center" style={{ ...dotStyle, ...positions.center }} />);
    } else if (count === 2) {
        dots.push(<div key="midBottomLeft" style={{ ...dotStyle, ...positions.midBottomLeft }} />);
        dots.push(<div key="midTopRight" style={{ ...dotStyle, ...positions.midTopRight }} />);
    } else if (count === 3) {
        dots.push(<div key="midBottomLeft" style={{ ...dotStyle, ...positions.midBottomLeft }} />);
        dots.push(<div key="center" style={{ ...dotStyle, ...positions.center }} />);
        dots.push(<div key="midTopRight" style={{ ...dotStyle, ...positions.midTopRight }} />);
    } else if (count === 4) {
        dots.push(<div key="topLeft" style={{ ...dotStyle, ...positions.topLeft }} />);
        dots.push(<div key="topRight" style={{ ...dotStyle, ...positions.topRight }} />);
        dots.push(<div key="bottomLeft" style={{ ...dotStyle, ...positions.bottomLeft }} />);
        dots.push(<div key="bottomRight" style={{ ...dotStyle, ...positions.bottomRight }} />);
    }

    return <div style={squareStyle}>{dots}</div>;
};

export default Square;
