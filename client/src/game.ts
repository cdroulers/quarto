import {IPiece} from "./piece";
import {IState} from "./state";

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IGame {
  currentPlayer: number;
  isPlacingPiece: boolean;
  currentPiece: IPiece;
  winningPlayer: number;
  board: { [key: string]: IPiece };
  availablePieces: IPiece[];
}

function _getKey(coords: ICoordinates) {
  return coords.x + "," + coords.y;
}

export function defaultGame(): IGame {
  let board: { [key: string]: IPiece } = {};
  for (let x = 1; x <= 4; x++) {
    for (let y = 1; y <= 4; y++) {
      const key = _getKey({ x, y });
      board[key] = null;
    }
  }
  return {
    currentPlayer: null,
    isPlacingPiece: false,
    currentPiece: null,
    winningPlayer: null,
    availablePieces: [],
    board: board
  };
}

function invertPlayer(player: number): number {
  return player == 1 ? 2 : 1;
}

export function gameBegun(currentGame: IGame, startPlayer: number, availablePieces: IPiece[]): IGame {
  return {
    currentPlayer: startPlayer,
    currentPiece: null,
    isPlacingPiece: false,
    winningPlayer: null,
    availablePieces,
    board: currentGame.board
  };
}

export function pieceGiven(currentGame: IGame, piece: IPiece): IGame {
  return {
    currentPlayer: invertPlayer(currentGame.currentPlayer),
    currentPiece: piece,
    isPlacingPiece: true,
    winningPlayer: null,
    availablePieces: currentGame.availablePieces.filter(x => x.black !== piece.black &&
      x.circle !== piece.circle &&
      x.hole !== piece.hole &&
      x.tall !== piece.tall),
    board: currentGame.board
  };
}

export function piecePlaced(currentGame: IGame, coords: ICoordinates): IGame {
  var newBoard = Object.assign({}, currentGame.board, {});
  newBoard[_getKey(coords)] = currentGame.currentPiece;

  return {
    currentPlayer: currentGame.currentPlayer,
    currentPiece: null,
    isPlacingPiece: false,
    winningPlayer: null,
    availablePieces: currentGame.availablePieces.slice(0),
    board: newBoard
  };
}