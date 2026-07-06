import { useMemo, useState } from "react";
import { Link } from "react-router";

import { supabase } from "../utils/supabase";
import { getUser } from "../utils/user";
import stickers from "../data/stickers";
import useStickers from "../hooks/useStickers";
import useSaveSticker from "../hooks/useSaveSticker";

import styles from "./Search.module.css";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function Search() {
  const { data: userStickers } = useStickers();
  const { mutate: saveSticker } = useSaveSticker();

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search || search.length < 2) return [];
    return stickers
      .filter((code) => code.includes(search.trim().toUpperCase()))
      .map((code) => ({
        code,
        obtained: userStickers.map((s) => s.code).includes(code),
      }));
  }, [search, userStickers]);

  return (
    <main className={styles.page}>
      <h1>Search</h1>
      <Link className={styles.back} to="/">
        Back to home
      </Link>
      <section className={styles.search}>
        <label>
          <span>Search by sticker code</span>
          <input
            id="search"
            type="text"
            autoComplete="off"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck="false"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </section>
      {search && filtered && (
        <ul className={styles.stickers}>
          {filtered.map((sticker) => (
            <li key={sticker.code} className={styles.sticker}>
              <span>
                {sticker.code.slice(0, 3)} {sticker.code.slice(3)}
              </span>
              {sticker.obtained ? (
                <section className={styles.obtained}>
                  <CheckIcon />
                  <span>Obtained</span>
                </section>
              ) : (
                <button onClick={() => saveSticker(sticker.code)}>
                  GOT IT
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {search && search.length > 1 && filtered.length === 0 && (
        <p>No stickers found 🙁</p>
      )}
    </main>
  );
}
