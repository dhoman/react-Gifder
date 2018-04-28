# React Gifder app

used Marvin as a starting point

https://github.com/workco/marvin

## Demo Site

http://react-gifder-demo.s3-website-us-east-1.amazonaws.com/


## Setup

```
npm install
```

## Running the demo

```
npm start
```
Visit `http://localhost:8080/` from your browser of choice.

## Project Structure

Since I used a boilerplate I thought adding a brief description of the project structure would be useful

Here are the files I think one would find to be of the most interest

```
source/
  css/
    base/ -- base theme
      app.css -- the main css rules used throughout the site
  js/
    actions/
      gifs.js -- redux actions for getting gifs, favoriting gifs, etc
    api/
      index.js -- api we use in the saga, this has a couple of functions that call giphys trending api
    components/ react components
      card/
        CardItem.jsx - main component for the cards used on the discovery page
        MotionStack.js/css - component for handling swiping and accompanying styling
      global/
        Menu.jsx - Nav bar used at the top of the site
    reducers/
      gifs.js - Reducers for handling actions that were dispatched and modifying state
    sagas/
      gifs.js - Saga for handling requests to the trending api, essentially its a wrapper that ensures we use the last or most latest call made
    views/
      App.jsx - The router for the app
      Discover.jsx - Shows you gifs from giphys trending api
      Favorites.jsx - Shows the gifs that you favorited from the Discover page
```

# Notes
Didn't use selector functions, but they could be added easily enough 

(I wasn't really using anything crazy enough to warrant them in my connect functions) 

(see redux connect used in Discover and Favorites)


I did several methods of styling / importing my css in several of the files

(See source/css/base/app.css and inline styling used in source/js/components/card/CardItem.jsx vs import used in the MotionStack.js)

(This was intentional as I thought it'd be a good way to show I'm comfortable with different toolings)

