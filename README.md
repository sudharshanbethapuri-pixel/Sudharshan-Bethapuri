# ScreenScout — Movie & TV Show Search

A responsive title-search application built with React. Users can search for shows and explore posters, summaries, genres, premiere years, ratings, and official websites.

> **Data note:** This project uses the free [TVmaze Search API](https://www.tvmaze.com/api). TVmaze primarily catalogs TV shows, so describe this accurately as a movie/TV title or TV-show search project rather than claiming a full movie database.

## Features
- Search titles using a public REST API
- Display poster images, genres, premiere year, ratings, and summaries
- Responsive layout for desktop and mobile
- Loading, empty, and error states
- External official-site links when available

## Tech stack
- React 18
- JavaScript (ES6+)
- CSS3
- Fetch API
- TVmaze REST API
- Vite

## Run locally
1. Install [Node.js](https://nodejs.org/).
2. Download or clone this repository.
3. Open a terminal in the project folder.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local address printed in the terminal (usually `http://localhost:5173`).

## Build
Run `npm run build`. The production files are generated in the `dist` folder.

## API
`https://api.tvmaze.com/search/shows?q={searchTerm}`

## Author
Sudharshan Bethapuri
