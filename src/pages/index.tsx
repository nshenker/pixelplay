import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState, useRef } from "react";
import { Wallet } from "@/pages/Wallet";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Wallet />;
}
