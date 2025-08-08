import styles from "@/styles/Top.module.css";
import { useState } from "react";
import { useGetNfts } from "@/nfts/GetNfts";
import GameCard from "@/components/GameCard";
import Emulator from "@/components/Emulator";

declare global {
  interface Window {
    rom: string;
    go: () => Promise<void>;
  }
}
const creatorAddresses = process.env.NEXT_PUBLIC_CREATOR_ADDRESSES!.split(",");
console.log("creatorAddresses", creatorAddresses);

export const Top = () => {
  const [rom, setRom] = useState<string | null>(null);
  const [romKey, setRomKey] = useState(0);
  const { nfts: games } = useGetNfts();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Emulator
        rom={rom}
        romKey={romKey}
        showDialog={showDialog}
        onDismiss={() => {
          console.log("dismissing");
          setShowDialog(false);
        }}
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Veridian City Studios</h1>

        {games.length > 0 && (
          <div className={styles.grid}>
            {games.map((game, index) => 
  // The key stays on the outermost element of the loop
  <div key={index} className={styles.gridItem}>
    <GameCard
      game={game}
      // The onClick prop is now passed correctly to the GameCard component
      onClick={() => {
        setRomKey((prevCount) => prevCount + 1);
        setRom(games[index].rom);
        setShowDialog(true);
      }}
    />
  </div>
))}
        {games.length === 0 && (
          <div className={styles.noGamesContainer}>
            <p className={styles.noGamesText}>
              It looks like you don&apos;t have any games yet.
            </p>
            <p className={styles.noGamesText}>
              Click the button below to browse games!
            </p>
            <button
              className={styles.actionButton}
              onClick={() =>
                window.open(
                  "https://exchange.art/series/Degen%20Boy%20Cartridge%20Deployer/nfts"
                )
              }
            >
              Browse on Exchange.art
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Top;
