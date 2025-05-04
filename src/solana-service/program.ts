import { AnchorProvider, Program, Wallet, web3, BN } from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { PublicKey } from "@solana/web3.js";

import escrowIdl from "./escrow.json";
import { Escrow } from "./idlType";
import { config } from "./config";
import { randomBytes } from "crypto";
import { getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const TOKEN_PROGRAM = TOKEN_PROGRAM_ID

export class EscrowProgram {
  protected program: Program<Escrow>;
  protected connection: web3.Connection;
  protected wallet: NodeWallet;

  constructor(connection: web3.Connection, wallet: Wallet) {
    const provider = new AnchorProvider(connection, wallet, {
      commitment: "confirmed",
    });
    this.program = new Program<Escrow>(escrowIdl as Escrow, provider);
    this.wallet = wallet;
    this.connection = connection;
  }

  createOfferId = (offerId: BN) => {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("offer"),
        this.wallet.publicKey.toBuffer(),
        offerId.toArrayLike(Buffer, "le", 8),
      ],
      new PublicKey(config.contractAddress)
    )[0];
  };

  async makeOffer(
    tokenMintA: PublicKey,
    tokenMintB: PublicKey,
    tokenAmountA: number,
    tokenAmountB: number
  ) {
    try {
      const offerId = new BN(randomBytes(8));
      const offerAddress = this.createOfferId(offerId);

      const vault = getAssociatedTokenAddressSync(
        tokenMintA,
        offerAddress,
        true,
        TOKEN_PROGRAM,
      )

      const makerTokenAccountA = getAssociatedTokenAddressSync(
        tokenMintA,
        this.wallet.publicKey,
        true,
        TOKEN_PROGRAM,
      )

      const makerTokenAccountB = getAssociatedTokenAddressSync(
        tokenMintB,
        this.wallet.publicKey,
        true,
        TOKEN_PROGRAM,
      )

      console.log(tokenMintA, tokenMintB, tokenAmountA, tokenAmountB);
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async takeOffer(
    maker: PublicKey,
    offer: PublicKey,
    tokenMintA: PublicKey,
    tokenMintB: PublicKey
  ) {
    try {
      console.log(maker, offer, tokenMintA, tokenMintB);
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
