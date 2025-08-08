import styles from "@/styles/Top.module.css";
import { useState } from "react";
import { useGetNfts, GameInfo } from "@/nfts/GetNfts";
import GameCard from "@/components/GameCard";
import Emulator from "@/components/Emulator";

// The global interface can remain as is.
declare global {
  interface Window {
    rom: string;
    go: () => Promise<void>;
  }
}

const Top = () => {
  const [rom, setRom] = useState<string | null>(null);
  const [romKey, setRomKey] = useState(0);
  const { nfts: games } = useGetNfts();
  const [showDialog, setShowDialog] = useState(false);

  const handleCardClick = (game: GameInfo) => {
    setRomKey((prevKey) => prevKey + 1);
    setRom(game.rom);
    setShowDialog(true);
  };

  const handleDismiss = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Emulator
        rom={rom}
        romKey={romKey}
        showDialog={showDialog}
        onDismiss={handleDismiss}
      />
      <main className={styles.container}>
        <h1 className={styles.title}>Veridian City Studios</h1>

        // Top.tsx

// ... (imports and component setup are the same)

{games.length > 0 ? (
  <div className={styles.grid}>
    {/* Add 'index' as the second argument to map */}
    {games.map((game, index) => (
      <GameCard
        key={index} // FIX: Use the 'index' as the key
        game={game}
        onClick={() => handleCardClick(game)}
      />
    ))}
  </div>
) : (
  // ... (empty state JSX is the same)
)}
        ) : (
          <div className={styles.emptyState}>
            {/* You could add a cool SVG icon here! */}
            <h2>No Games Found</h2>
            <p>It looks like you don't have any game cartridges yet.</p>
            <button
              className={styles.actionButton}
              onClick={() => window.open("https://exchange.art/series/Degen%20Boy%20Cartridge%20Deployer/nfts")}
            >
              Browse on Exchange.art
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default Top;
