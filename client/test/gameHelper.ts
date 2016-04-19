import {IPiece} from "../src/piece";

export function generatePieces(): IPiece[] {
  let pieces = [];
  for (let tall = 1; tall <= 2; tall++) {
    for (let hole = 1; hole <= 2; hole++) {
      for (let circle = 1; circle <= 2; circle++) {
        for (let black = 1; black <= 2; black++) {
          pieces.push({ tall, hole, circle, black });
        }
      }
    }
  }
  return pieces;
}