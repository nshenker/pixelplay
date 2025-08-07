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
  // Use media query to scale down the entire component on smaller screens
  const isPhone = useMediaQuery({ query: "(max-width: 480px)" });

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
      <DialogContent
        aria-label="Game Boy Emulator"
        className={styles.dialogContent}
        style={{ transform: isPhone ? "scale(0.9)" : "scale(1)" }}
      >
        {/* Main Game Boy Body */}
        <div className={styles.gameboy}>
          <div className={styles.bodyTop}>
            <div className={styles.bodyLine} />
            <div className={styles.bodyLine} />
            <div className={styles.bodyLine} />
            <div className={styles.bodyLine} />
            <div className={styles.bodyLine} />
          </div>

          {/* Screen Area */}
          <div className={styles.screenArea}>
            <div className={styles.powerLed}></div>
            <div className={styles.screenDisplay}>
              <iframe
                onLoad={startRom}
                ref={iframe}
                key={romKey}
                className={styles.emulatorFrame}
                src={"/emulator/simple.html"}
                title="Emulator Screen"
              />
            </div>
            <p className={styles.screenText}>DOT MATRIX WITH STEREO SOUND</p>
          </div>

          {/* Logo */}
          <div className={styles.logo}>
            Nintendo <span className={styles.logoGameboy}>GAME BOY</span>
            <span className={styles.logoTm}>™</span>
          </div>

          {/* Controls Area */}
          <div className={styles.controls}>
            {/* D-Pad */}
            <div className={styles.dpad}></div>

            {/* A & B Buttons */}
            <div className={styles.abButtons}>
              <div className={styles.buttonB}>
                <span>B</span>
              </div>
              <div className={styles.buttonA}>
                <span>A</span>
              </div>
            </div>
          </div>

          {/* Start/Select Buttons */}
          <div className={styles.startSelectArea}>
            <div className={styles.buttonSelect}>
              <span>SELECT</span>
            </div>
            <div className={styles.buttonStart}>
              <span>START</span>
            </div>
          </div>
          
          {/* Speaker Grill */}
          <div className={styles.speaker}>
            <div className={styles.speakerLine}></div>
            <div className={styles.speakerLine}></div>
            <div className={styles.speakerLine}></div>
            <div className={styles.speakerLine}></div>
            <div className={styles.speakerLine}></div>
            <div className={styles.speakerLine}></div>
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default Emulator;
