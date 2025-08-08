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
      <DialogContent aria-label="Game Emulator" className={styles.popupFrame}>
        <iframe
          onLoad={startRom}
          ref={iframe}
          key={romKey}
          className={styles.emulator}
          src={"/emulator/simple.html"}
          title="Emulator Screen"
          scrolling="no"
        />
        {/* Subtly display controls for PC users */}
        <div className={styles.controlsHint}>
          <p>
            <strong>Move:</strong> <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd>
          </p>
          <p>
            <strong>A Button:</strong> <kbd>X</kbd> &nbsp;|&nbsp; <strong>B Button:</strong> <kbd>Z</kbd>
          </p>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default Emulator;
