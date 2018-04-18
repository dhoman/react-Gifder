// Simple API for https://developers.giphy.com/docs/

const API_URL = 'https://api.giphy.com';
const TRENDING_URL = '/v1/gifs/trending';
const RANDOM_URL = '/v1/gifs/random';

// this is a bad practice and should be set in a env variable but it's a demo app ¯\_(ツ)_/¯
const API_KEY = 'dc6zaTOxFJmzC';

// Custom API error to throw
function ApiError(message, data, status) {
  let response = null;
  let isObject = false;

  // We are trying to parse response
  try {
    response = JSON.parse(data);
    isObject = true;
  } catch (e) {
    response = data;
  }

  return {
    response,
    message,
    status,
    toString: () => {
      return `${ this.message }\nResponse:\n${ isObject ? JSON.stringify(this.response, null, 2) : this.response }`;
    },
  };
}

// API wrapper function
const fetchResource = (path, params = { rating: 'g' }) => {
  const url = new URL(`${ API_URL }/${ path }`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  url.searchParams.append('api_key', API_KEY);
  // Variable which will be used for storing response
  let response = null;

  return fetch(url, { mode: 'cors' })
    .then(responseObject => {
      // Saving response for later use in lower scopes
      response = responseObject;
      if (response.status === 200) {
        return response.json();
      }
      return response.text();
    })
    // "parsedResponse" will be either text or javascript object depending if
    // "response.text()" or "response.json()" got called in the upper scope
    .then(parsedResponse => {
      // Check for HTTP error codes
      if (response.status < 200 || response.status >= 300) {
        // Throw error
        throw parsedResponse;
      }
      // Request succeeded
      return parsedResponse;
    })
    .catch(error => {
      if (response) {
        throw ApiError(`Request failed with status ${ response.status }.`, error, response.status);
      } else {
        throw ApiError(error.toString(), null, 'REQUEST_FAILED');
      }
    });
};

function getTrending(params) {
  return fetchResource(TRENDING_URL, params);
}

function getRandom(params) {
  return fetchResource(RANDOM_URL, params);
}

export default {
  getTrending,
  getRandom,
};
