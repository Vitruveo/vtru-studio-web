import React from 'react';
import Level from './level';
import { LevelsType } from './page';

interface LevelsProps {
    levels?: LevelsType[];
}

const Levels = ({ levels }: LevelsProps) => {
    const levelsCompleted =
        levels?.reduce((acc, cur, i) => {
            const checkLevels = Object.keys(acc).length;
            if (i === 0 || checkLevels === i) {
                const completed = !cur.steps.filter((step) => !step.completed).length;
                if (completed) return { ...acc, [cur.name]: completed };
            }
            return acc;
        }, {}) || {};

    return (
        <>
            {levels?.map((level, i) => (
                <Level
                    key={level.name}
                    name={level.name}
                    steps={level.steps}
                    levelNumber={i}
                    levelsCompleted={levelsCompleted}
                />
            ))}
        </>
    );
};

export default Levels;
