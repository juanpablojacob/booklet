import { Link, Outlet } from "react-router";

import styles from "./App.module.css";

export default function App() {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
}
