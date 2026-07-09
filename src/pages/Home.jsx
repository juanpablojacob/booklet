import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';

import useStickers from '../hooks/useStickers';
import { STICKERS_TOTAL_COUNT } from '../constants';
import { formatCode } from '../utils/format';

import styles from './Home.module.css';

export default function Home() {
  const { data: stickers } = useStickers();

  const stickersCount = useMemo(() => stickers?.length ?? 0, [stickers]);

  const completion = useMemo(() => (stickersCount / STICKERS_TOTAL_COUNT) * 100, [stickersCount]);

  const completionStyle = useMemo(() => ({ '--progress': `${completion}%` }), [completion]);

  const stickerCountByCode = useMemo(() => {
    const groups = Object.groupBy(stickers ?? [], ({ code }) => code.slice(0, 3));
    return Object.entries(groups)
      .map(([code, stickers]) => [code, stickers.length])
      .sort((a, b) => b[1] - a[1]);
  }, [stickers]);

  const repeated = useMemo(
    () => stickers?.filter((s) => s.repeated > 0)?.sort((a, b) => a.code.localeCompare(b.code)) ?? [],
    [stickers]
  );

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

      <section className={styles.stats}>
        <h2>Stickers stats</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '70%' }}>Country</th>
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

        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '70%' }}>Code</th>
              <th>Repeated</th>
            </tr>
          </thead>
          <tbody>
            {repeated.map((sticker) => (
              <tr key={sticker.code}>
                <td>{formatCode(sticker.code)}</td>
                <td>{sticker.repeated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
