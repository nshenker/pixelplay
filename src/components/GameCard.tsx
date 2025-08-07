import frame from "../assets/frame.png";
import expandIcon from "../assets/expand.svg";
import type { GameInfo } from "@/nfts/GetNfts";
import styles from "./GameCard.module.css"; // 1. Import the CSS Module

// 2. Define a clear interface for the component's props
interface GameCardProps {
  game: GameInfo;
  onClick: () => void;
}

const GameCard = ({ game, onClick }: GameCardProps) => {
  return (
    // 3. Use classNames from the imported stylesheet
    <div className={styles.cardContainer}>
      <img
        src={frame.src}
        className={styles.frame}
        alt="" // Alt text is empty as the frame is purely decorative
        aria-hidden="true"
      />

      {/* 4. Use a <button> for better accessibility and semantics */}
      <button className={styles.contentWrapper} onClick={onClick}>
        <p className={styles.gameName}>{game.name}</p>

        <img
          className={styles.gameImage}
          src={game.image}
          alt={game.name}
          width="160"
          height="160"
        />

        <img
          src={expandIcon.src}
          className={styles.expandIcon}
          alt="Expand details"
        />
      </button>
    </div>
  );
};

export default GameCard;
