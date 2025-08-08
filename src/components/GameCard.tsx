import React from 'react'; // Ensure React is imported in a .tsx file
import ExpandSVG from "../assets/expand.svg";
import styles from "@/styles/GameCard.module.css";

// Define the shape of your game data object. Adjust this to match your actual data.
export interface GameInfo {
  image: string;
  name: string;
  // You can add any other properties your game object has here
}

// Define the component's props using a TypeScript interface
interface GameCardProps {
  game: GameInfo;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card} onClick={onClick}>
        <div className={styles.imageContainer}>
          <img
            className={styles.gameImage}
            src={game.image}
            alt={game.name}
          />
          <img
            className={styles.expandIcon}
            src={ExpandSVG.src}
            alt="Expand"
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.gameName}>{game.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
