import { Dialog, DialogContent, DialogOverlay } from "@reach/dialog";
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
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
  const isPhone = useMediaQuery({ query: "(max-width: 600px)" });

  const startRom = () => {
    if (!iframe || !iframe.current?.contentWindow) return;
    console.log("setting rom", rom);
    iframe.current!.contentWindow.window.rom = rom!;
    iframe.current!.contentWindow.window.go();
  };

  const onIframeLoad = () => {
    console.log("iframe loaded");
    startRom();
  };
  return (
    <DialogOverlay
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "#00000077",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end", // Aligns the content at the bottom
    }}
    isOpen={showDialog}
    onDismiss={onDismiss}
  >
    <DialogContent
      style={{
        position: "relative",
        margin: "auto",
        width: isPhone ? "100%" : "600px",
        height: "800px",
        backgroundColor: "#3c3c42",
      }}
    >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <iframe
            style={{ marginTop: "20px" }}
            onLoad={onIframeLoad}
            height={"500px"}
            width={isPhone ? "100%" : "560px"}
            ref={iframe}
            key={romKey}
            className={styles.emulator}
            src={"/emulator/simple.html"}
          />
        </div>
        {!isPhone && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              alignItems: "left",
            }}
          >
            <div
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <span className={styles.text}>MOVE</span>
              <span className={styles.whiteButton}>↑</span>{" "}
              <span className={styles.whiteButton}>↓</span>{" "}
              <span className={styles.whiteButton}>←</span>{" "}
              <span className={styles.whiteButton}>→</span>
              <span className={styles.text}>or</span>{" "}
              <span className={styles.whiteButton}>W</span>{" "}
              <span className={styles.whiteButton}>A</span>{" "}
              <span className={styles.whiteButton}>S</span>{" "}
              <span className={styles.whiteButton}>D</span>
            </div>
            <div
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <span className={styles.text}>A:</span>
              <span className={styles.whiteButton}>X</span>
            </div>
            <div
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <span className={styles.text}>B:</span>
              <span className={styles.whiteButton}>Z</span>
            </div>
            <div
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <span className={styles.text}>START:</span>
              <span className={styles.pillShape}>ENTER</span>
            </div>
          </div>
        )}
      </DialogContent>
    </DialogOverlay>
  );
};

export default Emulator;
