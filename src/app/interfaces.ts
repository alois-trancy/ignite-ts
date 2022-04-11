import { GameFilter } from "./enums";

export interface GameInterface {
  id: string,
  name: string,
  releasedDate: string,
  backgroundImage: string,
  slug: string,
};

export interface PlatformInterface {
  id: string,
  name: string,
};

export interface FetchGamePayload {
  gameFilter: GameFilter,
  searchString?: string,
};