import { Nova_Square } from 'next/font/google';
import { LevelsType } from './page';

export const getLevelsCompleted = ({ levels }: { levels?: LevelsType[] }) => {
    return (
        levels?.reduce((acc, cur, i) => {
            const checkLevels = Object.keys(acc).length;
            if (i === 0 || checkLevels === i) {
                const completed = !cur.steps.filter((step) => !step.completed).length;
                if (completed) return { ...acc, [cur.name]: completed };
            }
            return acc;
        }, {}) || {}
    );
};

export const getCurrentLevel = ({ levels }: { levels?: LevelsType[] }) => {
    const levelsCompleted = getLevelsCompleted({ levels });
    return Object.values(levelsCompleted).length - 1;
};

export const novaSquare = Nova_Square({
    subsets: ['latin'],
    weight: ['400'],
    style: 'normal',
});
