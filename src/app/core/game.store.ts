import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Square, XorO } from './types/square';
import { computed } from '@angular/core';

export interface GameState {
  squares: Square[];
  xEntries: number[];
  oEntries: number[];
  xIsNext: boolean;
}

function newState(): GameState {
  return {
    squares: Array<Square>(9).fill(null),
    xIsNext: true,
    xEntries: [] as number[],
    oEntries: [] as number[],
  };
}
const initial: GameState = newState();

export function calculateWinner(squares: Square[]): Square | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0, l = lines.length; i < l; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export function calculateTurns(squares: Square[]) {
  return squares.filter((square) => !square).length;
}

export function calculateStatus(
  winner: Square | null,
  turns: number,
  player: XorO
) {
  if (!winner && !turns) return 'Draw';
  if (winner) return `Winner ${winner}`;
  return `Next player: ${player}`;
}

export const GameStore = signalStore(
  withState(initial),
  withComputed((store) => ({
    winner: computed(() => {
      const squares = store.squares();

      return calculateWinner(squares);
    }),
    turns: computed(() => {
      const squares = store.squares();

      return calculateTurns(squares);
    }),
    player: computed(() => {
      const xIsNext = store.xIsNext();
      return xIsNext ? 'X' : 'O';
    }),
  })),
  withComputed((store) => ({
    status: computed(() => {
      const player = store.player();
      const winner = store.winner();
      const turns = store.turns();
      return calculateStatus(winner, turns, player);
    }),
  })),
  withMethods((store) => ({
    reset: () => patchState(store, newState()),
    place: (index: number) => {
      const squares = store.squares();
      const xIsNext = store.xIsNext();
      const xEntries = store.xEntries();
      const oEntries = store.oEntries();
      const player = store.player();

      const res: Partial<GameState> = {};

      const nextSquares = squares.slice();
      nextSquares[index] = player;

      if (player === 'X') {
        const nextX = xEntries.slice();
        if (nextX.length === 3) {
          const prev = nextX.shift()!;
          nextSquares[prev] = null;
        }
        nextX.push(index);
        res.xEntries = nextX;
      } else {
        const nextO = oEntries.slice();
        if (nextO.length === 3) {
          const prev = nextO.shift()!;
          nextSquares[prev] = null;
        }
        nextO.push(index);
        res.oEntries = nextO;
      }
      res.squares = nextSquares;
      res.xIsNext = !xIsNext;

      patchState(store, res);
    },
  }))
);
