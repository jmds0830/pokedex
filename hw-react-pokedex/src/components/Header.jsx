import styles from '../styles/Header.module.css';

function Header({ children }) {
  return (
    <>
      <header className={styles.navbar}>
        <img
          className={styles.navbarImage}
          src="https://ntrung1008.github.io/FrontEnd_Pokedex/resources/Pokedex.png"
          alt="Pokedex"
        />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div>Made by Jhune Michael Segismundo using React</div>
        <div>Data sourced from pokeAPI</div>
      </footer>
    </>
  );
}

export default Header;
