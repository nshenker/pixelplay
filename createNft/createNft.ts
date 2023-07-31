import {keypairIdentity, Metaplex, BigNumber} from "@metaplex-foundation/js";
import {Connection, Keypair} from "@solana/web3.js";
import dotenv from "dotenv";
import {TokenStandard} from "@metaplex-foundation/mpl-token-metadata";
import BN from "bn.js";

dotenv.config();
const NUMBER_OF_EDITIONS = 5;

const connection = new Connection(process.env.NEXT_PUBLIC_RPC!)
const wallet = Keypair.fromSecretKey(Uint8Array.from(Uint8Array.from(JSON.parse(process.env.MINT_KEY!))));
const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))

const mintAddress = Keypair.generate();
export const createNft = async () => {
    const result = await metaplex.nfts().create({
        useNewMint: mintAddress,
        maxSupply: new BN(NUMBER_OF_EDITIONS) as BigNumber,
        name: "Devnet A Day at the Lake",
        symbol: "FYGB",
        uri: "https://arweave.net/vbHIpyeNZafkVDfOal2OQJvhKgieKovP12qGzWbUlM0",
        sellerFeeBasisPoints: 100,
        creators: [
            {
                address: wallet.publicKey,
                share: 100,
            }]
    }, {commitment: "finalized"});
    console.log(result);
    for (let i = 0; i < NUMBER_OF_EDITIONS; i++) {
        await metaplex.nfts().printNewEdition(
            {
                originalMint: mintAddress.publicKey,
            }, {"commitment": "finalized"}
        )
    }
}
createNft();


