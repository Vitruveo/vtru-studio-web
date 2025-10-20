import React from 'react';
import Level from './level';
import { TruLevel } from '@/features/user/types';
import { useSelector } from '@/store/hooks';

interface LevelsProps {
    truLevel?: TruLevel;
}

const Levels = ({ truLevel }: LevelsProps) => {
    const { emails, myWebsite, profile, socials, didit, vault } = useSelector((state) => state.user);

    const levelsCompleted =
        truLevel?.levels.reduce((acc, cur, i) => {
            const checkLevels = Object.keys(acc).length;
            if (i === 0 || checkLevels === i) {
                const completed = !cur.items.filter((step) => !step.completed).length;
                if (completed) return { ...acc, [cur.id]: completed };
            }
            return acc;
        }, {}) || {};

    const levelHandlers: Record<number, Record<string, () => boolean>> = {
        0: {
            email: () => !!emails.length,
        },
        1: {
            avatar: () => !!profile.avatar,
            social: () => !!socials?.x?.avatar,
            profile: () => !!myWebsite,
            vault: () => !!vault.vaultAddress,
        },
        2: {
            liveness: () => !!didit?.steps?.some((step) => step.name === 'LIVENESS' && step.status === 'Approved'),
            idaml: () => !!didit?.steps?.some((step) => step.name === 'ID_VERIFICATION' && step.status === 'Approved'),
        },
        3: {
            address: () =>
                !!didit?.steps?.some((step) => step.name === 'PROOF_OF_ADDRESS' && step.status === 'Approved'),
            phone: () =>
                !!didit?.steps?.some((step) => step.name === 'PHONE_VERIFICATION' && step.status === 'Approved'),
        },
    };

    const checkSyncWeb2AndWeb3 = truLevel?.levels.map((v, i) => {
        const handlers = levelHandlers[i];

        return {
            level: i,
            ...v.items.reduce(
                (acc, item) => {
                    const handler = handlers?.[item.label];

                    if (handler) {
                        if (acc.web2) acc.web2 = handler();
                        if (acc.web3) acc.web3 = item.completed;
                    }

                    return acc;
                },
                { web2: true, web3: true }
            ),
        };
    });

    return (
        <>
            {truLevel?.levels.map((level, i) => (
                <Level
                    key={level.id}
                    id={level.id}
                    loading={checkSyncWeb2AndWeb3 && checkSyncWeb2AndWeb3[i]?.web2 !== checkSyncWeb2AndWeb3[i]?.web3}
                    items={level.items}
                    levelNumber={i}
                    levelsCompleted={levelsCompleted}
                />
            ))}
        </>
    );
};

export default Levels;
