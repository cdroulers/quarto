import {expect} from "chai";

import {
  IGame,
  defaultGame,
  gameBegun,
  pieceGiven,
  piecePlaced
} from "../src/game";
import {IPiece} from "../src/piece";
import {generatePieces} from "./gameHelper";

describe("piecePlaced", () => {
  it("returns center neighbors", () => {
    const currentGame: IGame = {
      currentPlayer: 1,
      currentPiece: { tall: true, black: true, circle: true, hole: true },
      isPlacingPiece: true,
      winningPlayer: null,
      availablePieces: generatePieces(),
      board: defaultGame().board
    };

    let actual = piecePlaced(currentGame, { x: 1, y: 1 });

    expect(actual.availablePieces).to.have.length(15);
    expect(actual.currentPiece).to.be.null;
    expect(actual.isPlacingPiece).to.equal(false);
    expect(actual.board["1,1"]).to.not.be.null;
  });
});