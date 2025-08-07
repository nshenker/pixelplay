import styles from "@/styles/Top.module.css";
import { useState, useCallback } from "react";
import { useGetNfts } from "@/nfts/GetNfts";
import GameCard from "@/components/GameCard";
import Emulator from "@/components/Emulator";

// Note: For larger projects, this global type declaration is best placed
// in a dedicated `types.d.ts` or `global.d.ts` file.
declare global {
  interface Window {
    rom: string;
    go: () => Promise<void>;
  }
}

// --- Child Component for Displaying the Game Grid ---
const GameGrid = ({ games, onGameClick }) => (
  <div className={styles.grid}>
    {games.map((game) => (
      <div key={game.id || game.rom} className={styles.gridItem}>
        <GameCard onClick={() => onGameClick(game.rom)} game={game} />
      </div>
    ))}
  </div>
);

// --- Child Component for the "No Games" Message ---
const NoGamesMessage = () => {
  const handleBrowseClick = () => {
    window.open("https://exchange.art/series/Degen%20Boy%20Cartridge%20Deployer/nfts", "_blank");
  };

  return (
    <div className={styles.noGamesContainer}>
      <p className={styles.pixelatedText}>
        It looks like you don't have any games yet.
      </p>
      <p className={styles.pixelatedText}>
        Click the button below to browse games!
      </p>
      <button className={styles.pixelatedButton} onClick={handleBrowseClick}>
        Exchange.art
      </button>
    </div>
  );
};

// --- Main Page Component ---
export const Top = () => {
  const [rom, setRom] = useState<string | null>(null);
  const [romKey, setRomKey] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const { nfts: games } = useGetNfts();

  const handleGameClick = useCallback((selectedRom: string) => {
    setRom(selectedRom);
    setRomKey((prevKey) => prevKey + 1); // Increment key to force re-mount
    setShowDialog(true);
  }, []); // Empty dependency array ensures this function is created only once

  return (
    <>
      <Emulator
        rom={rom}
        romKey={romKey}
        showDialog={showDialog}
        onDismiss={() => setShowDialog(false)}
      />
      <main className={styles.container}>
        <h1 className={styles.header}>Veridian City Studios</h1>
        {games.length > 0 ? (
          <GameGrid games={games} onGameClick={handleGameClick} />
        ) : (
          <NoGamesMessage />
        )}
      </main>
    </>
  );
};

export default Top;
