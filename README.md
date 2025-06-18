# Blackjack Card Game

This is a command line implementation of the classic Blackjack game written in **TypeScript**. The project is intended as a small study of TypeScript and basic object oriented design. It provides a simple CLI where you can place bets, draw cards and play against a computerized dealer.

## Features
- Text based gameplay in the terminal
- Hit or Stand decisions with a running total of funds
- Simple card and deck classes for managing a 52 card pack
- Automatic shuffling and re‑dealing when the deck runs out
- Graceful exit with `Ctrl+C`

## Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/) (tested with version 18 or later)
- npm

### Installation
1. Clone the repository and change into the project directory:
   ```bash
   git clone <repository-url>
   cd Blackjack-Card-Game
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
To run the TypeScript sources directly with ts-node:
```bash
npm run dev
```
This launches the CLI and watches for `Ctrl+C` to exit.

### Building
Compile the TypeScript sources to JavaScript in `dist/`:
```bash
npm run build
```
The compiled program can then be started with:
```bash
npm start
```

## How to Play
1. When the game begins you will be asked how much money you would like to wager. You start with 100 credits by default.
2. After placing your bet you receive two cards and the dealer receives one face up card and one hidden card.
3. Choose `hit` to draw another card or `stand` to keep your current total. If your total exceeds 21 you bust and lose the hand.
4. When you stand, the dealer draws according to Blackjack rules. The outcome is then announced and your funds are updated.

The game will automatically reshuffle a new deck when needed. If your funds reach zero they will reset back to 100 credits so you can keep practicing.

## Project Structure
```
src/
  components/
    Card.ts   - representation of a single playing card
    Deck.ts   - deck of 52 cards with shuffle and draw logic
    Game.ts   - main game loop handling bets and gameplay
    types.ts  - shared type declarations
  index.ts    - entry point that sets up the prompt and starts the game
```

The build output will be placed in `dist/` when running `npm run build`.

## License
This project is released under the ISC license and is intended for educational use.
