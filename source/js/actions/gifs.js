export const GET_DISCOVER_START = 'GET_DISCOVER_START';
export const GET_DISCOVER_ERROR = 'GET_DISCOVER_ERROR';
export const GET_DISCOVER_SUCCESS = 'GET_DISCOVER_SUCCESS';
export const GET_FAVORITES = 'GET_FAVORITES';

export const GIF_DISMISS = 'GIF_DISMISS';
export const GIF_FAVORITE = 'GIF_FAVORITE';

export function getDiscover() {
  return {
    type: GET_DISCOVER_START,
  };
}
