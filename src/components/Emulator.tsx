import { Dialog, DialogContent, DialogOverlay } from "@reach/dialog";
import { useEffect, useRef } from "react";
import styles from "@/styles/Emulator.module.css";

// Define a type for the component's props
type EmulatorProps = {
  showDialog: boolean;
  onDismiss: () => void;
  romKey: number;
  rom: string | null;
};

const Emulator = ({
  showDialog,
  onDismiss,
  romKey,
  rom,
}: EmulatorProps) => { // <-- Type is applied here
  const iframe = useRef<HTMLIFrameElement>(null);

  // Function to send keydown/keyup events to the emulator iframe
  const sendInput = (type: "keydown" | "keyup", key: string) => {
    if (!iframe.current?.contentWindow) return;

    // We use the 'code' property for reliability, e.g., 'KeyZ', 'ArrowUp'
    const event = new KeyboardEvent(type, {
      key: key.replace("Key", "").toLowerCase(), // e.g., 'z'
      code: key,
      bubbles: true,
    });
    iframe.current.contentWindow.document.dispatchEvent(event);
  };

  // This effect handles loading the ROM into the iframe when it's ready
  useEffect(() => {
    if (!showDialog || !iframe.current) return;

    const startRom = () => {
      if (!iframe.current?.contentWindow) return;
      console.log("Setting ROM and starting emulator:", rom);
      // These globals are expected by the emulator in simple.html
      (iframe.current.contentWindow as any).rom = rom;
      (iframe.current.contentWindow as any).go();
    };

    const currentIframe = iframe.current;
    // Wait for the iframe to load before starting the ROM
    currentIframe.addEventListener("load", startRom);

    // Cleanup the event listener when the component unmounts or re-renders
    return () => {
      currentIframe?.removeEventListener("load", startRom);
    };
  }, [showDialog, rom, romKey]);

  // Handlers for on-screen buttons to simulate key presses
  const handleButtonPress = (key: string) => {
    sendInput("keydown", key);
  };
  const handleButtonRelease = (key: string) => {
    sendInput("keyup", key);
  };

  // A helper component to reduce repetitive code for buttons
  const ControlButton = ({
    cssClass,
    label,
    mapKey,
  }: {
    cssClass: string;
    label?: string;
    mapKey: string;
  }) => (
    <div
      className={cssClass}
      onMouseDown={() => handleButtonPress(mapKey)}
      onMouseUp={() => handleButtonRelease(mapKey)}
      onMouseLeave={() => handleButtonRelease(mapKey)} // Handle mouse leaving button while pressed
      onTouchStart={(e) => {
        e.preventDefault(); // Prevents touch from also firing mouse events
        handleButtonPress(mapKey);
      }}
      onTouchEnd={() => handleButtonRelease(mapKey)}
    >
      {label}
    </div>
  );

  return (
    <DialogOverlay className={styles.dialogOverlay} isOpen={showDialog} onDismiss={onDismiss}>
      <DialogContent className={styles.dialogContent} aria-label="Game Emulator">
        <div className={styles.handheldShell}>
          {/* Screen Area */}
          <div className={styles.screenArea}>
            <div className={styles.screenBezel}>
              <iframe
                ref={iframe}
                key={romKey}
                className={styles.emulatorScreen}
                src={"/emulator/simple.html"}
                title="Emulator Screen"
                scrolling="no"
              />
            </div>
          </div>

          {/* Branding */}
          <div className={styles.branding}>
            <span className={styles.brandName}>VERIDIAN</span>
            <span className={styles.brandModel}>HANDHELD</span>
          </div>

          {/* Controls Area */}
          <div className={styles.controlsArea}>
            {/* D-Pad */}
            <div className={styles.dpad}>
              <ControlButton cssClass={`${styles.dpadButton} ${styles.up}`} mapKey="ArrowUp" />
              <ControlButton cssClass={`${styles.dpadButton} ${styles.down}`} mapKey="ArrowDown" />
              <ControlButton cssClass={`${styles.dpadButton} ${styles.left}`} mapKey="ArrowLeft" />
              <ControlButton cssClass={`${styles.dpadButton} ${styles.right}`} mapKey="ArrowRight" />
              <div className={styles.dpadCenter}></div>
            </div>

            {/* A & B Buttons */}
            <div className={styles.abButtons}>
              <ControlButton cssClass={styles.buttonB} label="B" mapKey="KeyZ" />
              <ControlButton cssClass={styles.buttonA} label="A" mapKey="KeyX" />
            </div>
          </div>
          
          {/* Start & Select Buttons */}
          <div className={styles.startSelectArea}>
             <ControlButton cssClass={styles.pillButton} label="SELECT" mapKey="ShiftLeft" />
             <ControlButton cssClass={styles.pillButton} label="START" mapKey="Enter" />
          </div>

        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default Emulator;
