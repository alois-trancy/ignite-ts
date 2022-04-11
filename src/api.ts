import { DateTime } from "luxon";

const rawApiBaseUrl = "https://api.rawg.io/api/";
const paramApiKey = `key=${process.env.REACT_APP_RAWG_API_KEY}`;

const currentDateTime = DateTime.now();
const currentDateString = currentDateTime.toFormat("yyyy-MM-dd");
const lastYearString = currentDateTime.minus({ year: 1, }).toFormat("yyyy-MM-dd");
const nextYearString = currentDateTime.plus({ year: 1, }).toFormat("yyyy-MM-dd");

export const popularGamesUrl = (): string => {
  return `${rawApiBaseUrl}games?${paramApiKey}&dates=${lastYearString},${currentDateString}&ordering=-rating`;
};

export const upcomingGamesUrl = (): string => {
  return `${rawApiBaseUrl}games?${paramApiKey}&dates=${currentDateString},${nextYearString}&ordering=-added`;
};

export const newGamesUrl = (): string => {
  return `${rawApiBaseUrl}games?${paramApiKey}&dates=${lastYearString},${currentDateString}&ordering=-released`;
};

export const gameDetailsUrl = (gameId: string): string => {
  return `${rawApiBaseUrl}games/${gameId}?${paramApiKey}`;
};

export const gameScreenshotsUrl = (gameId: string): string => {
  return `${rawApiBaseUrl}games/${gameId}/screenshots?${paramApiKey}`;
};

export const searchGamesUrl = (gameName: string): string => {
  return `${rawApiBaseUrl}games?${paramApiKey}&search=${gameName}`;
};