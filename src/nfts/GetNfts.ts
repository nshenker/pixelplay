import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export type GameInfo = {
    name: string;
    rom: string;
    image: string;
}

export const useGetNfts = () => {
  const { wallet, connected } = useWallet();
  const nftsRetrieved = useRef(false);
  const [nfts, setNfts] = useState<Array<GameInfo>>([]);
  useEffect(() => {
    if(connected && wallet) {
      getNfts(wallet.adapter.publicKey!.toBase58());
    }
  }, [connected, wallet])

  const getNfts = async (address: string): Promise<void> => {
    const requestBody = {
      jsonrpc: '2.0',
      id: 'my-id',
      method: 'getAssetsByOwner',
      params: {
        // @ts-ignore
        ownerAddress: address,
        page: 1,
        limit: 1000
      }
    };
    const {data} = await axios.post(process.env.NEXT_PUBLIC_DATA_ASSET_API!, requestBody);
    const assets = data.result.items;
    const nftInfos = assets.map((nftAccount: any) => {
        const games = nftAccount.content.files.filter((f: any) => f.mime?.includes('x-gb-rom'));
        if (
            games.length === 0
        ) {
          return null;
        }
        return {
          name: nftAccount.name,
          rom: games[0].uri,
          image: nftAccount.content.files.filter((f: any) => f.mime?.includes('image'))[0].uri
        };
      })
      .filter((nftInfo: any) => nftInfo !== null) as Array<GameInfo>;
    setNfts(nftInfos);
  };
  return { nfts };
};
