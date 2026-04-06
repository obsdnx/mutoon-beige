import { motion } from "framer-motion";

export function AnimatedIslamicStar({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, delay, ease: "easeInOut" },
        opacity: { duration: 0.5, delay }
      }
    }
  };

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <motion.path
        d="M50 5 L61 35 L95 35 L68 55 L79 90 L50 70 L21 90 L32 55 L5 35 L39 35 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="20"
        stroke="currentColor"
        strokeWidth="0.5"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="10"
        stroke="currentColor"
        strokeWidth="0.5"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
    </svg>
  );
}

export function AnimatedGeometricFrame({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, delay: delay + i * 0.2, ease: "easeInOut" },
        opacity: { duration: 0.3, delay: delay + i * 0.2 }
      }
    })
  };

  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      {/* Outer octagon */}
      <motion.path
        d="M60 10 L140 10 L190 60 L190 140 L140 190 L60 190 L10 140 L10 60 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        custom={0}
        variants={drawVariants}
        initial="hidden"
        animate="visible"
      />
      {/* Inner octagon */}
      <motion.path
        d="M75 30 L125 30 L170 75 L170 125 L125 170 L75 170 L30 125 L30 75 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        custom={1}
        variants={drawVariants}
        initial="hidden"
        animate="visible"
      />
      {/* Center square rotated */}
      <motion.path
        d="M100 50 L150 100 L100 150 L50 100 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        custom={2}
        variants={drawVariants}
        initial="hidden"
        animate="visible"
      />
      {/* Connecting lines */}
      <motion.line x1="60" y1="10" x2="100" y2="50" stroke="currentColor" strokeWidth="0.3" custom={3} variants={drawVariants} initial="hidden" animate="visible" />
      <motion.line x1="140" y1="10" x2="100" y2="50" stroke="currentColor" strokeWidth="0.3" custom={3} variants={drawVariants} initial="hidden" animate="visible" />
      <motion.line x1="190" y1="60" x2="150" y2="100" stroke="currentColor" strokeWidth="0.3" custom={4} variants={drawVariants} initial="hidden" animate="visible" />
      <motion.line x1="190" y1="140" x2="150" y2="100" stroke="currentColor" strokeWidth="0.3" custom={4} variants={drawVariants} initial="hidden" animate="visible" />
      <motion.line x1="140" y1="190" x2="100" y2="150" stroke="currentColor" strokeWidth="0.3" custom={5} variants={drawVariants} initial="hidden" animate="visible" />
      <motion.line x1="60" y1="190" x2="100" y2="150" stroke="currentColor" strokeWidth="0.3" custom={5} variants={drawVariants} initial="hidden" animate="visible" />
      <motion.line x1="10" y1="140" x2="50" y2="100" stroke="currentColor" strokeWidth="0.3" custom={6} variants={drawVariants} initial="hidden" animate="visible" />
      <motion.line x1="10" y1="60" x2="50" y2="100" stroke="currentColor" strokeWidth="0.3" custom={6} variants={drawVariants} initial="hidden" animate="visible" />
    </svg>
  );
}

export function AnimatedArabesque({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const curveVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, delay: delay + i * 0.3, ease: "easeInOut" },
        opacity: { duration: 0.5, delay: delay + i * 0.3 }
      }
    })
  };

  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      {/* Flowing curves */}
      <motion.path
        d="M100 20 Q140 50 100 100 Q60 150 100 180"
        stroke="currentColor"
        strokeWidth="0.5"
        custom={0}
        variants={curveVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="M20 100 Q50 60 100 100 Q150 140 180 100"
        stroke="currentColor"
        strokeWidth="0.5"
        custom={1}
        variants={curveVariants}
        initial="hidden"
        animate="visible"
      />
      {/* Circles */}
      <motion.circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" custom={2} variants={curveVariants} initial="hidden" animate="visible" />
      <motion.circle cx="100" cy="100" r="25" stroke="currentColor" strokeWidth="0.5" custom={3} variants={curveVariants} initial="hidden" animate="visible" />
      <motion.circle cx="100" cy="100" r="10" stroke="currentColor" strokeWidth="0.5" custom={4} variants={curveVariants} initial="hidden" animate="visible" />
      {/* Petal curves */}
      <motion.path
        d="M100 60 Q120 80 100 100 Q80 80 100 60"
        stroke="currentColor"
        strokeWidth="0.3"
        custom={5}
        variants={curveVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="M140 100 Q120 120 100 100 Q120 80 140 100"
        stroke="currentColor"
        strokeWidth="0.3"
        custom={5}
        variants={curveVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="M100 140 Q80 120 100 100 Q120 120 100 140"
        stroke="currentColor"
        strokeWidth="0.3"
        custom={5}
        variants={curveVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="M60 100 Q80 80 100 100 Q80 120 60 100"
        stroke="currentColor"
        strokeWidth="0.3"
        custom={5}
        variants={curveVariants}
        initial="hidden"
        animate="visible"
      />
    </svg>
  );
}

export function AnimatedInterlockingPattern({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.2, delay: delay + i * 0.15, ease: "easeInOut" },
        opacity: { duration: 0.3, delay: delay + i * 0.15 }
      }
    })
  };

  return (
    <svg viewBox="0 0 150 150" className={className} fill="none">
      {/* Horizontal lines */}
      <motion.line x1="0" y1="50" x2="150" y2="50" stroke="currentColor" strokeWidth="0.5" custom={0} variants={lineVariants} initial="hidden" animate="visible" />
      <motion.line x1="0" y1="100" x2="150" y2="100" stroke="currentColor" strokeWidth="0.5" custom={1} variants={lineVariants} initial="hidden" animate="visible" />
      {/* Vertical lines */}
      <motion.line x1="50" y1="0" x2="50" y2="150" stroke="currentColor" strokeWidth="0.5" custom={2} variants={lineVariants} initial="hidden" animate="visible" />
      <motion.line x1="100" y1="0" x2="100" y2="150" stroke="currentColor" strokeWidth="0.5" custom={3} variants={lineVariants} initial="hidden" animate="visible" />
      {/* Diagonal lines */}
      <motion.line x1="0" y1="0" x2="150" y2="150" stroke="currentColor" strokeWidth="0.3" custom={4} variants={lineVariants} initial="hidden" animate="visible" />
      <motion.line x1="150" y1="0" x2="0" y2="150" stroke="currentColor" strokeWidth="0.3" custom={5} variants={lineVariants} initial="hidden" animate="visible" />
      {/* Center diamond */}
      <motion.path
        d="M75 25 L125 75 L75 125 L25 75 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        custom={6}
        variants={lineVariants}
        initial="hidden"
        animate="visible"
      />
      {/* Inner diamond */}
      <motion.path
        d="M75 50 L100 75 L75 100 L50 75 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        custom={7}
        variants={lineVariants}
        initial="hidden"
        animate="visible"
      />
    </svg>
  );
}

export function AnimatedMoroccanTile({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const tileVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.8, delay: delay + i * 0.2, ease: "easeInOut" },
        opacity: { duration: 0.4, delay: delay + i * 0.2 }
      }
    })
  };

  return (
    <svg viewBox="0 0 120 120" className={className} fill="none">
      {/* 8-pointed star */}
      <motion.path
        d="M60 10 L70 40 L100 40 L75 60 L85 90 L60 70 L35 90 L45 60 L20 40 L50 40 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        custom={0}
        variants={tileVariants}
        initial="hidden"
        animate="visible"
      />
      {/* Border frame */}
      <motion.rect
        x="5"
        y="5"
        width="110"
        height="110"
        stroke="currentColor"
        strokeWidth="0.5"
        custom={1}
        variants={tileVariants}
        initial="hidden"
        animate="visible"
      />
      {/* Inner frame */}
      <motion.rect
        x="15"
        y="15"
        width="90"
        height="90"
        stroke="currentColor"
        strokeWidth="0.3"
        custom={2}
        variants={tileVariants}
        initial="hidden"
        animate="visible"
      />
      {/* Corner decorations */}
      <motion.circle cx="15" cy="15" r="5" stroke="currentColor" strokeWidth="0.3" custom={3} variants={tileVariants} initial="hidden" animate="visible" />
      <motion.circle cx="105" cy="15" r="5" stroke="currentColor" strokeWidth="0.3" custom={3} variants={tileVariants} initial="hidden" animate="visible" />
      <motion.circle cx="15" cy="105" r="5" stroke="currentColor" strokeWidth="0.3" custom={3} variants={tileVariants} initial="hidden" animate="visible" />
      <motion.circle cx="105" cy="105" r="5" stroke="currentColor" strokeWidth="0.3" custom={3} variants={tileVariants} initial="hidden" animate="visible" />
    </svg>
  );
}

export function ContinuousPatternLines({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 100" className={className} fill="none" preserveAspectRatio="none">
      <motion.path
        d="M0 50 Q50 20, 100 50 T200 50 T300 50 T400 50"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
      />
      <motion.path
        d="M0 50 Q50 80, 100 50 T200 50 T300 50 T400 50"
        stroke="currentColor"
        strokeWidth="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 0.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
      />
    </svg>
  );
}

export function PulsingGeometricGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          className="w-8 h-8 border border-current rotate-45"
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{ 
            opacity: [0.2, 0.6, 0.2], 
            scale: [0.8, 1, 0.8],
            rotate: [45, 50, 45]
          }}
          transition={{ 
            duration: 3, 
            delay: i * 0.2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
