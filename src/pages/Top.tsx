import styles from "@/styles/Top.module.css";
import { useState } from "react";
import { useGetNfts } from "@/nfts/GetNfts";
import Emulator from "@/components/Emulator";
import GameCase from "@/components/GameCase";
import ThemeSelector from "@/components/ThemeSelector"; // Import the new component

declare global {
  interface Window {
    rom: string;
    go: () => Promise<void>;
  }
}

export const Top = () => {
  const [rom, setRom] = useState<string | null>(null);
  const [romKey, setRomKey] = useState(0);
  const [showEmulator, setShowEmulator] = useState(false);
  const [isCaseOpen, setIsCaseOpen] = useState(false);
  const [theme, setTheme] = useState("veridian"); // Default theme state

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
      {/* The active theme class is applied here */}
      <div className={`${styles.container} ${styles[theme]}`}>
        <h1 className={styles.title}>Veridian City Studios</h1>

        <ThemeSelector setTheme={setTheme} />

        <GameCase
          games={games}
          isOpen={isCaseOpen}
          onOpen={() => setIsCaseOpen(true)}
          onClose={(e) => {
            e.stopPropagation();
            setIsCaseOpen(false);
          }}
          onSelectGame={handleGameSelect}
        />
      </div>
    </>
  );
};

export default Top;
