import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import useStickers from "../hooks/useStickers";
import { STICKERS_TOTAL_COUNT } from "../constants";

import styles from "./Home.module.css";

export default function Home() {
  const { data: stickers } = useStickers();

  const stickersCount = useMemo(() => stickers?.length ?? 0, [stickers]);
  const completion = useMemo(
    () => (stickersCount / STICKERS_TOTAL_COUNT) * 100,
    [stickersCount],
  );
  const completionStyle = useMemo(
    () => ({ "--progress": `${completion}%` }),
    [completion],
  );
  const stickerCountByCode = useMemo(() => {
    const groups = Object.groupBy(stickers ?? [], ({ code }) =>
      code.slice(0, 3),
    );
    return Object.entries(groups)
      .map(([code, stickers]) => [code, stickers.length])
      .sort((a, b) => b[1] - a[1]);
  }, [stickers]);

  return (
    <main className={styles.page}>
      <h1>Booklet</h1>
      <Link className={styles.search} to="/search">
        Search stickers
      </Link>

      <section className={styles.completion}>
        <h2>Completion</h2>
        <span></span>
        <span>
          {stickersCount} of {STICKERS_TOTAL_COUNT} -- {completion.toFixed(1)}%
        </span>
        <div className={styles.progress} style={completionStyle}>
          <div className={styles.bar}></div>
        </div>
      </section>

      <section className={styles.count}>
        <h2>Stickers count by code</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {stickerCountByCode.map(([code, count]) => (
              <tr key={code}>
                <td>{code}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
