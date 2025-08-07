import frame from "../assets/frame.png";
import ExpandSVG from "../assets/expand.svg";
import {GameInfo} from "@/nfts/GetNfts";

const GameCard = ({
  game,
  onClick,
}: {
  game: GameInfo;
  onClick: () => void;
}) => {
  return (
    <div style={{ position: "relative" }}>
      <img
        src={frame.src}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "220px",
          height: "320px",
          background: "white"
        }}
        alt={"frame"}
      />
      <div
        style={{
          position: "relative",
          top: "20px",
          left: "20px",
          cursor: "pointer",
          width: "180px",
          height: "280px",
        }}
        onClick={onClick}
      >
        <p>{game.name}</p>
        <img
          style={{ objectFit: "scale-down" }}
          width={"160px"}
          height={"160px"}
          src={game.image}
          alt={game.name}
        />
        <img
  src={ExpandSVG.src}
  style={{
    position: "absolute",
    bottom: "10px",
    right: "10px",
    width: "20px",
    height: "20px",
    filter: "brightness(0%)",
  }}
  alt={"expand"}
/>
      </div>
    </div>
  );
};

export default GameCard;
