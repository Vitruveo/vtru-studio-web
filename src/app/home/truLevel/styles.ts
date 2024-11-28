type keys = 'totalCard' | 'totalCardLevel' | 'totalCardPoints';

type LevelCardParams = {
    isCurrentLevel?: boolean;
    isNextLevel?: boolean;
    completed?: boolean;
};

const staticStyles: Record<keys, React.CSSProperties> = {
    totalCard: {
        gridColumn: 'span 3 / span 3',
        gridRow: 'span 2 / span 2',
        display: 'flex',
        gap: 4,
        padding: '30px',
        height: '230px',
        borderRadius: '7px',
        backgroundColor: '#B7B7B7',
    },
    totalCardLevel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '7px',
        width: '100%',
        color: 'primary',
        backgroundColor: 'white',
        height: '135px',
    },
    totalCardPoints: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '7px',
        width: '100%',
        color: 'white',
        backgroundColor: '#666666',
        height: '135px',
    },
};

const dynamicStyles = {
    levelCard: ({ completed, isCurrentLevel, isNextLevel }: LevelCardParams = {}) => ({
        padding: '15px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '7px',
        width: '100%',
        color: 'secondary',
        backgroundColor: completed ? '#6AA84F' : isCurrentLevel ? '#3D85C6' : isNextLevel ? '#999999' : 'lightgray',
    }),
};

export { staticStyles, dynamicStyles };
