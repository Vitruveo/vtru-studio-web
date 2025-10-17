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

export const labels = {
    email: 'Email',
    avatar: 'Avatar',
    social: 'Social',
    vault: 'Vault',
    profile: 'Profile Link',
    liveness: 'Liveness',
    idaml: 'ID+AML',
    facts2: 'Profile Detail',
    address: 'Address',
    phone: 'Phone',
    facts3: '0 Facts',
    facts4: '0 Facts',
};

export const levelsDescriptions = [
    { name: '', description: 'All users start at this level.' },
    { name: 'Starter', description: 'These artists are at the very beginning of their artistic journey.' },
    { name: 'Nova', description: 'These emerging artists are on the rise, showing promising talent and potential.' },
    {
        name: 'Virtuoso',
        description: 'These artists are highly skilled and have achieved considerable success in their careers.',
    },
    { name: 'Maestro', description: 'These artists represent the pinnacle of their craft.' },
];
