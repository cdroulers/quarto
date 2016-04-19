import {expect} from "chai";

import {
  IGame,
  defaultGame,
  gameBegun,
  pieceGiven,
  piecePlaced,
  gameWon
} from "../src/game";
import {IPiece} from "../src/piece";
import {generatePieces} from "./gameHelper";

describe("piecePlaced", () => {
  it("puts piece in board, changes isPlacingPiece", () => {
    const currentGame: IGame = {
      currentPlayer: 1,
      currentPiece: { tall: true, black: true, circle: true, hole: true },
      isPlacingPiece: true,
      winningPlayer: null,
      availablePieces: generatePieces().slice(0, 15),
      board: defaultGame().board
    };

    let actual = piecePlaced(currentGame, { x: 1, y: 1 });

    expect(actual.currentPlayer).to.equal(1);
    expect(actual.availablePieces).to.have.length(15);
    expect(actual.currentPiece).to.be.null;
    expect(actual.winningPlayer).to.be.null;
    expect(actual.isPlacingPiece).to.equal(false);
    expect(actual.board["1,1"]).to.not.be.null;
  });
});

describe("pieceGiven", () => {
  it("Removes available piece, changes player", () => {
    const currentGame: IGame = {
      currentPlayer: 1,
      currentPiece: null,
      isPlacingPiece: false,
      winningPlayer: null,
      availablePieces: generatePieces(),
      board: defaultGame().board
    };

    let actual = pieceGiven(currentGame, { tall: true, black: true, circle: true, hole: true });

    expect(actual.currentPlayer).to.equal(2);
    expect(actual.availablePieces).to.have.length(15);
    expect(actual.currentPiece).to.deep.equal({ tall: true, black: true, circle: true, hole: true });
    expect(actual.winningPlayer).to.be.null;
    expect(actual.isPlacingPiece).to.equal(true);
    expect(actual.board["1,1"]).to.be.null;
  });
});

describe("gameBegun", () => {
  it("sets start player and default state.", () => {
    const currentGame = defaultGame();

    let actual = gameBegun(currentGame, 2, generatePieces());

    expect(actual.currentPlayer).to.equal(2);
    expect(actual.availablePieces).to.have.length(16);
    expect(actual.currentPiece).to.be.null;
    expect(actual.winningPlayer).to.be.null;
    expect(actual.isPlacingPiece).to.equal(false);
    expect(actual.board["1,1"]).to.be.null;
  });
});

describe("gameWon", () => {
  it("sets winner", () => {
    const currentGame: IGame = {
      currentPlayer: 1,
      currentPiece: null,
      isPlacingPiece: false,
      winningPlayer: null,
      availablePieces: generatePieces().slice(0, 12),
      board: defaultGame().board
    };

    let actual = gameWon(currentGame, 1, [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }]);

    expect(actual.currentPlayer).to.equal(1);
    expect(actual.availablePieces).to.have.length(12);
    expect(actual.currentPiece).to.be.null;
    expect(actual.winningPlayer).to.equal(1);
    expect(actual.isPlacingPiece).to.equal(false);
  });
});