import styles from "@/styles/GameCase.module.css";
import GameCard from "@/components/GameCard";
import React from "react";

interface Game {
  name: string;
  image: string;
  rom: string;
}

interface GameCaseProps {
  games: Game[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: (e: React.MouseEvent) => void;
  onSelectGame: (rom: string) => void;
}

const GameCase = ({
  games,
  isOpen,
  onOpen,
  onClose,
  onSelectGame,
}: GameCaseProps) => {

  return (
    <div
      className={`${styles.gameCase} ${isOpen ? styles.isOpen : ""}`}
      onClick={() => !isOpen && onOpen()}
    >
      <div className={styles.caseCover}>
        <div className={styles.coverArt}>
          <span className={styles.coverLogo}>VCS</span>
          <p className={styles.coverText}>Click to Open</p>
        </div>
      </div>

      <div className={styles.caseInside}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        {games.length > 0 && (
          <div className={styles.grid}>
            {games.map((game, index) => (
              <div key={index} className={styles.gridItem}>
                <GameCard
                  game={game}
                  onClick={() => onSelectGame(game.rom)}
                />
              </div>
            ))}
          </div>
        )}

        {games.length === 0 && (
          <div className={styles.noGamesContainer}>
            <p className={styles.noGamesText}>No game cartridges found.</p>
            <p className={styles.noGamesText}>
              Visit Exchange.art to start your collection!
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
  );
};

export default GameCase;
