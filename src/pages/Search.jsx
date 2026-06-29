import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import { supabase } from "../utils/supabase.js";
import { getUser } from "../utils/user.js";

import styles from "./Search.module.css";

export default function Search() {
  const [search, setSearch] = useState("");
  const [userStickers, setUserStickers] = useState([]);

  function handleSearch(event) {
    setSearch(event.target.value);
  }

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

  const results = useMemo(() => {
    if (!search) return [];
    return userStickers
      .filter(({ code }) =>
        code.toLowerCase().includes(search.trim().toLowerCase()),
      )
      .sort((a, b) => {
        const codeForA = a.code.slice(0, 3);
        const codeForB = b.code.slice(0, 3);
        if (codeForA !== codeForB) {
          return codeForA.localeCompare(codeForB);
        }
        const numberForA = a.code.slice(3);
        const numberForB = b.code.slice(3);
        return parseInt(numberForA, 10) - parseInt(numberForB, 10);
      });
  }, [search, userStickers]);

  return (
    <section>
      <h1>Search</h1>
      <p className={styles.homeLink}>
        <Link to="/">Back to home</Link>
      </p>
      <label className={styles.search}>
        <span>Search by sticker code</span>
        <input
          type="text"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck="false"
          value={search}
          onChange={handleSearch}
        />
      </label>
      {results.length > 0 && (
        <>
          <p className={styles.results}>Stickers found! 🙂</p>
          <ul>
            {results.map((result) => (
              <li key={result.id}>
                {result.code.slice(0, 3)} {result.code.slice(3)}
              </li>
            ))}
          </ul>
        </>
      )}
      {search && results.length === 0 && (
        <p className={styles.noResults}>No stickers found 🙁</p>
      )}
    </section>
  );
}
