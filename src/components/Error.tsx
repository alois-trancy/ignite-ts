import { motion, Variants } from "framer-motion";

type ErrorProps = {
  message: string,
};

const Error = ({ message }: ErrorProps) => {
  return (
    <motion.div
      className="fixed left-0 right-0 top-[20vh] mx-auto md:top-[15vh] w-9/12 md:w-2/5 border-red-400 border-2 bg-red-200 p-4 z-30 text-red-500"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <p className=""><span className="text-2xl font-bold">Oh No!</span> An error has occurred.</p>
      <p>{message}</p>
    </motion.div>
  )
};

const variants: Variants = {
  hidden: {
    y: "100vh"
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 8,
      mass: 0.5,
    }
  },
}

export default Error;