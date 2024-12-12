import { Nova_Square } from 'next/font/google';

import { LevelType } from '@/features/user/types';

export const getLevelsCompleted = ({ levels }: { levels?: LevelType[] }) => {
    return (
        levels?.reduce((acc, cur, i) => {
            const checkLevels = Object.keys(acc).length;
            if (i === 0 || checkLevels === i) {
                const completed = !cur.items.filter((step) => !step.completed).length;
                if (completed) return { ...acc, [cur.id]: completed };
            }
            return acc;
        }, {}) || {}
    );
};

export const getCurrentLevel = ({ levels }: { levels?: LevelType[] }) => {
    const levelsCompleted = getLevelsCompleted({ levels });
    return Object.values(levelsCompleted).length - 1;
};

export const novaSquare = Nova_Square({
    subsets: ['latin'],
    weight: ['400'],
    style: 'normal',
});
