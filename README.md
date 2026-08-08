# Battleship

A browser-based implementation of the classic Battleship game, built with vanilla JavaScript using Test-Driven Development (TDD). This is a project from [The Odin Project](https://www.theodinproject.com/) curriculum.

## Live Demo

[Play it here 👾🕹](https://ourhouchmohamed97.github.io/battleship/)

## Features

- Play against a computer opponent that makes random, legal moves
- Ships placed randomly on both boards each game
- Real-time hit/miss feedback with visual indicators
- Win/lose detection once all of a player's ships are sunk

## Built With

- Vanilla JavaScript (ES Modules)
- Jest + Babel for unit testing
- HTML5 / CSS3 (no frameworks)

## Approach

The game logic (`Ship`, `Gameboard`, `Player`) was built test-first and is fully decoupled from the DOM, so all core rules — placing ships, registering hits, detecting sunk ships, preventing repeat attacks — are covered by unit tests. DOM rendering and event handling live in a separate layer that consumes the tested logic.

## Running Locally

Clone the repo and install dependencies:

```bash
git clone https://github.com/ourhouchmohamed97/battleship.git
cd battleship
npm install
```

Run the test suite:

```bash
npm test
```

Serve the app locally (any static server works):

```bash
npx serve .
```

This project was completed as part of The Odin Project Foundations curriculum.

