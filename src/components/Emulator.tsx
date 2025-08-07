import { Dialog, DialogContent, DialogOverlay } from "@reach/dialog";
import { useRef } from "react";
import styles from "@/styles/Emulator.module.css";
import { useMediaQuery } from "react-responsive";

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
  // We can use this to slightly adjust size, but the Game Boy layout will be responsive.
  const isPhone = useMediaQuery({ query: "(max-width: 600px)" });

  const startRom = () => {
    if (!iframe.current?.contentWindow) return;
    // The emulator logic remains the same
    iframe.current.contentWindow.window.rom = rom!;
    iframe.current.contentWindow.window.go();
  };

  return (
    <DialogOverlay
      className={styles.overlay}
      isOpen={showDialog}
      onDismiss={onDismiss}
    >
      <DialogContent aria-label="Game Boy Emulator" className={styles.gameboyBody}>
        {/* Top edge details */}
        <div className={styles.topBezel}>
          <div className={styles.topBezelIndentLeft}></div>
          <span>ON & OFF</span>
          <div className={styles.topBezelIndentRight}></div>
        </div>

        {/* Screen Area */}
        <div className={styles.screenBezel}>
          <div className={styles.screenIndicator}>
            <div className={styles.powerLight}></div>
            <span className={styles.powerText}>BATTERY</span>
          </div>
          <div className={styles.screenContainer}>
            <iframe
              onLoad={startRom}
              ref={iframe}
              key={romKey}
              className={styles.emulatorScreen}
              src={"/emulator/simple.html"}
              title="Emulator Screen"
            />
          </div>
          <div className={styles.brandLogo}>
            Nintendo <span className={styles.logoGameboy}>GAME BOY</span>™
          </div>
        </div>

        {/* Nintendo Logo below screen */}
        <div className={styles.nintendoLogo}>
          <span>Nintendo</span>
        </div>

        {/* Controls Area */}
        <div className={styles.controlsContainer}>
          <div className={styles.dpad}>
            <div className={styles.dpadUp}></div>
            <div className={styles.dpadLeft}></div>
            <div className={styles.dpadRight}></div>
            <div className={styles.dpadDown}></div>
            <div className={styles.dpadCenter}></div>
          </div>

          <div className={styles.abButtons}>
            <div className={styles.buttonB}><span>B</span></div>
            <div className={styles.buttonA}><span>A</span></div>
          </div>
        </div>

        {/* Start/Select Buttons */}
        <div className={styles.startSelectContainer}>
            <div className={styles.pillButtonWrapper}>
                <div className={styles.pillButton}></div>
                <span>SELECT</span>
            </div>
            <div className={styles.pillButtonWrapper}>
                <div className={styles.pillButton}></div>
                <span>START</span>
            </div>
        </div>

        {/* Speaker Grill */}
        <div className={styles.speaker}></div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default Emulator;
