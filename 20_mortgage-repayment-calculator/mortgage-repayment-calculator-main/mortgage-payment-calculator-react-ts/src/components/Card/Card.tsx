import styles from "./Card.module.scss";
import { type ReactNode } from "react";

function Card({ children }: { children: ReactNode }) {
  return (
    <article className={`card ${styles["custom-card"]}`}>{children}</article>
  );
}

export default Card;
