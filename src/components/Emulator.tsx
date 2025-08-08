import { Dialog, DialogContent, DialogOverlay } from "@reach/dialog";
import { useRef } from "react";
import styles from "@/styles/Emulator.module.css";

const Emulator = ({
  showDialog,
  onDismiss,
  romKey,
  rom,
}: {
  showDialog: boolean;
  onDismiss: () => void;
  romKey: number;
  rom: string | null;
}) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  const startRom = () => {
    if (!iframe.current?.contentWindow) return;
    // Pass the ROM data to the iframe and start the emulator
    iframe.current.contentWindow.window.rom = rom!;
    iframe.current.contentWindow.window.go();
  };

  return (
    <DialogOverlay
      className={styles.overlay}
      isOpen={showDialog}
      onDismiss={onDismiss}
    >
      <DialogContent aria-label="Game Emulator" className={styles.handheldContainer}>
        {/* Screen Area */}
        <div className={styles.topSection}>
          <div className={styles.screenBezel}>
            <div className={styles.powerLed}></div>
            <iframe
              onLoad={startRom}
              ref={iframe}
              key={romKey}
              className={styles.screen}
              src={"/emulator/simple.html"}
              title="Emulator Screen"
            />
          </div>
        </div>

        {/* Branding */}
        <div className={styles.branding}>
          VERIDIAN <span>HANDHELD</span>
        </div>

        {/* Controls Area */}
        <div className={styles.controlsArea}>
          <div className={styles.dPad}></div>
          
          <div className={styles.actionButtons}>
            <div className={`${styles.button} ${styles.buttonB}`}>B</div>
            <div className={`${styles.button} ${styles.buttonA}`}>A</div>
          </div>
        </div>

        {/* Start/Select Buttons and Speaker */}
        <div className={styles.bottomArea}>
            <div className={styles.startSelectButtons}>
                <div className={styles.pillButton} data-label="SELECT"></div>
                <div className={styles.pillButton} data-label="START"></div>
            </div>
            <div className={styles.speaker}></div>
        </div>

      </DialogContent>
    </DialogOverlay>
  );
};

export default Emulator;
