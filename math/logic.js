const index64 = [
    0, 47,  1, 56, 48, 27,  2, 60,
   57, 49, 41, 37, 28, 16,  3, 61,
   54, 58, 35, 52, 50, 42, 21, 44,
   38, 32, 29, 23, 17, 11,  4, 62,
   46, 55, 26, 59, 40, 36, 15, 53,
   34, 51, 20, 43, 31, 22, 10, 45,
   25, 39, 14, 33, 19, 30,  9, 24,
   13, 18,  8, 12,  7,  6,  5, 63
];

const debruijn64 = BigInt(0x03f79d71b4cb0a89);

//returns index LEAST significant one bit of a 64bit number; returns -1 if number is 0
export const bitScanForward = (bitNumber) => {
    if (bitNumber == 0) {
        return -1;
    }

    bitNumber = BigInt(bitNumber);

    const index = Number((((bitNumber ^ (bitNumber - 1n)) * debruijn64) >> 58n) & 63n);

    return index64[index];
}

//returns index MOST significant one bit of a 64bit number; returns -1 if number is 0
export const bitScanReverse = (bitNumber) => {
    if (bitNumber == 0) {
        return -1;
    }

    bitNumber = BigInt(bitNumber);

    bitNumber |= bitNumber >> 1n;
    bitNumber |= bitNumber >> 2n;
    bitNumber |= bitNumber >> 4n;
    bitNumber |= bitNumber >> 8n;
    bitNumber |= bitNumber >> 16n;
    bitNumber |= bitNumber >> 32n;

    const index = Number(((bitNumber * debruijn64) >> 58n) & 63n);

    return index64[index];
}