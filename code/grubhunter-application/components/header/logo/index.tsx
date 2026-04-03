import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import logo from "@/public/assets/logo.svg";

export const Logo = () => {
  return (
    <Link href="/" className={styles.root} aria-label="Go to start page">
      <Image
        src={logo}
        alt="GrubHunter logo"
        fill
        style={{ objectFit: "contain" }}
        priority
      />
    </Link>
  );
};

export default Logo;