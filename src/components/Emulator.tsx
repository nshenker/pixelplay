import { Dialog, DialogContent, DialogOverlay } from "@reach/dialog";
import { useRef } from "react";
import styles from "@/styles/Emulator.module.css";
import { useMediaQuery } from "react-responsive";

// Define the API we expect from our iframe
interface VeridianAPI {
  loadRom: (base64Rom: string) => void;
  press: (key: string) => void;
  release: (key: string) => void;
}

const Emulator = ({
  showDialog,
  onDismiss,
  romKey,
  rom, // This should be a Base64 encoded string of the ROM file
}: {
  showDialog: boolean;
  onDismiss: () => void;
  romKey: number;
  rom: string | null;
}) => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const isPhone = useMediaQuery({ query: "(max-width: 480px)" });

  // This function is called when the iframe has loaded
  const handleIframeLoad = () => {
    const api = (iframe.current?.contentWindow as any)?.VeridianAPI as VeridianAPI;
    if (api && rom) {
      console.log("Iframe loaded, sending ROM to emulator core...");
      api.loadRom(rom);
    }
  };

  // Helper to create event handlers for our buttons
  const createButtonHandlers = (key: string) => {
    const api = (iframe.current?.contentWindow as any)?.VeridianAPI as VeridianAPI;
    if (!api) return {};

    const press = () => api.press(key);
    const release = () => api.release(key);

    return {
      onMouseDown: press,
      onMouseUp: release,
      onMouseLeave: release,
      onTouchStart: (e: React.TouchEvent) => { e.preventDefault(); press(); },
      onTouchEnd: (e: React.TouchEvent) => { e.preventDefault(); release(); },
    };
  };

  return (
    <DialogOverlay className={styles.overlay} isOpen={showDialog} onDismiss={onDismiss}>
      <DialogContent
        aria-label="Veridian Handheld Emulator"
        className={styles.dialogContent}
        style={{ transform: isPhone ? "scale(0.9)" : "scale(1)" }}
      >
        <div className={styles.gameboy}>
          <div className={styles.screenArea}>
            <div className={styles.powerLed}></div>
            <div className={styles.screenDisplay}>
              <iframe
                onLoad={handleIframeLoad}
                ref={iframe}
                key={romKey} // Re-mounts iframe when the ROM changes
                className={styles.emulatorFrame}
                src="/veridian-emulator.html" // Point to our new emulator file
                title="Veridian Emulator Screen"
                sandbox="allow-scripts allow-same-origin" // Security best practice
              />
            </div>
            <p className={styles.screenText}>HIGH-RESOLUTION LCD SCREEN</p>
          </div>

          <div className={styles.logo}>
            VERIDIAN <span className={styles.logoHandheld}>HANDHELD</span>
          </div>

          <div className={styles.controls}>
            <div className={styles.dpad}>
              <div className={styles.dpadUp} {...createButtonHandlers('UP')}></div>
              <div className={styles.dpadDown} {...createButtonHandlers('DOWN')}></div>
              <div className={styles.dpadLeft} {...createButtonHandlers('LEFT')}></div>
              <div className={styles.dpadRight} {...createButtonHandlers('RIGHT')}></div>
              <div className={styles.dpadCenter}></div>
            </div>
            <div className={styles.abButtons}>
              <div className={styles.buttonB} {...createButtonHandlers('B')}><span>B</span></div>
              <div className={styles.buttonA} {...createButtonHandlers('A')}><span>A</span></div>
            </div>
          </div>
          <div className={styles.startSelectArea}>
            <div className={styles.button} {...createButtonHandlers('SELECT')}><span>SELECT</span></div>
            <div className={styles.button} {...createButtonHandlers('START')}><span>START</span></div>
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default Emulator;
