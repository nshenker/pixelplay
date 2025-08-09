import styles from "@/styles/Top.module.css";
import { useState } from "react";
import { useGetNfts } from "@/nfts/GetNfts";
import GameCard from "@/components/GameCard";
import Emulator from "@/components/Emulator";
import { FaGamepad } from "react-icons/fa"; // Using a fun icon for the button

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
  const [showEmulator, setShowEmulator] = useState(false);
  const [isGameCaseOpen, setIsGameCaseOpen] = useState(false);

  return (
    <>
      <Emulator
        rom={rom}
        romKey={romKey}
        showDialog={showEmulator}
        onDismiss={() => {
          console.log("dismissing");
          setShowEmulator(false);
        }}
      />

      <div className={styles.pageContainer}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Veridian City Studios</h1>
          <p className={styles.subtitle}>Your Retro Gaming Hub</p>
          
          <button
            className={styles.openCaseButton}
            onClick={() => setIsGameCaseOpen(true)}
          >
            <FaGamepad className={styles.gamepadIcon} />
            Open Game Case
          </button>
        </div>
      </div>

      {isGameCaseOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.gameCaseModal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Game Case</h2>
              <button
                className={styles.closeButton}
                onClick={() => setIsGameCaseOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              {games.length > 0 ? (
                <div className={styles.grid}>
                  {games.map((game, index) => (
                    <div key={index} className={styles.gridItem}>
                      <GameCard
                        game={game}
                        onClick={() => {
                          setRomKey((prevCount) => prevCount + 1);
                          setRom(games[index].rom);
                          setShowEmulator(true);
                          setIsGameCaseOpen(false); // Close case when game starts
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noGamesContainer}>
                  <p className={styles.noGamesText}>
                    Your game case is empty!
                  </p>
                  <p className={styles.noGamesText}>
                    Click below to browse for new adventures.
                  </p>
                  <button
                    className={styles.actionButton}
                    onClick={() =>
                      window.open(
                        "https://exchange.art/series/Degen%20Boy%20Cartridge%20Deployer/nfts"
                      )
                    }
                  >
                    Browse Games
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Top;
