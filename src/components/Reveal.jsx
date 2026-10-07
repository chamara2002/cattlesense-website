import { motion } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';

const VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] },
  }),
};

export function Reveal({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      custom={delay}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={VARIANTS}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealList({ children, className = '' }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children.map
        ? children.map((child, i) =>
            <motion.div key={i} custom={i} variants={VARIANTS}>{child}</motion.div>
          )
        : <motion.div custom={0} variants={VARIANTS}>{children}</motion.div>
      }
    </motion.div>
  );
}
