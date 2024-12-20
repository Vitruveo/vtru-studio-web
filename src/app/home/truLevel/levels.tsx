import React from 'react';
import Level from './level';
import { TruLevel } from '@/features/user/types';

interface LevelsProps {
    truLevel?: TruLevel;
}

const Levels = ({ truLevel }: LevelsProps) => {
    const levelsCompleted =
        truLevel?.levels.reduce((acc, cur, i) => {
            const checkLevels = Object.keys(acc).length;
            if (i === 0 || checkLevels === i) {
                const completed = !cur.items.filter((step) => !step.completed).length;
                if (completed) return { ...acc, [cur.id]: completed };
            }
            return acc;
        }, {}) || {};

    return (
        <>
            {truLevel?.levels.map((level, i) => (
                <Level
                    key={level.id}
                    id={level.id}
                    items={level.items}
                    levelNumber={i}
                    levelsCompleted={levelsCompleted}
                />
            ))}
        </>
    );
};

export default Levels;
