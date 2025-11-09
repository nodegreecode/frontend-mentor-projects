import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.attribution}>
      Challenge by{" "}
      <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
      Coded by{" "}
      <a href="https://www.linkedin.com/in/anatolii-vasylenko-402014219/">
        Anatolii Vasylenko
      </a>
      .
    </div>
  );
}

export default Footer;
