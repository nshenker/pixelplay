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

  const sendKeyEvent = (type: 'keydown' | 'keyup', key: string) => {
    if (!iframe.current?.contentWindow) return;
    const event = new KeyboardEvent(type, { key, bubbles: true });
    iframe.current.contentWindow.document.dispatchEvent(event);
  };

  const startRom = () => {
    const iFrameWindow = iframe.current?.contentWindow;
    if (!iFrameWindow) return;

    // --- THIS IS THE NEW CODE TO HIDE THE BUTTONS ---
    try {
      const iFrameDoc = iFrameWindow.document;

      // 1. **IMPORTANT**: Replace '#emulator-touch-controls' with the ID or class you found!
      //    If it's a class, use a dot, e.g., '.the-class-name'
      const selectorToHide = '#emulator-touch-controls';
      
      const css = `
        ${selectorToHide} {
          display: none !important;
          visibility: hidden !important;
        }
      `;
      
      const style = iFrameDoc.createElement('style');
      style.setAttribute('type', 'text/css');
      style.appendChild(iFrameDoc.createTextNode(css));
      iFrameDoc.head.appendChild(style);
      
    } catch (e) {
      console.error("Could not inject CSS into iframe. This may be a cross-origin security issue.", e);
    }
    // --- END OF NEW CODE ---

    // Load the rom (this part remains the same)
    (iFrameWindow as any).rom = rom!;
    (iFrameWindow as any).go();
  };

  const createButtonHandlers = (key: string) => ({
    onMouseDown: () => sendKeyEvent('keydown', key),
    onMouseUp: () => sendKeyEvent('keyup', key),
    onMouseLeave: () => sendKeyEvent('keyup', key),
    onTouchStart: (e: React.TouchEvent) => {
      e.preventDefault();
      sendKeyEvent('keydown', key);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      e.preventDefault();
      sendKeyEvent('keyup', key);
    },
  });

  const controlsMap = {
    up: createButtonHandlers('ArrowUp'),
    down: createButtonHandlers('ArrowDown'),
    left: createButtonHandlers('ArrowLeft'),
    right: createButtonHandlers('ArrowRight'),
    a: createButtonHandlers('x'),
    b: createButtonHandlers('z'),
    start: createButtonHandlers('Enter'),
    select: createButtonHandlers('Shift'),
  };

  return (
    // The JSX for the component remains the same as the previous version.
    // No changes are needed here.
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
              <div className={styles.dpadUp} {...controlsMap.up}></div>
              <div className={styles.dpadDown} {...controlsMap.down}></div>
              <div className={styles.dpadLeft} {...controlsMap.left}></div>
              <div className={styles.dpadRight} {...controlsMap.right}></div>
              <div className={styles.dpadCenter}></div>
            </div>
            <div className={styles.abButtons}>
              <div className={styles.buttonB} {...controlsMap.b}>
                <span>B</span>
              </div>
              <div className={styles.buttonA} {...controlsMap.a}>
                <span>A</span>
              </div>
            </div>
          </div>
          <div className={styles.startSelectArea}>
            <div className={styles.button} {...controlsMap.select}>
              <span>SELECT</span>
            </div>
            <div className={styles.button} {...controlsMap.start}>
              <span>START</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default Emulator;
