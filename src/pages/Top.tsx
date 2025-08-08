import styles from "@/styles/Top.module.css";
import {  useState } from "react";
import { useGetNfts } from "@/nfts/GetNfts";
import GameCard from "@/components/GameCard";
import Emulator from "@/components/Emulator";

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
  const { nfts: games} = useGetNfts();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Emulator
        rom={rom}
        romKey={romKey}
        showDialog={showDialog}
        onDismiss={() => {
          console.log("dismissing");
          setShowDialog(false);
        }}
      />
      <div className={styles.gridWrapper}>
      <h1
  style={{
    fontFamily: "'Press Start 2P', cursive",
    margin: "auto",
    marginTop: "30px",
    textAlign: "center",
    color: "#333333", // Dark color of your choice
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Add a subtle text shadow
    backgroundColor: "#ffffff", // White background color
    padding: "10px", // Add some padding to create the box
    display: "inline-block", // Adjust display to inline-block for the box to fit the text
  }}
>
  Veridian City Studios
</h1>
          {games.length > 0 &&
              <div className={styles.grid}>
                  {games.map((game, index) => {
              return (
                <div key={index} className={styles.gridItem}>
                  {" "}
                  <GameCard
                    onClick={() => {
                      setRomKey((prevCount) => prevCount + 1);
                      setRom(games[index].rom);
                      setShowDialog(true);
                    }}
                    key={index}
                    game={game}
                  />
                </div>
              );
                })}

              </div>
              }
        {games.length === 0 && (
          <>
            <p
  style={{
    fontFamily: "'Press Start 2P', cursive",
    margin: "auto",
    marginTop: "100px",
    textAlign: "center",
    color: "black",          // Added style to make the text black
    backgroundColor: "white", // Added style to set white background color
    padding: "10px",          // Added style to add some padding around the text
    display: "inline-block"   // Added style to make the box wrap tightly around the text
  }}
>
  It looks like you don&apos;t have any games yet.
</p>
<div
  style={{
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  }}
>
  <p
    style={{
      fontFamily: "'Press Start 2P', cursive",
      margin: "auto",
      marginTop: "100px",
      textAlign: "center",
      color: "black",          // Added style to make the text black
      backgroundColor: "white", // Added style to set white background color
      padding: "10px",          // Added style to add some padding around the text
      display: "inline-block"   // Added style to make the box wrap tightly around the text
    }}
  >
    Click the button below to browse games!
  </p>
  <style>
  {`
    .pixelated-button {
      margin: 100px;
      width: 200px;
      height: 50px;
      cursor: pointer;
      border: 2px solid #000;
      background-color: #312f48;
      font-family: 'Press Start 2P', cursive;
      font-size: 12px;
      color: #fff;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 2px;
      line-height: 50px;
      outline: none;
      display: inline-block;
      position: relative;
      overflow: hidden;
    }

    .pixelated-button::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 2px solid #000;
      z-index: -1;
    }
  `}
</style>

<button
  className="pixelated-button"
  onClick={() => window.open("https://exchange.art/series/Degen%20Boy%20Cartridge%20Deployer/nfts")}
>
  Exchange.art
</button>
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
};

//default export Top
export default Top;
