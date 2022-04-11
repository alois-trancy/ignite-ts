import { motion, Variants } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      className="fixed left-0 right-0 flex justify-center"
      variants={variantsContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="relative w-16 h-16 p-2 bg-white rounded-full shadow">
        {
          [
            variantsSide1,
            variantsSide2,
            variantsSide3,
            variantsSide4,
          ].map((variants: Variants, index: number) => {
            return (
              <motion.div
                className="w-[calc(100%-1rem)] h-[calc(100%-1rem)] border-[6px] border-r-blue-500 border-transparent rounded-full absolute top-2 left-2"
                variants={variants}
                animate="visible"
                key={`spinner-${index}`}>
              </motion.div>
            );
          })
        }
      </motion.div>
    </motion.div>
  );
}

const variantsContainer: Variants = {
  hidden: {
    opacity: 0,
    y: 0,
    zIndex: 1,
  },
  visible: {
    opacity: 1,
    y: "5rem",
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: 0,
    zIndex: 1,
    transition: {
      duration: 0.5,
    },
  }
};

const variantsSide1: Variants = {
  visible: {
    rotate: 360,
    transition: {
      ease: [0.5, 0, 0.5, 1],
      duration: 1.,
      repeat: Infinity,
    },
  },
};

const variantsSide2: Variants = {
  visible: {
    rotate: 360,
    transition: {
      ease: [0.5, 0, 0.5, 1],
      duration: 1.,
      repeat: Infinity,
      delay: 0.3,
    },
  },
};

const variantsSide3: Variants = {
  visible: {
    rotate: 360,
    transition: {
      ease: [0.5, 0, 0.5, 1],
      duration: 1.,
      repeat: Infinity,
      delay: 0.2,
    },
  },
};

const variantsSide4: Variants = {
  visible: {
    rotate: 360,
    transition: {
      ease: [0.5, 0, 0.5, 1],
      duration: 1.,
      repeat: Infinity,
      delay: 0.1,
    },
  },
};

export default Loading;