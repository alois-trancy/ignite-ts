import React, { useEffect, useState, MouseEvent } from "react";
import { useNavigate, Link, useSearchParams, useLocation, NavigateFunction } from "react-router-dom";
import { GameFilter } from "../app/enums";
import { getGameFilterByUrl } from "../features/games/gamesSlice";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion, Variants } from "framer-motion"
import SearchForm from "./SearchForm";
import { SearchIcon } from "@heroicons/react/solid";
import Logo from "./Logo";

type GenreLinksProps = {
  setIsSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

type SearchProps = {
  navigate: NavigateFunction,
  searchString: string,
  setSearchString: React.Dispatch<React.SetStateAction<string>>,
  setIsSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const GenreLinks = ({ setIsSideNavOpen }: GenreLinksProps) => {
  return (
    <>
      {
        [
          ["/popular", "Popular"],
          ["/new", "New"],
          ["/upcoming", "Upcoming"],
        ].map(([to, title]: Array<string>): JSX.Element => {
          return (
            <Link
              to={to}
              className="inline-block p-2 text-xl transition-all cursor-pointer md:py-1 hover:bg-blue-600 hover:text-white"
              onClick={() => setIsSideNavOpen(false)}
              key={to}
            >
              {title}
            </Link>
          );
        })
      }
    </>
  );
};

const Search = ({ navigate, searchString, setSearchString, setIsSideNavOpen }: SearchProps) => {
  return (
    <SearchForm
      navigate={navigate}
      searchString={searchString}
      className="flex flex-col md:items-center md:w-80 lg:w-96 md:flex-row md:mr-2"
      callback={() => setIsSideNavOpen(false)}
    >
      <input
        type="text"
        className="px-1 py-2 mb-4 transition-colors border-0 border-b-2 border-blue-600 outline-none md:flex-1 md:py-0 md:mr-4 md:mb-0 placeholder:italic hover:border-blue-800"
        placeholder="Game name..."
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
      />
      <button type="submit" className="flex items-center justify-center py-2 text-white transition-colors bg-blue-600 rounded-full md:px-4 hover:bg-blue-800">
        <SearchIcon className="h-5 nd:mr-2" /> <span className="md:hidden">Search</span>
      </button>
    </SearchForm>
  );
};

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGameFilterSearch = getGameFilterByUrl(location.pathname) === GameFilter.Search;
  const [searchParams] = useSearchParams();
  const [searchString, setSearchString] = useState<string>(
    isGameFilterSearch ?
      searchParams.get("q") ?? "" :
      ""
  );
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isGameFilterSearch) {
      setSearchString("");
    }
  }, [location, isGameFilterSearch, setSearchString])

  const handleSideNavClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="sticky top-0 z-20 p-1 bg-white shadow">
      <nav className="flex items-center justify-between md:items-stretch">
        <div className="flex items-center">
          <Logo onClick={() => navigate("")} />
          <div className="hidden ml-4 md:divide-x md:block">
            <GenreLinks setIsSideNavOpen={setIsSideNavOpen} />
          </div>
        </div>
        <div className="hidden md:flex md:items-center">
          <Search
            navigate={navigate}
            searchString={searchString}
            setSearchString={setSearchString}
            setIsSideNavOpen={setIsSideNavOpen}
          />
        </div>
        <MenuIcon className="h-8 cursor-pointer md:hidden" onClick={() => setIsSideNavOpen(!isSideNavOpen)}></MenuIcon>
      </nav>

      <AnimatePresence>
        {
          isSideNavOpen &&
          <motion.div
            className={`fixed top-0 left-0 h-screen bg-black bg-opacity-25 w-screen md:hidden`}
            onClick={() => setIsSideNavOpen(false)}
          >
            <motion.aside
              className="flex flex-col w-3/4 h-full bg-white divide-y"
              variants={asideVariants}
              initial="hidden"
              animate="animate"
              exit="exit"
              onClick={handleSideNavClick}
            >
              <div className="flex justify-between px-2 py-4 item-center">
                <Logo onClick={() => navigate("")} />
                <XIcon className="w-8 h-8 cursor-pointer" onClick={() => setIsSideNavOpen(false)} />
              </div>
              <GenreLinks setIsSideNavOpen={setIsSideNavOpen} />
              <div className="p-2 pt-4">
                <Search
                  navigate={navigate}
                  searchString={searchString}
                  setSearchString={setSearchString}
                  setIsSideNavOpen={setIsSideNavOpen}
                />
              </div>
            </motion.aside>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
};

const asideVariants: Variants = {
  hidden: {
    x: "-100vw",
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      duration: 0.25,
    },
  },
};

export default Nav;