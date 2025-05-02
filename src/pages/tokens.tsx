import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getMint, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";


type TokenData = {
    mint: any;
    amount: any;
    decimals: number;
}


interface OffersPageProps {
  walletPublicKey: PublicKey | null;
}

export const TokensPage: React.FC<OffersPageProps> = ({ walletPublicKey }) => {
  const wallet = useWallet();
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const connection = new Connection(
    clusterApiUrl(WalletAdapterNetwork.Devnet)
  );
  

  useEffect(() => {
    const fetchTokens = async () => {
      if (!walletPublicKey) return;

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        walletPublicKey,
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );

      const tokenData = await Promise.all(
        tokenAccounts.value.map(async (accountInfo) => {
          const accountData = accountInfo.account.data.parsed.info;
          const mint = accountData.mint;
          const amount = accountData.tokenAmount.uiAmount;
          const mintInfo = await getMint(connection, new PublicKey(mint));
          return {
            mint,
            amount,
            decimals: mintInfo.decimals,
          };
        })
      );

      setTokens(tokenData);
    };

    fetchTokens();
  }, [wallet.publicKey]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Your Tokens</CardTitle>
        <CardDescription>
        {walletPublicKey
          ? <div>View all SPL tokens from Your account</div>
          : <div>You need to connect your wallet</div>
        }
        </CardDescription>
        
      </CardHeader>
      <CardContent>
      <ul className="">
        {tokens.map((token, index) => (
          <li key={index} className="flex gap-8">
            <div>Mint: {token.mint}</div>
            <div>
              Balance: <span className="text-green-800">{token.amount}</span>
            </div>
          </li>
        ))}
      </ul>
      </CardContent>
    </Card>
  );
  
}