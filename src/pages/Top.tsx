import styles from "@/styles/Top.module.css";
import { useState, useEffect } from "react";
import { useGetNfts } from "@/nfts/GetNfts";
import Emulator from "@/components/Emulator";
import GameCase from "@/components/GameCase";
import ThemeModal from "@/components/ThemeModal";

export const Top = () => {
  const [rom, setRom] = useState<string | null>(null);
  const [romKey, setRomKey] = useState(0);
  const [showEmulator, setShowEmulator] = useState(false);
  const [isCaseOpen, setIsCaseOpen] = useState(false);
  const [theme, setTheme] = useState("veridian");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const { nfts: games } = useGetNfts();

  useEffect(() => {
    const allThemes = [
      "veridian", "atomic-purple", "forest-green", "oceanic-blue",
      "volcanic-red", "classic-grey", "sakura-pink", "cyber-neon"
    ];
    document.body.classList.remove(...allThemes);
    document.body.classList.add(theme);
  }, [theme]);

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
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        setTheme={setTheme}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Veridian City Studios</h1>
          <button
            className={styles.themeButton}
            onClick={() => setIsThemeModalOpen(true)}
          >
            Themes
          </button>
        </div>

        <GameCase
          games={games}
          isOpen={isCaseOpen}
          onOpen={() => setIsCaseOpen(true)}
          onClose={() => setIsCaseOpen(false)}
          onSelectGame={handleGameSelect}
        />
      </div>
    </>
  );
};

export default Top;
