import styles from "@/styles/GameCase.module.css";
import GameCard from "@/components/GameCard";
import React from "react"; // Import React for the MouseEvent type

// Define the structure for the game NFT data
interface Game {
  name: string;
  image: string;
  rom: string;
}

// Define the props for the GameCase component
interface GameCaseProps {
  games: Game[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void; // The type correctly takes no arguments
  onSelectGame: (rom: string) => void;
}

const GameCase = ({
  games,
  isOpen,
  onOpen,
  onClose,
  onSelectGame,
}: GameCaseProps) => {

  // This new handler manages the click event internally
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from bubbling to the parent
    onClose();           // Call the simple function from props
  };

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
        {/* The button now calls the internal handler */}
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>

        {/* Display the grid of games if any exist */}
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

        {/* Display a message if the user has no games */}
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
