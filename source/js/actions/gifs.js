export const GET_DISCOVER_START = 'GET_DISCOVER_START';
export const GET_DISCOVER_ERROR = 'GET_DISCOVER_ERROR';
export const GET_DISCOVER_SUCCESS = 'GET_DISCOVER_SUCCESS';
export const GET_FAVORITES = 'GET_FAVORITES';

export const DISMISS_GIF = 'DISMISS_GIF';
export const DISMISS_FAVORITE = 'DISMISS_FAVORITE';
export const FAVORITE_GIF = 'FAVORITE_GIF';

export function getDiscover() {
  return {
    type: GET_DISCOVER_START,
  };
}

export function dismissGif(gif) {
  return {
    type: DISMISS_GIF,
    gif,
  };
}

export function dismissFavorite(gif) {
  return {
    type: DISMISS_FAVORITE,
    gif,
  };
}

export function favoriteGif(gif) {
  return {
    type: FAVORITE_GIF,
    gif,
  };
}
