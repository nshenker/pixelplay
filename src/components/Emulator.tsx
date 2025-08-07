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
  const isPhone = useMediaQuery({ query: "(max-width: 480px)" });

  // Function to send key events to the emulator's iframe
  const sendKeyEvent = (type: 'keydown' | 'keyup', key: string) => {
    if (!iframe.current?.contentWindow) return;
    const event = new KeyboardEvent(type, { key, bubbles: true });
    iframe.current.contentWindow.document.dispatchEvent(event);
  };

  const startRom = () => {
    if (!iframe.current?.contentWindow) return;

    // --- Hide the emulator's on-screen controls ---
    // This line is hypothetical. You may need to check your emulator's
    // documentation for the correct way to disable its on-screen UI.
    // It might be a different property name or a function call.
    if ('showOnScreenControls' in iframe.current.contentWindow.window) {
      (iframe.current.contentWindow.window as any).showOnScreenControls = false;
    }
    
    // Load the rom
    (iframe.current.contentWindow.window as any).rom = rom!;
    (iframe.current.contentWindow.window as any).go();
  };

  // Helper to create event handlers for a specific key
  const createButtonHandlers = (key: string) => ({
    onMouseDown: () => sendKeyEvent('keydown', key),
    onMouseUp: () => sendKeyEvent('keyup', key),
    onMouseLeave: () => sendKeyEvent('keyup', key), // Stop pressing if mouse leaves
    onTouchStart: (e: React.TouchEvent) => {
      e.preventDefault(); // Prevent scrolling/double-tap zoom
      sendKeyEvent('keydown', key);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      e.preventDefault();
      sendKeyEvent('keyup', key);
    },
  });

  // Keyboard mappings based on your original setup
  const controlsMap = {
    up: createButtonHandlers('ArrowUp'),
    down: createButtonHandlers('ArrowDown'),
    left: createButtonHandlers('ArrowLeft'),
    right: createButtonHandlers('ArrowRight'),
    a: createButtonHandlers('x'),
    b: createButtonHandlers('z'),
    start: createButtonHandlers('Enter'),
    select: createButtonHandlers('Shift'), // Using Shift for Select
  };

  return (
    <DialogOverlay
      className={styles.overlay}
      isOpen={showDialog}
      onDismiss={onDismiss}
    >
      <DialogContent
        aria-label="Veridian Handheld Emulator"
        className={styles.dialogContent}
        style={{ transform: isPhone ? "scale(0.9)" : "scale(1)" }}
      >
        <div className={styles.gameboy}>
          <div className={styles.bodyTop}>
            {/* Decorative lines */}
          </div>

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
            <p className={styles.screenText}>HIGH-RESOLUTION LCD SCREEN</p>
          </div>

          {/* Updated Logo */}
          <div className={styles.logo}>
            VERIDIAN <span className={styles.logoHandheld}>HANDHELD</span>
          </div>

          <div className={styles.controls}>
            {/* Interactive D-Pad */}
            <div className={styles.dpad}>
              <div className={styles.dpadUp} {...controlsMap.up}></div>
              <div className={styles.dpadDown} {...controlsMap.down}></div>
              <div className={styles.dpadLeft} {...controlsMap.left}></div>
              <div className={styles.dpadRight} {...controlsMap.right}></div>
              <div className={styles.dpadCenter}></div>
            </div>

            {/* Interactive A & B Buttons */}
            <div className={styles.abButtons}>
              <div className={styles.buttonB} {...controlsMap.b}>
                <span>B</span>
              </div>
              <div className={styles.buttonA} {...controlsMap.a}>
                <span>A</span>
              </div>
            </div>
          </div>

          {/* Interactive Start/Select Buttons */}
          <div className={styles.startSelectArea}>
            <div className={styles.button} {...controlsMap.select}>
              <span>SELECT</span>
            </div>
            <div className={styles.button} {...controlsMap.start}>
              <span>START</span>
            </div>
          </div>
          
          <div className={styles.speaker}>
            {/* Speaker lines */}
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default Emulator;
