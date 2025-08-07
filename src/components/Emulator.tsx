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

  const startRom = () => {
    const iFrameWindow = iframe.current?.contentWindow;
    if (!iFrameWindow) return;

    // This function now only injects CSS and loads the ROM.
    try {
      const iFrameDoc = iFrameWindow.document;
      
      // --- CSS to Reposition Emulator Controls ---

      // Step 1: Replace these placeholder selectors with the real ones from your emulator.
      const selectors = {
        container: '#touch-controls-container',
        up: '.btn-up',
        down: '.btn-down',
        left: '.btn-left',
        right: '.btn-right',
        a: '.btn-a',
        b: '.btn-b',
        start: '.btn-start',
        select: '.btn-select',
      };
      
      // Step 2: This CSS string will be injected into the iframe.
      // The `top`, `left`, `width`, `height` values are estimates.
      // You will need to adjust them to perfectly align with your shell buttons.
      const css = `
        /* Tip: Keep this background color while you adjust positions, then set to transparent. */
        .debug-overlay {
          background: rgba(0, 255, 0, 0.25) !important; 
          border: 1px dashed lime !important;
          border-radius: 0 !important;
        }

        /* Make the controls container a transparent full-screen overlay */
        ${selectors.container} {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 400px !important;  /* Match gameboy width */
          height: 660px !important; /* Match gameboy height */
          background: none !important;
          border: none !important;
          z-index: 10 !important;
          pointer-events: none; /* Allow clicks to pass through container */
        }
        
        /* Make all direct children of the container into positioned, clickable overlays */
        ${selectors.container} > * {
          pointer-events: auto !important; /* Make buttons clickable again */
          position: absolute !important;
          opacity: 0 !important; /* Make the original button graphics invisible */
          -webkit-tap-highlight-color: transparent; /* Remove blue flash on mobile tap */
        }
        
        /* --- Position and Size Each Button Overlay --- */

        /* D-Pad Overlays */
        ${selectors.up}    { top: 415px; left: 60px; width: 30px; height: 35px; }
        ${selectors.down}  { top: 470px; left: 60px; width: 30px; height: 35px; }
        ${selectors.left}  { top: 445px; left: 25px; width: 35px; height: 30px; }
        ${selectors.right} { top: 445px; left: 90px; width: 35px; height: 30px; }
        
        /* A & B Button Overlays */
        ${selectors.a} { top: 430px; left: 285px; width: 48px; height: 48px; border-radius: 50%; }
        ${selectors.b} { top: 455px; left: 230px; width: 48px; height: 48px; border-radius: 50%; }
        
        /* Start & Select Overlays */
        ${selectors.select} { top: 520px; left: 130px; width: 50px; height: 20px; transform: rotate(-25deg); }
        ${selectors.start}  { top: 520px; left: 195px; width: 50px; height: 20px; transform: rotate(-25deg); }
      `;

      const style = iFrameDoc.createElement('style');
      style.setAttribute('type', 'text/css');
      style.appendChild(iFrameDoc.createTextNode(css));
      iFrameDoc.head.appendChild(style);
      
    } catch (e) {
      console.error("Could not inject CSS into iframe.", e);
    }

    // Load the rom
    (iFrameWindow as any).rom = rom!;
    (iFrameWindow as any).go();
  };


  return (
    // The JSX is now purely visual, with no interactive props.
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
          <div className={styles.logo}>
            VERIDIAN <span className={styles.logoHandheld}>HANDHELD</span>
          </div>
          <div className={styles.controls}>
            <div className={styles.dpad}>
              <div className={styles.dpadUp}></div>
              <div className={styles.dpadDown}></div>
              <div className={styles.dpadLeft}></div>
              <div className={styles.dpadRight}></div>
              <div className={styles.dpadCenter}></div>
            </div>
            <div className={styles.abButtons}>
              <div className={styles.buttonB}><span>B</span></div>
              <div className={styles.buttonA}><span>A</span></div>
            </div>
          </div>
          <div className={styles.startSelectArea}>
            <div className={styles.button}><span>SELECT</span></div>
            <div className={styles.button}><span>START</span></div>
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default Emulator;
