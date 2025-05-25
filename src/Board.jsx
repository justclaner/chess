import {useState, useEffect, createContext} from 'react'
import Tile from './Tile';

export const BoardContext = createContext(null);

const Board = () => {
    const tiles = new Array(64).fill(null);
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const [whitePawns, setWhitePawns] = useState(0);
    const [whiteKnights, setWhiteKnights] = useState(0);
    const [whiteBishops, setWhiteBishops] = useState(0);
    const [whiteRooks, setWhiteRooks] = useState(0);
    const [whiteQueens, setWhiteQueens] = useState(0);
    const [whiteKing, setWhiteKing] = useState(0);

    const [blackPawns, setBlackPawns] = useState(0);
    const [blackKnights, setBlackKnights] = useState(0);
    const [blackBishops, setBlackBishops] = useState(0);
    const [blackRooks, setBlackRooks] = useState(0);
    const [blackQueens, setBlackQueens] = useState(0);
    const [blackKing, setBlackKing] = useState(0);
    
    const resetGame = (playerColor) => {
        setWhitePawns(Number(0x000000000000FF00n));
        setWhiteKnights(Number(0x0000000000000042n));
        setWhiteBishops(Number(0x0000000000000024n));
        setWhiteRooks(Number(0x0000000000000081n));
        setWhiteQueens(Number(0x0000000000000010n));
        setWhiteKing(Number(0x0000000000000008n));

        setBlackPawns(Number(0x00FF000000000000n));
        setBlackKnights(Number(0x4200000000000000n));
        setBlackBishops(Number(0x2400000000000000n));
        setBlackRooks(Number(0x8100000000000000n));
        setBlackQueens(Number(0x1000000000000000n));
        setBlackKing(Number(0x0800000000000000n));

        if (playerColor == "Black") {
            flipBoard();
        }
    }
    
    const flipBoard = () => {
        setWhitePawns(swapRanksVertically(whitePawns));
        setWhiteKnights(swapRanksVertically(whiteKnights));
        setWhiteBishops(swapRanksVertically(whiteBishops));
        setWhiteRooks(swapRanksVertically(whiteRooks));
        setWhiteQueens(swapRanksVertically(whiteQueens));
        setWhiteKing(swapRanksVertically(whiteKing));

        setBlackPawns(swapRanksVertically(blackPawns));
        setBlackKnights(swapRanksVertically(blackKnights));
        setBlackBishops(swapRanksVertically(blackBishops));
        setBlackRooks(swapRanksVertically(blackRooks));
        setBlackQueens(swapRanksVertically(blackQueens));
        setBlackKing(swapRanksVertically(blackKing));
    }

    const swapRanksVertically = (number) => {
        return  ( (BigInt(number) << 56n)                           ) |
                ( (BigInt(number) << 40n)    & (0x00FF000000000000n) ) |
                ( (BigInt(number) << 24n)    & (0x0000FF0000000000n) ) |
                ( (BigInt(number) <<  8n)    & (0x000000FF00000000n) ) |
                ( (BigInt(number) >>  8n)   & (0x00000000FF000000n) ) |
                ( (BigInt(number) >> 24n)   & (0x0000000000FF0000n) ) |
                ( (BigInt(number) >> 40n)   & (0x000000000000FF00n) ) |
                ( (BigInt(number) >> 56n) );
    }

    useEffect(() => {
        resetGame("White");
    }, [])

  return (
    <BoardContext.Provider value={{
        whitePawns, setWhitePawns,
        whiteKnights, setWhiteKnights,
        whiteBishops, setWhiteBishops,
        whiteRooks, setWhiteRooks,
        whiteQueens, setWhiteQueens,
        whiteKing, setWhiteKing,

        blackPawns, setBlackPawns,
        blackKnights, setBlackKnights,
        blackBishops, setBlackBishops,
        blackRooks, setBlackRooks,
        blackQueens, setBlackQueens,
        blackKing, setBlackKing,
    }}>
        <div className='flex h-screen'>
            {/* Board */}
            <div 
            className={`m-auto bg-black flex flex-row flex-wrap gap-0 outline-2 outline-black
                w-[80vw] h-[80vw]
                sm:w-[600px] sm:h-[600px]
                md:w-[700px] md:h-[700px]
                lg:w-[750px] lg:h-[750px]
            `}>
                {tiles.map((_, i) => 
                    <Tile 
                    key={`${files[Math.floor(i / 8)]}${(i % 8) + 1}`}
                    coordinate={`${files[Math.floor(i / 8)]}${(i % 8) + 1}`}
                    id={i}
                    />
                )}
            </div>
        </div>
    </BoardContext.Provider>
  )
}

export default Board