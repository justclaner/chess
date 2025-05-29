//pawn push targets
export const pawnSingleUpPushTargets = (pawns, empty) => {
    return (BigInt(pawns) << 8n) & BigInt(empty);
}

export const pawnDoubleUpPushTargets = (pawns, empty) => {
    const rank4 = 0x00000000FF000000;
    const singlePushes = pawnSingleUpPushTargets(pawns, empty);
    return (BigInt(singlePushes) << 8n) & BigInt(empty) & BigInt(rank4);
}

export const pawnSingleDownPushTargets = (pawns, empty) => {
    return (BigInt(pawns) >> 8n) & BigInt(empty);
}

export const pawnDoubleDownPushTargets = (pawns, empty) => {
    const rank5 = 0x000000FF00000000;
    const singlePushes = pawnSingleDownPushTargets(pawns, empty);
    return (BigInt(singlePushes) >> 8n) & BigInt(empty) & BigInt(rank5);
}


//pushable pawns
export const pawnsUpPushable = (pawns, empty) => {
    return BigInt(empty >> 8n) & BigInt(pawns);
}

export const pawnsDoubleUpPushable = (pawns, empty) => {
    const rank4 = 0x00000000FF000000;
    const emptyRank3 = ((BigInt(empty) & BigInt(rank4)) >> 8n) & BigInt(empty);
    return pawnsUpPushable(pawns, emptyRank3);
}

export const pawnsDownPushable = (pawns, empty) => {
    return BigInt(empty << 8n) & BigInt(pawns);
}

export const pawnsDoubleDownPushable = (pawns, empty) => {
    const rank5 = 0x000000FF00000000;
    const emptyRank6 = ((BigInt(empty) & BigInt(rank5)) << 8n) & BigInt(empty);
    return pawnsDownPushable(pawns, emptyRank6);
}


//attacks

const notAFile = BigInt(0x7f7f7f7f7f7f7f7f);
const notHFile = BigInt(0xfefefefefefefefe);

//replace pieces accordingly
export const piecesNorthWestAttacks = (pieces) => {
    return (BigInt(pieces) << 9n) | notHFile;
}

export const piecesNorthEastAttacks = (pieces) => {
    return (BigInt(pieces) << 7n) | notAFile;
}

export const piecesSouthWestAttacks = (pieces) => {
    return (BigInt(pieces) >> 7n) | notHFile;
}

export const piecesSouthEastAttacks = (pieces) => {
    return (BigInt(pieces) >> 9n) | notAFile;
}

export const pawnsAnyNorthAttacks = (pawns) => {
    return piecesNorthWestAttacks(pawns) | piecesNorthEastAttacks(pawns);
}

export const pawnsAnySouthAttacks = (pawns) => {
    return piecesSouthWestAttacks(pawns) | piecesSouthEastAttacks(pawns);
}

//make sure pawns and pieces are of different colors
export const pawnsNorthCaptures = (pawns, pieces) => {
    return BigInt(pawns) & pawnsAnySouthAttacks(pieces);
}

export const pawnsSouthCaptures = (pawns, pieces) => {
    return BigInt(pawns) & pawnsAnyNorthAttacks(pieces);
}