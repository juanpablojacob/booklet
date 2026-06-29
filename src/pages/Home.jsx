import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import { supabase } from "../utils/supabase.js";
import { getUser } from "../utils/user.js";
import { STICKERS_TOTAL_COUNT } from "../constants.js";
import StickersCountTable from "../components/StickersCountTable.jsx";

import styles from "./Home.module.css";

export default function Home() {
  const [userStickers, setUserStickers] = useState([]);

  useEffect(() => {
    async function getStickers() {
      const { data, error } = await supabase
        .from("stickers")
        .select()
        .eq("user_id", getUser().id);
      if (data) {
        setUserStickers(data);
      }
    }

    getStickers();
  }, []);

  const stickersCount = useMemo(() => userStickers.length, [userStickers]);
  const completion = useMemo(
    () => (stickersCount / STICKERS_TOTAL_COUNT) * 100,
    [stickersCount],
  );
  const completionStyle = useMemo(
    () => ({ "--progress": `${completion}%` }),
    [completion],
  );
  const stickerCountByCode = useMemo(() => {
    const groups = Object.groupBy(userStickers, ({ code }) => code.slice(0, 3));
    return Object.entries(groups)
      .map(([code, stickers]) => [code, stickers.length])
      .sort((a, b) => b[1] - a[1]);
  }, [userStickers]);

  return (
    <section>
      <h1>Home</h1>
      <p className={styles.searchLink}>
        <Link to="/search">Search stickers</Link>
      </p>
      <p className={styles.searchLink}>
        <Link to="/new">Register new stickers</Link>
      </p>

      <p className={styles.count}>
        {stickersCount} of {STICKERS_TOTAL_COUNT} stickers (
        {completion.toFixed(2)}%)
      </p>
      <div className={styles.progress} style={completionStyle}>
        <div className={styles.progressBar}></div>
      </div>

      <StickersCountTable stickerCountByCode={stickerCountByCode} />
    </section>
  );
}
