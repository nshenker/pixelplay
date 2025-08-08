import ExpandSVG from "../assets/expand.svg";
import { GameInfo } from "@/nfts/GetNfts";
import styles from "@/styles/GameCard.module.css"; // Import the CSS module

const GameCard = ({
  game,
  onClick,
}: {
  game: GameInfo;
  onClick: () => void;
}) => {
  return (
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
  );
};

export default GameCard;
