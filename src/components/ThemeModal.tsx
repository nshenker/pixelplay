import styles from "@/styles/ThemeModal.module.css";
import React from "react";

// Define the structure for a theme
interface Theme {
  id: string;
  name: string;
  colors: string[];
}

// List of all available themes
const themes: Theme[] = [
  { id: "veridian", name: "Veridian City", colors: ["#1e1e1e", "#FFD700"] },
  { id: "atomic-purple", name: "Atomic Purple", colors: ["#402758", "#97E25F"] },
  { id: "forest-green", name: "Forest Green", colors: ["#2A3F30", "#D4B483"] },
  { id: "oceanic-blue", name: "Oceanic Blue", colors: ["#0B2447", "#576CBC"] },
  { id: "volcanic-red", name: "Volcanic Red", colors: ["#3C0000", "#FF4500"] },
  { id: "classic-grey", name: "Classic Grey", colors: ["#585858", "#C0C0C0"] },
  { id: "sakura-pink", name: "Sakura Pink", colors: ["#F5E6E8", "#D9798F"] },
  { id: "cyber-neon", name: "Cyber Neon", colors: ["#0d0221", "#f038ff"] },
];

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  setTheme: (themeId: string) => void;
}

const ThemeModal = ({ isOpen, onClose, setTheme }: ThemeModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Themes</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.grid}>
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={styles.themeItem}
              onClick={() => handleThemeSelect(theme.id)}
            >
              <div className={styles.palette}>
                <div
                  className={styles.colorPreview}
                  style={{ backgroundColor: theme.colors[0] }}
                />
                <div
                  className={styles.colorPreview}
                  style={{ backgroundColor: theme.colors[1] }}
                />
              </div>
              <span className={styles.themeName}>{theme.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
