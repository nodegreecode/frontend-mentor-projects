import styles from "./Page.module.scss";
import { type ReactNode } from "react";

type PageProps = {
  card: ReactNode;
  footer: ReactNode;
};

function Page({ card, footer }: PageProps) {
  return (
    <div>
      {card && (
        <main>
          <section>
            <div className={`d-flex align-items-center ${styles.page}`}>
              <div className={`container ${styles["custom-container"]}`}>
                {card}
              </div>
            </div>
          </section>
        </main>
      )}
      {footer && <footer>{footer}</footer>}
    </div>
  );
}

export default Page;
