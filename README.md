# Mastermind

## Overview

A classic Mastermind code-breaking game built with **Angular**.

The goal is to guess a secret sequence of four colors within eight attempts. After each guess, the player receives hints indicating correct colors in the correct positions (black) and correct colors in the wrong positions (white). The game allows repeated colors and incomplete guesses.

It is entirely frontend-based, with no backend or external services required.

---

## History

The first version of the game was written several years ago in plain JavaScript. It was my first attempt to build something in this language that went beyond a few lines of throwaway practice code. 
Shortly afterward, I created a jQuery version to explore how the library worked and how its approach differed from vanilla JavaScript.

I returned to Mastermind while learning Angular and rewriting some of my older game projects using this framework.

The new version was built from scratch, preserving the original game mechanics while improving the interface, code structure and responsiveness across different screen sizes.

Both original implementations are preserved in the `legacy` directory as a curiosity and a reminder of the project's beginnings.

---

## Technologies

- Angular
- TypeScript
- HTML / CSS
- Bootstrap Icons

---

## Running the Project Locally

```bash
npm install
npm start
```

---

## Development

This project was developed with some assistance from AI tools, primarily ChatGPT, particularly in implementing the responsive layout, refining the game logic and reviewing the code.

Most of the Angular implementation, as well as the overall design and development decisions, were made by the author.

---

## To Do List

- Publish the application online.
