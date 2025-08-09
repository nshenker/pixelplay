import styles from "@/styles/Top.module.css";
import { useState } from "react";
import { useGetNfts } from "@/nfts/GetNfts";
import Emulator from "@/components/Emulator";
import GameCase from "@/components/GameCase"; // Import the new GameCase component

declare global {
  interface Window {
    rom: string;
    go: () => Promise<void>;
  }
}

const creatorAddresses = process.env.NEXT_PUBLIC_CREATOR_ADDRESSES!.split(",");
console.log("creatorAddresses", creatorAddresses);

export const Top = () => {
  // State for the selected ROM to play
  const [rom, setRom] = useState<string | null>(null);
  const [romKey, setRomKey] = useState(0);

  // State to manage the emulator dialog visibility
  const [showEmulator, setShowEmulator] = useState(false);

  // State to manage if the game case is open or closed
  const [isCaseOpen, setIsCaseOpen] = useState(false);

  // Fetch the NFT data
  const { nfts: games } = useGetNfts();

  // Handler for when a game card is clicked inside the case
  const handleGameSelect = (selectedRom: string) => {
    setRomKey((prevKey) => prevKey + 1); // Increment key to force re-render
    setRom(selectedRom);
    setShowEmulator(true); // Show the emulator
    setIsCaseOpen(false); // Close the case
  };

  return (
    <>
      <Emulator
        rom={rom}
        romKey={romKey}
        showDialog={showEmulator}
        onDismiss={() => setShowEmulator(false)}
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Veridian City Studios</h1>

        {/* Render the GameCase component */}
        <GameCase
          games={games}
          isOpen={isCaseOpen}
          onOpen={() => setIsCaseOpen(true)}
          onClose={(e) => {
            e.stopPropagation(); // Prevent the case's onClick from firing
            setIsCaseOpen(false);
          }}
          onSelectGame={handleGameSelect}
        />
      </div>
    </>
  );
};

export default Top;
