import { bitScanForward, bitScanReverse } from "./logic";
import { northAttacks, eastAttacks, westAttacks, southAttacks, northEastAttacks, northWestAttacks, southEastAttacks, southWestAttacks } from "./attacks";
//sliding/ray attacks
export const slidingAttack = (occupied, direction, square) => {
    let attacks;
    switch (direction) {
        case "NW":
            attacks = northWestAttacks.get(square) ?? 0n;
            break;
        case "N":
            attacks = northAttacks.get(square) ?? 0n;
            break;
        case "NE":
            attacks = northEastAttacks.get(square) ?? 0n;
            break;
        case "E":
            attacks = eastAttacks.get(square) ?? 0n;
            break;
        case "SE":
            attacks = southEastAttacks.get(square) ?? 0n;
            break;
        case "S":
            attacks = southAttacks.ge(square) ?? 0n;
            break;
        case "SW":
            attacks = southWestAttacks.get(square) ?? 0n;
            break;
        case "W":
            attacks = westAttacks.get(square) ?? 0n;
            break;
    }

    attacks = BigInt(attacks);
    occupied = BigInt(occupied);

    const blockers = attacks & occupied;

    if (blockers) {
        let closestSquare;
        //positive ray attacks
        if (direction == "N" || direction == "NE" || direction == "NW" || direction == "W") {
            closestSquare = bitScanForward(blockers);
        } else {
            //negative
            closestSquare = bitScanReverse(blockers);
        }

        let rayAttacks;
        switch (direction) {
            case "NW":
                rayAttacks = northWestAttacks.get(closestSquare) ?? 0n;
                break;
            case "N":
                rayAttacks = northAttacks.get(closestSquare) ?? 0n;
                break;
            case "NE":
                rayAttacks = northEastAttacks.get(closestSquare) ?? 0n;
                break;
            case "E":
                rayAttacks = eastAttacks.get(closestSquare) ?? 0n;
                break;
            case "SE":
                rayAttacks = southEastAttacks.get(closestSquare) ?? 0n;
                break;
            case "S":
                rayAttacks = southAttacks.get(closestSquare) ?? 0n;
                break;
            case "SW":
                rayAttacks = southWestAttacks.get(closestSquare) ?? 0n;
                break;
            case "W":
                rayAttacks = westAttacks.get(closestSquare) ?? 0n;
                break;
        }
        
        attacks ^= BigInt(rayAttacks);
    }

    return attacks;
}

export const bishopAttack = (occupied, square) => {
    return slidingAttack(occupied, "NW", square) 
            | slidingAttack(occupied, "NE", square)
            | slidingAttack(occupied, "SW", square)
            | slidingAttack(occupied, "SE", square);
}

export const rookAttack = (occupied, square) => {
    return slidingAttack(occupied, "N", square) 
            | slidingAttack(occupied, "E", square)
            | slidingAttack(occupied, "S", square)
            | slidingAttack(occupied, "W", square);
}

export const queenAttack = (occupied, square) => {
    return bishopAttack(occupied, square) | rookAttack(occupied, square);
}