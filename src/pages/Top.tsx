import styles from "@/styles/Top.module.css";
import { useState } from "react";
import { useGetNfts } from "@/nfts/GetNfts";
import Emulator from "@/components/Emulator";
import GameCase from "@/components/GameCase";

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
  const [showEmulator, setShowEmulator] = useState(false);
  const [isCaseOpen, setIsCaseOpen] = useState(false);
  const { nfts: games } = useGetNfts();

  const handleGameSelect = (selectedRom: string) => {
    setRomKey((prevKey) => prevKey + 1);
    setRom(selectedRom);
    setShowEmulator(true);
    setIsCaseOpen(false);
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

        <GameCase
          games={games}
          isOpen={isCaseOpen}
          onOpen={() => setIsCaseOpen(true)}
          // --- FIX APPLIED HERE ---
          // This function now correctly matches the expected type: () => void
          onClose={() => setIsCaseOpen(false)}
          onSelectGame={handleGameSelect}
        />
      </div>
    </>
  );
};

export default Top;
