import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { gameDetailsUrl, gameScreenshotsUrl } from "../../api";
import { AppState } from "../../app/enums";
import { GameInterface, PlatformInterface } from "../../app/interfaces";
import { RootState } from "../../app/store";

interface GameDetailInterface extends GameInterface {
  rating: number,
  platforms: Array<PlatformInterface>,
  descriptionRaw: string,
  screenshots: Array<string>,
  publishers: Array<string>,
  esrbRating: string,
};

interface GameDetailStateInterface {
  game: GameDetailInterface,
  appState: AppState,
  message: string,
}

const initialState: GameDetailStateInterface = {
  game: {
    id: "",
    name: "",
    releasedDate: "",
    backgroundImage: "",
    slug: "",
    rating: 0,
    platforms: [],
    descriptionRaw: "",
    screenshots: [],
    publishers: [],
    esrbRating: "",
  },
  appState: AppState.None,
  message: "",
};

const detailSlide = createSlice({
  name: "detail",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGameDetails.pending, (state) => {
        state.appState = AppState.Loading;
      })
      .addCase(fetchGameDetails.fulfilled, (state, action: PayloadAction<GameDetailInterface>) => {
        state.game = action.payload;
        state.appState = AppState.Loaded;
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.appState = AppState.Error;
        state.message = action.error.message ?? "";
      });
  }
});

export const fetchGameDetails = createAsyncThunk("detail/fetchGameDetails", async (gameSlug: string) => {
  const responses = await Promise.all([axios.get(gameDetailsUrl(gameSlug)), axios.get(gameScreenshotsUrl(gameSlug))]);
  const detailInfo = responses[0].data;
  const screenshotsInfo = responses[1].data;

  const platforms: GameDetailInterface["platforms"] = detailInfo.platforms !== null ?
    detailInfo.platforms.map(
      (platformMain: { platform: PlatformInterface }) => {
        return {
          id: platformMain.platform.id,
          name: platformMain.platform.name
        };
      }
    ) :
    [];

  const publishers: GameDetailInterface["publishers"] = detailInfo.publishers !== null ?
    detailInfo.publishers.map(
      (publisher: { name: string }) => {
        return publisher.name;
      }
    ) :
    [];

  const screenshots: GameDetailInterface["screenshots"] = screenshotsInfo.results !== null ?
    screenshotsInfo.results.map(
      (screenshot: { image: string }) => {
        return screenshot.image;
      }
    ) :
    [];

  return {
    id: detailInfo.id,
    name: detailInfo.name ?? "",
    releasedDate: detailInfo.released !== null && detailInfo.released !== "" ? detailInfo.released : "",
    backgroundImage: detailInfo.background_image ?? "",
    slug: detailInfo.slug,
    rating: detailInfo.rating ?? 0,
    platforms: platforms,
    descriptionRaw: detailInfo.description_raw ?? "",
    publishers: publishers,
    esrbRating: detailInfo.esrb_rating != null ? detailInfo.esrb_rating.name : "",
    screenshots: screenshots,
  };
});

export const selectLoadingState = (state: RootState): boolean => state.detail.appState === AppState.Loading;
export const selectErrorState = (state: RootState): boolean => state.detail.appState === AppState.Error;

export default detailSlide.reducer;