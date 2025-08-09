import styles from "@/styles/GameCase.module.css";
import GameCard from "@/components/GameCard";

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
  onClose: () => void;
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
    // The main container for the game case. Clicking it triggers the open animation.
    <div
      className={`${styles.gameCase} ${isOpen ? styles.isOpen : ""}`}
      onClick={() => !isOpen && onOpen()}
    >
      {/* This is the front cover of the case */}
      <div className={styles.caseCover}>
        <div className={styles.coverArt}>
          <span className={styles.coverLogo}>VCS</span>
          <p className={styles.coverText}>Click to Open</p>
        </div>
      </div>

      {/* This is the inside of the case, which holds the game cards */}
      <div className={styles.caseInside}>
        <button className={styles.closeButton} onClick={onClose}>
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
