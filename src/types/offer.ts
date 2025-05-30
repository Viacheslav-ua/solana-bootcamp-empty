export interface Offer {
    id: string;
    closed: boolean;
    trxHashOffer: string;
    trxHashTake?: string

    tokenAOfferedAmount: bigint;
    tokenBWantedAmount: bigint;

    acctMaker: string;
    acctTaker?: string;

    acctTokenMintA: string;
    acctTokenMintB: string;

    acctMakerTokenAccountA: string;
    acctTakerTokenAccountA?: string;
    acctTakerTokenAccountB?: string;
    acctMakerTokenAccountB?: string;

    acctOffer: string;
    acctVault: string;

    acctTokenProgram: string;
}