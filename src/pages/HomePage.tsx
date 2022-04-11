import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import SearchForm from "../components/SearchForm";
import { SearchIcon } from "@heroicons/react/solid";
import { motion, Variants } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");

  return (
    <motion.div
      className="flex flex-col items-center flex-1 p-4"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex items-center my-24"
        variants={welcomeToContainerVariants}
      >
        <motion.div className="mr-4 text-3xl" variants={welcomeToVariants}>Welcome to</motion.div>
        <motion.div variants={LogoVariants}>
          <Logo logoClassName="h-16 w-16" nameClassName="text-5xl" onClick={() => navigate("")} />
        </motion.div>
      </motion.div>
      <motion.div variants={searchVariants}>
        <SearchForm
          navigate={navigate}
          searchString={searchString}
          className="flex flex-col md:flex-row"
        >
          <input
            type="text"
            className="px-4 py-2 mb-4 transition-colors border-2 border-blue-600 shadow outline-none w-96 rounded-3xl md:flex-1 md:mr-4 md:mb-0 placeholder:italic hover:border-blue-800"
            placeholder="Game name..."
            value={searchString}
            onChange={e => setSearchString(e.target.value)}
          />
          <button
            type="submit" className="flex items-center justify-center px-4 py-2 text-white transition-colors bg-blue-600 rounded-full shadow md:py-1 hover:bg-blue-800">
            <SearchIcon className="mr-1 h-7" /> <span>Search</span>
          </button>
        </SearchForm>
      </motion.div>
    </motion.div>
  );
}

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 1,
      staggerChildren: 0.25,
    },
  },
};

const welcomeToContainerVariants: Variants = {
  hidden: {},
  visible: {
    x: "-15%",
    transition: {
      x: {
        ease: "easeInOut",
        when: "afterChildren",
        duration: 0.5,
        delay: 1,
      },
    },
  },
};

const welcomeToVariants: Variants = {
  hidden: {
    opacity: 0,
    translateX: -20,
    scale: 1,
  },
  visible: {
    opacity: 1,
    translateX: 0,
    scale: 0.6,
    originX: 1,
    originY: 0,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

const LogoVariants: Variants = {
  hidden: {
    opacity: 0,
    translateY: 20,
    scale: 1.1
  },
  visible: {
    opacity: 1,
    translateY: 0,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5,
      delay: 0.5,
    },
  },
};

const searchVariants: Variants = {
  hidden: {
    opacity: 0,
    translateY: 20,
  },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: {
      ease: "easeOut",
      duration: 1,
      delay: 1.25,
    },
  },
};

export default HomePage;