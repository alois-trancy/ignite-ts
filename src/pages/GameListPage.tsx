import { useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import Loading from "../components/Loading";
import GameCards from "../features/games/GameCards";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchGames, getGameFilterByUrl, selectErrorState, selectLoadingState, } from "../features/games/gamesSlice";
import { FetchGamePayload } from "../app/interfaces";
import { AnimatePresence } from "framer-motion";
import { GameFilter } from "../app/enums";
import Error from "../components/Error";

const GameListPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isLoading = useAppSelector(selectLoadingState);
  const isError = useAppSelector(selectErrorState);
  const games = useAppSelector(state => state.games.games);
  const message = useAppSelector(state => state.games.message);
  const isGameFilterSearch = getGameFilterByUrl(location.pathname) === GameFilter.Search;
  const hasSearchParams = searchParams.get("q") !== null;

  const pathname = location.pathname;
  let header = "";
  switch (pathname) {
    case "/":
    case "/popular":
      header = "Popular Games";
      break;
    case "/new":
      header = "New Games";
      break;
    case "/upcoming":
      header = "Upcoming Games";
      break;
    case "/search":
      header = "Search Results";
      break;
  }

  useEffect(() => {
    const fetchGamePayload: FetchGamePayload = {
      gameFilter: getGameFilterByUrl(pathname),
      searchString: searchParams.get("q") ?? "",
    };

    dispatch(fetchGames(fetchGamePayload));
  }, [dispatch, location.key, pathname, searchParams]);

  return (
    <AnimatePresence>
      {isLoading ?
        <Loading key="loading" /> :
        isError ?
          <Error message={message} /> :
          <div className="p-4">
            <h2 className="mb-4 text-2xl">{header}</h2>
            {
              isGameFilterSearch && !hasSearchParams ?
                <p className="italic">Search games using the navigation bar.</p> :
                isGameFilterSearch && games.length === 0 ?
                  <p className="italic">No games found.</p> :
                  <GameCards games={games} />
            }
          </div>
      }
    </AnimatePresence>
  );
};

export default GameListPage;