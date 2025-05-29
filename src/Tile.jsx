import {useState, useEffect, useContext} from 'react'
import { lightColor, darkColor } from '../math/constants';
import { BoardContext } from './Board';

import whitePawnImage from "./assets/white/white_pawn.png";
import whiteKnightImage from "./assets/white/white_knight.png";
import whiteBishopImage from "./assets/white/white_bishop.png";
import whiteRookImage from "./assets/white/white_rook.png";
import whiteQueenImage from "./assets/white/white_queen.png";
import whiteKingImage from "./assets/white/white_king.png";

import blackPawnImage from "./assets/black/black_pawn.png";
import blackKnightImage from "./assets/black/black_knight.png";
import blackBishopImage from "./assets/black/black_bishop.png";
import blackRookImage from "./assets/black/black_rook.png";
import blackQueenImage from "./assets/black/black_queen.png";
import blackKingImage from "./assets/black/black_king.png";

const Tile = ({ coordinate, id }) => {
    const {
      whitePawns,
      whiteKnights,
      whiteBishops,
      whiteRooks,
      whiteQueens,
      whiteKing,

      blackPawns,
      blackKnights,
      blackBishops,
      blackRooks,
      blackQueens,
      blackKing,
      
      pieceSelected, setPieceSelected,
      tileSelected, setTileSelected,
      legalSquares, setLegalSquares
    } = useContext(BoardContext);

    const files = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
        ['d', 4],
        ['e', 5],
        ['f', 6],
        ['g', 7],
        ['h', 8]
    ])

    const diagonal = files.get(coordinate[0]) + parseInt(coordinate[1]);
    const bitNumber = 1n << BigInt((63 - id));
    const [piece, setPiece] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
      if (BigInt(whitePawns) & bitNumber) {
        setPiece("whitePawn");
        setImage(whitePawnImage);
      } else if (BigInt(whiteKnights) & bitNumber) {
        setPiece("whiteKnight");
        setImage(whiteKnightImage);
      } else if (BigInt(whiteBishops) & bitNumber) {
        setPiece("whiteBishop");
        setImage(whiteBishopImage);
      } else if (BigInt(whiteRooks) & bitNumber) {
        setPiece("whiteRook");
        setImage(whiteRookImage);
      } else if (BigInt(whiteQueens) & bitNumber) {
        setPiece("whiteQueen");
        setImage(whiteQueenImage);
      } else if (BigInt(whiteKing) & bitNumber) {
        setPiece("whiteKing");
        setImage(whiteKingImage);
      } else if (BigInt(blackPawns) & bitNumber) {
        setPiece("blackPawn");
        setImage(blackPawnImage);
      } else if (BigInt(blackKnights) & bitNumber) {
        setPiece("blackKnight");
        setImage(blackKnightImage);
      } else if (BigInt(blackBishops) & bitNumber) {
        setPiece("blackBishop");
        setImage(blackBishopImage);
      } else if (BigInt(blackRooks) & bitNumber) {
        setPiece("blackRook");
        setImage(blackRookImage);
      } else if (BigInt(blackQueens) & bitNumber) {
        setPiece("blackQueen");
        setImage(blackQueenImage);
      } else if (BigInt(blackKing) & bitNumber) {
        setPiece("blackKing");
        setImage(blackKingImage);
      } else {
        setPiece(null);
        setImage(null);
      }
        
    }, [
      whitePawns, whiteKnights, whiteBishops, whiteRooks, whiteQueens, whiteKing,
      blackPawns, blackKnights, blackBishops, blackRooks, blackQueens, blackKing
    ])

    const selectPiece = () => {
      if (tileSelected == bitNumber) {
        setLegalSquares(new Set());
        setPieceSelected(null);
        setTileSelected(null);
        return;
      }

      if (legalSquares.has(bitNumber)) {
        console.log(`attempt move from ${tileSelected.toString(16)} to ${bitNumber.toString(16)}`);
        return;
      }

      setPieceSelected(piece);
      setTileSelected(bitNumber);
    }

  return (
    <div 
    style={{
        backgroundColor: 
        diagonal % 2 == 0 ? darkColor : lightColor
    }}
    className='
    w-[10vw] h-[10vw]
    sm:w-[75px] sm:h-[75px]
    md:w-[87.5px] md:h-[87.5px]
    lg:w-[93.75px] lg:h-[93.75px]
    flex
    '
    >
      <div className='w-[90%] h-[90%] m-auto z-10 select-none flex' onClick={selectPiece}>
        {image && <img src={image} className='w-full h-full z-0' draggable={false}/>}
        {!image && pieceSelected && legalSquares.has(bitNumber) && <div className='w-[40%] h-[40%] bg-black opacity-25 m-auto select-none rounded-[50%]' />}
      </div>
    </div>
  )
}

export default Tile