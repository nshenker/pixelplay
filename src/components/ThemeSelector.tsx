import styles from "@/styles/ThemeSelector.module.css";

// Define the structure for a theme
export interface Theme {
  id: string;
  name: string;
  colors: string[];
}

// List of all available themes
export const themes: Theme[] = [
  { id: "veridian", name: "Veridian City", colors: ["#1e1e1e", "#FFD700"] },
  { id: "atomic-purple", name: "Atomic Purple", colors: ["#402758", "#97E25F"] },
  { id: "forest-green", name: "Forest Green", colors: ["#2A3F30", "#D4B483"] },
  { id: "oceanic-blue", name: "Oceanic Blue", colors: ["#0B2447", "#576CBC"] },
  { id: "volcanic-red", name: "Volcanic Red", colors: ["#3C0000", "#FF4500"] },
  { id: "classic-grey", name: "Classic Grey", colors: ["#585858", "#C0C0C0"] },
  { id: "sakura-pink", name: "Sakura Pink", colors: ["#F5E6E8", "#D9798F"] },
  { id: "cyber-neon", name: "Cyber Neon", colors: ["#0d0221", "#f038ff"] },
];

interface ThemeSelectorProps {
  setTheme: (themeId: string) => void;
}

const ThemeSelector = ({ setTheme }: ThemeSelectorProps) => {
  return (
    <div className={styles.selectorContainer}>
      <h2 className={styles.selectorTitle}>Select a Theme</h2>
      <div className={styles.themeGrid}>
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={styles.themeButton}
            onClick={() => setTheme(theme.id)}
            aria-label={`Select ${theme.name} theme`}
          >
            <div className={styles.palette}>
              <div
                className={styles.colorChip}
                style={{ backgroundColor: theme.colors[0] }}
              ></div>
              <div
                className={styles.colorChip}
                style={{ backgroundColor: theme.colors[1] }}
              ></div>
            </div>
            <span className={styles.themeName}>{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
