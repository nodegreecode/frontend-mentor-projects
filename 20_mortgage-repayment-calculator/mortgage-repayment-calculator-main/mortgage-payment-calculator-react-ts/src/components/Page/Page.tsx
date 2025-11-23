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
            <div className="d-flex justify-content-center align-items-center px-sm-5 min-vh-100">
              {card}
            </div>
          </section>
        </main>
      )}
      {footer && <footer>{footer}</footer>}
    </div>
  );
}

export default Page;
