'use client';

import { Variants, motion } from 'framer-motion';

interface RotateAnimationProps {
    children: React.ReactNode;
    isDisabled?: boolean;
}

export const RotateAnimation = ({ children, isDisabled }: RotateAnimationProps) => {
    const rotateVariants: Variants = {
        initial: { rotate: 0 },
        animate: { rotate: 360, transition: { duration: 1, repeat: Infinity, repeatType: 'loop' } },
    };

    if (isDisabled) {
        return <div>{children}</div>;
    }

    return (
        <motion.div variants={rotateVariants} initial="initial" animate="animate">
            {children}
        </motion.div>
    );
};
