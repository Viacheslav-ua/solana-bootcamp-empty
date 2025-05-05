import { web3 } from "@coral-xyz/anchor";
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

export const getTokenProgramId = async (tokenMint: PublicKey, connection: web3.Connection) => {
  const accountInfo = await connection.getAccountInfo(tokenMint);

  if (!accountInfo) {
    console.log("Account not found");
    return TOKEN_PROGRAM_ID;
  }

  if (accountInfo.owner.toBase58() === TOKEN_2022_PROGRAM_ID.toBase58()) {
    return TOKEN_2022_PROGRAM_ID;
  }
  return TOKEN_PROGRAM_ID;
}