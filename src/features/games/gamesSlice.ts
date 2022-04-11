import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { popularGamesUrl, upcomingGamesUrl, newGamesUrl, searchGamesUrl } from "../../api";
import { GameFilter, AppState } from "../../app/enums";
import { GameInterface, FetchGamePayload } from "../../app/interfaces";
import { RootState } from "../../app/store";

interface RawgSearchApiResultGamesInterface {
  id: string,
  name: string,
  released: string,
  background_image: string,
  slug: string,
}

interface GamesStateInterface {
  games: Array<GameInterface>,
  appState: AppState,
  message: string,
}

const initialState: GamesStateInterface = {
  games: [],
  appState: AppState.None,
  message: "",
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.appState = AppState.Loading;
      })
      .addCase(fetchGames.fulfilled, (state, action: PayloadAction<Array<GameInterface>>) => {
        state.games = action.payload;
        state.appState = AppState.Loaded;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.appState = AppState.Error;
        state.message = action.error.message ?? "";
      });
  },
});

export const fetchGames = createAsyncThunk("games/fetchGames", async (thunkPayload: FetchGamePayload) => {
  const { gameFilter, searchString } = thunkPayload;
  let gamesUrl = "";
  switch (gameFilter) {
    case GameFilter.Popular: gamesUrl = popularGamesUrl(); break;
    case GameFilter.New: gamesUrl = newGamesUrl(); break;
    case GameFilter.Upcoming: gamesUrl = upcomingGamesUrl(); break;
    case GameFilter.Search: gamesUrl = searchGamesUrl(searchString ?? ""); break;
  }

  const response = await axios.get(gamesUrl);
  const games: Array<GameInterface> = response.data.results.map((game: RawgSearchApiResultGamesInterface) => {
    return {
      id: game.id,
      name: game.name,
      releasedDate: game.released,
      backgroundImage: game.background_image,
      slug: game.slug,
    };
  });

  return games;
});

export const getGameFilterByUrl = (url: string) => {
  switch (url) {
    case "/popular": return GameFilter.Popular;
    case "/new": return GameFilter.New;
    case "/upcoming": return GameFilter.Upcoming;
    case "/search": return GameFilter.Search;
  }

  return GameFilter.Popular;
};

export const selectLoadingState = (state: RootState): boolean => state.games.appState === AppState.Loading;
export const selectErrorState = (state: RootState): boolean => state.games.appState === AppState.Error;

export default gamesSlice.reducer;