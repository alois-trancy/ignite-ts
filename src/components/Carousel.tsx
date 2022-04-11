import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useState } from "react";

enum Direction {
  Left,
  Right,
  None,
}

type CarouselProps = {
  images: Array<string>,
};

const Carousel = ({ images }: CarouselProps) => {
  const [[currentImage, direction], setPage] = useState([images[0], Direction.None]);

  const handleScreenshotArrowClick = (newDirection: Direction) => {
    const currentIndex = images.findIndex((image) => image === currentImage);
    if (newDirection === Direction.Left) {
      setPage([currentIndex === 0 ? images[images.length - 1] : images[currentIndex - 1], newDirection]);
    } else {
      setPage([currentIndex >= images.length - 1 ? images[0] : images[currentIndex + 1], newDirection]);
    }
  };

  return (
    <>
      <motion.div
        className="relative flex items-center justify-center w-full overflow-hidden bg-black h-[23rem] md:h-3/4"
        variants={currentImageContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <ChevronLeftIcon className="absolute z-10 w-8 h-8 text-white bg-blue-500 rounded-full shadow-md cursor-pointer left-4" onClick={() => handleScreenshotArrowClick(Direction.Left)} />
        <ChevronRightIcon className="absolute z-10 w-8 h-8 text-white bg-blue-500 rounded-full shadow-md cursor-pointer right-4" onClick={() => handleScreenshotArrowClick(Direction.Right)} />
        <AnimatePresence exitBeforeEnter>
          <motion.img
            className="object-cover"
            src={currentImage !== "" ? currentImage : images[0]}
            alt={currentImage}
            variants={currentImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            key={`showed-${currentImage}`} />
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="flex gap-2 py-2 overflow-x-auto overflow-y-hidden h-28 md:h-1/4"
        variants={screenshotsVariants}
        initial="hidden"
        animate="visible"
      >
        {images.map((image) => {
          return <motion.img
            className="object-cover w-40 bg-black cursor-pointer"
            src={image}
            key={image}
            alt={image}
            onClick={() => setPage([image, Direction.None])}
            variants={screenshotVariants}
          />
        })}
      </motion.div>
    </>
  );
};

const currentImageContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

const currentImageVariants: Variants = {
  enter: (direction: Direction) => {
    return {
      x: direction === Direction.None ? 0 : direction === Direction.Left ? "100%" : "-100%",
      scale: direction === Direction.None ? 0 : 1,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: (direction: Direction) => {
    return {
      zIndex: 0,
      x: direction === Direction.None ? 0 : direction === Direction.Left ? "-100%" : "100%",
      scale: direction === Direction.None ? 0 : 1,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    };
  },
};

const screenshotsVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const screenshotVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default Carousel;